import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNavigation } from './components/BottomNavigation';
import { MapView } from './components/MapView';
import { SkillsListSheet } from './components/SkillsListSheet';
import { SkillDetailModal } from './components/SkillDetailModal';
import { FilterSheet } from './components/FilterSheet';
import { ProfilePage } from './components/ProfilePage';
import { MessagesPage } from './components/MessagesPage';
import { RequestServiceDialog } from './components/RequestServiceDialog';
import { AchievementNotification } from './components/AchievementNotification';
import { MenuDrawer } from './components/MenuDrawer';
import { AddSkillDialog } from './components/AddSkillDialog';
import { RecentActivityPage } from './components/RecentActivityPage';
import { MySkillsPage } from './components/MySkillsPage';
import { NotificationsPage } from './components/NotificationsPage';
import { SettingsPage } from './components/SettingsPage';
import { InfoPage, communityGuidelinesContent, aboutContent, safetyContent, helpContent } from './components/InfoPage';
import { CommunityCirclesPage } from './components/CommunityCirclesPage';
import { LoadingScreen } from './components/LoadingScreen';
import { List, Plus } from 'lucide-react';
import { Skill, Badge, SkillRequest, ScheduledItem } from './types';
import { toast } from 'sonner@2.0.3';
import { CreateSkillRequestDialog } from './components/CreateSkillRequestDialog';
import { RequestDetailModal } from './components/RequestDetailModal';

