import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import { Badge } from '../types';

interface AchievementNotificationProps {
  badge: Badge | null;
  onClose: () => void;
}

export function AchievementNotification({ badge, onClose }: AchievementNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (badge) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        handleClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [badge]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <AnimatePresence>
      {isVisible && badge && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Achievement Card */}
          <motion.div
            initial={{ scale: 0, rotate: -10, y: 100 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            exit={{ scale: 0, rotate: 10, y: 100 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[90%] max-w-sm"
          >
            <div className="relative bg-gradient-to-br from-[#134686] via-[#1a5ba8] to-[#134686] p-6 rounded-3xl shadow-2xl border-4 border-[#FEB21A] overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: '100%', x: `${Math.random() * 100}%`, opacity: 0 }}
                    animate={{ y: '-100%', opacity: [0, 1, 0] }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                    className="absolute w-1 h-1 bg-[#FEB21A] rounded-full"
                  />
                ))}
              </div>

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 p-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="mb-4"
                >
                  <div className="relative inline-block">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="absolute inset-0 bg-[#FEB21A] opacity-20 rounded-full blur-xl"
                    />
                    <div className="relative text-7xl">
                      {badge.icon}
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-[#FEB21A]" />
                    <h3 className="text-sm uppercase tracking-wider text-[#FEB21A]">
                      Achievement Unlocked!
                    </h3>
                    <Sparkles className="w-5 h-5 text-[#FEB21A]" />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {badge.name}
                  </h2>
                  
                  <p className="text-white/80 text-sm mb-4">
                    {badge.description}
                  </p>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring' }}
                    className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
                  >
                    <span className="text-white text-sm">+50 XP</span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Decorative corners */}
              <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#FEB21A] rounded-tl-lg" />
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#FEB21A] rounded-tr-lg" />
              <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-[#FEB21A] rounded-bl-lg" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-[#FEB21A] rounded-br-lg" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
