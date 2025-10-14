import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import {
  Activity,
  Settings,
  HelpCircle,
  Bell,
  Wallet,
  BookOpen,
  Calendar,
  Shield,
  Info,
  Briefcase,
  TrendingUp,
  TrendingDown,
  Clock,
  ChevronRight
} from 'lucide-react';

interface MenuDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMenuItemClick: (item: string) => void;
}

const recentActivities = [
  {
    id: 1,
    type: 'received',
    skill: 'Web Development Tutoring',
    user: 'Maria Santos',
    credits: 2,
    date: '2 hours ago',
    icon: '💻'
  },
  {
    id: 2,
    type: 'given',
    skill: 'Guitar Lessons',
    user: 'Juan dela Cruz',
    credits: 1,
    date: 'Yesterday',
    icon: '🎸'
  },
  {
    id: 3,
    type: 'received',
    skill: 'Filipino Language',
    user: 'Ana Reyes',
    credits: 1,
    date: '2 days ago',
    icon: '📚'
  },
  {
    id: 4,
    type: 'given',
    skill: 'Home Repair',
    user: 'Carlos Mendoza',
    credits: 2,
    date: '3 days ago',
    icon: '🔧'
  }
];

const creditSummary = {
  earned: 24,
  spent: 18,
  balance: 42,
  thisMonth: {
    earned: 8,
    spent: 5
  }
};

export function MenuDrawer({ open, onOpenChange, onMenuItemClick }: MenuDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-[400px] bg-white p-0" aria-describedby="menu-description">
        <SheetHeader className="sr-only">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <p id="menu-description" className="sr-only">
          Access your profile, activity, credits, and app settings
        </p>
        <ScrollArea className="h-full">
          <div className="p-6">
            {/* User Profile Section */}
            <div className="flex items-center gap-3 mb-6">
              <Avatar className="w-16 h-16 border-2 border-[#FEB21A]">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" />
                <AvatarFallback className="bg-[#134686] text-white">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-lg text-[#134686]">John Doe</h3>
                <p className="text-sm text-[#134686]/60">Level 5 Swapper</p>
                <Badge className="mt-1 bg-[#FEB21A] text-[#134686] hover:bg-[#FEB21A]">
                  42 Credits
                </Badge>
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Credit Summary */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Wallet className="w-5 h-5 text-[#134686]" />
                <h3 className="text-lg text-[#134686]">Credit Summary</h3>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 rounded-lg border border-green-200">
                  <p className="text-xs text-green-700 mb-1">Earned</p>
                  <p className="text-xl text-green-700">{creditSummary.earned}</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 rounded-lg border border-red-200">
                  <p className="text-xs text-red-700 mb-1">Spent</p>
                  <p className="text-xl text-red-700">{creditSummary.spent}</p>
                </div>
                <div className="bg-gradient-to-br from-[#FEB21A]/20 to-[#FEB21A]/40 p-3 rounded-lg border border-[#FEB21A]">
                  <p className="text-xs text-[#134686] mb-1">Balance</p>
                  <p className="text-xl text-[#134686]">{creditSummary.balance}</p>
                </div>
              </div>

              <div className="p-3 bg-[#FDF4E3] rounded-lg">
                <p className="text-xs text-[#134686]/60 mb-2">This Month</p>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">+{creditSummary.thisMonth.earned} earned</span>
                  <span className="text-red-600">-{creditSummary.thisMonth.spent} spent</span>
                </div>
              </div>
            </div>

            <Separator className="mb-6" />

            {/* Menu Items */}
            <div className="space-y-2 mb-6">
              <MenuButton 
                icon={<Activity className="w-5 h-5" />} 
                label="Recent Activity" 
                onClick={() => {
                  onMenuItemClick('activity');
                  onOpenChange(false);
                }}
              />
              <MenuButton 
                icon={<Briefcase className="w-5 h-5" />} 
                label="My Skills" 
                badge="3"
                onClick={() => {
                  onMenuItemClick('skills');
                  onOpenChange(false);
                }}
              />
              <MenuButton 
                icon={<Calendar className="w-5 h-5" />} 
                label="My Schedule" 
                badge="2"
                onClick={() => {
                  onMenuItemClick('schedule');
                  onOpenChange(false);
                }}
              />
              <MenuButton 
                icon={<Bell className="w-5 h-5" />} 
                label="Notifications" 
                badge="5"
                onClick={() => {
                  onMenuItemClick('notifications');
                  onOpenChange(false);
                }}
              />
              <MenuButton 
                icon={<BookOpen className="w-5 h-5" />} 
                label="Community Guidelines"
                onClick={() => {
                  onMenuItemClick('guidelines');
                  onOpenChange(false);
                }}
              />
              <MenuButton 
                icon={<Shield className="w-5 h-5" />} 
                label="Safety & Privacy"
                onClick={() => {
                  onMenuItemClick('safety');
                  onOpenChange(false);
                }}
              />
              <MenuButton 
                icon={<HelpCircle className="w-5 h-5" />} 
                label="Help & Support"
                onClick={() => {
                  onMenuItemClick('help');
                  onOpenChange(false);
                }}
              />
              <MenuButton 
                icon={<Settings className="w-5 h-5" />} 
                label="Settings"
                onClick={() => {
                  onMenuItemClick('settings');
                  onOpenChange(false);
                }}
              />
            </div>

            {/* App Info */}
            <div className="p-3 bg-[#134686]/5 rounded-lg text-center">
              <p className="text-xs text-[#134686]/60">SkillSwap v1.0.0</p>
              <p className="text-xs text-[#134686]/60 mt-1">
                Building stronger communities through skill exchange
              </p>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  onClick?: () => void;
}

function MenuButton({ icon, label, badge, onClick }: MenuButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 hover:bg-[#FDF4E3] rounded-lg transition-colors group"
    >
      <div className="text-[#134686] group-hover:text-[#0f3666]">{icon}</div>
      <span className="flex-1 text-left text-[#134686] group-hover:text-[#0f3666]">{label}</span>
      {badge && (
        <Badge className="bg-[#ED3F27] text-white hover:bg-[#ED3F27]">
          {badge}
        </Badge>
      )}
      <ChevronRight className="w-4 h-4 text-[#134686]/40 group-hover:text-[#134686]" />
    </button>
  );
}
