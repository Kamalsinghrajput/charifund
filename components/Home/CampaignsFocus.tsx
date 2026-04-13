import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Heart } from 'lucide-react';

const campaigns = [
  {
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&auto=format&fit=crop&q=80",
    title: "Empowering children's futures, one voice at a time!",
    tag: "Children, Women & Elderly",
    desc: "We are passionately committed to safeguarding children's rights and creating a brighter future for every child in need.",
    raised: 540564,
    goal: 1000000,
  },
  {
    img: "https://images.unsplash.com/photo-1497375638960-ca368c7231e4?w=600&auto=format&fit=crop&q=80",
    title: "Supporting Joyful Minds Through Education",
    tag: "Children, Women & Elderly",
    desc: "Helping underprivileged children get access to quality education and building schools in rural communities.",
    raised: 357811,
    goal: 500000,
  },
  {
    img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&auto=format&fit=crop&q=80",
    title: "Volunteer Groups Making Real Impact",
    tag: "Children, Women & Elderly",
    desc: "Help bring joy to the lives of children, women & the elderly! Join our campaign to make a lasting difference.",
    raised: 232609,
    goal: 400000,
  },
];

const CampaignsFocus = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(".campaign-card",
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.2, ease: "power2.out" }
          );
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);

    if (shapesRef.current) {
      gsap.to(shapesRef.current.children, {
        y: "random(-20, 20)",
        x: "random(-15, 15)",
        rotation: "random(-10, 10)",
        scale: "random(0.9, 1.15)",
        duration: "random(2.5, 4.5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.4
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="campaigns" className="py-20 lg:py-28 bg-gray-50 relative overflow-hidden">

      {/* Floating Graphics */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-16 left-12 w-20 h-20 rounded-full border-4 border-brand-yellow/15"></div>
        <div className="absolute bottom-24 right-16 w-28 h-28 rounded-full border-2 border-brand-teal/10"></div>
        <div className="absolute top-1/3 right-10 w-10 h-10 rounded-lg bg-brand-yellow/10 rotate-45"></div>
        <div className="absolute bottom-1/3 left-20 w-6 h-6 rounded-full bg-brand-teal/15"></div>
        <div className="absolute top-20 right-1/3 w-14 h-14 rounded-full bg-brand-yellow/8"></div>

        {/* Floating Heart */}
        <div className="absolute bottom-20 left-1/4 hidden lg:block">
          <svg width="60" height="60" viewBox="0 0 80 80" fill="none" opacity="0.12">
            <path d="M40 70 C40 70, 10 45, 10 28 C10 15, 22 10, 30 14 C35 17, 38 22, 40 28 C42 22, 45 17, 50 14 C58 10, 70 15, 70 28 C70 45, 40 70, 40 70Z" fill="#00715D" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-brand-dark leading-tight mb-3">
            Campaigns in <span className="text-brand-teal">Focus</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Every donation makes a difference. See how your contribution can change lives.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {campaigns.map((c, idx) => {
            const pct = Math.round((c.raised / c.goal) * 100);
            return (
              <div key={idx} className="campaign-card opacity-0 bg-white rounded-2xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.06)] hover:shadow-xl transition-shadow group flex flex-col">
                {/* Image with overlay text */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <h3 className="text-white font-extrabold text-lg leading-snug mb-2">{c.title}</h3>
                    <span className="bg-brand-yellow text-brand-dark text-[11px] font-bold py-1 px-3 rounded-full">{c.tag}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-500 text-sm mb-5 flex-grow leading-relaxed">{c.desc}</p>

                  {/* Raised / Goal */}
                  <div className="flex justify-between text-sm font-bold text-brand-dark mb-2">
                    <span>Raised: <span className="text-brand-teal">&#8377;{c.raised.toLocaleString()}</span></span>
                    <span>Goal: &#8377;{c.goal.toLocaleString()}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-100 rounded-full h-2 mb-5 overflow-hidden">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-brand-yellow to-brand-teal transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>

                  {/* Donate Button */}
                  <button className="w-full bg-brand-dark text-white font-bold py-3 rounded-full hover:bg-brand-teal transition-colors text-sm">
                    Donate Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* See More */}
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center text-brand-teal font-bold text-sm hover:text-brand-dark transition-colors group">
            See more <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CampaignsFocus;
