import { useEffect, useState } from 'react';
import logoImage from 'figma:asset/2147e4a400d68eafc89f7b7872cfbac2259d0508.png';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Complete loading after 3 seconds
    const loadingTimer = setTimeout(() => {
      onLoadingComplete();
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(loadingTimer);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#134686] via-[#1a5a9e] to-[#134686] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FEB21A] rounded-full opacity-20 blur-3xl animate-pulse" 
             style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#ED3F27] rounded-full opacity-20 blur-3xl animate-pulse" 
             style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FDF4E3] rounded-full opacity-10 blur-3xl animate-pulse" 
             style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-8">
        {/* Logo with animation */}
        <div className="relative">
          {/* Rotating ring effect */}
          <div className="absolute inset-0 -m-8 rounded-full border-4 border-[#FEB21A]/30 animate-spin" 
               style={{ animationDuration: '3s' }}></div>
          <div className="absolute inset-0 -m-12 rounded-full border-4 border-[#ED3F27]/20 animate-spin" 
               style={{ animationDuration: '4s', animationDirection: 'reverse' }}></div>
          
          {/* Logo with bounce animation */}
          <div 
            className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl shadow-2xl overflow-hidden animate-bounce"
            style={{ animationDuration: '2s' }}
          >
            <img 
              src={logoImage} 
              alt="SkillSwap Logo" 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 -m-4 bg-[#FEB21A] rounded-full opacity-30 blur-2xl animate-pulse"></div>
        </div>

        {/* App name */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl sm:text-4xl text-white tracking-wide animate-fade-in">
            SkillSwap
          </h1>
          <p className="text-base sm:text-lg text-white/90 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Exchange skills, grow together
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 sm:w-80 space-y-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-[#FEB21A] via-[#ED3F27] to-[#FEB21A] rounded-full transition-all duration-200 ease-out"
              style={{ 
                width: `${progress}%`,
                boxShadow: '0 0 20px rgba(254, 178, 26, 0.5)'
              }}
            ></div>
          </div>
          <p className="text-center text-sm text-white/70">Loading your community...</p>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 right-20 text-4xl animate-float" style={{ animationDelay: '0s' }}>
        🤝
      </div>
      <div className="absolute bottom-32 left-16 text-3xl animate-float" style={{ animationDelay: '1s' }}>
        ⭐
      </div>
      <div className="absolute top-40 left-1/4 text-2xl animate-float" style={{ animationDelay: '0.5s' }}>
        💡
      </div>
      <div className="absolute bottom-40 right-1/3 text-3xl animate-float" style={{ animationDelay: '1.5s' }}>
        🎯
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
