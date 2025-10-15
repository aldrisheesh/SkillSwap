export interface Skill {
  id: number;
  userName: string;
  userAvatar: string;
  skill: string;
  category: string;
  distance: string;
  distanceValue: number; // in km for filtering
  rating: number;
  timeCredits: number;
  verified: boolean;
  description?: string;
  reviews?: number;
  availability?: string[];
}

export interface SkillRequest {
  id: number;
  userName: string;
  userAvatar: string;
  skillNeeded: string;
  category: string;
  description: string;
  distance: string;
  distanceValue: number;
  timeCreditsOffered: number;
  urgency: 'low' | 'medium' | 'high';
  postedDate: string;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  progress?: number;
  total?: number;
}

export interface Exchange {
  id: number;
  userName: string;
  userAvatar: string;
  skill: string;
  date: string;
  credits: number;
  type: 'given' | 'received';
}

export interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: number;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  online: boolean;
  messages: Message[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface BookingRequest {
  skillId: number;
  date: Date;
  timeSlot: string;
  duration: number;
  notes: string;
}

export interface ScheduledItem {
  id: number;
  requestId: number;
  userName: string;
  userAvatar: string;
  skillNeeded: string;
  description: string;
  timeCreditsOffered: number;
  status: 'pending' | 'accepted' | 'ongoing' | 'rejected' | 'completed' | 'cancelled';
  offeredDate: string;
}

export interface Notification {
  id: number;
  type: 'message' | 'booking' | 'achievement' | 'review' | 'connection' | 'help_offer';
  title: string;
  description: string;
  time: string;
  read: boolean;
  avatar?: string;
  // For help offer notifications
  offerId?: number;
  offerUserName?: string;
  offerUserAvatar?: string;
  offerSkill?: string;
  offerDescription?: string;
  offerCredits?: number;
}