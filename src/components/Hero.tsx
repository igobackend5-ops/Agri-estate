import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, LandPlot, Sprout, TreePine, Building2, CloudSun, Leaf, Search, ArrowRight, ChevronDown, Droplets, Flower2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FeaturedProjects from './home/FeaturedProjects';
import ProcessShowcase from './home/ProcessShowcase';
import WhyChooseUs from './home/WhyChooseUs';
import ExploreLands from './home/ExploreLands';
import FarmDevelopment from './home/FarmDevelopment';

const Hero: React.FC = () => {
  const [searchType, setSearchType] = useState('Buy');
  const [state, setState] = useState('');
  const [locality, setLocality] = useState('');
  const navigate = useNavigate();
  
  const showcase = [
    { label: 'Agricultural Land', filter: 'Open Field', img: '/images/categories/agricultural-land.webp' },
    { label: 'Horticulture Farm', filter: 'Horticulture', img: '/images/categories/horticulture.webp' },
    { label: 'Plantation Farm', filter: 'Nursery', img: '/images/categories/plantation.webp' },
    { label: 'Livestock Farm', filter: 'Livestock', img: '/images/categories/livestock.webp' },
    { label: 'Protected Farm', filter: 'Protected', img: '/images/categories/protected.webp' },
    { label: 'Hydroponic Farm', filter: 'Hydroponic', img: '/images/categories/hydroponic.webp' },
    { label: 'Mushroom Farm', filter: 'Mushroom', img: '/images/categories/mushroom.webp' },
    { label: 'Microgreens Farm', filter: 'Microgreens', img: '/images/categories/microgreens.webp' },
  ];

  const topSearches = [
    { label: 'Agricultural Land', icon: <LandPlot size={15} />, category: 'Open Field' },
    { label: 'Horticulture Farm', icon: <TreePine size={15} />, category: 'Horticulture' },
    { label: 'Plantation Farm', icon: <Leaf size={15} />, category: 'Nursery' },
    { label: 'Livestock Farm', icon: <Building2 size={15} />, category: 'Livestock' },
    { label: 'Protected Farm', icon: <CloudSun size={15} />, category: 'Protected' },
    { label: 'Hydroponic Farm', icon: <Droplets size={15} />, category: 'Hydroponic' },
    { label: 'Mushroom Farm', icon: <Flower2 size={15} />, category: 'Mushroom' },
    { label: 'Microgreens Farm', icon: <Sprout size={15} />, category: 'Microgreens' },
  ];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchType) params.append('intent', searchType.toLowerCase());
    if (state) params.append('state', state);
    if (locality) params.append('query', locality);
    navigate(`/listings?${params.toString()}`);
  };

  const handleCategoryClick = (filter: string) => {
    navigate(`/listings?category=${encodeURIComponent(filter)}`);
  };

  return (
    <>
      <section className="relative lg:min-h-[max(90vh,720px)] lg:max-h-[860px] flex flex-col justify-center overflow-hidden">
        {/* Landscape Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/hero-poster.jpg"
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
          >
            <source src="/hero section videos.mp4" type="video/mp4" />
            <track kind="captions" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/45"></div>
        </div>
        
        <div className="container-pro relative z-10 w-full pt-32 pb-10 md:pt-36 md:pb-12 lg:pt-40 lg:pb-20">
          <div className="max-w-6xl mx-auto text-left">
            {/* Buy / Rent toggle */}
            <div className="inline-flex rounded-full bg-white/15 backdrop-blur-md border border-white/20 p-1 mb-5">
              {['Buy', 'Rent'].map((t) => (
                <button
                  key={t}
                  onClick={() => setSearchType(t)}
                  className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${searchType === t ? 'bg-[#1B5E20] text-white' : 'text-white hover:bg-white/10'}`}
                >
                  {t === 'Rent' ? 'Rent/Lease' : t}
                </button>
              ))}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase leading-[1.05] tracking-[0.01em]">
              Agri Estate <span className="text-lime-400 not-italic">India</span>
            </h1>
            <p className="mt-3 mb-6 text-white/90 text-base md:text-lg font-normal max-w-2xl leading-relaxed">
              Buy, sell, rent, or lease agricultural estates with clear land details, buyer enquiries, and seller listing support.
            </p>

            {/* Search bar */}
            <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row md:items-stretch w-full p-2">
              <div className="relative w-full md:w-[28%] border-b md:border-b-0 md:border-r border-black/10">
                <label htmlFor="hero-state-select" className="sr-only">Select State</label>
                <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1B5E20] pointer-events-none" />
                <select
                  id="hero-state-select"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  aria-label="Select State"
                  className="w-full h-full bg-transparent pl-12 pr-10 py-4 text-sm font-medium text-primary outline-none cursor-pointer appearance-none normal-case tracking-normal"
                >
                  <option value="">Select State</option>
                  <option>Karnataka</option>
                  <option>Maharashtra</option>
                  <option>Tamil Nadu</option>
                  <option>Andhra Pradesh</option>
                  <option>Kerala</option>
                  <option>Haryana</option>
                  <option>Rajasthan</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40 pointer-events-none" />
              </div>
              <div className="relative w-full md:flex-1 border-b md:border-b-0 border-black/10">
                <label htmlFor="hero-locality-input" className="sr-only">Search Locality</label>
                <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1B5E20] pointer-events-none" />
                <input
                  id="hero-locality-input"
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="Select or Search Locality"
                  aria-label="Search Locality"
                  className="w-full h-full bg-transparent pl-12 pr-4 py-4 text-sm font-medium text-primary outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <button
                onClick={handleSearch}
                className="w-full md:w-auto md:min-w-[240px] flex items-center justify-center gap-3 bg-[#1B5E20] hover:bg-[#144a18] text-white px-8 py-4 rounded-xl text-sm font-semibold uppercase tracking-[0.1em] transition-colors"
              >
                Search Estates <ArrowRight size={18} />
              </button>
            </div>

            {/* Quick search */}
            <div className="mt-5 flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
              <span className="text-sm font-semibold text-white/90 uppercase tracking-[0.12em] md:pt-2 shrink-0">Quick Search:</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
                {topSearches.map((tag) => (
                  <button
                    key={tag.label}
                    onClick={() => navigate(`/listings?category=${encodeURIComponent(tag.category)}`)}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-full bg-[#022c22]/60 backdrop-blur-md border border-white/20 text-white text-xs font-medium uppercase tracking-[0.06em] hover:bg-[#1B5E20] transition-colors"
                  >
                    {tag.icon}
                    <span className="whitespace-nowrap">{tag.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Category showcase (illustrated section image with clickable zones) */}
      <section className="bg-[#f4f9ee]" aria-label="Explore our farm categories">
        <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="relative mx-auto min-w-[900px] max-w-[2000px]">
            <img
              src="/images/categories/categories-section.webp"
              alt="Explore Our Farm Categories: Agricultural Land, Horticulture, Plantation, Livestock, Protected, Hydroponic, Mushroom and Microgreens farms"
              className="w-full h-auto block"
            />
            <div className="absolute left-0 right-0 flex" style={{ top: '37%', height: '46%' }}>
              {showcase.map((cat, i) => {
                const edges = [0, 15.3, 27.25, 39, 50.55, 62, 73.5, 85.25, 100];
                return (
                  <button
                    key={cat.label}
                    onClick={() => handleCategoryClick(cat.filter)}
                    aria-label={`Browse ${cat.label}`}
                    className="h-full cursor-pointer rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B5E20]"
                    style={{ width: `${edges[i + 1] - edges[i]}%` }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
      
      <FeaturedProjects />

      {/* Process: land selection to farm development */}
      <section className="bg-[#f6faf1]" aria-label="From land selection to farm development">
        <ProcessShowcase />
      </section>

      <WhyChooseUs />
      <ExploreLands />
      <FarmDevelopment />


      {/* TURNKEY PROJECTS - YOUR LAND, OUR EXPERTISE */}
      <div className="bg-primary py-24 overflow-hidden relative border-b border-black/5">
        <div className="absolute top-0 right-0 w-full h-full bg-topo opacity-5 pointer-events-none"></div>
        <div className="container-pro relative z-10 text-center mb-14">
          <p className="text-[10px] font-black text-secondary uppercase tracking-[0.4em] mb-4">Your Land, Our Expertise</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-none mb-6">
            Buy Land. Build a Vision. <br className="md:hidden" />
            <span className="text-secondary italic font-serif">Or Just Hold.</span>
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Buy premium land from us. Have a plan? Great. No plan? Partner with us. We offer turnkey projects to make your land productive—from polyhouses to goat farming. Or simply keep the land as a high-value asset. The choice is entirely yours.
          </p>
        </div>
        
        {/* Animated Marquee */}
        <div className="relative flex overflow-x-hidden w-full group py-4">
          <div className="absolute left-0 top-0 w-24 md:w-48 h-full bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 w-24 md:w-48 h-full bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none"></div>
          
          <div className="animate-marquee flex gap-4 md:gap-6 items-center whitespace-nowrap pl-4 md:pl-6">
            {[
              'Polyhouse Projects', 'Hydroponic Projects', 'Joint Venture Projects', 
              'Vertical Farming', 'Open Cultivation', 'Rooftop Projects', 
              'Floriculture Projects', 'Goat Farming', 'Horticulture Projects', 
              'Landscaping Projects', 'Polyhouse Projects', 'Hydroponic Projects', 
              'Joint Venture Projects', 'Vertical Farming', 'Open Cultivation', 'Rooftop Projects'
            ].map((project, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 px-6 md:px-8 py-3 md:py-4 rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary hover:border-secondary transition-all text-white font-bold text-xs md:text-sm uppercase tracking-widest cursor-default group/pill">
                <span className="w-2 h-2 rounded-full bg-secondary group-hover/pill:bg-primary mr-3 shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-colors"></span>
                {project}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* BUY & SELL PROPERTIES Headline */}
      <div className="bg-white py-24 text-center border-b border-black/5">
        <div className="container-pro">
          <p className="text-[10px] font-black text-[#00814a] uppercase tracking-[0.4em] mb-4">Buy, Sell, Rent, Lease</p>
          <h2 className="text-5xl md:text-6xl font-black text-primary uppercase tracking-tighter leading-none">
            Agricultural <span className="text-secondary italic font-serif">Estates Only</span>
          </h2>
          <p className="mt-8 text-lg text-text-muted max-w-2xl mx-auto font-light">
            A focused marketplace for customers who want to buy agricultural estates, sell farmland, post requirements, or list land for serious buyers.
          </p>
          <div className="grid md:grid-cols-4 gap-5 mt-14 text-left">
            {[
              { title: 'Buy Estates', desc: 'Search agricultural land, horticulture farms, plantation farms, livestock farms, protected farms, and dry land.' },
              { title: 'Sell Estates', desc: 'Post your property with location, size, water, access, title status, price, and photos.' },
              { title: 'Post Requirement', desc: 'Tell us your budget, preferred state, land size, crop use, and buying timeline.' },
              { title: 'Get Qualified Leads', desc: 'Connect buyers and sellers through clear estate information and direct enquiry options.' },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 border border-black/5 rounded-[24px] p-6">
                <h3 className="text-lg font-black text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
