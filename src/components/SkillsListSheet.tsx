import { useCallback, useEffect, useRef, useState, type PointerEventHandler } from 'react';

import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { QuickStats } from './QuickStats';
import { NearbySkills } from './NearbySkills';
import { Skill } from '../types';

const DEFAULT_HEIGHT = 0.75;
const MIN_HEIGHT = 0.45;
const MAX_HEIGHT = 0.95;
const CLOSE_THRESHOLD = 0.35;

interface SkillsListSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkillClick: (skill: Skill) => void;
  onFilterClick: () => void;
  selectedCategories: string[];
  maxDistance: number;
}

export function SkillsListSheet({
  open,
  onOpenChange,
  onSkillClick,
  onFilterClick,
  selectedCategories,
  maxDistance
}: SkillsListSheetProps) {
  const [sheetHeight, setSheetHeight] = useState(DEFAULT_HEIGHT);
  const dragInfoRef = useRef<{
    startY: number;
    startHeight: number;
    dragging: boolean;
    pointerId: number | null;
  }>({ startY: 0, startHeight: DEFAULT_HEIGHT, dragging: false, pointerId: null });

  useEffect(() => {
    if (!open) {
      setSheetHeight(DEFAULT_HEIGHT);
    }
  }, [open]);

  const clampHeight = useCallback(
    (value: number) => Math.min(Math.max(value, MIN_HEIGHT), MAX_HEIGHT),
    [MAX_HEIGHT, MIN_HEIGHT]
  );

  const handlePointerDown = useCallback<PointerEventHandler<HTMLDivElement>>(event => {
    dragInfoRef.current = {
      startY: event.clientY,
      startHeight: sheetHeight,
      dragging: true,
      pointerId: event.pointerId
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }, [sheetHeight]);

  const handlePointerMove = useCallback<PointerEventHandler<HTMLDivElement>>(event => {
    const dragInfo = dragInfoRef.current;
    if (!dragInfo.dragging) {
      return;
    }

    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1;
    if (viewportHeight === 0) {
      return;
    }

    const deltaY = event.clientY - dragInfo.startY;
    const deltaHeight = -deltaY / viewportHeight;
    setSheetHeight(clampHeight(dragInfo.startHeight + deltaHeight));
    event.preventDefault();
  }, [clampHeight]);

  const stopDragging = useCallback<PointerEventHandler<HTMLDivElement>>(event => {
    const dragInfo = dragInfoRef.current;
    if (!dragInfo.dragging) {
      return;
    }

    if (dragInfo.pointerId !== null) {
      event.currentTarget.releasePointerCapture(dragInfo.pointerId);
    }

    dragInfoRef.current = { ...dragInfoRef.current, dragging: false, pointerId: null };

    if (sheetHeight <= CLOSE_THRESHOLD) {
      onOpenChange(false);
      return;
    }

    setSheetHeight(clampHeight(sheetHeight));
    event.preventDefault();
  }, [clampHeight, onOpenChange, sheetHeight]);

  const handlePointerCancel = useCallback<PointerEventHandler<HTMLDivElement>>(
    event => {
      const dragInfo = dragInfoRef.current;
      if (dragInfo.pointerId !== null) {
        event.currentTarget.releasePointerCapture(dragInfo.pointerId);
      }
      dragInfoRef.current = { ...dragInfoRef.current, dragging: false, pointerId: null };
      setSheetHeight(clampHeight(sheetHeight));
      event.preventDefault();
    },
    [clampHeight, sheetHeight]
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="bg-[#FDF4E3] border-t-4 border-[#134686] p-0 overflow-hidden"
        aria-describedby="skills-description"
        style={{ height: `${sheetHeight * 100}vh` }}
      >
        <div className="h-full flex flex-col overflow-hidden">
          <div
            className="flex-shrink-0 cursor-grab active:cursor-grabbing select-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={handlePointerCancel}
            role="presentation"
            style={{ touchAction: 'none' }}
          >
            <SheetHeader className="px-6 pt-6 pb-4">
              <SheetTitle className="text-[#134686]">Nearby Skills</SheetTitle>
            </SheetHeader>
            <p id="skills-description" className="sr-only">
              Browse and filter available skills from community members nearby
            </p>
            <div className="flex-shrink-0">
              <QuickStats />
            </div>
          </div>
          <div className="flex-1 bg-white rounded-t-3xl overflow-hidden min-h-0">
            <NearbySkills 
              onSkillClick={onSkillClick}
              onFilterClick={onFilterClick}
              selectedCategories={selectedCategories}
              maxDistance={maxDistance}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}