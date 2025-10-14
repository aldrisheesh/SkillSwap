import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge as BadgeUI } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Edit, Share2, Award, TrendingUp, Users, Clock, ChevronRight } from 'lucide-react';
import { Badge, Exchange } from '../types';

const userBadges: Badge[] = [
  { id: 1, name: 'First Swap', description: 'Complete your first skill exchange', icon: '🎯', earned: true, earnedDate: '2024-10-01' },
  { id: 2, name: 'Trusted Helper', description: 'Earn 5-star rating 10 times', icon: '⭐', earned: true, earnedDate: '2024-10-05' },
  { id: 3, name: 'Community Builder', description: 'Connect with 25 people', icon: '🤝', earned: true, earnedDate: '2024-10-10' },
  { id: 4, name: 'Time Banker', description: 'Accumulate 50 time credits', icon: '💰', earned: true, earnedDate: '2024-10-12' },
  { id: 5, name: 'Generous Giver', description: 'Give 100 hours of service', icon: '💝', earned: false, progress: 24, total: 100 },
  { id: 6, name: 'Master Mentor', description: 'Mentor 20 different people', icon: '🎓', earned: false, progress: 12, total: 20 },
  { id: 7, name: 'Local Legend', description: 'Complete 200 exchanges', icon: '🏆', earned: false, progress: 18, total: 200 }
];

