import Icon from "@/components/ui/icon";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const ProfilePanel = () => {
  return (
    <div className="flex-1 flex flex-col bg-background">
      <div className="p-5 border-b border-border">
        <h2 className="text-xl font-semibold">Профиль</h2>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="p-8 flex flex-col items-center">
          <div className="relative mb-4">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-2xl font-bold text-white">
                Я
              </AvatarFallback>
            </Avatar>
            <button className="absolute bottom-0 right-0 w-8 h-8 gradient-primary rounded-full flex items-center justify-center border-2 border-background">
              <Icon name="Camera" size={14} className="text-white" />
            </button>
            <div className="absolute top-0 right-0 w-5 h-5 bg-emerald-500 rounded-full border-2 border-background" />
          </div>
          <h3 className="text-lg font-bold">Пользователь</h3>
          <p className="text-sm text-muted-foreground">@user_one</p>
          <Badge className="mt-2 gradient-primary text-white border-0">
            <Icon name="Shield" size={12} className="mr-1" />
            Аккаунт защищён
          </Badge>
        </div>

        <div className="px-5 space-y-4">
          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Информация</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon name="Phone" size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm">+7 900 000-00-00</p>
                  <p className="text-xs text-muted-foreground">Телефон</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon name="AtSign" size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm">user_one</p>
                  <p className="text-xs text-muted-foreground">Имя пользователя</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                  <Icon name="Info" size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm">Доступен</p>
                  <p className="text-xs text-muted-foreground">О себе</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Статистика</h4>
            <div className="grid grid-cols-3 gap-3 p-3">
              <div className="p-3 rounded-xl bg-card border border-border text-center">
                <p className="text-lg font-bold text-primary">24</p>
                <p className="text-[10px] text-muted-foreground">Чатов</p>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border text-center">
                <p className="text-lg font-bold text-accent">156</p>
                <p className="text-[10px] text-muted-foreground">Звонков</p>
              </div>
              <div className="p-3 rounded-xl bg-card border border-border text-center">
                <p className="text-lg font-bold text-emerald-400">2</p>
                <p className="text-[10px] text-muted-foreground">Бота</p>
              </div>
            </div>
          </div>

          <div className="space-y-1 pb-5">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Действия</h4>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                <Icon name="Pencil" size={16} className="text-muted-foreground" />
              </div>
              <span className="text-sm">Редактировать профиль</span>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground ml-auto" />
            </button>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                <Icon name="QrCode" size={16} className="text-muted-foreground" />
              </div>
              <span className="text-sm">Мой QR-код</span>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground ml-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePanel;
