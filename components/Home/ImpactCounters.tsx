import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const ImpactCounters = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const stats = [
    { label: "Total Campaigns", value: 350, suffix: "+" },
    { label: "Raised Funds", value: 12, suffix: "M" },
    { label: "Satisfied Donors", value: 8500, suffix: "+" },
    { label: "Happy Volunteers", value: 450, suffix: "+" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        // Animate container
        gsap.fromTo(
          containerRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 }
        );

        // Animate numbers
        stats.forEach((_, idx) => {
          gsap.fromTo(
            `#counter-${idx}`,
            { innerHTML: 0 },
            { 
              innerHTML: stats[idx].value, 
              duration: 2, 
              ease: "power2.out",
              snap: { innerHTML: 1 },
              onUpdate: function() {
                const el = document.getElementById(`counter-${idx}`);
                if(el) {
                  // Format number with commas during animation
                  const val = Math.round(Number(this.targets()[0].innerHTML));
                  el.innerHTML = val.toLocaleString();
                }
              }
            }
          );
        });
      }
    }, { threshold: 0.5 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated, stats]);

  return (
    <section className="relative py-24 bg-brand-dark overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://placehold.co/1000x1000/ffffff/ffffff?text=Pattern')] bg-repeat"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10" ref={containerRef} style={{ opacity: 0 }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-x-0 md:divide-x divide-white/20">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-4">
              <div className="text-5xl md:text-6xl font-extrabold text-brand-yellow mb-2 flex justify-center items-end">
                <span id={`counter-${idx}`}>0</span>
                <span>{stat.suffix}</span>
              </div>
              <p className="text-white text-lg font-bold">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactCounters;
