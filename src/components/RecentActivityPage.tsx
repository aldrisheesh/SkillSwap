import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ArrowLeft, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface RecentActivityPageProps {
  onBack: () => void;
}

const activities = [
  {
    id: 1,
    type: 'received',
    skill: 'Web Development Tutoring',
    user: 'Maria Santos',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    credits: 2,
    date: '2 hours ago',
    fullDate: 'Oct 14, 2025',
    icon: '💻'
  },
  {
    id: 2,
    type: 'given',
    skill: 'Guitar Lessons',
    user: 'Juan dela Cruz',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan',
    credits: 1,
    date: 'Yesterday',
    fullDate: 'Oct 13, 2025',
    icon: '🎸'
  },
  {
    id: 3,
    type: 'received',
    skill: 'Filipino Language',
    user: 'Ana Reyes',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    credits: 1,
    date: '2 days ago',
    fullDate: 'Oct 12, 2025',
    icon: '📚'
  },
  {
    id: 4,
    type: 'given',
    skill: 'Home Repair',
    user: 'Carlos Mendoza',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
    credits: 2,
    date: '3 days ago',
    fullDate: 'Oct 11, 2025',
    icon: '🔧'
  },
  {
    id: 5,
    type: 'received',
    skill: 'Graphic Design Tips',
    user: 'Lucia Torres',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucia',
    credits: 1,
    date: '5 days ago',
    fullDate: 'Oct 9, 2025',
    icon: '🎨'
  },
  {
    id: 6,
    type: 'given',
    skill: 'Photography Basics',
    user: 'Diego Ramos',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=diego',
    credits: 1,
    date: '1 week ago',
    fullDate: 'Oct 7, 2025',
    icon: '📸'
  }
];

export function RecentActivityPage({ onBack }: RecentActivityPageProps) {
  const receivedActivities = activities.filter(a => a.type === 'received');
  const givenActivities = activities.filter(a => a.type === 'given');

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
          <h2 className="text-2xl">Recent Activity</h2>
        </div>
        <p className="text-sm opacity-80 ml-14">Your skill exchange history</p>
      </div>

      {/* Content */}
      <Tabs defaultValue="all" className="flex-1 flex flex-col">
        <div className="bg-white border-b-2 border-[#134686]/10 px-4">
          <TabsList className="w-full grid grid-cols-3 bg-transparent h-12">
            <TabsTrigger value="all" className="data-[state=active]:bg-[#FDF4E3] data-[state=active]:text-[#134686]">
              All ({activities.length})
            </TabsTrigger>
            <TabsTrigger value="received" className="data-[state=active]:bg-[#FDF4E3] data-[state=active]:text-[#134686]">
              Received ({receivedActivities.length})
            </TabsTrigger>
            <TabsTrigger value="given" className="data-[state=active]:bg-[#FDF4E3] data-[state=active]:text-[#134686]">
              Given ({givenActivities.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="received" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {receivedActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="given" className="flex-1 mt-0">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-3">
              {givenActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ActivityCard({ activity }: { activity: typeof activities[0] }) {
  return (
    <div className="bg-white rounded-xl p-4 border-2 border-[#134686]/10 hover:border-[#FEB21A] transition-colors">
      <div className="flex items-start gap-3">
        <div className="text-3xl">{activity.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-[#134686]">{activity.skill}</h3>
            <Badge className={`shrink-0 ${
              activity.type === 'given' 
                ? 'bg-[#ED3F27] text-white hover:bg-[#ED3F27]' 
                : 'bg-green-600 text-white hover:bg-green-600'
            }`}>
              {activity.type === 'given' ? (
                <TrendingDown className="w-3 h-3 mr-1" />
              ) : (
                <TrendingUp className="w-3 h-3 mr-1" />
              )}
              {activity.credits} credit{activity.credits > 1 ? 's' : ''}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <Avatar className="w-8 h-8 border-2 border-[#FEB21A]">
              <AvatarImage src={activity.userAvatar} />
              <AvatarFallback>{activity.user[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm text-[#134686]">
                {activity.type === 'given' ? 'Gave to' : 'Received from'} <span className="font-semibold">{activity.user}</span>
              </p>
              <p className="text-xs text-[#134686]/60">{activity.fullDate} • {activity.date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
