import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { getContacts } from "@/lib/api";

interface ContactData {
  id: string;
  username: string;
  display_name: string;
  phone: string;
  status: string;
  avatar_initials: string;
  is_online: boolean;
  last_seen: string;
}

const ContactsPanel = () => {
  const [search, setSearch] = useState("");
  const [contacts, setContacts] = useState<ContactData[]>([]);

  useEffect(() => {
    getContacts(search).then(setContacts);
  }, [search]);

  const onlineCount = contacts.filter((c) => c.is_online).length;

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">Контакты</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{onlineCount} в сети из {contacts.length}</p>
          </div>
          <button className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center glow-primary hover:opacity-90 transition-opacity">
            <Icon name="UserPlus" size={18} className="text-white" />
          </button>
        </div>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск по имени или номеру..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-secondary border-0 h-9 text-sm"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="px-5 py-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            <div className="relative flex-shrink-0">
              <Avatar className="w-11 h-11">
                <AvatarFallback className="bg-secondary text-xs font-medium">{contact.avatar_initials}</AvatarFallback>
              </Avatar>
              {contact.is_online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-background" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-medium text-sm">{contact.display_name}</span>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{contact.status}</p>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
                <Icon name="MessageCircle" size={16} className="text-muted-foreground" />
              </button>
              <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsPanel;
