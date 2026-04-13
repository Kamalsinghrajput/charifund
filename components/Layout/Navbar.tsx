import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, Phone, Heart, ChevronDown, Search, ArrowUpRight, Menu, X, Headphones } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', href: '#hero' },
    { title: 'About Us', href: '#about' },
    { title: 'Services', href: '#services' },
    { title: 'Campaigns', href: '#campaigns' },
    { title: 'News', href: '#news' },
    { title: 'Contact Us', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed w-full top-0 z-50">

      {/* ===== TOP BAR ===== */}
      {!isScrolled && (
        <div className="bg-brand-dark text-white text-xs py-2.5 px-4">
          <div className="container mx-auto flex justify-between items-center max-w-7xl">

            {/* Left - Contact */}
            <div className="flex space-x-5 items-center">
              <a href="mailto:support@example.com" className="flex items-center hover:text-brand-yellow transition-colors">
                <Mail size={12} className="mr-1.5 text-brand-yellow" />
                support@example.com
              </a>
              <a href="tel:+23055873407" className="hidden md:flex items-center hover:text-brand-yellow transition-colors">
                <Phone size={12} className="mr-1.5 text-brand-yellow" />
                +2(305) 587-3407
              </a>
            </div>

            {/* Center - Volunteer CTA pill */}
            <div className="hidden lg:flex items-center bg-brand-yellow/10 border border-brand-yellow/30 rounded-full px-5 py-1 text-brand-yellow font-semibold text-xs">
              <Heart size={12} className="mr-1.5" fill="currentColor" />
              Are You Ready To Help Them? Let&apos;s Become A Volunteer!
            </div>

            {/* Right - Currency, Language, Social */}
            <div className="flex items-center space-x-5">
              <div className="hidden md:flex items-center space-x-4 text-white/70">
                <button className="flex items-center hover:text-white transition-colors text-xs">
                  USD <ChevronDown size={10} className="ml-1" />
                </button>
                <button className="flex items-center hover:text-white transition-colors text-xs">
                  <span className="w-3.5 h-2.5 bg-red-500 rounded-sm mr-1.5 flex-shrink-0"></span>
                  English <ChevronDown size={10} className="ml-1" />
                </button>
              </div>
              <div className="flex items-center space-x-3 text-white/60 text-xs font-bold">
                <a href="#" className="hover:text-brand-yellow transition-colors">f</a>
                <a href="#" className="hover:text-brand-yellow transition-colors">v</a>
                <a href="#" className="hover:text-brand-yellow transition-colors">y</a>
                <a href="#" className="hover:text-brand-yellow transition-colors">in</a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ===== MAIN NAVBAR — Always White ===== */}
      <nav className="w-full bg-white shadow-md py-2.5">
        <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">

          {/* Logo */}
          <Link href="/">
            <a className="flex items-center text-2xl font-extrabold text-brand-dark">
              <div className="w-9 h-9 rounded-full bg-brand-yellow mr-2 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-brand-teal">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
                </svg>
              </div>
              Charifund
            </a>
          </Link>

          {/* Center — Yellow Pill Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="bg-brand-yellow rounded-full flex items-center shadow-sm">

              {/* Nav Links */}
              <div className="flex items-center space-x-0 pl-5 pr-2 py-1">
                {navLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="flex items-center text-brand-dark font-bold text-sm px-3 py-2.5 hover:opacity-60 transition-opacity whitespace-nowrap cursor-pointer"
                  >
                    {link.title}
                  </a>
                ))}
              </div>

              {/* Divider + Call Section inside pill */}
              <div className="flex items-center border-l-2 border-brand-dark/10 pl-4 pr-5 py-2 ml-1">
                <div className="w-9 h-9 rounded-full border-2 border-brand-dark/30 flex items-center justify-center mr-3 flex-shrink-0">
                  <Headphones size={16} className="text-brand-dark" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[9px] font-bold text-brand-dark/50 uppercase tracking-widest">Call Us Now</span>
                  <span className="text-sm font-extrabold text-brand-dark whitespace-nowrap">(+01)-793-7938</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right — Search + Donate Now */}
          <div className="flex items-center space-x-3">
            <button className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full text-brand-dark hover:bg-gray-100 transition-colors">
              <Search size={19} strokeWidth={2.5} />
            </button>
            <Link href="#">
              <a className="hidden lg:flex items-center bg-brand-yellow text-brand-dark font-bold text-sm py-3 px-7 rounded-full hover:brightness-95 transition-all group shadow-sm">
                Donate Now
                <ArrowUpRight size={15} className="ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </Link>
            <button
              className="lg:hidden text-brand-dark p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white shadow-xl absolute w-full left-0 top-full border-t border-gray-100">
            <div className="flex flex-col py-4 px-6">
              {navLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-brand-dark font-bold py-3 border-b border-gray-100 flex justify-between items-center cursor-pointer hover:text-brand-teal transition-colors"
                >
                  {link.title}
                </a>
              ))}
              <div className="flex items-center py-4 mt-2">
                <Headphones size={22} className="text-brand-teal mr-3" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-brand-dark/60 uppercase">Call Us Now</span>
                  <span className="text-lg font-extrabold text-brand-dark">(+01)-793-7938</span>
                </div>
              </div>
              <Link href="#">
                <a className="bg-brand-yellow text-brand-dark text-center font-bold py-3.5 rounded-full mt-2 flex items-center justify-center">
                  Donate Now <ArrowUpRight size={16} className="ml-2" />
                </a>
              </Link>
            </div>
          </div>
        )}
      </nav>

    </header>
  );
};

export default Navbar;
