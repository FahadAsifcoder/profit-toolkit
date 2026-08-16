'use client';

import { useEffect } from 'react';

export default function ScrollFix() {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      // If user scrolls while a number input is focused, unfocus it
      if (
        target instanceof HTMLInputElement &&
        target.type === 'number' &&
        document.activeElement === target
      ) {
        target.blur();
      }
    };
    document.addEventListener('wheel', handleWheel, { passive: true });
    return () => document.removeEventListener('wheel', handleWheel);
  }, []);

  return null;
}