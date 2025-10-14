import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ArrowLeft, MessageCircle, Calendar, Award, UserPlus, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface NotificationsPageProps {
  onBack: () => void;
}

const notifications = [
  {
    id: 1,
    type: 'message',
    title: 'New message from Maria Santos',
    description: 'Great! See you tomorrow at 2 PM',
    time: '5 mins ago',
    read: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    icon: MessageCircle
  },
  {
    id: 2,
    type: 'booking',
    title: 'Booking confirmed',
    description: 'Juan dela Cruz accepted your guitar lesson request',
    time: '2 hours ago',
    read: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan',
    icon: Calendar
  },
  {
    id: 3,
    type: 'achievement',
    title: 'Achievement unlocked!',
    description: 'You earned the "First Swap" badge',
    time: '1 day ago',
    read: true,
    icon: Award
  },
  {
    id: 4,
    type: 'review',
    title: 'New review',
    description: 'Ana Reyes gave you a 5-star rating',
    time: '2 days ago',
    read: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    icon: Star
  },
  {
    id: 5,
    type: 'connection',
    title: 'New connection',
    description: 'Carlos Mendoza wants to connect with you',
    time: '3 days ago',
    read: true,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
    icon: UserPlus
  }
];

export function NotificationsPage({ onBack }: NotificationsPageProps) {
  const unreadNotifications = notifications.filter(n => !n.read);
  const readNotifications = notifications.filter(n => n.read);

  return (
    <div className="h-full flex flex-col bg-[#FDF4E3]">
      {/* Header */}
      <div className="bg-[#134686] text-white p-4">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl">Notifications</h2>
        </div>
        <p className="text-sm opacity-80 ml-14">{unreadNotifications.length} unread notifications</p>
      </div>

      {/* Content */}
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <div className="bg-white border-b-2 border-[#134686]/10 px-4">
          <TabsList className="w-full grid grid-cols-2 bg-transparent h-12">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#FDF4E3] data-[state=active]:text-[#134686]">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=active]:bg-[#FDF4E3] data-[state=active]:text-[#134686]">
              Unread ({unreadNotifications.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {notifications.map((notification) => (
                <NotificationCard key={notification.id} notification={notification} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="unread" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-2">
              {unreadNotifications.length > 0 ? (
                unreadNotifications.map((notification) => (
                  <NotificationCard key={notification.id} notification={notification} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-[#134686]/60">No unread notifications</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function NotificationCard({ notification }: { notification: typeof notifications[0] }) {
  const Icon = notification.icon;

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-colors cursor-pointer ${
        notification.read
          ? 'bg-white border-[#134686]/10 hover:border-[#FEB21A]'
          : 'bg-[#FDF4E3] border-[#FEB21A] hover:border-[#FEB21A]'
      }`}
    >
      {notification.avatar ? (
        <Avatar className="w-12 h-12 border-2 border-[#FEB21A]">
          <AvatarImage src={notification.avatar} />
          <AvatarFallback>{notification.title[0]}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="w-12 h-12 bg-[#134686] rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
      )}
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="text-[#134686]">{notification.title}</h4>
          {!notification.read && (
            <div className="w-2 h-2 bg-[#ED3F27] rounded-full shrink-0 mt-1.5" />
          )}
        </div>
        <p className="text-sm text-[#134686]/70 mb-1">{notification.description}</p>
        <p className="text-xs text-[#134686]/50">{notification.time}</p>
      </div>
    </div>
  );
}
