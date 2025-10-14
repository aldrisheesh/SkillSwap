import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { MapPin, Clock, Calendar, AlertCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { SkillRequest } from '../types';

interface RequestDetailModalProps {
  request: SkillRequest | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOfferHelp: (request: SkillRequest) => void;
}

export function RequestDetailModal({ request, open, onOpenChange, onOfferHelp }: RequestDetailModalProps) {
  if (!request) return null;

  const isOwnRequest = request.userName === 'You';

  const urgencyConfig = {
    low: { label: 'Flexible', color: 'bg-green-100 text-green-700 border-green-300' },
    medium: { label: 'Soon', color: 'bg-yellow-100 text-yellow-700 border-yellow-300' },
    high: { label: 'Urgent', color: 'bg-red-100 text-red-700 border-red-300' }
  };

  const urgency = urgencyConfig[request.urgency];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#FDF4E3] border-4 border-[#134686] max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#134686]">Help Request</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-3 bg-white p-4 rounded-xl">
            <Avatar className="h-16 w-16 border-2 border-[#134686]">
              <AvatarImage src={request.userAvatar} />
              <AvatarFallback className="bg-[#134686] text-white">
                {request.userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-[#134686]">{request.userName}</h3>
              <div className="flex items-center gap-1 text-sm text-[#134686]/70">
                <MapPin className="w-4 h-4" />
                <span>{request.distance}</span>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="bg-white p-4 rounded-xl space-y-3">
            <div>
              <p className="text-xs text-[#134686]/60 mb-1">Looking for help with:</p>
              <h4 className="text-lg text-[#134686]">{request.skillNeeded}</h4>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-[#134686]/30 text-[#134686]">
                {request.category}
              </Badge>
              <Badge className={urgency.color}>
                {urgency.label}
              </Badge>
            </div>

            <div className="pt-2 border-t border-[#134686]/10">
              <p className="text-sm text-[#134686]/80">{request.description}</p>
            </div>
          </div>

          {/* Time Credits & Details */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-[#FEB21A]" />
                <p className="text-xs text-[#134686]/60">Offering</p>
              </div>
              <p className="text-xl text-[#134686]">{request.timeCreditsOffered}</p>
              <p className="text-xs text-[#134686]/60">Time Credit{request.timeCreditsOffered > 1 ? 's' : ''}</p>
            </div>

            <div className="bg-white p-4 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-[#134686]" />
                <p className="text-xs text-[#134686]/60">Posted</p>
              </div>
              <p className="text-sm text-[#134686]">{request.postedDate}</p>
            </div>
          </div>

          {/* Info Box */}
          {!isOwnRequest ? (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="mb-1">
                  By offering help, you'll earn <span className="font-semibold">{request.timeCreditsOffered} Time Credit{request.timeCreditsOffered > 1 ? 's' : ''}</span> that you can use to request skills from others!
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-[#FEB21A]/10 border-2 border-[#FEB21A]/30 rounded-xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-[#FEB21A] flex-shrink-0 mt-0.5" />
              <div className="text-sm text-[#134686]">
                <p className="mb-1">
                  This is your request. Other users can see it on the map and offer to help you!
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            {!isOwnRequest ? (
              <>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="flex-1 border-2 border-[#134686] text-[#134686] hover:bg-[#134686]/10"
                >
                  Maybe Later
                </Button>
                <Button
                  onClick={() => {
                    onOfferHelp(request);
                    onOpenChange(false);
                  }}
                  className="flex-1 bg-[#134686] hover:bg-[#0f3666] text-white"
                >
                  Offer to Help
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1 border-2 border-[#134686] text-[#134686] hover:bg-[#134686]/10"
              >
                Close
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
