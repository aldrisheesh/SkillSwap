import { SkillCard } from './SkillCard';
import { Search, Filter } from 'lucide-react';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Skill } from '../types';
import { useMemo, useState } from 'react';


const nearbySkills: Skill[] = [
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
  }
];


interface NearbySkillsProps {
  onSkillClick: (skill: Skill) => void;
  onFilterClick: () => void;
  selectedCategories: string[];
  maxDistance: number;
}


export function NearbySkills({ onSkillClick, onFilterClick, selectedCategories, maxDistance }: NearbySkillsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isInputActive, setIsInputActive] = useState(false);


  const filteredSkills = useMemo(() => {
    return nearbySkills.filter((skill) => {
      // Filter by search query
      if (searchQuery && !skill.skill.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !skill.userName.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }


      // Filter by category
      if (selectedCategories.length > 0 && !selectedCategories.includes(skill.category)) {
        return false;
      }


      // Filter by distance
      if (skill.distanceValue > maxDistance) {
        return false;
      }


      return true;
    });
  }, [searchQuery, selectedCategories, maxDistance]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-4 bg-white border-b-2 border-[#134686]/10 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-[#134686]">🤝 Barangay Skills</h2>
            <p className="text-xs text-[#134686]/60">Hyperlocal skill exchange</p>
          </div>
          {(selectedCategories.length > 0 || maxDistance < 10) && (
            <span className="text-xs text-[#FEB21A]">
              {filteredSkills.length} result{filteredSkills.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#134686]/50" />
            <Input
              placeholder="Search skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsInputActive(true)}
              onClick={() => setIsInputActive(true)}
              readOnly={!isInputActive}
              className="pl-10 border-2 border-[#134686]/20 focus:border-[#FEB21A] rounded-full bg-white"
            />
          </div>
          <button 
            className="p-2 bg-[#134686] text-white rounded-full hover:bg-[#0f3666] transition-colors relative"
            onClick={onFilterClick}
          >
            <Filter className="w-5 h-5" />
            {(selectedCategories.length > 0 || maxDistance < 10) && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ED3F27] rounded-full text-xs flex items-center justify-center">
                !
              </span>
            )}
          </button>
        </div>
      </div>


      <ScrollArea className="flex-1 min-h-0">
        <div className="p-4 space-y-3">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <SkillCard key={skill.id} {...skill} onClick={() => onSkillClick(skill)} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-[#134686]/60 mb-2">No skills found</p>
              <p className="text-sm text-[#134686]/40">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}