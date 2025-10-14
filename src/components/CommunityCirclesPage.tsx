import { useState } from 'react';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Users, Search, Plus, TrendingUp, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { CreateCircleDialog } from './CreateCircleDialog';
import { CircleDetailSheet } from './CircleDetailSheet';

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
  isTrending: boolean;
  recentActivity: string;
  tags: string[];
  members: Array<{
    name: string;
    avatar: string;
    role?: string;
  }>;
}

const communityCircles: Circle[] = [
  {
    id: 1,
    name: 'PUP Tech Mentors',
    category: 'Technology',
    description: 'STEM tutoring and tech skills exchange for PUP students. Learn web dev, mobile apps, data science, and more from your fellow students.',
    memberCount: 124,
    activeMembers: 45,
    location: 'PUP Manila Campus',
    organizer: 'Maria Santos',
    organizerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    isVerified: true,
    isTrending: true,
    recentActivity: '23 exchanges this week',
    tags: ['Coding', 'Web Dev', 'Mobile', 'STEM'],
    members: [
      { name: 'Maria Santos', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria', role: 'Organizer' },
      { name: 'Juan dela Cruz', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan' },
      { name: 'Ana Reyes', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana' },
    ]
  },
  {
    id: 2,
    name: 'Sta. Mesa Creative Hub',
    category: 'Creative',
    description: 'Artists, designers, and content creators helping each other grow. Graphic design, photography, video editing, and traditional arts.',
    memberCount: 87,
    activeMembers: 32,
    location: 'Sta. Mesa, Manila',
    organizer: 'Lucia Torres',
    organizerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucia',
    isVerified: true,
    isTrending: true,
    recentActivity: '18 exchanges this week',
    tags: ['Design', 'Art', 'Photography', 'Video'],
    members: [
      { name: 'Lucia Torres', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucia', role: 'Organizer' },
      { name: 'Diego Ramos', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=diego' },
    ]
  },
  {
    id: 3,
    name: 'Barangay 123 Home Helpers',
    category: 'Home Services',
    description: 'Neighborhood circle for home repairs, gardening, and household assistance. Verified by Barangay Hall.',
    memberCount: 56,
    activeMembers: 28,
    location: 'Brgy. 123, Sta. Mesa',
    organizer: 'Carlos Mendoza',
    organizerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
    isVerified: true,
    isTrending: false,
    recentActivity: '12 exchanges this week',
    tags: ['Repairs', 'Gardening', 'Carpentry', 'Electrical'],
    members: [
      { name: 'Carlos Mendoza', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos', role: 'Organizer' },
    ]
  },
  {
    id: 4,
    name: 'Language Exchange Manila',
    category: 'Language',
    description: 'Practice Filipino, English, Spanish, and other languages through conversation exchanges and cultural sharing.',
    memberCount: 93,
    activeMembers: 41,
    location: 'Metro Manila (Virtual)',
    organizer: 'Ana Reyes',
    organizerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    isVerified: true,
    isTrending: true,
    recentActivity: '31 exchanges this week',
    tags: ['Filipino', 'English', 'Spanish', 'Conversation'],
    members: [
      { name: 'Ana Reyes', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana', role: 'Organizer' },
    ]
  },
  {
    id: 5,
    name: 'Music & Arts Collective',
    category: 'Music & Arts',
    description: 'Musicians teaching instruments, vocal coaching, and music theory. From traditional Filipino music to modern genres.',
    memberCount: 67,
    activeMembers: 24,
    location: 'PUP Area',
    organizer: 'Juan dela Cruz',
    organizerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan',
    isVerified: false,
    isTrending: false,
    recentActivity: '9 exchanges this week',
    tags: ['Guitar', 'Piano', 'Vocals', 'Theory'],
    members: [
      { name: 'Juan dela Cruz', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan', role: 'Organizer' },
    ]
  },
  {
    id: 6,
    name: 'Student Tutors Network',
    category: 'Education',
    description: 'Academic peer tutoring for all subjects. Math, science, Filipino, English, and test preparation support.',
    memberCount: 145,
    activeMembers: 67,
    location: 'PUP Manila',
    organizer: 'Maria Santos',
    organizerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    isVerified: true,
    isTrending: true,
    recentActivity: '42 exchanges this week',
    tags: ['Tutoring', 'Math', 'Science', 'Academic'],
    members: [
      { name: 'Maria Santos', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria', role: 'Organizer' },
    ]
  }
];

export function CommunityCirclesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedCircle, setSelectedCircle] = useState<Circle | null>(null);
  const [showCircleDetail, setShowCircleDetail] = useState(false);
  const [joinedCircles, setJoinedCircles] = useState<number[]>([1, 2]); // User has joined circles 1 and 2

  const filteredCircles = communityCircles.filter(circle =>
    circle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    circle.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    circle.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    circle.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const trendingCircles = filteredCircles.filter(c => c.isTrending);
  const myCircles = filteredCircles.filter(c => joinedCircles.includes(c.id));
  const otherCircles = filteredCircles.filter(c => !joinedCircles.includes(c.id));

  const handleCircleClick = (circle: Circle) => {
    setSelectedCircle(circle);
    setShowCircleDetail(true);
  };

  const handleJoinCircle = (circleId: number) => {
    setJoinedCircles(prev => [...prev, circleId]);
  };

  const handleLeaveCircle = (circleId: number) => {
    setJoinedCircles(prev => prev.filter(id => id !== circleId));
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      'Technology': '💻',
      'Creative': '🎨',
      'Home Services': '🔧',
      'Language': '🗣️',
      'Music & Arts': '🎵',
      'Education': '📚'
    };
    return icons[category] || '🌟';
  };

  return (
    <div className="h-full flex flex-col bg-[#FDF4E3] overflow-hidden">
      {/* Header - Fixed */}
      <div className="bg-gradient-to-br from-[#134686] to-[#0f3666] text-white p-6 pb-8 flex-shrink-0 relative z-10">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl mb-1">🤝 Community Circles</h1>
              <p className="text-sm opacity-90">Join themed skill exchange hubs</p>
            </div>
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="bg-[#FEB21A] text-[#134686] hover:bg-[#e5a119]"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#134686]/50" />
            <Input
              placeholder="Search circles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-2 border-white/20 focus:border-[#FEB21A] text-[#134686]"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="max-w-lg mx-auto px-4 pt-2 pb-4 space-y-6">
          {/* My Circles */}
          {myCircles.length > 0 && (
            <div className="bg-white rounded-2xl p-4 border-2 border-[#FEB21A]/30 shadow-sm">
              <h3 className="text-[#134686] mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FEB21A]" />
                My Circles ({myCircles.length})
              </h3>
              <div className="space-y-2">
                {myCircles.map(circle => (
                  <CircleCard
                    key={circle.id}
                    circle={circle}
                    isJoined={true}
                    onCircleClick={handleCircleClick}
                    onLeave={handleLeaveCircle}
                    getCategoryIcon={getCategoryIcon}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Trending Circles */}
          {trendingCircles.length > 0 && (
            <div>
              <h3 className="text-[#134686] mb-3 flex items-center gap-2 px-2">
                <TrendingUp className="w-5 h-5 text-[#ED3F27]" />
                Trending Circles
              </h3>
              <div className="space-y-3">
                {trendingCircles.filter(c => !joinedCircles.includes(c.id)).map(circle => (
                  <CircleCard
                    key={circle.id}
                    circle={circle}
                    isJoined={false}
                    onCircleClick={handleCircleClick}
                    onJoin={handleJoinCircle}
                    getCategoryIcon={getCategoryIcon}
                  />
                ))}
              </div>
            </div>
          )}

          {/* All Circles */}
          {otherCircles.length > 0 && (
            <div>
              <h3 className="text-[#134686] mb-3 px-2">
                Discover Circles
              </h3>
              <div className="space-y-3">
                {otherCircles.filter(c => !c.isTrending).map(circle => (
                  <CircleCard
                    key={circle.id}
                    circle={circle}
                    isJoined={false}
                    onCircleClick={handleCircleClick}
                    onJoin={handleJoinCircle}
                    getCategoryIcon={getCategoryIcon}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredCircles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#134686]/60 mb-2">No circles found</p>
              <p className="text-sm text-[#134686]/40">Try a different search term</p>
            </div>
          )}

          {/* Info Card */}
          <div className="bg-gradient-to-br from-[#FDF4E3] to-white rounded-xl p-5 border-2 border-[#134686]/10">
            <h3 className="text-[#134686] mb-2 flex items-center gap-2">
              💡 About Community Circles
            </h3>
            <p className="text-sm text-[#134686]/80 mb-3">
              Community Circles are themed skill exchange hubs verified by barangay halls, campus organizations, or allied institutions. Join circles to connect with neighbors sharing similar interests.
            </p>
            <ul className="text-xs text-[#134686]/70 space-y-1 ml-4 list-disc">
              <li>Spotlight specific skill needs in your area</li>
              <li>Celebrate community impact together</li>
              <li>Access micro-mentorship opportunities</li>
              <li>Build stronger neighborhood bonds</li>
            </ul>
          </div>
        </div>
      </ScrollArea>

      {/* Dialogs */}
      <CreateCircleDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        onCircleCreated={() => {
          // Handle circle creation
          setShowCreateDialog(false);
        }}
      />

      <CircleDetailSheet
        circle={selectedCircle}
        open={showCircleDetail}
        onOpenChange={setShowCircleDetail}
        isJoined={selectedCircle ? joinedCircles.includes(selectedCircle.id) : false}
        onJoin={() => selectedCircle && handleJoinCircle(selectedCircle.id)}
        onLeave={() => selectedCircle && handleLeaveCircle(selectedCircle.id)}
      />
    </div>
  );
}

interface CircleCardProps {
  circle: Circle;
  isJoined: boolean;
  onCircleClick: (circle: Circle) => void;
  onJoin?: (id: number) => void;
  onLeave?: (id: number) => void;
  getCategoryIcon: (category: string) => string;
}

function CircleCard({ circle, isJoined, onCircleClick, onJoin, onLeave, getCategoryIcon }: CircleCardProps) {
  return (
    <div
      className="bg-white rounded-xl p-4 border-2 border-[#134686]/10 hover:border-[#FEB21A] transition-all shadow-sm hover:shadow-md cursor-pointer"
    >
      <div onClick={() => onCircleClick(circle)}>
        <div className="flex items-start gap-3 mb-3">
          <div className="text-3xl">{getCategoryIcon(circle.category)}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-[#134686] truncate">{circle.name}</h4>
              {circle.isVerified && (
                <div className="w-4 h-4 bg-[#134686] rounded-full flex items-center justify-center shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              {circle.isTrending && (
                <Badge className="bg-[#ED3F27] text-white text-xs px-1.5 py-0">
                  🔥
                </Badge>
              )}
            </div>
            <p className="text-sm text-[#134686]/70 line-clamp-2 mb-2">{circle.description}</p>
            <div className="flex items-center gap-3 text-xs text-[#134686]/60 mb-2">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{circle.memberCount} members</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{circle.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge className="bg-[#FDF4E3] text-[#134686] text-xs border border-[#134686]/20">
                {circle.category}
              </Badge>
              <span className="text-xs text-[#134686]/50">{circle.recentActivity}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-[#134686]/10">
        <div className="flex -space-x-2 flex-1">
          {circle.members.slice(0, 3).map((member, idx) => (
            <Avatar key={idx} className="w-6 h-6 border-2 border-white">
              <AvatarImage src={member.avatar} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
          ))}
          {circle.activeMembers > 3 && (
            <div className="w-6 h-6 rounded-full bg-[#134686] text-white text-xs flex items-center justify-center border-2 border-white">
              +{circle.activeMembers - 3}
            </div>
          )}
        </div>
        {isJoined ? (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onLeave?.(circle.id);
            }}
            variant="outline"
            size="sm"
            className="border-[#134686] text-[#134686] hover:bg-[#FDF4E3]"
          >
            Joined
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onJoin?.(circle.id);
            }}
            size="sm"
            className="bg-[#134686] text-white hover:bg-[#0f3666]"
          >
            Join
          </Button>
        )}
      </div>
    </div>
  );
}
