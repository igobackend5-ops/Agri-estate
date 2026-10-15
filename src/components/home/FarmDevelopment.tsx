import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tractor, Waves, Fence, House, Sprout, Building2, CircleArrowRight, Settings, ShieldCheck, Users, Leaf, ArrowRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import './FarmDevelopment.css';

const SERVICES: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: Tractor, title: 'Land Preparation', text: 'Soil testing, leveling and field preparation for optimal growth.' },
  { Icon: Waves, title: 'Irrigation System', text: 'Drip, sprinkler and advanced irrigation systems for efficient water use.' },
  { Icon: Fence, title: 'Fencing', text: 'Secure and durable fencing for long-term protection and safety.' },
  { Icon: House, title: 'Greenhouse Setup', text: 'Modern greenhouse solutions for controlled and high-yield farming.' },
  { Icon: Sprout, title: 'Plantation', text: 'Quality plants and expert plantation support for sustainable growth.' },
  { Icon: Building2, title: 'Infrastructure', text: 'Farm sheds, storage, roads and essential facilities based on your needs.' },
];

const PILLARS: { Icon: LucideIcon; title: string; text: string }[] = [
  { Icon: Settings, title: 'Customized Solutions', text: 'As per your land and goals' },
  { Icon: ShieldCheck, title: 'Quality Assurance', text: 'Reliable and transparent process' },
  { Icon: Users, title: 'Expert Team', text: 'Skilled professionals at every step' },
  { Icon: Leaf, title: 'Sustainable Farming', text: 'For a greener tomorrow' },
];

const FarmDevelopment: React.FC = () => {
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
    <section ref={ref} className={`fd-section${inView ? ' is-in' : ''}`} aria-labelledby="fd-heading">
      <div className="fd-head">
        <div className="fd-eyebrow">
          <span className="fd-eyebrow__line" />
          <span className="fd-eyebrow__text">Farm Development Services</span>
          <span className="fd-eyebrow__line" />
        </div>
        <h2 id="fd-heading" className="fd-title">From Land to <span>Fully Developed Farm</span></h2>
        <p className="fd-sub">We offer complete farm development services, customized to your needs — from land preparation to plantation and infrastructure.</p>
      </div>

      <div className="fd-main">
        <figure className="fd-media">
          <img src="/images/featured/farm-development.webp" alt="Agriculture engineer with a tablet inspecting an irrigated farm with a greenhouse" width={966} height={710} loading="lazy" decoding="async" />
        </figure>
        <ul className="fd-grid">
          {SERVICES.map(({ Icon, title, text }, i) => (
            <li key={title} className="fd-card" style={{ ['--i' as string]: i } as React.CSSProperties}>
              <span className="fd-card__icon"><Icon size={26} strokeWidth={2} /></span>
              <h3 className="fd-card__title">{title}</h3>
              <p className="fd-card__text">{text}</p>
              <CircleArrowRight className="fd-card__go" size={20} aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>

      <div className="fd-cta">
        <div className="fd-cta__lead">
          <span className="fd-cta__icon"><Sprout size={28} strokeWidth={2} /></span>
          <div>
            <h3>Build Your Dream Farm with Our Expert Support</h3>
            <p>End-to-end farm development services, backed by experience and trust.</p>
          </div>
        </div>
        <ul className="fd-pillars">
          {PILLARS.map(({ Icon, title, text }) => (
            <li key={title}>
              <span className="fd-pillars__icon"><Icon size={20} strokeWidth={2.2} /></span>
              <b>{title}</b>
              <span>{text}</span>
            </li>
          ))}
        </ul>
        <Link to="/contact" className="fd-btn">Get Started <ArrowRight size={16} /></Link>
      </div>
    </section>
  );
};

export default FarmDevelopment;
