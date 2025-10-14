import { Clock, MapPin, Star, Coins } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

interface SkillCardProps {
  userName: string;
  userAvatar: string;
  skill: string;
  category: string;
  distance: string;
  rating: number;
  timeCredits: number;
  verified: boolean;
  onClick?: () => void;
}

export function SkillCard({
  userName,
  userAvatar,
  skill,
  category,
  distance,
  rating,
  timeCredits,
  verified,
  onClick
}: SkillCardProps) {
  return (
    <div 
      className="bg-white rounded-2xl shadow-lg p-4 border-2 border-[#134686]/10 hover:border-[#FEB21A] transition-all hover:shadow-xl cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-3 mb-3">
        <Avatar className="w-12 h-12 border-2 border-[#FEB21A]">
          <AvatarImage src={userAvatar} />
          <AvatarFallback>{userName[0]}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-[#134686]">{userName}</h3>
            {verified && (
              <div className="w-4 h-4 bg-[#134686] rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <p className="text-sm text-[#134686]/70">{skill}</p>
        </div>
        
        <div className="flex items-center gap-1 text-[#FEB21A]">
          <Star className="w-4 h-4" fill="#FEB21A" />
          <span className="text-sm font-semibold">{rating}</span>
        </div>
      </div>
      
      <Badge className="mb-3 bg-[#FDF4E3] text-[#134686] hover:bg-[#FDF4E3]/80 border border-[#134686]/20">
        {category}
      </Badge>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-1 text-[#134686]/70">
          <MapPin className="w-4 h-4" />
          <span>{distance}</span>
        </div>
        
        <div className="flex items-center gap-1 bg-[#FEB21A] text-[#134686] px-3 py-1 rounded-full">
          <Coins className="w-4 h-4" />
          <span className="font-semibold">{timeCredits}</span>
          <span className="text-xs">/hr</span>
        </div>
      </div>
    </div>
  );
}