const recentExchanges: Exchange[] = [
  { id: 1, userName: 'Maria Santos', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria', skill: 'Web Development Tutoring', date: '2024-10-12', credits: 2, type: 'received' },
  { id: 2, userName: 'Juan dela Cruz', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan', skill: 'Guitar Lessons', date: '2024-10-10', credits: 1, type: 'given' },
  { id: 3, userName: 'Ana Reyes', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana', skill: 'Filipino Language', date: '2024-10-08', credits: 1, type: 'received' },
  { id: 4, userName: 'Carlos Mendoza', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos', skill: 'Bicycle Repair', date: '2024-10-05', credits: 1, type: 'given' },
  { id: 5, userName: 'Lucia Torres', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucia', skill: 'Graphic Design', date: '2024-10-03', credits: 2, type: 'received' },
  { id: 6, userName: 'Diego Ramos', userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=diego', skill: 'Photography Tips', date: '2024-09-28', credits: 1, type: 'given' }
];

export function ProfilePage() {
  return (
    <ScrollArea className="h-full bg-[#FDF4E3] w-full">
      <div className="w-full max-w-lg mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-[#134686] to-[#0f3666] text-white p-4 sm:p-6 rounded-b-3xl -mx-4">
          <div className="flex items-start gap-2 sm:gap-4 mb-4">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-3 sm:border-4 border-[#FEB21A] flex-shrink-0">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" />
              <AvatarFallback className="bg-[#134686] text-white">JD</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl mb-1">John Doe</h2>
              <p className="text-xs sm:text-sm opacity-90 mb-2">🤝 Bayanihan Member</p>
              <div className="flex items-center gap-2 flex-wrap">
                <BadgeUI className="bg-[#FEB21A] text-[#134686] hover:bg-[#FEB21A] text-xs whitespace-nowrap">
                  ⏱️ 6 Time Credits
                </BadgeUI>
                <BadgeUI variant="outline" className="border-white text-white hover:bg-white/10 text-xs whitespace-nowrap">
                  🏆 7 Badges
                </BadgeUI>
              </div>
            </div>
            
            <div className="flex gap-1 sm:gap-2 flex-shrink-0">
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10">
                <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button size="icon" variant="ghost" className="text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10">
                <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>

          {/* Level Progress */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Level 5</span>
              <span>380/500 XP</span>
            </div>
            <Progress value={76} className="h-2 bg-white/20" />
          </div>
        </div>

        {/* Time Banking Stats */}
        <div className="py-4 space-y-3">
          {/* Main Time Credits Card */}
          <div className="bg-white rounded-xl p-3 sm:p-4 border-2 border-[#FEB21A]/50 shadow-sm">
            <h3 className="text-xs sm:text-sm text-[#134686]/70 mb-3">⏱️ Time Banking Activity</h3>
            <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
              <div>
                <p className="text-xl sm:text-2xl text-[#134686]">24</p>
                <p className="text-[10px] sm:text-xs text-[#134686]/70">Earned</p>
              </div>
              <div className="border-l-2 border-r-2 border-[#134686]/10">
                <p className="text-xl sm:text-2xl text-[#FEB21A]">18</p>
                <p className="text-[10px] sm:text-xs text-[#134686]/70">Spent</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl text-[#134686]">6</p>
                <p className="text-[10px] sm:text-xs text-[#134686]/70">Balance</p>
              </div>
            </div>
          </div>

          {/* Community Impact */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div className="bg-white rounded-xl p-3 sm:p-4 border-2 border-[#134686]/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#FEB21A] rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#134686]" />
                </div>
                <span className="text-[10px] sm:text-xs text-[#134686]/70">Neighbors</span>
              </div>
              <p className="text-xl sm:text-2xl text-[#134686]">42</p>
            </div>

            <div className="bg-white rounded-xl p-3 sm:p-4 border-2 border-[#134686]/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#FEB21A] rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#134686]" />
                </div>
                <span className="text-[10px] sm:text-xs text-[#134686]/70">Badges</span>
              </div>
              <p className="text-xl sm:text-2xl text-[#134686]">7</p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl border-2 border-[#134686]/10 overflow-hidden mb-20">
          <Tabs defaultValue="badges" className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-[#FDF4E3] rounded-none">
              <TabsTrigger value="badges" className="data-[state=active]:bg-white">
                Badges
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-white">
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="badges" className="p-3 sm:p-4 space-y-3">
              {userBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border-2 ${
                    badge.earned
                      ? 'bg-gradient-to-r from-[#FDF4E3] to-white border-[#FEB21A]'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className={`text-2xl sm:text-3xl flex-shrink-0 ${!badge.earned && 'grayscale opacity-50'}`}>
                    {badge.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm sm:text-base font-semibold ${badge.earned ? 'text-[#134686]' : 'text-gray-400'}`}>
                      {badge.name}
                    </h4>
                    <p className={`text-xs sm:text-sm ${badge.earned ? 'text-[#134686]/70' : 'text-gray-400'}`}>
                      {badge.description}
                    </p>
                    {badge.earned && badge.earnedDate && (
                      <p className="text-[10px] sm:text-xs text-[#FEB21A] mt-1">
                        Earned on {new Date(badge.earnedDate).toLocaleDateString()}
                      </p>
                    )}
                    {!badge.earned && badge.progress !== undefined && (
                      <div className="mt-2">
                        <Progress value={(badge.progress / badge.total!) * 100} className="h-1.5" />
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-1">
                          {badge.progress}/{badge.total}
                        </p>
                      </div>
                    )}
                  </div>
                  {badge.earned && (
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-[#134686] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="history" className="p-3 sm:p-4 space-y-2">
              {recentExchanges.map((exchange) => (
                <div
                  key={exchange.id}
                  className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg border-2 border-[#134686]/10 hover:border-[#FEB21A] transition-colors cursor-pointer"
                >
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-[#FEB21A] flex-shrink-0">
                    <AvatarImage src={exchange.userAvatar} />
                    <AvatarFallback>{exchange.userName[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="text-sm sm:text-base font-semibold text-[#134686] truncate">{exchange.userName}</p>
                      <BadgeUI
                        className={`text-[10px] sm:text-xs whitespace-nowrap ${
                          exchange.type === 'given'
                            ? 'bg-[#ED3F27] text-white hover:bg-[#ED3F27]'
                            : 'bg-[#134686] text-white hover:bg-[#134686]'
                        }`}
                      >
                        {exchange.type === 'given' ? 'Given' : 'Received'}
                      </BadgeUI>
                    </div>
                    <p className="text-xs sm:text-sm text-[#134686]/70 truncate">{exchange.skill}</p>
                    <p className="text-[10px] sm:text-xs text-[#134686]/50">
                      {new Date(exchange.date).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <div className="flex items-center gap-1 bg-[#FEB21A] text-[#134686] px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs whitespace-nowrap">
                      {exchange.credits} credit{exchange.credits > 1 ? 's' : ''}
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#134686]/40" />
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ScrollArea>
  );
}
