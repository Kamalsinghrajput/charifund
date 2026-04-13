import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ArrowUpRight, ArrowLeft, ArrowRight, Heart } from 'lucide-react';

const heroSlides = [
  {
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2670&auto=format&fit=crop",
    subtitle: "Start Donating Poor People",
    title: "Giving Help\nTo Those\nWho Need It.",
  },
  {
    img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2670&auto=format&fit=crop",
    subtitle: "Together We Can Make A Change",
    title: "Be The Reason\nSomeone\nSmiles Today.",
  },
  {
    img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2670&auto=format&fit=crop",
    subtitle: "Every Child Deserves A Chance",
    title: "Empowering\nCommunities\nWorldwide.",
  },
  {
    img: "https://images.unsplash.com/photo-1497375638960-ca368c7231e4?q=80&w=2670&auto=format&fit=crop",
    subtitle: "Education Changes Everything",
    title: "Building A\nBrighter\nFuture.",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sponsorsRef = useRef<HTMLDivElement>(null);
  const doodlesRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const animateText = useCallback(() => {
    if (!textRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(textRef.current.querySelector('.hero-subtitle'),
      { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
      .fromTo(textRef.current.querySelector('.hero-title'),
        { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4")
      .fromTo(textRef.current.querySelector('.hero-btns'),
        { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.3");
  }, []);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  const goNext = useCallback(() => {
    setCurrent((prev) => (prev + 1) % heroSlides.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  // Autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(goNext, 5000);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [goNext]);

  // Animate on slide change
  useEffect(() => {
    animateText();
  }, [current, animateText]);

  // Initial entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(heroRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 })
      .fromTo(sponsorsRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.1");

    // Float all doodle graphics
    if (doodlesRef.current) {
      const els = doodlesRef.current.children;
      gsap.to(els, {
        y: "random(-18, 18)",
        x: "random(-12, 12)",
        rotation: "random(-8, 8)",
        scale: "random(0.95, 1.08)",
        duration: "random(2.5, 4.5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.6
      });
    }
  }, []);

  const slide = heroSlides[current];

  return (
    <div id="hero" className="flex flex-col relative w-full overflow-hidden font-sans">

      {/* ===== HERO SECTION ===== */}
      <div ref={heroRef} className="relative w-full min-h-[92vh] flex items-center bg-brand-teal">

        {/* Background Images - All stacked, only active one visible */}
        {heroSlides.map((s, idx) => (
          <div
            key={idx}
            className="absolute inset-0 w-full h-full transition-opacity duration-1000"
            style={{ opacity: idx === current ? 1 : 0 }}
          >
            <img
              src={s.img}
              alt={`Slide ${idx + 1}`}
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(100%) brightness(0.7)' }}
            />
          </div>
        ))}

        {/* Dark Green Gradient Overlay */}
        <div className="absolute inset-0 pointer-events-none z-[5]">
          <div className="absolute top-0 left-0 w-full lg:w-[55%] h-full"
            style={{
              background: 'linear-gradient(to right, #00715d 0%, #00715dee 40%, #00715daa 70%, transparent 100%)'
            }}
          ></div>
        </div>

        {/* ===== FLOATING SKETCH DOODLES ===== */}
        <div ref={doodlesRef} className="absolute inset-0 z-[8] pointer-events-none hidden md:block">

          {/* 1. Scribble Circle - Top Left */}
          <div className="absolute left-[5%] top-[35%]">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="#FFCA08" strokeWidth="2.5" strokeLinecap="round" opacity="0.7">
              <path d="M50 10 C75 8, 92 25, 90 50 C88 75, 70 92, 48 90 C25 88, 8 72, 10 48 C12 28, 28 12, 50 10" />
              <path d="M48 15 C70 12, 85 30, 84 52 C83 70, 68 85, 50 84 C32 83, 16 68, 18 50 C20 35, 32 18, 48 15" />
            </svg>
          </div>

          {/* 2. Hand-drawn Curved Arrow - Top Right */}
          <div className="absolute right-[15%] top-[28%]">
            <svg width="120" height="80" viewBox="0 0 120 80" fill="none" stroke="#FFCA08" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
              <path d="M10 60 C20 55, 30 40, 45 30 C60 20, 80 15, 100 20" />
              <path d="M90 10 L100 20 L88 26" />
            </svg>
          </div>

          {/* 3. Squiggly Wavy Line - Left Edge Middle */}
          <div className="absolute left-[2%] top-[55%]">
            <svg width="60" height="200" viewBox="0 0 60 200" fill="none" stroke="#FFCA08" strokeWidth="3" strokeLinecap="round" opacity="0.75">
              <path d="M30 0 C45 20, 15 40, 30 60 C45 80, 15 100, 30 120 C45 140, 15 160, 30 180 C40 195, 20 200, 30 200" />
            </svg>
          </div>

          {/* 4. Sketch Star Burst - Right Side */}
          <div className="absolute right-[25%] bottom-[15%]">
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none" stroke="#FFCA08" strokeWidth="2" strokeLinecap="round" opacity="0.65">
              <path d="M35 5 L38 28 L60 15 L42 32 L65 35 L42 38 L60 55 L38 42 L35 65 L32 42 L10 55 L28 38 L5 35 L28 32 L10 15 L32 28 Z" />
            </svg>
          </div>

          {/* 5. Scattered Dots Cluster - Bottom Left */}
          <div className="absolute left-[12%] bottom-[8%]">
            <svg width="80" height="60" viewBox="0 0 80 60" fill="#FFCA08" opacity="0.5">
              <circle cx="10" cy="30" r="4" />
              <circle cx="30" cy="15" r="3" />
              <circle cx="50" cy="35" r="5" />
              <circle cx="70" cy="20" r="3.5" />
              <circle cx="25" cy="48" r="2.5" />
              <circle cx="60" cy="50" r="3" />
            </svg>
          </div>

          {/* 6. Hand-drawn Underline Swoop - Below text area */}
          <div className="absolute left-[15%] bottom-[25%] hidden lg:block">
            <svg width="200" height="30" viewBox="0 0 200 30" fill="none" stroke="#FFCA08" strokeWidth="3" strokeLinecap="round" opacity="0.5">
              <path d="M0 15 C30 25, 60 5, 90 15 C120 25, 150 8, 200 12" />
            </svg>
          </div>

        </div>

        {/* Slider Arrows */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col space-y-3">
          <button
            onClick={() => { goPrev(); if (autoplayRef.current) clearInterval(autoplayRef.current); }}
            className="w-12 h-12 rounded-full bg-brand-dark/80 hover:bg-brand-dark text-white flex items-center justify-center shadow-lg transition-all hover:scale-105"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            onClick={() => { goNext(); if (autoplayRef.current) clearInterval(autoplayRef.current); }}
            className="w-12 h-12 rounded-full bg-brand-yellow hover:brightness-110 text-brand-dark flex items-center justify-center shadow-lg transition-all hover:scale-105"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Text Content */}
        <div className="container mx-auto px-6 md:px-12 relative z-[15] flex items-center min-h-[92vh]">
          <div ref={textRef} className="max-w-xl ml-0 lg:ml-16 py-32">

            <div className="hero-subtitle flex items-center text-brand-yellow text-lg lg:text-xl mb-5">
              <Heart size={16} fill="currentColor" className="mr-2 flex-shrink-0" />
              <span className="italic" style={{ fontFamily: "'Caveat', 'Segoe Script', cursive" }}>
                {slide.subtitle}
              </span>
            </div>

            <h1 className="hero-title text-white font-extrabold text-5xl lg:text-[72px] leading-[1.08] mb-10 tracking-tight">
              {slide.title.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h1>

            <div className="hero-btns flex flex-wrap gap-4 items-center">
              <Link href="#">
                <a className="bg-brand-dark text-white font-bold text-sm py-4 px-8 rounded-md hover:bg-white hover:text-brand-dark transition-all flex items-center group shadow-xl">
                  Discover More
                  <ArrowUpRight size={15} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </Link>
              <Link href="#">
                <a className="bg-brand-yellow text-brand-dark font-bold text-sm py-4 px-8 rounded-md hover:bg-white transition-all flex items-center group shadow-xl">
                  Get A Quote
                  <ArrowUpRight size={15} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { goTo(idx); if (autoplayRef.current) clearInterval(autoplayRef.current); }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === current ? 'bg-brand-yellow scale-125 w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Bottom Torn Paper Edge */}
        <div className="absolute bottom-0 left-0 w-full z-20 overflow-hidden leading-none">
          <svg className="w-full h-10 md:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="white">
            <path d="M1200,120H0V73.71c47.79-22.2,103.59-32.17,158-28.01,49.61,3.8,98.63,22.18,148,18.73,50-3.53,99.23-28.69,149-30.34,51.13-1.7,102.58,18,154,15.65,51.81-2.39,103.11-26.42,155-27.1,51.13-.68,102.16,20.25,153,21.75,51.52,1.5,102.48-15.67,154-16.5,51.62-.83,103,16.14,154,13.88,51.1-2.26,102.55-19.32,154-15.71C1123.63,29.51,1162.29,48,1200,72.47V120Z"></path>
          </svg>
        </div>
      </div>

      {/* ===== SPONSOR LOGOS STRIP ===== */}
      <div ref={sponsorsRef} className="bg-white py-10 lg:py-14 relative z-20 border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-10 lg:gap-6 opacity-50 grayscale hover:opacity-70 transition-opacity">

            <div className="flex flex-col items-center cursor-pointer hover:opacity-100 transition-all">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" className="mb-2">
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                <line x1="4" y1="22" x2="4" y2="15"></line>
              </svg>
              <span className="font-extrabold text-[10px] uppercase tracking-[3px] text-gray-800">TheBird</span>
            </div>

            <div className="flex flex-col items-center cursor-pointer hover:opacity-100 transition-all">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" className="mb-2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span className="font-extrabold text-[10px] uppercase tracking-[3px] text-gray-800">Heart Care</span>
            </div>

            <div className="flex flex-col items-center cursor-pointer hover:opacity-100 transition-all">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" className="mb-2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 8v4l3 3"></path>
              </svg>
              <span className="font-extrabold text-[10px] uppercase tracking-[3px] text-gray-800">CharityLife</span>
            </div>

            <div className="flex flex-col items-center cursor-pointer hover:opacity-100 transition-all">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" className="mb-2">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span className="font-extrabold text-[10px] uppercase tracking-[3px] text-gray-800" style={{ fontFamily: "'Caveat', cursive" }}>Tree Life</span>
            </div>

            <div className="flex flex-col items-center cursor-pointer hover:opacity-100 transition-all">
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" className="mb-2">
                <path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
              <span className="font-extrabold text-[10px] uppercase tracking-[3px] text-gray-800">Lorem Ipsum</span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Hero;
