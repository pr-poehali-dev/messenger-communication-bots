import { useState, useCallback } from "react";
import Sidebar from "@/components/messenger/Sidebar";
import ChatList from "@/components/messenger/ChatList";
import ChatView from "@/components/messenger/ChatView";
import CallsPanel from "@/components/messenger/CallsPanel";
import ContactsPanel from "@/components/messenger/ContactsPanel";
import BotsPanel from "@/components/messenger/BotsPanel";
import SettingsPanel from "@/components/messenger/SettingsPanel";
import ProfilePanel from "@/components/messenger/ProfilePanel";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chats");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [chatInfo, setChatInfo] = useState<{ name: string; avatar: string; online: boolean } | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSelectChat = useCallback((id: string, info: { name: string; avatar: string; online: boolean }) => {
    setSelectedChat(id);
    setChatInfo(info);
  }, []);

  const handleMessageSent = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "chats":
        return (
          <>
            <ChatList
              selectedChat={selectedChat}
              onSelectChat={handleSelectChat}
              refreshKey={refreshKey}
            />
            <ChatView
              chatId={selectedChat}
              chatInfo={chatInfo}
              onMessageSent={handleMessageSent}
            />
          </>
        );
      case "calls":
        return <CallsPanel />;
      case "contacts":
        return <ContactsPanel />;
      case "bots":
        return <BotsPanel />;
      case "settings":
        return <SettingsPanel />;
      case "profile":
        return <ProfilePanel />;
      default:
        return <ChatView chatId={null} />;
    }
  };

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default Index;