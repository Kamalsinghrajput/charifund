import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const galleryItems = [
  {
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&auto=format&fit=crop&q=80",
    title: "Old People & Child Trouble",
    category: "Child & Old Care"
  },
  {
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80",
    title: "Help The Children Smile",
    category: "Education & Growth"
  },
  {
    src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&auto=format&fit=crop&q=80",
    title: "Volunteer With Love",
    category: "Community Support"
  },
  {
    src: "https://images.unsplash.com/photo-1594708767771-a7502209ff51?w=800&auto=format&fit=crop&q=80",
    title: "Clean Water Mission",
    category: "Health & Wellness"
  },
  {
    src: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&auto=format&fit=crop&q=80",
    title: "Feed The Hungry",
    category: "Food & Nutrition"
  },
];

const GalleryCarousel = () => {
  const [current, setCurrent] = useState(1);
  const cardsRef = useRef<HTMLDivElement>(null);

  const getVisibleItems = () => {
    const len = galleryItems.length;
    const prev = (current - 1 + len) % len;
    const next = (current + 1) % len;
    return [prev, current, next];
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % galleryItems.length);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
      );
    }
  }, [current]);

  // Scroll-triggered entrance
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(sectionRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
          );
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const visible = getVisibleItems();

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white relative overflow-hidden" style={{ opacity: 0 }}>
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Cards Row */}
        <div className="relative flex items-center justify-center">

          {/* Left Arrow */}
          <button
            onClick={goPrev}
            className="absolute left-0 lg:left-4 z-20 w-12 h-12 rounded-full bg-brand-dark text-white flex items-center justify-center shadow-xl hover:bg-brand-teal transition-colors hover:scale-110"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Cards */}
          <div ref={cardsRef} className="flex items-center justify-center gap-4 lg:gap-6 w-full max-w-5xl px-14">
            {visible.map((itemIdx, posIdx) => {
              const item = galleryItems[itemIdx];
              const isCenter = posIdx === 1;

              return (
                <div
                  key={`${itemIdx}-${posIdx}`}
                  className={`relative overflow-hidden rounded-3xl shadow-xl transition-all duration-500 flex-shrink-0 ${
                    isCenter
                      ? 'w-[50%] lg:w-[45%] z-10'
                      : 'w-[30%] lg:w-[30%] z-0 hidden md:block'
                  }`}
                  style={{
                    transform: isCenter
                      ? 'perspective(800px) rotateY(0deg) scale(1)'
                      : posIdx === 0
                        ? 'perspective(800px) rotateY(12deg) scale(0.9)'
                        : 'perspective(800px) rotateY(-12deg) scale(0.9)',
                  }}
                >
                  <div className={`aspect-[4/3] overflow-hidden ${isCenter ? '' : 'opacity-80'}`}>
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      style={{ filter: 'grayscale(80%)' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={goNext}
            className="absolute right-0 lg:right-4 z-20 w-12 h-12 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center shadow-xl hover:bg-brand-teal hover:text-white transition-colors hover:scale-110"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Title Below */}
        <div className="text-center mt-10">
          <h3 className="text-2xl lg:text-3xl font-extrabold text-brand-dark mb-1">
            {galleryItems[current].title}
          </h3>
          <p className="text-sm text-gray-400 font-medium">{galleryItems[current].category}</p>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {galleryItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === current ? 'bg-brand-yellow scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default GalleryCarousel;
