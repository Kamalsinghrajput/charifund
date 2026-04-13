import React from 'react';
import Link from 'next/link';
import { ChevronRight, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-brand-dark text-white pt-20 pb-10 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal rounded-full blur-3xl opacity-10 translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          
          {/* Column 1 */}
          <div>
            <Link href="/">
              <a className="text-3xl font-extrabold text-white flex items-center mb-6">
                <span className="text-brand-yellow mr-1">Chari</span>fund.
              </a>
            </Link>
            <p className="text-gray-400 leading-relaxed mb-6">
              Empowering communities and inspiring change globally. We believe in a world where everyone has access to basic needs and opportunities to grow.
            </p>
            <div className="flex space-x-4">
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-all font-bold cursor-pointer">FB</span>
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-all font-bold cursor-pointer">TW</span>
              <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-dark transition-all font-bold cursor-pointer">IG</span>
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-xl font-bold mb-6 relative pb-3 border-b border-white/20">
              Explore Links
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-brand-yellow"></span>
            </h4>
            <ul className="space-y-3">
              <li><Link href="#"><a className="text-gray-400 hover:text-brand-yellow transition-colors flex items-center group"><ChevronRight size={16} className="text-brand-yellow mr-2 group-hover:translate-x-1 transition-transform" /> About Us</a></Link></li>
              <li><Link href="#"><a className="text-gray-400 hover:text-brand-yellow transition-colors flex items-center group"><ChevronRight size={16} className="text-brand-yellow mr-2 group-hover:translate-x-1 transition-transform" /> Our Causes</a></Link></li>
              <li><Link href="#"><a className="text-gray-400 hover:text-brand-yellow transition-colors flex items-center group"><ChevronRight size={16} className="text-brand-yellow mr-2 group-hover:translate-x-1 transition-transform" /> Latest News</a></Link></li>
              <li><Link href="#"><a className="text-gray-400 hover:text-brand-yellow transition-colors flex items-center group"><ChevronRight size={16} className="text-brand-yellow mr-2 group-hover:translate-x-1 transition-transform" /> Contact Us</a></Link></li>
              <li><Link href="#"><a className="text-gray-400 hover:text-brand-yellow transition-colors flex items-center group"><ChevronRight size={16} className="text-brand-yellow mr-2 group-hover:translate-x-1 transition-transform" /> FAQ</a></Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-xl font-bold mb-6 relative pb-3 border-b border-white/20">
              Get In Touch
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-brand-yellow"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="text-brand-yellow mr-3 mt-1 shrink-0" />
                <span className="text-gray-400">250 Main Street, 2nd Floor, New York, NY 10012</span>
              </li>
              <li className="flex items-start">
                <Phone size={20} className="text-brand-yellow mr-3 mt-1 shrink-0" />
                <span className="text-gray-400">+1 (234) 567 890</span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="text-brand-yellow mr-3 mt-1 shrink-0" />
                <span className="text-gray-400">support@wowtheme7.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-xl font-bold mb-6 relative pb-3 border-b border-white/20">
              Newsletter
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-brand-yellow"></span>
            </h4>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter to get the latest updates and news.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-white/10 border border-white/20 rounded-full py-4 px-6 text-white outline-none focus:border-brand-yellow transition-colors placeholder-gray-400"
              />
              <button 
                className="absolute right-1 top-1 bottom-1 bg-brand-yellow text-brand-dark px-6 rounded-full font-bold hover:bg-white transition-colors"
                type="submit"
              >
                Go
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-white/10 mt-16 pt-8 pb-4 text-center text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Charifund. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#"><a className="hover:text-white">Terms & Conditions</a></Link>
            <Link href="#"><a className="hover:text-white">Privacy Policy</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
