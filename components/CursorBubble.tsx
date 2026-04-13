import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CursorBubble = () => {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client, skip SSR
    if (typeof window === 'undefined') return;

    const bubble = bubbleRef.current;
    const dot = dotRef.current;
    if (!bubble || !dot) return;

    const onMouseMove = (e: MouseEvent) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
      gsap.to(bubble, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const onMouseEnterLink = () => {
      gsap.to(bubble, { scale: 2.5, opacity: 0.15, duration: 0.3 });
    };

    const onMouseLeaveLink = () => {
      gsap.to(bubble, { scale: 1, opacity: 0.4, duration: 0.3 });
    };

    const attachHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea');
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    // Listen to mousemove on the entire document
    document.addEventListener('mousemove', onMouseMove);

    // Attach hover listeners initially
    attachHoverListeners();

    // Re-attach when DOM changes (route changes, dynamic content)
    const mutationObserver = new MutationObserver(() => {
      attachHoverListeners();
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <div
        ref={bubbleRef}
        className="fixed top-0 left-0 pointer-events-none hidden lg:block"
        style={{
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: '50%',
          border: '2px solid #FFCA08',
          opacity: 0.4,
          zIndex: 99999,
        }}
      />
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none hidden lg:block"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: '50%',
          backgroundColor: '#FFCA08',
          zIndex: 99999,
        }}
      />
    </>
  );
};

export default CursorBubble;
