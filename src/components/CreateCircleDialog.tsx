import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface CreateCircleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCircleCreated: () => void;
}

const categories = [
  { name: 'Technology', icon: '💻' },
  { name: 'Education', icon: '📚' },
  { name: 'Music & Arts', icon: '🎵' },
  { name: 'Home Services', icon: '🔧' },
  { name: 'Creative', icon: '🎨' },
  { name: 'Health & Fitness', icon: '💪' },
  { name: 'Language', icon: '🗣️' },
  { name: 'Cooking', icon: '🍳' }
];

const locations = [
  'PUP Manila Campus',
  'Sta. Mesa, Manila',
  'Brgy. 123, Sta. Mesa',
  'Brgy. 456, Sta. Mesa',
  'Metro Manila (Virtual)',
  'Custom Location'
];

export function CreateCircleDialog({ open, onOpenChange, onCircleCreated }: CreateCircleDialogProps) {
  const [step, setStep] = useState(1);
  const [circleName, setCircleName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setCircleName('');
      setSelectedCategory('');
      setDescription('');
      setLocation('');
      setCustomLocation('');
      setTags([]);
      setNewTag('');
    }, 300);
  };

  const handleAddTag = () => {
    if (newTag.trim() && tags.length < 5 && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleCreate = () => {
    setTimeout(() => {
      setStep(4);
      setTimeout(() => {
        toast.success('Circle Created!', {
          description: `${circleName} is now live in the community`
        });
        onCircleCreated();
        handleClose();
      }, 2000);
    }, 500);
  };

  const finalLocation = location === 'Custom Location' ? customLocation : location;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg bg-white border-2 border-[#134686]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#134686] flex items-center gap-2">
            {step > 1 && step < 4 && (
              <button
                onClick={() => setStep(step - 1)}
                className="p-1 hover:bg-[#FDF4E3] rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            Create Community Circle
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {/* Step 1: Name & Category */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-br from-[#FDF4E3] to-white rounded-lg p-4 border-2 border-[#134686]/10">
                <p className="text-sm text-[#134686]">
                  <strong>🤝 Build Your Circle:</strong> Create a themed hub for skill exchange in your barangay or campus. Circles strengthen community bonds and spotlight specific needs.
                </p>
              </div>

              <div>
                <Label className="text-[#134686] mb-2 block">
                  Circle Name
                </Label>
                <Input
                  placeholder="e.g., PUP Tech Mentors, Sta. Mesa Artists..."
                  value={circleName}
                  onChange={(e) => setCircleName(e.target.value)}
                  className="border-2 border-[#134686]/20 focus:border-[#FEB21A]"
                />
              </div>

              <div>
                <Label className="text-[#134686] mb-3 block">
                  Primary Category
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                        selectedCategory === category.name
                          ? 'bg-[#134686] border-[#134686] text-white'
                          : 'bg-white border-[#134686]/20 text-[#134686] hover:border-[#FEB21A]'
                      }`}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="text-sm flex-1 text-left">{category.name}</span>
                      {selectedCategory === category.name && (
                        <Check className="w-4 h-4" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!circleName.trim() || !selectedCategory}
                className="w-full bg-[#134686] hover:bg-[#0f3666] text-white"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 2: Description & Location */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="p-3 bg-[#FDF4E3] rounded-lg">
                <p className="text-sm text-[#134686]/70 mb-1">Your Circle</p>
                <p className="font-semibold text-[#134686]">{circleName}</p>
                <Badge className="mt-1 bg-white text-[#134686] border border-[#134686]/20">
                  {selectedCategory}
                </Badge>
              </div>

              <div>
                <Label className="text-[#134686] mb-2 block">
                  Circle Description
                </Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what your circle is about, what skills you'll exchange, and who should join..."
                  className="min-h-[120px] border-2 border-[#134686]/20 focus:border-[#FEB21A]"
                />
              </div>

              <div>
                <Label className="text-[#134686] mb-2 block">
                  Location
                </Label>
                <div className="grid grid-cols-2 gap-2">
                  {locations.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => setLocation(loc)}
                      className={`p-2.5 rounded-lg border-2 text-sm transition-all ${
                        location === loc
                          ? 'bg-[#134686] border-[#134686] text-white'
                          : 'border-[#134686]/20 hover:border-[#FEB21A] text-[#134686]'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
                {location === 'Custom Location' && (
                  <Input
                    placeholder="Enter your location..."
                    value={customLocation}
                    onChange={(e) => setCustomLocation(e.target.value)}
                    className="mt-2 border-2 border-[#134686]/20 focus:border-[#FEB21A]"
                  />
                )}
              </div>

              <Button
                onClick={() => setStep(3)}
                disabled={!description.trim() || !location || (location === 'Custom Location' && !customLocation.trim())}
                className="w-full bg-[#134686] hover:bg-[#0f3666] text-white"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 3: Tags & Finalize */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="p-3 bg-[#FDF4E3] rounded-lg">
                <p className="text-sm text-[#134686]/70 mb-1">Circle Summary</p>
                <p className="font-semibold text-[#134686] mb-2">{circleName}</p>
                <div className="flex items-center gap-2 text-sm text-[#134686]/80">
                  <Badge className="bg-white text-[#134686] border border-[#134686]/20">
                    {selectedCategory}
                  </Badge>
                  <span>•</span>
                  <span>{finalLocation}</span>
                </div>
              </div>

              <div>
                <Label className="text-[#134686] mb-2 block">
                  Tags (Optional, max 5)
                </Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Add tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 border-2 border-[#134686]/20 focus:border-[#FEB21A]"
                    disabled={tags.length >= 5}
                  />
                  <Button
                    onClick={handleAddTag}
                    disabled={!newTag.trim() || tags.length >= 5}
                    className="bg-[#134686] text-white hover:bg-[#0f3666]"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-[#FEB21A] text-[#134686] cursor-pointer hover:bg-[#e5a119]"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      {tag} ×
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-[#134686]/60 mt-2">
                  Tags help members find your circle. Click a tag to remove it.
                </p>
              </div>

              <div className="bg-gradient-to-br from-[#FDF4E3] to-white rounded-lg p-4 border-2 border-[#FEB21A]/30">
                <h4 className="font-semibold text-[#134686] mb-2">📋 Before you create:</h4>
                <ul className="text-sm text-[#134686]/80 space-y-1 ml-4 list-disc">
                  <li>You'll be the circle organizer</li>
                  <li>Circles can be verified by barangay or campus orgs</li>
                  <li>Members expect regular skill exchange activities</li>
                  <li>Follow community guidelines and bayanihan spirit</li>
                </ul>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1 border-2 border-[#134686] text-[#134686] hover:bg-[#FDF4E3]"
                >
                  Back
                </Button>
                <Button
                  onClick={handleCreate}
                  className="flex-1 bg-[#134686] hover:bg-[#0f3666] text-white"
                >
                  Create Circle
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 space-y-4 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 bg-gradient-to-br from-[#134686] to-[#0f3666] rounded-full mx-auto flex items-center justify-center relative"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="absolute inset-0 bg-[#FEB21A] opacity-20 rounded-full blur-xl"
                />
                <Sparkles className="w-10 h-10 text-white relative z-10" />
              </motion.div>
              <h3 className="text-2xl text-[#134686]">🎉 Circle Created!</h3>
              <p className="text-[#134686]/70">
                <strong>{circleName}</strong> is now live.
                <br />
                Start inviting members and building your community!
              </p>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-[#FDF4E3] px-4 py-2 rounded-full border-2 border-[#FEB21A]/30">
                  <span className="text-[#134686]">🤝 Ready for bayanihan</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#FDF4E3] px-4 py-2 rounded-full">
                  <span className="text-[#134686]">+10 XP earned</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
