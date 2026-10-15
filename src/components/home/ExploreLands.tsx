import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Ruler, Tag, MapPin, Leaf, Droplets, Route, Trees, ShieldCheck, Home, ArrowRight, Sprout, HeartHandshake } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './ExploreLands.css';

type Land = {
  img: string; badge: string; place: string; title: string;
  area: string; price: string;
  tags: { Icon: LucideIcon; label: string }[];
  text: string;
};

const LANDS: Land[] = [
  { img: '/images/featured/organic-farmland-hd.webp', badge: 'Premium Plot', place: 'Coimbatore, TN', title: 'Organic Farmland – 10 Acres', area: '10 Acres', price: '₹ 45 Lakhs',
    tags: [{ Icon: Leaf, label: 'Fertile Soil' }, { Icon: Droplets, label: 'Water Access' }, { Icon: Route, label: 'Good Road Connectivity' }],
    text: 'Well-maintained agricultural land with excellent soil quality, suitable for multiple farming options.' },
  { img: '/images/featured/mango-plantation-hd.webp', badge: 'High Yield', place: 'Erode, TN', title: 'Mango Plantation Land – 15 Acres', area: '15 Acres', price: '₹ 68 Lakhs',
    tags: [{ Icon: Trees, label: 'Mango Plantation' }, { Icon: Droplets, label: 'Drip Irrigation' }, { Icon: ShieldCheck, label: 'Secure & Fenced' }],
    text: 'Productive mango plantation with established trees and advanced irrigation facilities.' },
  { img: '/images/featured/greenhouse-farm-hd.webp', badge: 'Prime Location', place: 'Tirunelveli, TN', title: 'Greenhouse Farm – 5 Acres', area: '5 Acres', price: '₹ 32 Lakhs',
    tags: [{ Icon: Home, label: 'Greenhouse Setup' }, { Icon: Droplets, label: 'Irrigation System' }, { Icon: ShieldCheck, label: 'Boundary Fence' }],
    text: 'Ideal for high-value crops with ready-to-use greenhouse infrastructure.' },
];

const STRIP = [
  { Icon: Sprout, title: 'Verified Listings', text: '100% genuine land details with clear documentation.' },
  { Icon: ShieldCheck, title: 'Transparent Process', text: 'No hidden charges, complete transparency.' },
  { Icon: MapPin, title: 'Pan-India Access', text: 'Premium locations across all major regions.' },
  { Icon: HeartHandshake, title: 'Dedicated Support', text: 'From land purchase to farm development.' },
];

const Leaf2: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
    <defs><linearGradient id="el-leaf-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#a5e36b" /><stop offset="1" stopColor="#2e9e1f" /></linearGradient></defs>
    <path d="M4 13c0-6 5-9 16-9 0 11-4 16-10 16-4 0-6-2-6-7Z" fill="url(#el-leaf-g)" />
  </svg>
);

const ExploreLands: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`el-section${inView ? ' is-in' : ''}`} aria-labelledby="el-heading">
      <Leaf2 className="el-float el-float--a" />
      <Leaf2 className="el-float el-float--b" />
      <div className="el-head">
        <div className="el-eyebrow">
          <span className="el-eyebrow__line" />
          <span className="el-eyebrow__text">Featured Properties</span>
          <Leaf2 className="el-eyebrow__leaf" />
          <span className="el-eyebrow__line" />
        </div>
        <h2 id="el-heading" className="el-title">Explore Our <span>Agricultural Lands</span></h2>
        <p className="el-sub">Discover premium farmland opportunities across India, with verified details, clear documentation and complete transparency.</p>
      </div>

      <ul className="el-grid">
        {LANDS.map((l, i) => (
          <li key={l.title} className="el-card" style={{ ['--i' as string]: i } as React.CSSProperties}>
            <div className="el-card__media">
              <img src={l.img} alt={l.title} width={1024} height={640} loading="lazy" decoding="async" />
              <span className="el-badge">{l.badge}</span>
              <span className="el-place"><MapPin size={13} strokeWidth={2.4} />{l.place}</span>
            </div>
            <div className="el-card__body">
              <h3 className="el-card__title">{l.title}</h3>
              <div className="el-facts">
                <div className="el-fact"><Ruler size={22} /><div><b>{l.area}</b><span>Total Area</span></div></div>
                <div className="el-fact"><Tag size={22} /><div><b>{l.price}</b><span>Price</span></div></div>
                <div className="el-fact"><MapPin size={22} /><div><b>{l.place}</b><span>Location</span></div></div>
              </div>
              <ul className="el-tags">
                {l.tags.map(({ Icon, label }) => (<li key={label}><Icon size={18} />{label}</li>))}
              </ul>
              <div className="el-foot">
                <p>{l.text}</p>
                <Link to="/listings" className="el-btn">View Details <ArrowRight size={15} /></Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <ul className="el-strip">
        {STRIP.map(({ Icon, title, text }) => (
          <li key={title} className="el-strip__item">
            <span className="el-strip__icon"><Icon size={26} strokeWidth={2.1} /></span>
            <div><h3>{title}</h3><p>{text}</p></div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExploreLands;
