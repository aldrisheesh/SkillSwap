import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Users, MapPin, Activity, Calendar, Award, ExternalLink } from 'lucide-react';

interface Circle {
  id: number;
  name: string;
  category: string;
  description: string;
  memberCount: number;
  activeMembers: number;
  location: string;
  organizer: string;
  organizerAvatar: string;
  isVerified: boolean;
  recentActivity: string;
  tags: string[];
  members: Array<{
    name: string;
    avatar: string;
    role?: string;
  }>;
}

interface CircleDetailSheetProps {
  circle: Circle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isJoined: boolean;
  onJoin: () => void;
  onLeave: () => void;
}

export function CircleDetailSheet({ circle, open, onOpenChange, isJoined, onJoin, onLeave }: CircleDetailSheetProps) {
  if (!circle) return null;

  const recentExchanges = [
    { user: 'Maria Santos', skill: 'React Tutorial', time: '2 hours ago', credits: 2 },
    { user: 'Juan dela Cruz', skill: 'Guitar Lesson', time: '5 hours ago', credits: 1 },
    { user: 'Ana Reyes', skill: 'Filipino Practice', time: '1 day ago', credits: 1 },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] bg-white border-t-4 border-[#134686] rounded-t-3xl" aria-describedby="circle-description">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-2xl text-[#134686] flex items-center gap-2">
            {circle.name}
            {circle.isVerified && (
              <div className="w-5 h-5 bg-[#134686] rounded-full flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </SheetTitle>
        </SheetHeader>
        <p id="circle-description" className="sr-only">
          View details about {circle.name} community circle
        </p>

        <ScrollArea className="h-[calc(85vh-140px)] pr-4">
          <div className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-[#134686] to-[#0f3666] text-white rounded-xl p-3 text-center">
                <Users className="w-5 h-5 mx-auto mb-1" />
                <p className="text-2xl mb-1">{circle.memberCount}</p>
                <p className="text-xs opacity-80">Members</p>
              </div>
              <div className="bg-gradient-to-br from-[#FEB21A] to-[#e5a119] text-[#134686] rounded-xl p-3 text-center">
                <Activity className="w-5 h-5 mx-auto mb-1" />
                <p className="text-2xl mb-1">{circle.activeMembers}</p>
                <p className="text-xs opacity-80">Active</p>
              </div>
              <div className="bg-gradient-to-br from-[#FDF4E3] to-white text-[#134686] rounded-xl p-3 text-center border-2 border-[#134686]/10">
                <Calendar className="w-5 h-5 mx-auto mb-1" />
                <p className="text-2xl mb-1">23</p>
                <p className="text-xs opacity-80">This Week</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#FDF4E3] rounded-xl p-4 border-2 border-[#134686]/10">
              <h3 className="text-[#134686] mb-2">About this Circle</h3>
              <p className="text-sm text-[#134686]/80 mb-3">{circle.description}</p>
              
              <div className="flex items-center gap-2 text-sm text-[#134686]/70 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{circle.location}</span>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="bg-white text-[#134686] border border-[#134686]/20">
                  {circle.category}
                </Badge>
                {circle.tags.map((tag) => (
                  <Badge key={tag} className="bg-white text-[#134686] border border-[#134686]/20">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Organizer */}
            <div className="bg-white rounded-xl p-4 border-2 border-[#134686]/10">
              <h3 className="text-[#134686] mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Circle Organizer
              </h3>
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-[#FEB21A]">
                  <AvatarImage src={circle.organizerAvatar} />
                  <AvatarFallback>{circle.organizer[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-[#134686]">{circle.organizer}</p>
                  <p className="text-sm text-[#134686]/60">Community Leader</p>
                </div>
                <Button size="sm" variant="outline" className="border-[#134686] text-[#134686]">
                  Message
                </Button>
              </div>
            </div>

            {/* Members Preview */}
            <div className="bg-white rounded-xl p-4 border-2 border-[#134686]/10">
              <h3 className="text-[#134686] mb-3">Active Members</h3>
              <div className="space-y-2 mb-3">
                {circle.members.map((member, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <Avatar className="w-8 h-8 border-2 border-[#FEB21A]">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#134686]">{member.name}</p>
                      {member.role && (
                        <p className="text-xs text-[#134686]/60">{member.role}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full text-[#134686] hover:bg-[#FDF4E3]">
                View All {circle.memberCount} Members
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-4 border-2 border-[#134686]/10">
              <h3 className="text-[#134686] mb-3">Recent Exchanges</h3>
              <div className="space-y-3">
                {recentExchanges.map((exchange, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-[#134686]/10 last:border-0">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#134686]">{exchange.user}</p>
                      <p className="text-xs text-[#134686]/60">{exchange.skill}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-[#FEB21A]">{exchange.credits} credits</p>
                      <p className="text-xs text-[#134686]/60">{exchange.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            {!isJoined && (
              <div className="bg-gradient-to-br from-[#FDF4E3] to-white rounded-xl p-4 border-2 border-[#FEB21A]/30">
                <h3 className="text-[#134686] mb-2">🤝 Join to unlock:</h3>
                <ul className="text-sm text-[#134686]/80 space-y-1.5 ml-4 list-disc">
                  <li>Access to themed skill exchange events</li>
                  <li>Priority matching with circle members</li>
                  <li>Micro-mentorship opportunities</li>
                  <li>Community impact celebrations</li>
                  <li>Verified skill portfolio building</li>
                </ul>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Action Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t-2 border-[#134686]/10">
          {isJoined ? (
            <div className="flex gap-2">
              <Button
                onClick={onLeave}
                variant="outline"
                className="flex-1 border-2 border-[#134686] text-[#134686] hover:bg-[#FDF4E3]"
              >
                Leave Circle
              </Button>
              <Button className="flex-1 bg-[#134686] text-white hover:bg-[#0f3666]">
                View Circle Feed
              </Button>
            </div>
          ) : (
            <Button
              onClick={onJoin}
              className="w-full bg-[#134686] text-white hover:bg-[#0f3666]"
            >
              Join Circle
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
