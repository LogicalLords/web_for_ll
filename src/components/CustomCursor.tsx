import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('button, a, input, textarea, select, [role="button"], .cursor-pointer')
        );
        setIsPointer(isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Central Core Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isPointer ? 1.5 : 1})`,
          width: '5px',
          height: '5px',
          backgroundColor: isPointer ? '#00D1FF' : '#ffffff',
          boxShadow: isPointer ? '0 0 10px #00D1FF' : '0 0 4px #ffffff',
        }}
      />

      {/* Outer Energy Ring */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[99] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-150 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isPointer ? 1.8 : 1})`,
          width: '28px',
          height: '28px',
          borderColor: isPointer ? '#00D1FF' : 'rgba(255, 255, 255, 0.2)',
          backgroundColor: isPointer ? 'rgba(0, 209, 255, 0.08)' : 'transparent',
          boxShadow: isPointer ? '0 0 12px rgba(0, 209, 255, 0.3)' : 'none',
        }}
      />
    </>
  );
};
