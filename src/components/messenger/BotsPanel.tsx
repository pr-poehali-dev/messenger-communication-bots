import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface Bot {
  id: string;
  name: string;
  description: string;
  avatar: string;
  category: string;
  isActive: boolean;
  isMine: boolean;
}

const mockBots: Bot[] = [
  { id: "1", name: "Ассистент ИИ", description: "Умный помощник для ответов на вопросы", avatar: "🤖", category: "Продуктивность", isActive: true, isMine: false },
  { id: "2", name: "Переводчик", description: "Мгновенный перевод на 50+ языков", avatar: "🌍", category: "Языки", isActive: true, isMine: false },
  { id: "3", name: "Мой бот уведомлений", description: "Отправляет напоминания в чат", avatar: "🔔", category: "Мои боты", isActive: true, isMine: true },
  { id: "4", name: "Бот погоды", description: "Прогноз погоды по запросу", avatar: "⛅", category: "Утилиты", isActive: false, isMine: false },
  { id: "5", name: "Трекер задач", description: "Управляйте задачами прямо в чате", avatar: "✅", category: "Продуктивность", isActive: true, isMine: true },
];

const BotsPanel = () => {
  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Боты</h2>
          <button className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center glow-primary hover:opacity-90 transition-opacity">
            <Icon name="Plus" size={18} className="text-white" />
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="px-4 py-1.5 gradient-primary text-white text-sm rounded-full font-medium">Все</button>
          <button className="px-4 py-1.5 bg-secondary text-muted-foreground text-sm rounded-full font-medium hover:text-foreground transition-colors">Мои боты</button>
          <button className="px-4 py-1.5 bg-secondary text-muted-foreground text-sm rounded-full font-medium hover:text-foreground transition-colors">Каталог</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-3">
        {mockBots.map((bot) => (
          <div
            key={bot.id}
            className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-xl flex-shrink-0">
                {bot.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{bot.name}</span>
                  {bot.isMine && (
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-primary/30 text-primary">
                      Мой
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{bot.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                    {bot.category}
                  </span>
                  <div className={`flex items-center gap-1 ${bot.isActive ? "text-emerald-400" : "text-muted-foreground"}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${bot.isActive ? "bg-emerald-400" : "bg-muted-foreground"}`} />
                    <span className="text-[10px]">{bot.isActive ? "Активен" : "Отключён"}</span>
                  </div>
                </div>
              </div>
              <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100">
                <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}

        <button className="w-full p-4 rounded-xl border border-dashed border-border hover:border-primary/50 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-primary">
          <Icon name="Plus" size={18} />
          <span className="text-sm font-medium">Создать нового бота</span>
        </button>
      </div>
    </div>
  );
};

export default BotsPanel;
