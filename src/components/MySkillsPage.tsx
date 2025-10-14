import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowLeft, Plus, Edit, Trash2, Star } from 'lucide-react';

interface MySkillsPageProps {
  onBack: () => void;
}

const mySkills = [
  {
    id: 1,
    name: 'React Development',
    category: 'Technology',
    credits: 2,
    rating: 4.8,
    sessions: 12,
    active: true,
    icon: '⚛️'
  },
  {
    id: 2,
    name: 'Bicycle Repair',
    category: 'Home Services',
    credits: 1,
    rating: 4.9,
    sessions: 8,
    active: true,
    icon: '🚴'
  },
  {
    id: 3,
    name: 'Spanish Tutoring',
    category: 'Education',
    credits: 1,
    rating: 5.0,
    sessions: 15,
    active: false,
    icon: '🇪🇸'
  }
];

export function MySkillsPage({ onBack }: MySkillsPageProps) {
  return (
    <div className="h-full flex flex-col bg-[#FDF4E3]">
      {/* Header */}
      <div className="bg-[#134686] text-white p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl">My Skills</h2>
          </div>
          <Button className="bg-[#FEB21A] text-[#134686] hover:bg-[#FEB21A]/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>
        <p className="text-sm opacity-80 ml-14">Skills you offer to the community</p>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {mySkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-white rounded-xl p-4 border-2 border-[#134686]/10 hover:border-[#FEB21A] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="text-4xl">{skill.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg text-[#134686] mb-1">{skill.name}</h3>
                      <Badge className="bg-[#FDF4E3] text-[#134686] hover:bg-[#FDF4E3]/80 border border-[#134686]/20">
                        {skill.category}
                      </Badge>
                    </div>
                    {skill.active ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-[#134686]/60">
                        Paused
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="bg-[#FDF4E3] rounded-lg p-2">
                      <p className="text-xs text-[#134686]/70">Rate</p>
                      <p className="text-sm text-[#134686]">{skill.credits} credit/hr</p>
                    </div>
                    <div className="bg-[#FDF4E3] rounded-lg p-2">
                      <p className="text-xs text-[#134686]/70">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#FEB21A]" fill="#FEB21A" />
                        <p className="text-sm text-[#134686]">{skill.rating}</p>
                      </div>
                    </div>
                    <div className="bg-[#FDF4E3] rounded-lg p-2">
                      <p className="text-xs text-[#134686]/70">Sessions</p>
                      <p className="text-sm text-[#134686]">{skill.sessions}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 border-2 border-[#134686] text-[#134686] hover:bg-[#FDF4E3]"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-2 border-[#ED3F27] text-[#ED3F27] hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
