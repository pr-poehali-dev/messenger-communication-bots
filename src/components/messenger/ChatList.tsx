import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { getChats } from "@/lib/api";

interface ChatData {
  id: string;
  name: string | null;
  is_group: boolean;
  last_message: { text: string; created_at: string; sender_id: string } | null;
  unread_count: number;
  members: { id: string; display_name: string; avatar_initials: string; is_online: boolean }[] | null;
}

interface ChatListProps {
  selectedChat: string | null;
  onSelectChat: (id: string, info: { name: string; avatar: string; online: boolean }) => void;
  refreshKey?: number;
}

const ChatList = ({ selectedChat, onSelectChat, refreshKey }: ChatListProps) => {
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState<ChatData[]>([]);

  useEffect(() => {
    getChats().then(setChats);
  }, [refreshKey]);

  const formatTime = (dateStr: string) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    if (diff < 86400000) return d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    if (diff < 172800000) return "Вчера";
    return d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
  };

  const getChatName = (chat: ChatData) => {
    if (chat.name) return chat.name;
    if (chat.members && chat.members.length > 0) return chat.members[0].display_name;
    return "Чат";
  };

  const getAvatar = (chat: ChatData) => {
    if (chat.members && chat.members.length > 0) return chat.members[0].avatar_initials;
    return "?";
  };

  const isOnline = (chat: ChatData) => {
    if (chat.is_group) return false;
    return chat.members?.some((m) => m.is_online) ?? false;
  };

  const filtered = chats.filter((c) =>
    getChatName(c).toLowerCase().includes(search.toLowerCase())
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
            onClick={() => onSelectChat(chat.id, { name: getChatName(chat), avatar: getAvatar(chat), online: isOnline(chat) })}
            className={`w-full px-4 py-3 flex items-center gap-3 transition-all duration-150 ${
              selectedChat === chat.id
                ? "bg-primary/10 border-r-2 border-primary"
                : "hover:bg-secondary/50"
            }`}
          >
            <div className="relative flex-shrink-0">
              <Avatar className="w-11 h-11">
                <AvatarFallback className="bg-secondary text-xs font-medium">
                  {getAvatar(chat)}
                </AvatarFallback>
              </Avatar>
              {isOnline(chat) && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-card" />
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm truncate">{getChatName(chat)}</span>
                {chat.last_message && (
                  <span className="text-[11px] text-muted-foreground flex-shrink-0 ml-2">
                    {formatTime(chat.last_message.created_at)}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-xs text-muted-foreground truncate">
                  {chat.last_message?.text || "Нет сообщений"}
                </span>
                {chat.unread_count > 0 && (
                  <span className="flex-shrink-0 ml-2 min-w-[20px] h-5 px-1.5 gradient-primary rounded-full text-[11px] font-medium flex items-center justify-center text-white">
                    {chat.unread_count}
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