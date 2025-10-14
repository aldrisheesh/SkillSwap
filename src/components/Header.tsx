import { Coins, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const timeCredits = 6; // Balance: 24 earned - 18 spent
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b-4 border-[#134686] px-4 py-3 shadow-lg">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center gap-3">
          <Avatar className="w-12 h-12 border-3 border-[#FEB21A] shadow-md">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user1" />
            <AvatarFallback className="bg-[#134686] text-white">JD</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-[#134686]">John Doe</h3>
            <p className="text-xs text-[#134686]/60">Level 5 Swapper</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="bg-[#FDF4E3] border-2 border-[#FEB21A] rounded-full px-3 py-1.5 flex items-center gap-2 shadow-sm">
            <Coins className="w-5 h-5 text-[#FEB21A]" />
            <div className="text-right">
              <p className="text-[#134686] leading-none">{timeCredits}</p>
              <p className="text-[9px] text-[#134686]/60 leading-none">Credits</p>
            </div>
          </div>
          <button 
            onClick={onMenuClick}
            className="p-2 hover:bg-[#FDF4E3] rounded-full transition-colors border-2 border-[#134686]/20"
          >
            <Menu className="w-5 h-5 text-[#134686]" />
          </button>
        </div>
      </div>
    </div>
  );
}
