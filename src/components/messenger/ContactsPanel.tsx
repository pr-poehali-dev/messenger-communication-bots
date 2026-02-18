import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
  phone: string;
}

const mockContacts: Contact[] = [
  { id: "1", name: "Алексей Петров", avatar: "АП", status: "Занят работой", online: true, phone: "+7 900 123-45-67" },
  { id: "2", name: "Дарья Козлова", avatar: "ДК", status: "Доступна", online: true, phone: "+7 900 234-56-78" },
  { id: "3", name: "Иван Сидоров", avatar: "ИС", status: "Был 2 часа назад", online: false, phone: "+7 900 345-67-89" },
  { id: "4", name: "Мария Волкова", avatar: "МВ", status: "На встрече", online: false, phone: "+7 900 456-78-90" },
  { id: "5", name: "Николай Орлов", avatar: "НО", status: "Доступен", online: true, phone: "+7 900 567-89-01" },
  { id: "6", name: "Ольга Смирнова", avatar: "ОС", status: "Не беспокоить", online: false, phone: "+7 900 678-90-12" },
  { id: "7", name: "Павел Кузнецов", avatar: "ПК", status: "Доступен", online: true, phone: "+7 900 789-01-23" },
];

const ContactsPanel = () => {
  const [search, setSearch] = useState("");

  const filtered = mockContacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  const onlineCount = mockContacts.filter((c) => c.online).length;

  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">Контакты</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{onlineCount} в сети из {mockContacts.length}</p>
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
        {filtered.map((contact) => (
          <div
            key={contact.id}
            className="px-5 py-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            <div className="relative flex-shrink-0">
              <Avatar className="w-11 h-11">
                <AvatarFallback className="bg-secondary text-xs font-medium">{contact.avatar}</AvatarFallback>
              </Avatar>
              {contact.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-background" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-medium text-sm">{contact.name}</span>
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
