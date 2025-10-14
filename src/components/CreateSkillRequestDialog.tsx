import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface CreateSkillRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestCreated: (requestData: { 
    skill: string; 
    category: string; 
    description: string; 
    urgency: 'low' | 'medium' | 'high';
    credits: number;
  }) => void;
}

export function CreateSkillRequestDialog({ open, onOpenChange, onRequestCreated }: CreateSkillRequestDialogProps) {
  const [skillTitle, setSkillTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [timeCredits, setTimeCredits] = useState('1');
  const [urgency, setUrgency] = useState<'low' | 'medium' | 'high'>('medium');

  const categories = [
    'Technology',
    'Education',
    'Music & Arts',
    'Home Services',
    'Creative',
    'Health & Fitness',
    'Language',
    'Cooking'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Pass the request data
    onRequestCreated({
      skill: skillTitle,
      category,
      description,
      urgency,
      credits: parseInt(timeCredits)
    });
    
    // Reset form
    setSkillTitle('');
    setCategory('');
    setDescription('');
    setTimeCredits('1');
    setUrgency('medium');
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#FDF4E3] border-4 border-[#134686] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#134686]">Request a Skill</DialogTitle>
          <DialogDescription className="text-[#134686]/70">
            Looking for someone with a specific skill? Post your request and let the community help you!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Skill Title */}
          <div>
            <Label htmlFor="skill-title" className="text-[#134686]">
              What skill do you need?
            </Label>
            <Input
              id="skill-title"
              placeholder="e.g., Plumbing Repair, Guitar Lessons, Web Design"
              value={skillTitle}
              onChange={(e) => setSkillTitle(e.target.value)}
              required
              className="mt-1 border-2 border-[#134686]/30 focus:border-[#134686] bg-white"
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="text-[#134686]">
              Category
            </Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="mt-1 border-2 border-[#134686]/30 focus:border-[#134686] bg-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-[#134686]">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what you need help with..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={4}
              className="mt-1 border-2 border-[#134686]/30 focus:border-[#134686] bg-white resize-none"
            />
          </div>

          {/* Urgency */}
          <div>
            <Label htmlFor="urgency" className="text-[#134686]">
              Urgency
            </Label>
            <Select value={urgency} onValueChange={(value) => setUrgency(value as 'low' | 'medium' | 'high')}>
              <SelectTrigger className="mt-1 border-2 border-[#134686]/30 focus:border-[#134686] bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">🟢 Flexible - No rush</SelectItem>
                <SelectItem value="medium">🟡 Soon - Within a few days</SelectItem>
                <SelectItem value="high">🔴 Urgent - Need help ASAP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Time Credits */}
          <div>
            <Label htmlFor="time-credits" className="text-[#134686]">
              Time Credits Offered
            </Label>
            <Input
              id="time-credits"
              type="number"
              min="1"
              max="10"
              value={timeCredits}
              onChange={(e) => setTimeCredits(e.target.value)}
              required
              className="mt-1 border-2 border-[#134686]/30 focus:border-[#134686] bg-white"
            />
            <p className="text-xs text-[#134686]/60 mt-1">
              1 Time Credit = 1 hour of service
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 border-2 border-[#134686] text-[#134686] hover:bg-[#134686]/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#134686] hover:bg-[#0f3666] text-white"
              disabled={!skillTitle || !category || !description}
            >
              Post Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
