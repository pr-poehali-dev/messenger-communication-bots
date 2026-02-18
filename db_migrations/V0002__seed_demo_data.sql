
INSERT INTO users (id, username, display_name, phone, status, avatar_initials, is_online)
VALUES
    ('user-me', 'user_one', 'Пользователь', '+7 900 000-00-00', 'Доступен', 'Я', true),
    ('user-alex', 'alex_petrov', 'Алексей Петров', '+7 900 123-45-67', 'Занят работой', 'АП', true),
    ('user-darya', 'darya_kozlova', 'Дарья Козлова', '+7 900 234-56-78', 'Доступна', 'ДК', true),
    ('user-ivan', 'ivan_sidorov', 'Иван Сидоров', '+7 900 345-67-89', 'Был 2 часа назад', 'ИС', false),
    ('user-maria', 'maria_volkova', 'Мария Волкова', '+7 900 456-78-90', 'На встрече', 'МВ', false),
    ('user-nikolay', 'nikolay_orlov', 'Николай Орлов', '+7 900 567-89-01', 'Доступен', 'НО', true);

INSERT INTO chats (id, name, is_group)
VALUES
    ('chat-1', NULL, false),
    ('chat-2', 'Маркетинг', true),
    ('chat-3', NULL, false);

INSERT INTO chat_members (chat_id, user_id) VALUES
    ('chat-1', 'user-me'), ('chat-1', 'user-alex'),
    ('chat-2', 'user-me'), ('chat-2', 'user-alex'), ('chat-2', 'user-darya'),
    ('chat-3', 'user-me'), ('chat-3', 'user-darya');

INSERT INTO messages (chat_id, sender_id, text, is_read, created_at) VALUES
    ('chat-1', 'user-alex', 'Привет! Как продвигается проект?', true, now() - interval '15 minutes'),
    ('chat-1', 'user-me', 'Привет! Всё идёт по плану, завтра покажу результаты', true, now() - interval '13 minutes'),
    ('chat-1', 'user-alex', 'Отлично! Может созвонимся вечером?', true, now() - interval '12 minutes'),
    ('chat-1', 'user-me', 'Да, давай в 18:00', true, now() - interval '10 minutes'),
    ('chat-1', 'user-alex', 'Отлично, договорились!', false, now() - interval '5 minutes'),
    ('chat-2', 'user-darya', 'Презентация готова', false, now() - interval '30 minutes'),
    ('chat-3', 'user-darya', 'Спасибо за помощь', true, now() - interval '1 hour');
