import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Check } from 'lucide-react';

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedCategories: string[];
  onCategoriesChange: (categories: string[]) => void;
  maxDistance: number;
  onMaxDistanceChange: (distance: number) => void;
}

const categories = [
  { name: 'Technology', icon: '💻' },
  { name: 'Education', icon: '📚' },
  { name: 'Music & Arts', icon: '🎨' },
  { name: 'Home Services', icon: '🔧' },
  { name: 'Creative', icon: '✨' },
  { name: 'Health & Fitness', icon: '💪' },
  { name: 'Language', icon: '🗣️' },
  { name: 'Cooking', icon: '🍳' }
];

export function FilterSheet({
  open,
  onOpenChange,
  selectedCategories,
  onCategoriesChange,
  maxDistance,
  onMaxDistanceChange
}: FilterSheetProps) {
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoriesChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoriesChange([...selectedCategories, category]);
    }
  };

  const clearFilters = () => {
    onCategoriesChange([]);
    onMaxDistanceChange(10);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="bg-white border-t-4 border-[#134686] rounded-t-3xl h-[80vh]" aria-describedby="filter-description">
        <SheetHeader>
          <SheetTitle className="text-2xl text-[#134686]">Filter Skills</SheetTitle>
        </SheetHeader>
        <p id="filter-description" className="sr-only">
          Filter skills by category and distance
        </p>

        <div className="space-y-6 mt-6 overflow-y-auto max-h-[calc(80vh-140px)] pb-6">
          {/* Distance Filter */}
          <div>
            <Label className="text-[#134686] mb-3 block">
              Maximum Distance: {maxDistance === 10 ? '10+ km' : `${maxDistance} km`}
            </Label>
            <Slider
              value={[maxDistance]}
              onValueChange={(value) => onMaxDistanceChange(value[0])}
              max={10}
              min={1}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-[#134686]/60 mt-2">
              <span>1 km</span>
              <span>10+ km</span>
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <Label className="text-[#134686] mb-3 block">Categories</Label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category.name);
                return (
                  <button
                    key={category.name}
                    onClick={() => toggleCategory(category.name)}
                    className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                      isSelected
                        ? 'bg-[#134686] border-[#134686] text-white'
                        : 'bg-white border-[#134686]/20 text-[#134686] hover:border-[#FEB21A]'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="text-sm flex-1 text-left">{category.name}</span>
                    {isSelected && <Check className="w-4 h-4" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t-2 border-[#134686]/10 flex gap-2">
          <Button
            variant="outline"
            onClick={clearFilters}
            className="flex-1 border-2 border-[#134686] text-[#134686] hover:bg-[#FDF4E3]"
          >
            Clear All
          </Button>
          <Button
            onClick={() => onOpenChange(false)}
            className="flex-1 bg-[#134686] hover:bg-[#0f3666] text-white"
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
