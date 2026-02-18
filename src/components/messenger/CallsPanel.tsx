import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Call {
  id: string;
  name: string;
  avatar: string;
  type: "incoming" | "outgoing" | "missed";
  callType: "voice" | "video";
  time: string;
  duration?: string;
}

const mockCalls: Call[] = [
  { id: "1", name: "Алексей Петров", avatar: "АП", type: "incoming", callType: "video", time: "Сегодня, 14:20", duration: "12 мин" },
  { id: "2", name: "Дарья Козлова", avatar: "ДК", type: "missed", callType: "voice", time: "Сегодня, 11:05" },
  { id: "3", name: "Маркетинг", avatar: "МК", type: "outgoing", callType: "voice", time: "Вчера, 18:30", duration: "45 мин" },
  { id: "4", name: "Иван Сидоров", avatar: "ИС", type: "incoming", callType: "voice", time: "Вчера, 15:10", duration: "5 мин" },
  { id: "5", name: "Дарья Козлова", avatar: "ДК", type: "outgoing", callType: "video", time: "20 фев, 10:00", duration: "28 мин" },
];

const CallsPanel = () => {
  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Звонки</h2>
          <button className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center glow-primary hover:opacity-90 transition-opacity">
            <Icon name="PhoneCall" size={18} className="text-white" />
          </button>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-1.5 gradient-primary text-white text-sm rounded-full font-medium">Все</button>
          <button className="px-4 py-1.5 bg-secondary text-muted-foreground text-sm rounded-full font-medium hover:text-foreground transition-colors">Пропущенные</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {mockCalls.map((call) => (
          <div
            key={call.id}
            className="px-5 py-3.5 flex items-center gap-3 hover:bg-secondary/50 transition-colors cursor-pointer"
          >
            <Avatar className="w-11 h-11">
              <AvatarFallback className="bg-secondary text-xs font-medium">{call.avatar}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <span className={`font-medium text-sm ${call.type === "missed" ? "text-destructive" : ""}`}>
                {call.name}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Icon
                  name={call.type === "incoming" ? "PhoneIncoming" : call.type === "outgoing" ? "PhoneOutgoing" : "PhoneMissed"}
                  size={13}
                  className={call.type === "missed" ? "text-destructive" : "text-muted-foreground"}
                />
                <span className="text-xs text-muted-foreground">{call.time}</span>
                {call.duration && (
                  <>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{call.duration}</span>
                  </>
                )}
              </div>
            </div>
            <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
              <Icon
                name={call.callType === "video" ? "Video" : "Phone"}
                size={18}
                className="text-primary"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallsPanel;
