import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor

CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json'
}

def get_db():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def response(status, body):
    return {
        'statusCode': status,
        'headers': CORS_HEADERS,
        'body': json.dumps(body, default=str, ensure_ascii=False)
    }

def handler(event, context):
    """API мессенджера — чаты, сообщения, контакты"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS_HEADERS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}
    headers = event.get('headers') or {}
    user_id = headers.get('X-User-Id') or headers.get('x-user-id') or 'user-me'
    action = params.get('action', '')

    conn = get_db()
    cur = conn.cursor(cursor_factory=RealDictCursor)

    try:
        if method == 'GET' and action == 'chats':
            return get_chats(cur, user_id)
        elif method == 'GET' and action == 'messages':
            chat_id = params.get('chat_id', '')
            return get_messages(cur, chat_id, user_id)
        elif method == 'GET' and action == 'contacts':
            search = params.get('search', '')
            return get_contacts(cur, user_id, search)
        elif method == 'POST' and action == 'send':
            body = json.loads(event.get('body', '{}'))
            return send_message(cur, conn, user_id, body)
        elif method == 'POST' and action == 'read':
            body = json.loads(event.get('body', '{}'))
            return mark_read(cur, conn, user_id, body)
        else:
            return response(200, {'status': 'ok', 'version': '1.0'})
    finally:
        cur.close()
        conn.close()

def get_chats(cur, user_id):
    cur.execute("""
        SELECT c.id, c.name, c.is_group, c.created_at,
            (SELECT json_build_object(
                'text', m.text,
                'created_at', m.created_at,
                'sender_id', m.sender_id
            ) FROM messages m WHERE m.chat_id = c.id ORDER BY m.created_at DESC LIMIT 1) as last_message,
            (SELECT COUNT(*)::int FROM messages m WHERE m.chat_id = c.id AND m.is_read = false AND m.sender_id != '%s') as unread_count,
            (SELECT json_agg(json_build_object(
                'id', u.id,
                'display_name', u.display_name,
                'avatar_initials', u.avatar_initials,
                'is_online', u.is_online
            )) FROM chat_members cm2 JOIN users u ON u.id = cm2.user_id WHERE cm2.chat_id = c.id AND cm2.user_id != '%s') as members
        FROM chats c
        JOIN chat_members cm ON cm.chat_id = c.id
        WHERE cm.user_id = '%s'
        ORDER BY (SELECT MAX(created_at) FROM messages WHERE chat_id = c.id) DESC NULLS LAST
    """ % (user_id, user_id, user_id))
    chats = cur.fetchall()
    return response(200, {'chats': chats})

def get_messages(cur, chat_id, user_id):
    cur.execute("""
        SELECT m.id, m.text, m.sender_id, m.is_read, m.created_at,
            u.display_name as sender_name, u.avatar_initials as sender_avatar
        FROM messages m
        JOIN users u ON u.id = m.sender_id
        WHERE m.chat_id = '%s'
        ORDER BY m.created_at ASC
    """ % chat_id)
    messages = cur.fetchall()
    return response(200, {'messages': messages})

def get_contacts(cur, user_id, search):
    if search:
        cur.execute("""
            SELECT id, username, display_name, phone, status, avatar_initials, is_online, last_seen
            FROM users WHERE id != '%s'
            AND (lower(display_name) LIKE lower('%%%s%%') OR phone LIKE '%%%s%%')
            ORDER BY is_online DESC, display_name
        """ % (user_id, search, search))
    else:
        cur.execute("""
            SELECT id, username, display_name, phone, status, avatar_initials, is_online, last_seen
            FROM users WHERE id != '%s'
            ORDER BY is_online DESC, display_name
        """ % user_id)
    contacts = cur.fetchall()
    return response(200, {'contacts': contacts})

def send_message(cur, conn, user_id, body):
    chat_id = body.get('chat_id', '')
    text = body.get('text', '').strip()
    if not text or not chat_id:
        return response(400, {'error': 'chat_id и text обязательны'})

    safe_text = text.replace("'", "''")
    cur.execute("""
        INSERT INTO messages (chat_id, sender_id, text)
        VALUES ('%s', '%s', '%s')
        RETURNING id, chat_id, sender_id, text, is_read, created_at
    """ % (chat_id, user_id, safe_text))
    msg = cur.fetchone()
    conn.commit()

    cur.execute("""
        SELECT display_name as sender_name, avatar_initials as sender_avatar
        FROM users WHERE id = '%s'
    """ % user_id)
    user = cur.fetchone()
    msg['sender_name'] = user['sender_name']
    msg['sender_avatar'] = user['sender_avatar']

    return response(200, {'message': msg})

def mark_read(cur, conn, user_id, body):
    chat_id = body.get('chat_id', '')
    if not chat_id:
        return response(400, {'error': 'chat_id обязателен'})
    cur.execute("""
        UPDATE messages SET is_read = true
        WHERE chat_id = '%s' AND sender_id != '%s' AND is_read = false
    """ % (chat_id, user_id))
    conn.commit()
    return response(200, {'status': 'ok'})
