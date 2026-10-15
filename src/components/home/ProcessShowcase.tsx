import React, { useEffect, useRef, useState } from 'react';
import { MapPinned, Search, FileCheck2, Settings, Sprout, Headset } from 'lucide-react';
import './ProcessShowcase.css';

const STEPS = [
  { title: ['Discover', 'Your Land'], img: 'discover-land', Icon: MapPinned, text: 'Explore agricultural land and farm opportunities that match your budget, location preferences, investment goals, and farming interests.' },
  { title: ['Site Visit &', 'Evaluation'], img: 'site-visit', Icon: Search, text: 'Visit your preferred property, assess the land, and understand its location, accessibility, soil conditions, water availability, and development potential.' },
  { title: ['Documentation &', 'Purchase Support'], img: 'documentation', Icon: FileCheck2, text: 'Receive guidance through property documentation, verification coordination, agreement procedures, and the purchase process.' },
  { title: ['Farm Planning &', 'Customisation'], img: 'farm-planning', Icon: Settings, text: 'Choose your preferred farm model, such as horticulture, plantation, livestock, protected farming, hydroponics, mushroom cultivation, or microgreens production.' },
  { title: ['Farm Development &', 'Setup'], img: 'farm-development', Icon: Sprout, text: 'If required, we help coordinate farm development based on your selected project, including irrigation, infrastructure, cultivation setup, and other agreed requirements.' },
  { title: ['Ongoing Support'], img: 'ongoing-support', Icon: Headset, text: 'Get continued assistance based on your project requirements, helping you move forward with greater confidence as your agricultural venture grows.' },
];

const LEAF_D = 'M4 13c0-6 5-9 16-9 0 11-4 16-10 16-4 0-6-2-6-7Z';
const Leaf: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <linearGradient id="pr-leaf-g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#a5e36b" />
        <stop offset="1" stopColor="#2e9e1f" />
      </linearGradient>
    </defs>
    <path d={LEAF_D} fill="url(#pr-leaf-g)" />
    <path d="M5 20c3-6 7-9 11-11" stroke="rgba(255,255,255,.55)" strokeWidth="0.9" fill="none" strokeLinecap="round" />
  </svg>
);

const Arrow: React.FC = () => (
  <span className="pr-arrow" aria-hidden="true">
    <svg viewBox="0 0 40 28" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 4l10 10L6 24" className="pr-arrow__a" />
      <path d="M20 4l10 10-10 10" className="pr-arrow__b" />
    </svg>
  </span>
);

const ProcessShowcase: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setInView(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className={`pr-section${inView ? ' is-in' : ''}`} aria-labelledby="pr-heading">
      {/* decorative corner foliage */}
      <div className="pr-corner pr-corner--l" aria-hidden="true">
        <Leaf className="pr-c1" /><Leaf className="pr-c2" /><Leaf className="pr-c3" /><Leaf className="pr-c4" />
      </div>
      <div className="pr-corner pr-corner--r" aria-hidden="true">
        <Leaf className="pr-c1" /><Leaf className="pr-c2" /><Leaf className="pr-c3" /><Leaf className="pr-c4" />
      </div>

      <div className="pr-inner">
        <header className="pr-head">
          <div className="pr-eyebrow">
            <span className="pr-eyebrow__line" />
            <span className="pr-eyebrow__text">Our Process</span>
            <Leaf className="pr-eyebrow__leaf" />
            <span className="pr-eyebrow__line" />
          </div>
          <h2 id="pr-heading" className="pr-title">
            From Land Selection to <span>Farm Development</span>
          </h2>
          <p className="pr-sub">
            We make agricultural land ownership and farm development simple, transparent, and hassle-free.{' '}
            <br className="pr-br" />
            Whether you want to invest in farmland or build a fully functional farm, IGO Agri Estate supports you at every step.
          </p>
        </header>

        <ol className="pr-track">
          {STEPS.map((s, i) => (
            <li key={s.img} className="pr-card" style={{ ['--i' as string]: i } as React.CSSProperties}>
              <div className="pr-photo">
                <span className="pr-orbit" />
                <span className="pr-orbit pr-orbit--2" />
                <img src={`/images/process/${s.img}.webp`} alt={s.title.join(' ')} width={360} height={360} loading="lazy" />
                <span className="pr-badge">{String(i + 1).padStart(2, '0')}</span>
                <Leaf className="pr-float" style={{ ['--d' as string]: `${i * 0.7}s` } as React.CSSProperties} />
              </div>
              <h3 className="pr-card__title">
                {s.title.map((t, k) => <span key={k}>{t}</span>)}
              </h3>
              <span className="pr-card__rule" />
              <p className="pr-card__text">{s.text}</p>
              <span className="pr-card__icon"><s.Icon size={26} strokeWidth={2.2} /></span>
              {i < STEPS.length - 1 && <Arrow />}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ProcessShowcase;