// Mock data for skill requests (people looking for help - shown on map)
const allRequests: SkillRequest[] = [
  {
    id: 1,
    userName: 'Maria Santos',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    skillNeeded: 'Web Development Help',
    category: 'Technology',
    description: 'Need help fixing bugs in my website. Looking for someone experienced with HTML/CSS.',
    distance: '0.5 km away',
    distanceValue: 0.5,
    timeCreditsOffered: 2,
    urgency: 'medium',
    postedDate: '2 hours ago'
  },
  {
    id: 2,
    userName: 'Juan dela Cruz',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan',
    skillNeeded: 'Guitar Tuning',
    category: 'Music & Arts',
    description: 'My guitar needs tuning and I don\'t know how. Quick help needed!',
    distance: '1.2 km away',
    distanceValue: 1.2,
    timeCreditsOffered: 1,
    urgency: 'low',
    postedDate: '5 hours ago'
  },
  {
    id: 3,
    userName: 'Ana Reyes',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    skillNeeded: 'Math Homework Help',
    category: 'Education',
    description: 'Need help understanding algebra for my exam tomorrow.',
    distance: '0.8 km away',
    distanceValue: 0.8,
    timeCreditsOffered: 1,
    urgency: 'high',
    postedDate: '1 hour ago'
  },
  {
    id: 4,
    userName: 'Carlos Mendoza',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
    skillNeeded: 'Leaky Faucet Repair',
    category: 'Home Services',
    description: 'Kitchen faucet is leaking badly. Need someone who knows basic plumbing.',
    distance: '2.1 km away',
    distanceValue: 2.1,
    timeCreditsOffered: 2,
    urgency: 'high',
    postedDate: '30 minutes ago'
  },
  {
    id: 5,
    userName: 'Lucia Torres',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucia',
    skillNeeded: 'Logo Design',
    category: 'Creative',
    description: 'Starting a small business and need a simple logo design.',
    distance: '1.5 km away',
    distanceValue: 1.5,
    timeCreditsOffered: 3,
    urgency: 'low',
    postedDate: '1 day ago'
  },
  {
    id: 6,
    userName: 'Roberto Cruz',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=roberto',
    skillNeeded: 'Workout Routine',
    category: 'Health & Fitness',
    description: 'Need help creating a beginner workout plan for home exercises.',
    distance: '0.9 km away',
    distanceValue: 0.9,
    timeCreditsOffered: 1,
    urgency: 'low',
    postedDate: '3 hours ago'
  },
  {
    id: 7,
    userName: 'Elena Ramos',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena',
    skillNeeded: 'Adobo Recipe',
    category: 'Cooking',
    description: 'Want to learn how to cook authentic Filipino adobo. First timer!',
    distance: '1.1 km away',
    distanceValue: 1.1,
    timeCreditsOffered: 1,
    urgency: 'medium',
    postedDate: '4 hours ago'
  },
  {
    id: 8,
    userName: 'Sofia Lim',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
    skillNeeded: 'Tagalog Practice',
    category: 'Language',
    description: 'Learning Tagalog and need someone to practice conversation with.',
    distance: '0.7 km away',
    distanceValue: 0.7,
    timeCreditsOffered: 1,
    urgency: 'low',
    postedDate: '6 hours ago'
  },
  {
    id: 9,
    userName: 'Miguel Torres',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=miguel',
    skillNeeded: 'Phone Screen Repair',
    category: 'Technology',
    description: 'Cracked my phone screen. Looking for help with replacement.',
    distance: '1.3 km away',
    distanceValue: 1.3,
    timeCreditsOffered: 2,
    urgency: 'medium',
    postedDate: '2 hours ago'
  },
  {
    id: 10,
    userName: 'Carmen Diaz',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carmen',
    skillNeeded: 'Piano Sheet Music',
    category: 'Music & Arts',
    description: 'Need help reading piano sheet music for beginners.',
    distance: '1.8 km away',
    distanceValue: 1.8,
    timeCreditsOffered: 1,
    urgency: 'low',
    postedDate: '5 hours ago'
  },
  {
    id: 11,
    userName: 'Patrick Santos',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=patrick',
    skillNeeded: 'English Essay Review',
    category: 'Education',
    description: 'Need someone to review and give feedback on my English essay.',
    distance: '1.0 km away',
    distanceValue: 1.0,
    timeCreditsOffered: 1,
    urgency: 'high',
    postedDate: '1 hour ago'
  },
  {
    id: 12,
    userName: 'Isabel Garcia',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=isabel',
    skillNeeded: 'Camera Settings Help',
    category: 'Creative',
    description: 'Just got a DSLR camera. Need help understanding the basic settings.',
    distance: '2.3 km away',
    distanceValue: 2.3,
    timeCreditsOffered: 1,
    urgency: 'medium',
    postedDate: '3 hours ago'
  },
  {
    id: 13,
    userName: 'Diego Reyes',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=diego',
    skillNeeded: 'Cabinet Assembly',
    category: 'Home Services',
    description: 'Bought a cabinet from IKEA, need help assembling it.',
    distance: '1.6 km away',
    distanceValue: 1.6,
    timeCreditsOffered: 2,
    urgency: 'medium',
    postedDate: '4 hours ago'
  },
  {
    id: 14,
    userName: 'Andrea Martinez',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=andrea',
    skillNeeded: 'Running Form Check',
    category: 'Health & Fitness',
    description: 'Want to improve my running form. Need someone to watch and give tips.',
    distance: '1.9 km away',
    distanceValue: 1.9,
    timeCreditsOffered: 1,
    urgency: 'low',
    postedDate: '7 hours ago'
  },
  {
    id: 15,
    userName: 'Marco Villanueva',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marco',
    skillNeeded: 'Bread Baking Tips',
    category: 'Cooking',
    description: 'My bread never rises properly. Need tips from an experienced baker.',
    distance: '2.0 km away',
    distanceValue: 2.0,
    timeCreditsOffered: 1,
    urgency: 'low',
    postedDate: '8 hours ago'
  }
];

