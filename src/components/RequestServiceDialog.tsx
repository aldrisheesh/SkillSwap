import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Clock, Calendar as CalendarIcon, FileText, Check, Coins, ArrowLeft } from 'lucide-react';
import { Skill, TimeSlot } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface RequestServiceDialogProps {
  skill: Skill | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequestConfirmed: () => void;
}

const timeSlots: TimeSlot[] = [
  { time: '9:00 AM', available: true },
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: false },
  { time: '1:00 PM', available: true },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: true },
  { time: '4:00 PM', available: false },
  { time: '5:00 PM', available: true },
];

export function RequestServiceDialog({ skill, open, onOpenChange, onRequestConfirmed }: RequestServiceDialogProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [duration, setDuration] = useState(1);
  const [notes, setNotes] = useState('');

  const handleConfirm = () => {
    // Simulate request submission
    setTimeout(() => {
      setStep(4);
      setTimeout(() => {
        onRequestConfirmed();
        handleClose();
      }, 2000);
    }, 500);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setSelectedDate(undefined);
      setSelectedTime('');
      setDuration(1);
      setNotes('');
    }, 300);
  };

  if (!skill) return null;

  const totalCredits = skill.timeCredits * duration;

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
            Request Service
          </DialogTitle>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {/* Step 1: Select Date */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3 p-3 bg-[#FDF4E3] rounded-lg">
                <Avatar className="w-12 h-12 border-2 border-[#FEB21A]">
                  <AvatarImage src={skill.userAvatar} />
                  <AvatarFallback>{skill.userName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-[#134686]">{skill.userName}</p>
                  <p className="text-sm text-[#134686]/70">{skill.skill}</p>
                </div>
              </div>

              <div>
                <Label className="text-[#134686] mb-3 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Select a Date
                </Label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border-2 border-[#134686]/20"
                  disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                />
              </div>

              <Button
                onClick={() => setStep(2)}
                disabled={!selectedDate}
                className="w-full bg-[#134686] hover:bg-[#0f3666] text-white"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 2: Select Time */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="p-3 bg-[#FDF4E3] rounded-lg">
                <p className="text-sm text-[#134686]/70">Selected Date</p>
                <p className="font-semibold text-[#134686]">
                  {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
              </div>

              <div>
                <Label className="text-[#134686] mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Select Time Slot
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedTime === slot.time
                          ? 'bg-[#134686] border-[#134686] text-white'
                          : slot.available
                          ? 'border-[#134686]/20 hover:border-[#FEB21A] text-[#134686]'
                          : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <p className="text-sm">{slot.time}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-[#134686] mb-2">Duration (hours)</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((hours) => (
                    <button
                      key={hours}
                      onClick={() => setDuration(hours)}
                      className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                        duration === hours
                          ? 'bg-[#134686] border-[#134686] text-white'
                          : 'border-[#134686]/20 hover:border-[#FEB21A] text-[#134686]'
                      }`}
                    >
                      {hours}h
                    </button>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between p-2 bg-[#FEB21A]/20 rounded-lg">
                  <span className="text-sm text-[#134686]">Total Credits:</span>
                  <div className="flex items-center gap-1 text-[#134686]">
                    <Coins className="w-4 h-4" />
                    <span className="font-semibold">{totalCredits}</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setStep(3)}
                disabled={!selectedTime}
                className="w-full bg-[#134686] hover:bg-[#0f3666] text-white"
              >
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step 3: Add Notes */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="space-y-2 p-3 bg-[#FDF4E3] rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-[#134686]/70">Date:</span>
                  <span className="text-[#134686] font-semibold">
                    {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#134686]/70">Time:</span>
                  <span className="text-[#134686] font-semibold">{selectedTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#134686]/70">Duration:</span>
                  <span className="text-[#134686] font-semibold">{duration} hour{duration > 1 ? 's' : ''}</span>
                </div>
              </div>

              <div>
                <Label className="text-[#134686] mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Additional Notes (Optional)
                </Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any specific requests or details..."
                  className="min-h-[120px] border-2 border-[#134686]/20 focus:border-[#FEB21A]"
                />
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
                  onClick={handleConfirm}
                  className="flex-1 bg-[#134686] hover:bg-[#0f3666] text-white"
                >
                  Confirm Request
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
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
                className="w-20 h-20 bg-[#134686] rounded-full mx-auto flex items-center justify-center"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl text-[#134686]">Request Sent!</h3>
              <p className="text-[#134686]/70">
                {skill.userName} will be notified of your request.
                <br />
                You'll receive a message once they respond.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
