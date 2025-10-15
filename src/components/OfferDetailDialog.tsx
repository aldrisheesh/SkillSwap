import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Check, X, Coins } from 'lucide-react';

interface OfferDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  userAvatar: string;
  skillNeeded: string;
  description: string;
  timeCredits: number;
  onAccept: () => void;
  onDecline: () => void;
}

export function OfferDetailDialog({
  open,
  onOpenChange,
  userName,
  userAvatar,
  skillNeeded,
  description,
  timeCredits,
  onAccept,
  onDecline
}: OfferDetailDialogProps) {
  const handleAccept = () => {
    onAccept();
    onOpenChange(false);
  };

  const handleDecline = () => {
    onDecline();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white border-2 border-[#134686]/20">
        <DialogHeader>
          <DialogTitle className="text-[#134686]">Help Offer</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Info */}
          <div className="flex items-center gap-4 p-4 bg-[#FDF4E3] rounded-xl">
            <Avatar className="w-16 h-16 border-2 border-[#FEB21A]">
              <AvatarImage src={userAvatar} />
              <AvatarFallback>{userName[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-[#134686] truncate">{userName}</h3>
              <p className="text-sm text-[#134686]/70">wants to help you</p>
            </div>
          </div>

          {/* Skill Details */}
          <div className="space-y-3">
            <div>
              <h4 className="text-sm text-[#134686]/70 mb-1">Service</h4>
              <p className="text-[#134686]">{skillNeeded}</p>
            </div>

            <div>
              <h4 className="text-sm text-[#134686]/70 mb-1">Description</h4>
              <p className="text-sm text-[#134686]/80">{description}</p>
            </div>

            <div className="flex items-center gap-2 p-3 bg-[#FEB21A]/10 rounded-lg">
              <Coins className="w-5 h-5 text-[#FEB21A]" />
              <span className="text-[#134686]">
                {timeCredits} Time Credit{timeCredits !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={handleDecline}
              variant="outline"
              className="border-2 border-[#ED3F27] text-[#ED3F27] hover:bg-[#ED3F27] hover:text-white"
            >
              <X className="w-4 h-4 mr-2" />
              Decline
            </Button>
            <Button
              onClick={handleAccept}
              className="bg-[#134686] text-white hover:bg-[#0f3666]"
            >
              <Check className="w-4 h-4 mr-2" />
              Accept
            </Button>
          </div>

          <p className="text-xs text-center text-[#134686]/60">
            Accepting will add this exchange to your schedule
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}