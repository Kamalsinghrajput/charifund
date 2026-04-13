import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Heart, User, MessageCircle, ArrowRight, ArrowUpRight } from 'lucide-react';

const articles = [
  {
    img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&auto=format&fit=crop&q=80",
    category: "Health",
    author: "Robert Fox",
    comments: 23,
    title: "Providing Medical Aid To Remote Communities Worldwide",
  },
  {
    img: "https://images.unsplash.com/photo-1497375638960-ca368c7231e4?w=600&auto=format&fit=crop&q=80",
    category: "Education",
    author: "Robert Fox",
    comments: 38,
    title: "Building Schools For Underprivileged Children In Rural Areas",
  },
  {
    img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&auto=format&fit=crop&q=80",
    category: "Food",
    author: "Robert Fox",
    comments: 13,
    title: "Feeding Programs That Change Lives Across The Globe",
  },
];

const LatestNews = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll-triggered entrance
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(".news-card",
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: "power2.out" }
          );
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    if (sectionRef.current) observer.observe(sectionRef.current);

    // Float the heart
    if (heartRef.current) {
      gsap.to(heartRef.current, {
        y: -20,
        x: 10,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Float the dots
    if (dotsRef.current) {
      const dots = dotsRef.current.children;
      gsap.to(dots, {
        y: "random(-10, 10)",
        x: "random(-8, 8)",
        duration: "random(2, 4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="news" className="py-20 lg:py-28 bg-white relative overflow-hidden">

      {/* Floating Heart Graphic - Left Side */}
      <div ref={heartRef} className="absolute left-6 lg:left-16 top-16 z-0 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path
            d="M60 110 C60 110, 10 70, 10 40 C10 18, 30 5, 45 15 C52 20, 57 28, 60 38 C63 28, 68 20, 75 15 C90 5, 110 18, 110 40 C110 70, 60 110, 60 110Z"
            fill="#FFCA08"
            opacity="0.85"
          />
        </svg>
      </div>

      {/* Floating Dots */}
      <div ref={dotsRef} className="absolute left-28 lg:left-44 top-40 z-0 pointer-events-none">
        <div className="w-3 h-3 rounded-full bg-brand-teal absolute" style={{ top: 0, left: 0 }}></div>
        <div className="w-2 h-2 rounded-full bg-brand-teal/60 absolute" style={{ top: 20, left: 15 }}></div>
        <div className="w-2.5 h-2.5 rounded-full bg-brand-teal/40 absolute" style={{ top: -10, left: 30 }}></div>
      </div>

      {/* Section Header */}
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center text-brand-teal text-lg mb-3">
            <Heart size={16} fill="currentColor" className="mr-2" />
            <span className="italic" style={{ fontFamily: "'Caveat', cursive" }}>
              Start Donating Poor People
            </span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-extrabold text-brand-dark leading-tight">
            Our Latest <span className="text-brand-teal">News</span> &amp; Articles<br />You Like
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {articles.map((article, idx) => (
            <div key={idx} className="news-card opacity-0 bg-white rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.06)] hover:shadow-xl transition-shadow group">
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl m-4 mb-0">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-56 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  style={{ filter: 'grayscale(30%)' }}
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-brand-teal text-white text-xs font-bold py-1.5 px-4 rounded-full flex items-center">
                  <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 pt-4">
                {/* Meta */}
                <div className="flex items-center text-xs text-gray-400 mb-3 space-x-4">
                  <span className="flex items-center">
                    <User size={13} className="mr-1 text-brand-yellow" />
                    {article.author}
                  </span>
                  <span className="flex items-center">
                    <MessageCircle size={13} className="mr-1 text-brand-yellow" />
                    Comments ({article.comments})
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-extrabold text-brand-dark mb-4 leading-snug hover:text-brand-teal transition-colors cursor-pointer">
                  {article.title}
                </h3>

                {/* Read More */}
                <a href="#" className="inline-flex items-center text-sm font-bold text-brand-dark hover:text-brand-teal transition-colors group/link">
                  Read More
                  <span className="w-6 h-6 rounded-full bg-brand-teal text-white flex items-center justify-center ml-2 group-hover/link:bg-brand-yellow group-hover/link:text-brand-dark transition-colors">
                    <ArrowRight size={12} />
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center bg-brand-dark text-white font-bold text-sm py-3.5 px-8 rounded-md hover:bg-brand-teal transition-all group shadow-lg">
            View All
            <ArrowUpRight size={15} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
