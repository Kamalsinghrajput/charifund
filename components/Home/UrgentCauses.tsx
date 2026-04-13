import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const UrgentCauses = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            ".cause-card",
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power2.out" }
          );
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const causes = [
    {
      title: "Provide Clean Water in Africa",
      category: "Water",
      img: "https://placehold.co/600x400/023047/white?text=Clean+Water",
      raised: 45000,
      goal: 60000,
      desc: "Help us build wells in remote villages to provide clean and safe drinking water."
    },
    {
      title: "Education for Underprivileged Kids",
      category: "Education",
      img: "https://placehold.co/600x400/FFCA08/023047?text=Education",
      raised: 25000,
      goal: 50000,
      desc: "Your donation provides school supplies, uniforms, and scholarships for children."
    },
    {
      title: "Medical Relief for Refugees",
      category: "Medical",
      img: "https://placehold.co/600x400/00715D/white?text=Medical+Relief",
      raised: 85000,
      goal: 100000,
      desc: "Supplying essential medicines and funding operations for those in crisis zones."
    }
  ];

  return (
    <section className="py-24 bg-brand-gray" ref={containerRef}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="text-brand-teal font-bold tracking-wider uppercase text-sm mb-2 block">Urgent Causes</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-dark">Find The Popular Cause <br/>And Donate Them</h2>
          </div>
          <div className="mt-6 md:mt-0">
            <div className="w-24 h-1 bg-brand-yellow rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {causes.map((cause, idx) => {
            const percentage = Math.round((cause.raised / cause.goal) * 100);
            return (
              <div key={idx} className="cause-card opacity-0 bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group flex flex-col">
                <div className="relative overflow-hidden h-64">
                  <img src={cause.img} alt={cause.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 bg-brand-yellow text-brand-dark font-bold text-sm py-1 px-4 rounded-full">
                    {cause.category}
                  </div>
                </div>
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-2xl font-bold text-brand-dark mb-3 hover:text-brand-teal transition-colors cursor-pointer">{cause.title}</h3>
                  <p className="text-gray-500 mb-6 flex-grow">{cause.desc}</p>
                  
                  <div className="mt-auto">
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2 overflow-hidden relative">
                      <div className="bg-brand-teal h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                      <div 
                        className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white border-2 border-brand-teal rounded-full"
                        style={{ left: `calc(${percentage}% - 8px)` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-sm font-bold text-brand-dark mb-6">
                      <div><span className="text-gray-500 font-normal">Raised:</span> ${cause.raised.toLocaleString()}</div>
                      <div>{percentage}%</div>
                      <div><span className="text-gray-500 font-normal">Goal:</span> ${cause.goal.toLocaleString()}</div>
                    </div>

                    <a href="#" className="block text-center w-full bg-gray-50 text-brand-dark border border-gray-200 font-bold py-3 rounded-full hover:bg-brand-yellow hover:border-brand-yellow transition-all">
                      Donate Now
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UrgentCauses;
