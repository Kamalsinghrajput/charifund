import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Plus } from 'lucide-react';

const members = [
  {
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80",
    name: "Rajesh Kumar",
    role: "Founder & CEO",
  },
  {
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
    name: "Priya Sharma",
    role: "Chief Operations Officer",
  },
  {
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=500&auto=format&fit=crop&q=80",
    name: "Arjun Mehta",
    role: "Head of Programs",
  },
  {
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=80",
    name: "Ananya Iyer",
    role: "Director of Outreach",
  },
];

const BoardMembers = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(".member-card",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }
          );
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);

    if (shapesRef.current) {
      gsap.to(shapesRef.current.children, {
        y: "random(-18, 18)",
        x: "random(-12, 12)",
        rotation: "random(-8, 8)",
        scale: "random(0.9, 1.1)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white relative overflow-hidden">

      {/* Floating Graphics */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-10 right-16 w-24 h-24 rounded-full border-4 border-brand-yellow/15"></div>
        <div className="absolute bottom-16 left-12 w-16 h-16 rounded-xl bg-brand-teal/5 rotate-45"></div>
        <div className="absolute top-1/2 left-10 w-10 h-10 rounded-full bg-brand-yellow/10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full border-2 border-brand-teal/8"></div>
        <div className="absolute top-1/4 left-1/3 w-5 h-5 rounded-full bg-brand-teal/12"></div>

        {/* Heart */}
        <div className="absolute top-20 left-16 hidden lg:block">
          <svg width="50" height="50" viewBox="0 0 80 80" fill="none" opacity="0.1">
            <path d="M40 70 C40 70, 10 45, 10 28 C10 15, 22 10, 30 14 C35 17, 38 22, 40 28 C42 22, 45 17, 50 14 C58 10, 70 15, 70 28 C70 45, 40 70, 40 70Z" fill="#FFCA08" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-5xl font-extrabold text-brand-dark leading-tight mb-3">
            Our Board <span className="text-brand-teal">Members</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Our Board Members provide strategic guidance, governance, and oversight to ensure the organization&apos;s growth and long-term impact.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {members.map((m, idx) => (
            <div key={idx} className="member-card opacity-0 group">
              <div className="relative overflow-hidden rounded-2xl shadow-lg bg-gray-100">
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Plus button */}
                <div className="absolute bottom-4 right-4 z-10">
                  <button className="w-10 h-10 rounded-full bg-brand-yellow text-brand-dark flex items-center justify-center shadow-lg hover:bg-brand-teal hover:text-white transition-colors hover:scale-110 transform">
                    <Plus size={20} strokeWidth={3} />
                  </button>
                </div>
              </div>

              {/* Name & Role */}
              <div className="mt-4 text-center">
                <h4 className="text-lg font-extrabold text-brand-dark group-hover:text-brand-teal transition-colors">{m.name}</h4>
                <p className="text-sm text-gray-400 font-medium">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardMembers;
