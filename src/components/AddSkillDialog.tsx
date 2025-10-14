import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AddSkillDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkillAdded: () => void;
}

const skillCategories = [
  { name: 'Technology', icon: '💻', skills: ['Web Development', 'Mobile Development', 'Data Analysis', 'IT Support', 'Graphic Design Software'] },
  { name: 'Education', icon: '📚', skills: ['Math Tutoring', 'English Tutoring', 'Science Tutoring', 'Language Teaching', 'Test Preparation'] },
  { name: 'Music & Arts', icon: '🎨', skills: ['Guitar Lessons', 'Piano Lessons', 'Painting', 'Drawing', 'Photography'] },
  { name: 'Home Services', icon: '🔧', skills: ['Plumbing', 'Electrical Work', 'Carpentry', 'Appliance Repair', 'Gardening'] },
  { name: 'Creative', icon: '✨', skills: ['Graphic Design', 'Video Editing', 'Writing', 'Content Creation', 'UI/UX Design'] },
  { name: 'Health & Fitness', icon: '💪', skills: ['Personal Training', 'Yoga', 'Nutrition Coaching', 'Meditation', 'Sports Coaching'] },
  { name: 'Language', icon: '🗣️', skills: ['English', 'Spanish', 'Mandarin', 'Filipino/Tagalog', 'French'] },
  { name: 'Cooking', icon: '🍳', skills: ['Baking', 'International Cuisine', 'Meal Prep', 'Vegetarian Cooking', 'Traditional Filipino Cooking'] }
];

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function AddSkillDialog({ open, onOpenChange, onSkillAdded }: AddSkillDialogProps) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [customSkill, setCustomSkill] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [creditRate, setCreditRate] = useState<number>(1);
  const [availability, setAvailability] = useState<string[]>([]);

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setSelectedCategory('');
      setSelectedSkill('');
      setCustomSkill('');
      setDescription('');
      setCreditRate(1);
      setAvailability([]);
    }, 300);
  };

  const handleConfirm = () => {
    // Simulate skill addition
    setTimeout(() => {
      setStep(5);
      setTimeout(() => {
        onSkillAdded();
        handleClose();
      }, 2000);
    }, 500);
  };

  const toggleDay = (day: string) => {
    if (availability.includes(day)) {
      setAvailability(availability.filter(d => d !== day));
    } else {
      setAvailability([...availability, day]);
    }
  };

  const currentCategory = skillCategories.find(c => c.name === selectedCategory);
  const finalSkillName = selectedSkill === 'custom' ? customSkill : selectedSkill;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg bg-white border-2 border-[#134686]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#134686] flex items-center gap-2">
            {step > 1 && step < 5 && (
              <button
                onClick={() => setStep(step - 1)}
                className="p-1 hover:bg-[#FDF4E3] rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            Share Your Skills 🤝
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {/* Step 1: Select Category */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-br from-[#FDF4E3] to-white rounded-lg p-4 border-2 border-[#134686]/10 mb-4">
                <p className="text-sm text-[#134686]">
                  <strong>🤝 Bayanihan Spirit:</strong> Share your knowledge with the community. Every skill you offer strengthens our local economy and helps someone in need.
                </p>
              </div>
              
              <div>
                <Label className="text-[#134686] mb-3 block">
                  What category does your skill belong to?
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {skillCategories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                        selectedCategory === category.name
                          ? 'bg-[#134686] border-[#134686] text-white'
                          : 'bg-white border-[#134686]/20 text-[#134686] hover:border-[#FEB21A]'
                      }`}
                    >
                      <span className="text-2xl">{category.icon}</span>
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
                disabled={!selectedCategory}
                className="w-full bg-[#134686] hover:bg-[#0f3666] text-white"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 2: Select or Enter Skill */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="p-3 bg-[#FDF4E3] rounded-lg">
                <p className="text-sm text-[#134686]/70">Category</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{currentCategory?.icon}</span>
                  <p className="font-semibold text-[#134686]">{selectedCategory}</p>
                </div>
              </div>

              <div>
                <Label className="text-[#134686] mb-3 block">
                  Select your skill or enter a custom one
                </Label>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {currentCategory?.skills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => {
                        setSelectedSkill(skill);
                        setCustomSkill('');
                      }}
                      className={`p-3 rounded-lg border-2 text-sm transition-all ${
                        selectedSkill === skill
                          ? 'bg-[#134686] border-[#134686] text-white'
                          : 'bg-white border-[#134686]/20 text-[#134686] hover:border-[#FEB21A]'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                  <button
                    onClick={() => setSelectedSkill('custom')}
                    className={`p-3 rounded-lg border-2 text-sm transition-all ${
                      selectedSkill === 'custom'
                        ? 'bg-[#134686] border-[#134686] text-white'
                        : 'bg-white border-[#134686]/20 text-[#134686] hover:border-[#FEB21A]'
                    }`}
                  >
                    ✏️ Custom
                  </button>
                </div>

                {selectedSkill === 'custom' && (
                  <Input
                    placeholder="Enter your skill name..."
                    value={customSkill}
                    onChange={(e) => setCustomSkill(e.target.value)}
                    className="border-2 border-[#134686]/20 focus:border-[#FEB21A]"
                  />
                )}
              </div>

              <Button
                onClick={() => setStep(3)}
                disabled={!selectedSkill || (selectedSkill === 'custom' && !customSkill.trim())}
                className="w-full bg-[#134686] hover:bg-[#0f3666] text-white"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 3: Description & Rate */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="p-3 bg-[#FDF4E3] rounded-lg">
                <p className="text-sm text-[#134686]/70 mb-1">Your Skill</p>
                <p className="font-semibold text-[#134686]">{finalSkillName}</p>
                <Badge className="mt-1 bg-white text-[#134686] border border-[#134686]/20">
                  {selectedCategory}
                </Badge>
              </div>

              <div>
                <Label className="text-[#134686] mb-2 block">
                  Describe your skill and experience
                </Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Share your experience, what you can teach, and what makes you qualified..."
                  className="min-h-[120px] border-2 border-[#134686]/20 focus:border-[#FEB21A]"
                />
              </div>

              <div className="bg-gradient-to-br from-[#FDF4E3] to-white rounded-lg p-4 border-2 border-[#FEB21A]/30">
                <Label className="text-[#134686] mb-2 block">
                  ⏱️ Time Credits per Hour
                </Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setCreditRate(rate)}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        creditRate === rate
                          ? 'bg-[#134686] border-[#134686] text-white'
                          : 'border-[#134686]/20 hover:border-[#FEB21A] text-[#134686]'
                      }`}
                    >
                      {rate}
                    </button>
                  ))}
                </div>
                <div className="mt-3 p-3 bg-white rounded-lg border border-[#134686]/10">
                  <p className="text-xs text-[#134686]/80">
                    <strong>Time Banking Principle:</strong> All contributions are valued equally. 1 hour = 1 Time Credit for most skills. Higher rates only for highly specialized expertise requiring years of training.
                  </p>
                </div>
              </div>

              <Button
                onClick={() => setStep(4)}
                disabled={!description.trim()}
                className="w-full bg-[#134686] hover:bg-[#0f3666] text-white"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 4: Availability */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="p-3 bg-[#FDF4E3] rounded-lg">
                <p className="text-sm text-[#134686]/70 mb-1">Skill Summary</p>
                <p className="font-semibold text-[#134686] mb-2">{finalSkillName}</p>
                <div className="flex items-center gap-2 text-sm text-[#134686]/80">
                  <Badge className="bg-white text-[#134686] border border-[#134686]/20">
                    {selectedCategory}
                  </Badge>
                  <span>•</span>
                  <span>{creditRate} credit/hour</span>
                </div>
              </div>

              <div>
                <Label className="text-[#134686] mb-3 block">
                  When are you available?
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {daysOfWeek.map((day) => (
                    <button
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        availability.includes(day)
                          ? 'bg-[#134686] border-[#134686] text-white'
                          : 'border-[#134686]/20 hover:border-[#FEB21A] text-[#134686]'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#134686]/60 mt-2">
                  Select the days you're generally available
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep(3)}
                  className="flex-1 border-2 border-[#134686] text-[#134686] hover:bg-[#FDF4E3]"
                >
                  Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={availability.length === 0}
                  className="flex-1 bg-[#134686] hover:bg-[#0f3666] text-white"
                >
                  Share Skill
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Success */}
          {step === 5 && (
            <motion.div
              key="step5"
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
              <h3 className="text-2xl text-[#134686]">🤝 Skill Shared!</h3>
              <p className="text-[#134686]/70">
                <strong>{finalSkillName}</strong> is now available to your barangay community.
                <br />
                You can now earn Time Credits by helping others!
              </p>
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 bg-[#FDF4E3] px-4 py-2 rounded-full border-2 border-[#FEB21A]/30">
                  <span className="text-[#134686]">⏱️ Ready to earn Time Credits</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-[#FDF4E3] px-4 py-2 rounded-full">
                  <span className="text-[#134686]">+5 XP earned</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
