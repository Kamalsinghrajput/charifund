import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Apple, Droplets, Stethoscope, GraduationCap, ArrowRight } from 'lucide-react';

const ServicesMission = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple intersection observer to trigger GSAP when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            ".service-card", 
            { y: 50, opacity: 0 }, 
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" }
          );
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    if (shapesRef.current) {
      gsap.to(shapesRef.current.children, {
        y: "-=30",
        x: "+=20",
        rotation: 45,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5
      });
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    { title: "Healthy Food", icon: <Apple size={36} />, bg: "bg-red-50", color: "text-red-500" },
    { title: "Clean Water", icon: <Droplets size={36} />, bg: "bg-blue-50", color: "text-blue-500" },
    { title: "Medical Care", icon: <Stethoscope size={36} />, bg: "bg-teal-50", color: "text-teal-500" },
    { title: "Education", icon: <GraduationCap size={36} />, bg: "bg-yellow-50", color: "text-brand-yellow" },
  ];

  return (
    <section id="services" className="py-20 bg-brand-gray relative overflow-hidden" ref={containerRef}>
      {/* Floating Shapes */}
      <div ref={shapesRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-16 h-16 rounded-3xl bg-brand-yellow/10"></div>
        <div className="absolute bottom-10 right-20 w-24 h-24 rounded-full border-8 border-brand-teal/5"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-teal font-bold tracking-wider uppercase text-sm mb-2 block">Our Mission</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark mb-4">We Believe That We Can Save More Lifes</h2>
          <div className="w-24 h-1 bg-brand-yellow mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((svc, idx) => (
            <div key={idx} className="service-card opacity-0 bg-white rounded-2xl p-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all transform hover:-translate-y-2 group">
              <div className={`w-24 h-24 mx-auto rounded-full ${svc.bg} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className={svc.color}>{svc.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-brand-dark mb-4 group-hover:text-brand-teal transition-colors">{svc.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Providing essential support to communities in need, ensuring a brighter and more sustainable future.
              </p>
              <div className="mt-6 flex justify-center">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-brand-dark hover:bg-brand-yellow hover:text-white transition-colors group-hover:animate-bounce">
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesMission;
