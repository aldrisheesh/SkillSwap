import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { QuickStats } from './QuickStats';
import { NearbySkills } from './NearbySkills';
import { Skill } from '../types';

interface SkillsListSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkillClick: (skill: Skill) => void;
  onFilterClick: () => void;
  selectedCategories: string[];
  maxDistance: number;
}

export function SkillsListSheet({
  open,
  onOpenChange,
  onSkillClick,
  onFilterClick,
  selectedCategories,
  maxDistance
}: SkillsListSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-[85vh] bg-[#FDF4E3] border-t-4 border-[#134686] p-0 overflow-hidden"
        aria-describedby="skills-description"
      >
        <div className="h-full flex flex-col overflow-hidden">
          <SheetHeader className="px-6 pt-6 pb-4 flex-shrink-0">
            <SheetTitle className="text-[#134686]">Nearby Skills</SheetTitle>
          </SheetHeader>
          <p id="skills-description" className="sr-only">
            Browse and filter available skills from community members nearby
          </p>
          <div className="flex-shrink-0">
            <QuickStats />
          </div>
          <div className="flex-1 bg-white rounded-t-3xl overflow-hidden min-h-0">
            <NearbySkills 
              onSkillClick={onSkillClick}
              onFilterClick={onFilterClick}
              selectedCategories={selectedCategories}
              maxDistance={maxDistance}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
