import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { getMessages, sendMessage, markRead } from "@/lib/api";

interface MessageData {
  id: string;
  text: string;
  sender_id: string;
  sender_name: string;
  sender_avatar: string;
  is_read: boolean;
  created_at: string;
}

interface ChatViewProps {
  chatId: string | null;
  chatInfo?: { name: string; avatar: string; online: boolean } | null;
  onMessageSent?: () => void;
}

const ChatView = ({ chatId, chatInfo, onMessageSent }: ChatViewProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const MY_ID = "user-me";

  useEffect(() => {
    if (!chatId) return;
    setLoading(true);
    getMessages(chatId).then((msgs) => {
      setMessages(msgs);
      setLoading(false);
      markRead(chatId);
    });
  }, [chatId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || !chatId) return;
    const text = message;
    setMessage("");
    const newMsg = await sendMessage(chatId, text);
    if (newMsg) {
      setMessages((prev) => [...prev, newMsg]);
      onMessageSent?.();
    }
  };

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  };

  if (!chatId) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-4 glow-primary">
            <Icon name="MessageCircle" size={36} className="text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Выберите чат</h3>
          <p className="text-muted-foreground text-sm">или начните новый разговор</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="h-16 px-5 flex items-center justify-between border-b border-border glass">
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9">
            <AvatarFallback className="bg-secondary text-xs">
              {chatInfo?.avatar || "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm">{chatInfo?.name || "Чат"}</h3>
            <div className="flex items-center gap-1.5">
              {chatInfo?.online ? (
                <>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <span className="text-xs text-emerald-400">онлайн</span>
                </>
              ) : (
                <span className="text-xs text-muted-foreground">был(а) недавно</span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <Icon name="Phone" size={18} className="text-muted-foreground" />
          </button>
          <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <Icon name="Video" size={18} className="text-muted-foreground" />
          </button>
          <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <Icon name="Search" size={18} className="text-muted-foreground" />
          </button>
          <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <Icon name="MoreVertical" size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4 space-y-3">
        <div className="flex justify-center mb-4">
          <span className="text-[11px] text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            🔒 Сквозное шифрование включено
          </span>
        </div>
        {loading ? (
          <div className="flex justify-center py-8">
            <Icon name="Loader2" size={24} className="text-muted-foreground animate-spin" />
          </div>
        ) : (
          messages.map((msg) => {
            const isMine = msg.sender_id === MY_ID;
            return (
              <div
                key={msg.id}
                className={`flex ${isMine ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                {!isMine && (
                  <Avatar className="w-7 h-7 mr-2 mt-1 flex-shrink-0">
                    <AvatarFallback className="bg-secondary text-[10px]">{msg.sender_avatar}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
                    isMine
                      ? "gradient-primary text-white rounded-br-md"
                      : "bg-secondary text-foreground rounded-bl-md"
                  }`}
                >
                  {!isMine && (
                    <p className="text-[11px] font-medium text-primary mb-0.5">{msg.sender_name}</p>
                  )}
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <div className={`flex items-center justify-end gap-1 mt-1 ${isMine ? "text-white/60" : "text-muted-foreground"}`}>
                    <span className="text-[10px]">{formatTime(msg.created_at)}</span>
                    {isMine && msg.is_read && (
                      <Icon name="CheckCheck" size={14} />
                    )}
                    {isMine && !msg.is_read && (
                      <Icon name="Check" size={14} />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-4 border-t border-border glass">
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors flex-shrink-0">
            <Icon name="Paperclip" size={18} className="text-muted-foreground" />
          </button>
          <Input
            placeholder="Написать сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="bg-secondary border-0 h-10 text-sm"
          />
          <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors flex-shrink-0">
            <Icon name="Smile" size={18} className="text-muted-foreground" />
          </button>
          <button
            onClick={handleSend}
            className="w-9 h-9 gradient-primary rounded-lg flex items-center justify-center transition-all hover:opacity-90 flex-shrink-0 glow-primary"
          >
            <Icon name="Send" size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
