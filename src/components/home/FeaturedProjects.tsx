import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf, Sprout, MapPin, Map, Bookmark, ChevronLeft, ChevronRight, ArrowRight, Ruler, IndianRupee,
} from 'lucide-react';

const stats = [
  { value: '100+', label: 'Projects Completed', icon: <Sprout size={26} /> },
  { value: '10,000+', label: 'Acres Developed', icon: <MapPin size={26} /> },
  { value: 'Pan India', label: 'Service Coverage', icon: <Map size={26} /> },
];

const projects = [
  { title: 'Agricultural Land', location: 'Coimbatore, Tamil Nadu', acres: '10 Acres', price: '₹ 50 Lakhs', tags: ['Fertile Land', 'Water Access'], img: '/images/featured/agricultural-land.webp', category: 'Open Field' },
  { title: 'Horticulture Farm Project', location: 'Nashik, Maharashtra', acres: '5 Acres', price: '₹ 35 Lakhs', tags: ['Greenhouse', 'Drip Irrigation'], img: '/images/featured/horticulture-farm.webp', category: 'Horticulture' },
  { title: 'Plantation Farm', location: 'Erode, Tamil Nadu', acres: '20 Acres', price: '₹ 1.2 Cr', tags: ['Coconut', 'Long Term Yield'], img: '/images/featured/plantation-farm.webp', category: 'Nursery' },
  { title: 'Livestock Farm Project', location: 'Krishnagiri, Tamil Nadu', acres: '15 Acres', price: '₹ 90 Lakhs', tags: ['Dairy Farm', 'Ready Infrastructure'], img: '/images/featured/livestock-farm.webp', category: 'Livestock' },
];

const FeaturedProjects: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const scrollBy = (dir: number) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' });
  };

  return (
    <section className="relative bg-white py-16 md:py-20 overflow-hidden" aria-labelledby="featured-heading">
      <div className="container-pro relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-4 text-[#1B5E20]">
            <span className="h-px w-16 md:w-24 bg-[#1B5E20]/60" />
            <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-[0.12em]">
              Featured <Leaf size={16} />
            </span>
            <span className="h-px w-16 md:w-24 bg-[#1B5E20]/60" />
          </div>
          <h2 id="featured-heading" className="mt-4 text-4xl md:text-5xl font-bold text-[#0f4d24] normal-case tracking-normal">
            Land &amp; Farm <span className="text-[#2e9e1f]">Projects</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-500 leading-relaxed">
            Explore our premium agricultural land and farm projects across India. From fertile land to fully developed farm solutions, we help you build a sustainable future.
          </p>
        </div>

        {/* Stats + expertise banner */}
        <div className="mt-10 rounded-3xl bg-gradient-to-r from-[#eaf4e6] to-[#f4f9ee] border border-[#1B5E20]/10 shadow-sm px-6 py-8 md:px-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 flex-1">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-4 sm:justify-center">
                  <span className="shrink-0 w-14 h-14 rounded-full bg-white text-[#1B5E20] flex items-center justify-center shadow-sm">
                    {s.icon}
                  </span>
                  <div>
                    <div className="text-3xl font-bold text-[#0f4d24] leading-none">{s.value}</div>
                    <div className="mt-1 text-sm text-slate-600">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="lg:border-l lg:border-[#1B5E20]/15 lg:pl-8 text-center lg:text-left">
              <p className="text-2xl md:text-3xl italic font-medium text-[#1B5E20] leading-snug">
                Your Land,<br className="hidden lg:block" /> Our Expertise
              </p>
            </div>
          </div>
        </div>

        {/* Project cards carousel */}
        <div className="relative mt-10">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous projects"
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white shadow-lg text-[#0f4d24] hover:bg-[#f4f9ee]"
          >
            <ChevronLeft size={22} />
          </button>
          <div
            ref={trackRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {projects.map((p) => (
              <article
                key={p.title}
                className="snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-[calc(25%-15px)] bg-white rounded-2xl border border-black/5 shadow-md p-3 flex flex-col"
              >
                <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                  <img src={p.img} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 bg-[#1B5E20] text-white text-xs font-medium px-3 py-1 rounded-full">For Sale</span>
                  <button
                    onClick={() => setSaved((s) => ({ ...s, [p.title]: !s[p.title] }))}
                    aria-label={`Save ${p.title}`}
                    aria-pressed={!!saved[p.title]}
                    className="absolute top-3 right-3 w-8 h-8 rounded-md bg-white/95 flex items-center justify-center text-[#0f4d24]"
                  >
                    <Bookmark size={16} fill={saved[p.title] ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="px-2 pt-4 pb-2 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-[#0f4d24] normal-case tracking-normal">{p.title}</h3>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                    <MapPin size={15} className="text-[#1B5E20]" /> {p.location}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-sm text-slate-700">
                    <span className="flex items-center gap-1.5"><Ruler size={15} className="text-[#1B5E20]" />{p.acres}</span>
                    <span className="h-4 w-px bg-black/15" />
                    <span className="flex items-center gap-1.5"><IndianRupee size={14} className="text-[#1B5E20]" />{p.price.replace('₹ ', '')}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs text-[#0f4d24] bg-[#eaf4e6] px-3 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                  <Link
                    to={`/listings?category=${encodeURIComponent(p.category)}`}
                    className="mt-auto pt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#0f4d24] hover:text-[#2e9e1f]"
                  >
                    View Details <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next projects"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 items-center justify-center rounded-full bg-white shadow-lg text-[#0f4d24] hover:bg-[#f4f9ee]"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
