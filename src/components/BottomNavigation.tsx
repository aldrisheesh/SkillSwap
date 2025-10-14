import { MapPin, Users, Plus, MessageCircle, User } from 'lucide-react';

interface BottomNavigationProps {
  activeView: 'explore' | 'profile' | 'messages' | 'community';
  onViewChange: (view: 'explore' | 'profile' | 'messages' | 'community') => void;
  unreadCount?: number;
  onAddSkill?: () => void;
}

export function BottomNavigation({ activeView, onViewChange, unreadCount = 0, onAddSkill }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-4 border-[#134686] shadow-lg">
      <div className="max-w-lg mx-auto px-2 sm:px-4 py-2">
        <div className="flex items-center justify-between w-full">
          <button 
            className={`flex flex-col items-center gap-1 py-2 px-2 sm:px-3 rounded-lg transition-colors flex-1 ${
              activeView === 'explore' 
                ? 'text-[#134686] bg-[#FDF4E3]' 
                : 'text-[#134686]/60 hover:bg-[#FDF4E3]'
            }`}
            onClick={() => onViewChange('explore')}
          >
            <MapPin className="w-6 h-6" fill={activeView === 'explore' ? '#134686' : 'none'} />
            <span className="text-xs">Explore</span>
          </button>
          
          <button 
            className={`flex flex-col items-center gap-1 py-2 px-2 sm:px-3 rounded-lg transition-colors flex-1 ${
              activeView === 'community' 
                ? 'text-[#134686] bg-[#FDF4E3]' 
                : 'text-[#134686]/60 hover:bg-[#FDF4E3]'
            }`}
            onClick={() => onViewChange('community')}
          >
            <Users className="w-6 h-6" fill={activeView === 'community' ? '#134686' : 'none'} />
            <span className="text-xs">Community</span>
          </button>
          
          <button 
            onClick={onAddSkill}
            className="relative -mt-8 bg-[#ED3F27] text-white p-4 rounded-full shadow-lg hover:bg-[#d43520] transition-all hover:scale-105 border-4 border-white group mx-2 flex-shrink-0"
            title="Add Your Skill"
          >
            <Plus className="w-8 h-8" strokeWidth={3} />
          </button>
          
          <button 
            className={`flex flex-col items-center gap-1 py-2 px-2 sm:px-3 rounded-lg transition-colors relative flex-1 ${
              activeView === 'messages' 
                ? 'text-[#134686] bg-[#FDF4E3]' 
                : 'text-[#134686]/60 hover:bg-[#FDF4E3]'
            }`}
            onClick={() => onViewChange('messages')}
          >
            <MessageCircle className="w-6 h-6" fill={activeView === 'messages' ? '#134686' : 'none'} />
            <span className="text-xs">Messages</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-[#ED3F27] rounded-full text-xs text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          <button 
            className={`flex flex-col items-center gap-1 py-2 px-2 sm:px-3 rounded-lg transition-colors flex-1 ${
              activeView === 'profile' 
                ? 'text-[#134686] bg-[#FDF4E3]' 
                : 'text-[#134686]/60 hover:bg-[#FDF4E3]'
            }`}
            onClick={() => onViewChange('profile')}
          >
            <User className="w-6 h-6" fill={activeView === 'profile' ? '#134686' : 'none'} />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}
