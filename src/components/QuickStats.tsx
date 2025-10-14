import { Coins, Users, Award, ArrowDownCircle } from 'lucide-react';

export function QuickStats() {
  const creditsEarned = 24;
  const creditsSpent = 18;
  const creditsBalance = creditsEarned - creditsSpent;

  return (
    <div className="p-4 space-y-3">
      {/* Time Credits Balance - Prominent Display */}
      <div className="bg-gradient-to-br from-[#134686] to-[#0f3666] rounded-xl p-4 border-2 border-[#134686] shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#FEB21A] rounded-full flex items-center justify-center">
              <Coins className="w-5 h-5 text-[#134686]" />
            </div>
            <span className="text-sm text-white/90">Time Credits Balance</span>
          </div>
        </div>
        <p className="text-3xl text-white mb-1">{creditsBalance}</p>
        <div className="flex gap-4 text-xs text-white/70">
          <span>Earned: {creditsEarned}</span>
          <span>•</span>
          <span>Spent: {creditsSpent}</span>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-xl p-3 border-2 border-[#134686]/10 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 bg-[#FEB21A] rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-[#134686]" />
            </div>
            <span className="text-xs text-[#134686]/70">Neighbors</span>
          </div>
          <p className="text-xl text-[#134686]">42</p>
        </div>

        <div className="bg-white rounded-xl p-3 border-2 border-[#134686]/10 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 bg-[#FEB21A] rounded-full flex items-center justify-center">
              <Award className="w-4 h-4 text-[#134686]" />
            </div>
            <span className="text-xs text-[#134686]/70">Badges</span>
          </div>
          <p className="text-xl text-[#134686]">7</p>
        </div>
      </div>
    </div>
  );
}
