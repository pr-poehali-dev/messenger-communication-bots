import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "chats", icon: "MessageCircle", label: "Чаты" },
  { id: "calls", icon: "Phone", label: "Звонки" },
  { id: "contacts", icon: "Users", label: "Контакты" },
  { id: "bots", icon: "Bot", label: "Боты" },
  { id: "settings", icon: "Settings", label: "Настройки" },
];

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  return (
    <div className="w-[72px] h-full bg-card flex flex-col items-center py-4 border-r border-border">
      <div className="mb-6">
        <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center glow-primary">
          <Icon name="Zap" size={20} className="text-white" />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 ${
              activeTab === tab.id
                ? "gradient-primary text-white glow-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Icon name={tab.icon} size={20} />
            <span className="text-[9px] font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={() => onTabChange("profile")}
        className="mt-auto"
      >
        <Avatar className="w-10 h-10 border-2 border-transparent hover:border-primary transition-colors">
          <AvatarFallback className="bg-secondary text-xs font-semibold">
            Я
          </AvatarFallback>
        </Avatar>
      </button>
    </div>
  );
};

export default Sidebar;