// Mock data for skills (people offering services - shown in list)
const allSkills: Skill[] = [
  {
    id: 1,
    userName: 'Maria Santos',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    skill: 'Web Development Tutoring',
    category: 'Technology',
    distance: '0.5 km away',
    distanceValue: 0.5,
    rating: 4.9,
    timeCredits: 1,
    verified: true,
    reviews: 32,
    availability: ['Mon', 'Tue', 'Thu', 'Fri']
  },
  {
    id: 2,
    userName: 'Juan dela Cruz',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan',
    skill: 'Guitar Lessons',
    category: 'Music & Arts',
    distance: '1.2 km away',
    distanceValue: 1.2,
    rating: 4.7,
    timeCredits: 1,
    verified: true,
    reviews: 18,
    availability: ['Wed', 'Sat', 'Sun']
  },
  {
    id: 3,
    userName: 'Ana Reyes',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana',
    skill: 'Filipino Language Tutoring',
    category: 'Education',
    distance: '0.8 km away',
    distanceValue: 0.8,
    rating: 5.0,
    timeCredits: 1,
    verified: true,
    reviews: 45,
    availability: ['Mon', 'Wed', 'Fri']
  },
  {
    id: 4,
    userName: 'Carlos Mendoza',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlos',
    skill: 'Home Appliance Repair',
    category: 'Home Services',
    distance: '2.1 km away',
    distanceValue: 2.1,
    rating: 4.8,
    timeCredits: 2,
    verified: false,
    reviews: 27,
    availability: ['Tue', 'Thu', 'Sat']
  },
  {
    id: 5,
    userName: 'Lucia Torres',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lucia',
    skill: 'Graphic Design Basics',
    category: 'Creative',
    distance: '1.5 km away',
    distanceValue: 1.5,
    rating: 4.6,
    timeCredits: 1,
    verified: true,
    reviews: 21,
    availability: ['Mon', 'Wed', 'Fri', 'Sat']
  },
  {
    id: 6,
    userName: 'Roberto Cruz',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=roberto',
    skill: 'Yoga Classes',
    category: 'Health & Fitness',
    distance: '0.9 km away',
    distanceValue: 0.9,
    rating: 4.8,
    timeCredits: 1,
    verified: true,
    reviews: 28,
    availability: ['Mon', 'Wed', 'Fri', 'Sun']
  },
  {
    id: 7,
    userName: 'Elena Ramos',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elena',
    skill: 'Filipino Cooking Lessons',
    category: 'Cooking',
    distance: '1.1 km away',
    distanceValue: 1.1,
    rating: 4.9,
    timeCredits: 1,
    verified: true,
    reviews: 35,
    availability: ['Tue', 'Thu', 'Sat']
  },
  {
    id: 8,
    userName: 'Sofia Lim',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sofia',
    skill: 'English Conversation Practice',
    category: 'Language',
    distance: '0.7 km away',
    distanceValue: 0.7,
    rating: 5.0,
    timeCredits: 1,
    verified: true,
    reviews: 42,
    availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  },
  {
    id: 9,
    userName: 'Miguel Torres',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=miguel',
    skill: 'Mobile App Development',
    category: 'Technology',
    distance: '1.3 km away',
    distanceValue: 1.3,
    rating: 4.7,
    timeCredits: 2,
    verified: true,
    reviews: 24,
    availability: ['Wed', 'Thu', 'Fri']
  },
  {
    id: 10,
    userName: 'Carmen Diaz',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carmen',
    skill: 'Piano Lessons',
    category: 'Music & Arts',
    distance: '1.8 km away',
    distanceValue: 1.8,
    rating: 4.9,
    timeCredits: 1,
    verified: true,
    reviews: 31,
    availability: ['Sat', 'Sun']
  },
  {
    id: 11,
    userName: 'Patrick Santos',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=patrick',
    skill: 'Math Tutoring',
    category: 'Education',
    distance: '1.0 km away',
    distanceValue: 1.0,
    rating: 4.8,
    timeCredits: 1,
    verified: true,
    reviews: 29,
    availability: ['Mon', 'Tue', 'Thu']
  },
  {
    id: 12,
    userName: 'Isabel Garcia',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=isabel',
    skill: 'Photography Basics',
    category: 'Creative',
    distance: '2.3 km away',
    distanceValue: 2.3,
    rating: 4.6,
    timeCredits: 1,
    verified: false,
    reviews: 19,
    availability: ['Fri', 'Sat', 'Sun']
  },
  {
    id: 13,
    userName: 'Diego Reyes',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=diego',
    skill: 'Plumbing Repairs',
    category: 'Home Services',
    distance: '1.6 km away',
    distanceValue: 1.6,
    rating: 4.7,
    timeCredits: 2,
    verified: true,
    reviews: 26,
    availability: ['Mon', 'Wed', 'Fri']
  },
  {
    id: 14,
    userName: 'Andrea Martinez',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=andrea',
    skill: 'Personal Training',
    category: 'Health & Fitness',
    distance: '1.9 km away',
    distanceValue: 1.9,
    rating: 4.8,
    timeCredits: 1,
    verified: true,
    reviews: 33,
    availability: ['Tue', 'Thu', 'Sat']
  },
  {
    id: 15,
    userName: 'Marco Villanueva',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=marco',
    skill: 'Baking Classes',
    category: 'Cooking',
    distance: '2.0 km away',
    distanceValue: 2.0,
    rating: 4.9,
    timeCredits: 1,
    verified: true,
    reviews: 37,
    availability: ['Wed', 'Sat', 'Sun']
  }
];

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState<'explore' | 'profile' | 'messages' | 'community'>('explore');
  const [showSkillsListSheet, setShowSkillsListSheet] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<SkillRequest | null>(null);
  const [showRequestDetailModal, setShowRequestDetailModal] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState(10);
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [requestSkill, setRequestSkill] = useState<Skill | null>(null);
  const [achievementBadge, setAchievementBadge] = useState<Badge | null>(null);
  const [requestCount, setRequestCount] = useState(0);
  const [showMenuDrawer, setShowMenuDrawer] = useState(false);
  const [menuPage, setMenuPage] = useState<string | null>(null);
  const [showAddSkillDialog, setShowAddSkillDialog] = useState(false);
  const [showCreateRequestDialog, setShowCreateRequestDialog] = useState(false);
  const [userRequests, setUserRequests] = useState<SkillRequest[]>([]); // User-created requests
  const [scheduledItems, setScheduledItems] = useState<ScheduledItem[]>([]); // User's schedule

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  // Simulate achievement unlocking
  const checkAchievements = () => {
    if (requestCount === 0) {
      // First request - unlock "First Swap" badge
      setTimeout(() => {
        const firstSwapBadge: Badge = {
          id: 1,
          name: 'First Swap',
          description: 'Complete your first skill exchange',
          icon: '🎯',
          earned: true,
          earnedDate: new Date().toISOString().split('T')[0]
        };
        setAchievementBadge(firstSwapBadge);
        toast.success('Achievement Unlocked!', {
          description: 'You earned the First Swap badge!'
        });
      }, 500);
    }
  };

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
    setShowSkillModal(true);
  };

  const handleMarkerClick = (markerId: number) => {
    // Check both regular requests and user-created requests
    const request = [...allRequests, ...userRequests].find(r => r.id === markerId);
    if (request) {
      setSelectedRequest(request);
      setShowRequestDetailModal(true);
    }
  };

  const handleOfferHelp = (request: SkillRequest) => {
    // Add to schedule
    const newScheduledItem: ScheduledItem = {
      id: Date.now(),
      requestId: request.id,
      userName: request.userName,
      userAvatar: request.userAvatar,
      skillNeeded: request.skillNeeded,
      description: request.description,
      timeCreditsOffered: request.timeCreditsOffered,
      status: 'pending',
      offeredDate: new Date().toISOString().split('T')[0]
    };
    
    setScheduledItems(prev => [...prev, newScheduledItem]);
    
    toast.success('Offer Sent!', {
      description: `Your offer to help ${request.userName} has been sent`
    });
    
    // Award achievement for first help offer
    if (requestCount === 0) {
      setTimeout(() => {
        const helperBadge: Badge = {
          id: 9,
          name: 'Helper Hero',
          description: 'Offer to help someone for the first time',
          icon: '🦸',
          earned: true,
          earnedDate: new Date().toISOString().split('T')[0]
        };
        setAchievementBadge(helperBadge);
      }, 500);
    }
    setRequestCount(prev => prev + 1);
  };

  const handleRequestService = (skill: Skill) => {
    setRequestSkill(skill);
    setShowRequestDialog(true);
  };

  const handleRequestConfirmed = () => {
    setRequestCount(prev => prev + 1);
    checkAchievements();
    toast.success('Request Sent!', {
      description: `Your request has been sent to ${requestSkill?.userName}`
    });
  };

  const handleMenuItemClick = (item: string) => {
    setMenuPage(item);
  };

  const handleBackFromMenuPage = () => {
    setMenuPage(null);
  };

  const handleAddSkill = () => {
    setShowCreateRequestDialog(true);
  };

  const handleSkillAdded = () => {
    toast.success('Skill Added!', {
      description: 'Your skill is now available to the community'
    });
    // Could trigger achievement here
    setTimeout(() => {
      const skillMasterBadge: Badge = {
        id: 8,
        name: 'Skill Sharer',
        description: 'Add your first skill to the community',
        icon: '🌟',
        earned: true,
        earnedDate: new Date().toISOString().split('T')[0]
      };
      setAchievementBadge(skillMasterBadge);
    }, 500);
  };

  const handleRequestCreated = (requestData: { skill: string; category: string; description: string; urgency: 'low' | 'medium' | 'high'; credits: number }) => {
    // Create a new request at user's current location (map center: PUP Manila)
    const newRequest: SkillRequest = {
      id: Date.now(), // Use timestamp as unique ID
      userName: 'You',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
      skillNeeded: requestData.skill,
      category: requestData.category,
      description: requestData.description,
      distance: '0 km away',
      distanceValue: 0,
      timeCreditsOffered: requestData.credits,
      urgency: requestData.urgency,
      postedDate: 'Just now'
    };
    
    setUserRequests(prev => [...prev, newRequest]);
    
    toast.success('Request Posted!', {
      description: 'Your skill request is now visible on the map'
    });
  };

  // Render menu pages
  if (menuPage === 'activity') {
    return (
      <div className="size-full bg-[#FDF4E3] flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <RecentActivityPage onBack={handleBackFromMenuPage} />
        </div>
      </div>
    );
  }

  if (menuPage === 'skills') {
    return (
      <div className="size-full bg-[#FDF4E3] flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <MySkillsPage onBack={handleBackFromMenuPage} />
        </div>
      </div>
    );
  }

  if (menuPage === 'schedule') {
    return (
      <div className="size-full bg-[#FDF4E3] flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <InfoPage 
            onBack={handleBackFromMenuPage}
            title="My Schedule"
            subtitle="Upcoming skill exchanges"
            content={
              scheduledItems.length === 0 ? (
                <div className="bg-white rounded-xl p-6 text-center">
                  <p className="text-[#134686]">No upcoming bookings</p>
                  <p className="text-sm text-[#134686]/60 mt-2">Your scheduled exchanges will appear here</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {scheduledItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl p-4 border-2 border-[#134686]/10 shadow-sm">
                      <div className="flex items-start gap-3">
                        <img 
                          src={item.userAvatar} 
                          alt={item.userName}
                          className="w-12 h-12 rounded-full border-2 border-[#FEB21A]"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-[#134686] truncate">{item.skillNeeded}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              item.status === 'pending' ? 'bg-[#FEB21A] text-[#134686]' :
                              item.status === 'accepted' ? 'bg-green-100 text-green-700' :
                              item.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {item.status === 'pending' ? 'Pending for Acceptance' :
                               item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-[#134686]/70 mb-2">Help {item.userName}</p>
                          <p className="text-sm text-[#134686]/60 line-clamp-2 mb-2">{item.description}</p>
                          <div className="flex items-center gap-4 text-xs text-[#134686]/60">
                            <span>💰 {item.timeCreditsOffered} TC</span>
                            <span>📅 Offered: {item.offeredDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            }
          />
        </div>
      </div>
    );
  }

  if (menuPage === 'notifications') {
    return (
      <div className="size-full bg-[#FDF4E3] flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <NotificationsPage onBack={handleBackFromMenuPage} />
        </div>
      </div>
    );
  }

  if (menuPage === 'guidelines') {
    return (
      <div className="size-full bg-[#FDF4E3] flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <InfoPage 
            onBack={handleBackFromMenuPage}
            title="Community Guidelines"
            subtitle="For further development"
            content={
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl text-[#134686] mb-2">Coming Soon</h3>
                <p className="text-[#134686]/60">This feature is currently under development</p>
              </div>
            }
          />
        </div>
      </div>
    );
  }

  if (menuPage === 'safety') {
    return (
      <div className="size-full bg-[#FDF4E3] flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <InfoPage 
            onBack={handleBackFromMenuPage}
            title="Safety & Privacy"
            subtitle="For further development"
            content={
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl text-[#134686] mb-2">Coming Soon</h3>
                <p className="text-[#134686]/60">This feature is currently under development</p>
              </div>
            }
          />
        </div>
      </div>
    );
  }

  if (menuPage === 'help') {
    return (
      <div className="size-full bg-[#FDF4E3] flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <InfoPage 
            onBack={handleBackFromMenuPage}
            title="Help & Support"
            subtitle="For further development"
            content={
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl text-[#134686] mb-2">Coming Soon</h3>
                <p className="text-[#134686]/60">This feature is currently under development</p>
              </div>
            }
          />
        </div>
      </div>
    );
  }

  if (menuPage === 'settings') {
    return (
      <div className="size-full bg-[#FDF4E3] flex flex-col relative overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <InfoPage 
            onBack={handleBackFromMenuPage}
            title="Settings"
            subtitle="For further development"
            content={
              <div className="bg-white rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl text-[#134686] mb-2">Coming Soon</h3>
                <p className="text-[#134686]/60">This feature is currently under development</p>
              </div>
            }
          />
        </div>
      </div>
    );
  }

  if (activeView === 'community') {
    return (
      <div className="size-full bg-[#FDF4E3] flex flex-col relative overflow-hidden">
        <div className="flex-1 mb-20 overflow-hidden">
          <CommunityCirclesPage />
        </div>
        <BottomNavigation activeView={activeView} onViewChange={setActiveView} unreadCount={2} onAddSkill={handleAddSkill} />
        <MenuDrawer open={showMenuDrawer} onOpenChange={setShowMenuDrawer} onMenuItemClick={handleMenuItemClick} />
        <AddSkillDialog open={showAddSkillDialog} onOpenChange={setShowAddSkillDialog} onSkillAdded={handleSkillAdded} />
        <AchievementNotification badge={achievementBadge} onClose={() => setAchievementBadge(null)} />
      </div>
    );
  }

  if (activeView === 'profile') {
    return (
      <div className="size-full bg-[#FDF4E3] flex flex-col relative overflow-hidden">
        <Header onMenuClick={() => setShowMenuDrawer(true)} />
        <div className="flex-1 mt-16 mb-20 overflow-hidden">
          <ProfilePage />
        </div>
        <BottomNavigation activeView={activeView} onViewChange={setActiveView} unreadCount={2} onAddSkill={handleAddSkill} />
        <MenuDrawer open={showMenuDrawer} onOpenChange={setShowMenuDrawer} onMenuItemClick={handleMenuItemClick} />
        <AddSkillDialog open={showAddSkillDialog} onOpenChange={setShowAddSkillDialog} onSkillAdded={handleSkillAdded} />
        <AchievementNotification badge={achievementBadge} onClose={() => setAchievementBadge(null)} />
      </div>
    );
  }

  if (activeView === 'messages') {
    return (
      <div className="size-full bg-[#FDF4E3] flex flex-col relative overflow-hidden">
        <Header onMenuClick={() => setShowMenuDrawer(true)} />
        <div className="flex-1 mt-16 mb-20 overflow-hidden">
          <MessagesPage />
        </div>
        <BottomNavigation activeView={activeView} onViewChange={setActiveView} unreadCount={2} onAddSkill={handleAddSkill} />
        <MenuDrawer open={showMenuDrawer} onOpenChange={setShowMenuDrawer} onMenuItemClick={handleMenuItemClick} />
        <AddSkillDialog open={showAddSkillDialog} onOpenChange={setShowAddSkillDialog} onSkillAdded={handleSkillAdded} />
        <AchievementNotification badge={achievementBadge} onClose={() => setAchievementBadge(null)} />
      </div>
    );
  }

  return (
    <div className="size-full bg-[#FDF4E3] flex flex-col relative overflow-hidden">
      <Header onMenuClick={() => setShowMenuDrawer(true)} />
      
      {/* Map View - Full height */}
      <div className="flex-1 mt-16 mb-20 relative">
        <MapView 
          onMarkerClick={handleMarkerClick} 
          userRequests={userRequests}
          hideControls={showSkillsListSheet || showCreateRequestDialog || showMenuDrawer}
        />
        
        {/* Floating Action Button - View Skills List */}
        <button
          onClick={() => setShowSkillsListSheet(true)}
          className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-[#134686] text-white rounded-full p-2.5 sm:p-4 shadow-lg hover:bg-[#0f3666] transition-all hover:scale-105 flex items-center gap-1.5 sm:gap-2 z-10"
        >
          <List className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="pr-1.5 sm:pr-2 text-sm sm:text-base">Nearby Skills</span>
        </button>
      </div>

      <BottomNavigation activeView={activeView} onViewChange={setActiveView} unreadCount={2} onAddSkill={handleAddSkill} />

      {/* Modals and Sheets */}
      <SkillsListSheet
        open={showSkillsListSheet}
        onOpenChange={setShowSkillsListSheet}
        onSkillClick={handleSkillClick}
        onFilterClick={() => setShowFilterSheet(true)}
        selectedCategories={selectedCategories}
        maxDistance={maxDistance}
      />

      <RequestDetailModal
        request={selectedRequest}
        open={showRequestDetailModal}
        onOpenChange={setShowRequestDetailModal}
        onOfferHelp={handleOfferHelp}
      />

      <SkillDetailModal 
        skill={selectedSkill}
        open={showSkillModal}
        onOpenChange={setShowSkillModal}
        onRequestService={handleRequestService}
      />

      <RequestServiceDialog
        skill={requestSkill}
        open={showRequestDialog}
        onOpenChange={setShowRequestDialog}
        onRequestConfirmed={handleRequestConfirmed}
      />

      <AddSkillDialog
        open={showAddSkillDialog}
        onOpenChange={setShowAddSkillDialog}
        onSkillAdded={handleSkillAdded}
      />

      <FilterSheet 
        open={showFilterSheet}
        onOpenChange={setShowFilterSheet}
        selectedCategories={selectedCategories}
        onCategoriesChange={setSelectedCategories}
        maxDistance={maxDistance}
        onMaxDistanceChange={setMaxDistance}
      />

      <CreateSkillRequestDialog
        open={showCreateRequestDialog}
        onOpenChange={setShowCreateRequestDialog}
        onRequestCreated={handleRequestCreated}
      />

      <MenuDrawer open={showMenuDrawer} onOpenChange={setShowMenuDrawer} onMenuItemClick={handleMenuItemClick} />
      <AchievementNotification badge={achievementBadge} onClose={() => setAchievementBadge(null)} />

      {/* Decorative elements */}
      <div className="fixed top-20 right-4 w-16 h-16 bg-[#FEB21A] rounded-full opacity-20 blur-2xl pointer-events-none"></div>
      <div className="fixed bottom-32 left-4 w-20 h-20 bg-[#ED3F27] rounded-full opacity-20 blur-2xl pointer-events-none"></div>
    </div>
  );
}
