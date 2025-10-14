import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, MapPin, Clock, Coins, MessageCircle, Calendar } from 'lucide-react';
import { Skill } from '../types';

interface SkillDetailModalProps {
  skill: Skill | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestService?: (skill: Skill) => void;
}

export function SkillDetailModal({ skill, open, onOpenChange, onRequestService }: SkillDetailModalProps) {
  if (!skill) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white border-2 border-[#134686]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#134686]">Skill Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* User Info */}
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16 border-3 border-[#FEB21A]">
              <AvatarImage src={skill.userAvatar} />
              <AvatarFallback>{skill.userName[0]}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl text-[#134686]">{skill.userName}</h3>
                {skill.verified && (
                  <div className="w-5 h-5 bg-[#134686] rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[#FEB21A]">
                  <Star className="w-4 h-4" fill="#FEB21A" />
                  <span className="text-sm">{skill.rating}</span>
                  <span className="text-xs text-[#134686]/60">({skill.reviews || 24} reviews)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Skill Info */}
          <div>
            <h4 className="text-lg text-[#134686] mb-2">{skill.skill}</h4>
            <Badge className="bg-[#FDF4E3] text-[#134686] hover:bg-[#FDF4E3]/80 border border-[#134686]/20">
              {skill.category}
            </Badge>
          </div>

          {/* Description */}
          <div>
            <p className="text-sm text-[#134686]/80 leading-relaxed">
              {skill.description || 
                `Experienced in ${skill.skill.toLowerCase()} with over 3 years of practice. Happy to share knowledge and help others learn. I believe in the power of community learning and skill exchange!`}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#FDF4E3] rounded-lg p-3">
              <div className="flex items-center gap-2 text-[#134686]/70 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-xs">Distance</span>
              </div>
              <p className="text-sm text-[#134686]">{skill.distance}</p>
            </div>

            <div className="bg-[#FDF4E3] rounded-lg p-3">
              <div className="flex items-center gap-2 text-[#134686]/70 mb-1">
                <Coins className="w-4 h-4" />
                <span className="text-xs">Time Credits</span>
              </div>
              <p className="text-sm text-[#134686]">{skill.timeCredits} credit/hour</p>
            </div>
          </div>

          {/* Availability */}
          <div>
            <div className="flex items-center gap-2 text-[#134686]/70 mb-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Availability</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {(skill.availability || ['Mon', 'Wed', 'Fri', 'Sat']).map((day) => (
                <Badge key={day} variant="outline" className="border-[#134686] text-[#134686]">
                  {day}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <Button 
              className="flex-1 bg-[#134686] hover:bg-[#0f3666] text-white"
              onClick={() => {
                onOpenChange(false);
                onRequestService?.(skill);
              }}
            >
              <Clock className="w-4 h-4 mr-2" />
              Request Service
            </Button>
            <Button variant="outline" className="border-2 border-[#134686] text-[#134686] hover:bg-[#FDF4E3]">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
