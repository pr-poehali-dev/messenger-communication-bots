import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
  status?: "sent" | "delivered" | "read";
}

const mockMessages: Message[] = [
  { id: "1", text: "Привет! Как продвигается проект?", time: "12:30", isMine: false },
  { id: "2", text: "Привет! Всё идёт по плану, завтра покажу результаты", time: "12:32", isMine: true, status: "read" },
  { id: "3", text: "Отлично! Может созвонимся вечером?", time: "12:33", isMine: false },
  { id: "4", text: "Да, давай в 18:00 👍", time: "12:35", isMine: true, status: "read" },
  { id: "5", text: "🔒 Сообщения защищены сквозным шифрованием", time: "12:36", isMine: false },
  { id: "6", text: "Отлично, договорились!", time: "12:45", isMine: false },
];

interface ChatViewProps {
  chatId: string | null;
}

const ChatView = ({ chatId }: ChatViewProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const handleSend = () => {
    if (!message.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      text: message,
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      isMine: true,
      status: "sent",
    };
    setMessages([...messages, newMsg]);
    setMessage("");
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
            <AvatarFallback className="bg-secondary text-xs">АП</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm">Алексей Петров</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
              <span className="text-xs text-emerald-400">онлайн</span>
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

      <div className="flex-1 overflow-y-auto scrollbar-thin px-5 py-4 space-y-3">
        <div className="flex justify-center mb-4">
          <span className="text-[11px] text-muted-foreground bg-secondary px-3 py-1 rounded-full">
            🔒 Сквозное шифрование включено
          </span>
        </div>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isMine ? "justify-end" : "justify-start"} animate-fade-in`}
          >
            <div
              className={`max-w-[70%] px-4 py-2.5 rounded-2xl ${
                msg.isMine
                  ? "gradient-primary text-white rounded-br-md"
                  : "bg-secondary text-foreground rounded-bl-md"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
              <div className={`flex items-center justify-end gap-1 mt-1 ${msg.isMine ? "text-white/60" : "text-muted-foreground"}`}>
                <span className="text-[10px]">{msg.time}</span>
                {msg.isMine && msg.status === "read" && (
                  <Icon name="CheckCheck" size={14} />
                )}
              </div>
            </div>
          </div>
        ))}
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
