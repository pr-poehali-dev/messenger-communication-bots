import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  avatar: string;
}

const mockChats: Chat[] = [
  { id: "1", name: "Алексей Петров", lastMessage: "Отлично, договорились!", time: "12:45", unread: 2, online: true, avatar: "АП" },
  { id: "2", name: "Маркетинг", lastMessage: "Ольга: Презентация готова", time: "11:30", unread: 5, online: false, avatar: "МК" },
  { id: "3", name: "Дарья Козлова", lastMessage: "Спасибо за помощь 🙏", time: "10:15", unread: 0, online: true, avatar: "ДК" },
  { id: "4", name: "Техподдержка Бот", lastMessage: "Ваш тикет #234 решён", time: "Вчера", unread: 1, online: true, avatar: "🤖" },
  { id: "5", name: "Иван Сидоров", lastMessage: "Как дела с проектом?", time: "Вчера", unread: 0, online: false, avatar: "ИС" },
  { id: "6", name: "Команда дизайна", lastMessage: "Вы: Макеты отправил", time: "Пн", unread: 0, online: false, avatar: "КД" },
];

interface ChatListProps {
  selectedChat: string | null;
  onSelectChat: (id: string) => void;
}

const ChatList = ({ selectedChat, onSelectChat }: ChatListProps) => {
  const [search, setSearch] = useState("");

  const filtered = mockChats.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-[320px] h-full bg-card border-r border-border flex flex-col">
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Чаты</h2>
          <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <Icon name="PenSquare" size={18} className="text-muted-foreground" />
          </button>
        </div>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-secondary border-0 h-9 text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filtered.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-150 ${
              selectedChat === chat.id
                ? "bg-primary/10 border-r-2 border-primary"
                : "hover:bg-secondary/50"
            }`}
          >
            <div className="relative flex-shrink-0">
              <Avatar className="w-11 h-11">
                <AvatarFallback className="bg-secondary text-xs font-medium">
                  {chat.avatar}
                </AvatarFallback>
              </Avatar>
              {chat.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-card" />
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm truncate">{chat.name}</span>
                <span className="text-[11px] text-muted-foreground flex-shrink-0 ml-2">{chat.time}</span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-xs text-muted-foreground truncate">{chat.lastMessage}</span>
                {chat.unread > 0 && (
                  <span className="flex-shrink-0 ml-2 min-w-[20px] h-5 px-1.5 gradient-primary rounded-full text-[11px] font-medium flex items-center justify-center text-white">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
