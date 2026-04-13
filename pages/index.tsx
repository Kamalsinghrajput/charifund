import Head from 'next/head';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import Hero from '../components/Home/Hero';
import ServicesMission from '../components/Home/ServicesMission';
import AboutUs from '../components/Home/AboutUs';
import LatestNews from '../components/Home/LatestNews';
import ImpactCounters from '../components/Home/ImpactCounters';
import GalleryCarousel from '../components/Home/GalleryCarousel';
import CampaignsFocus from '../components/Home/CampaignsFocus';
import BoardMembers from '../components/Home/BoardMembers';

export default function Home() {
  return (
    <div className="bg-white min-h-screen font-sans">
      <Head>
        <title>Charifund | Charity &amp; Donation Pattern Demo</title>
        <meta name="description" content="Next.js charity template using GSAP and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <Navbar />

      <main>
        {/* Sections */}
        <Hero />
        <ServicesMission />
        <AboutUs />
        <ImpactCounters />
        <CampaignsFocus />
        <BoardMembers />
        <LatestNews />

        {/* Gallery Carousel */}
        <GalleryCarousel />

        {/* Become a Volunteer CTA */}
        <section className="bg-brand-yellow py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-dark mb-6">Become a Volunteer To Help Them</h2>
            <p className="text-brand-dark/80 max-w-2xl mx-auto mb-8 text-lg font-medium">
              Join our global community of volunteers today and make a real difference in the lives of those who need it most.
            </p>
            <button className="bg-brand-dark text-white font-bold py-4 px-10 rounded-full hover:bg-white hover:text-brand-dark transition-all transform hover:-translate-y-1 shadow-xl">
              Join With Us
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
