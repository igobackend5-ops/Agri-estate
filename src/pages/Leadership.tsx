import React, { useEffect, useRef, useState } from 'react';
import SEO from '../components/SEO';
import { leadershipTiers, type Leader } from '../data/leadershipData';
import './Leadership.css';

const IMG = '/images/leadership/';

/* Fade-up on scroll, same as the reference's data-reveal */
const Reveal: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pending, setPending] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setPending(false); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setPending(false); io.disconnect(); } }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} data-reveal className={`${className}${pending ? ' reveal-pending' : ''}`}>{children}</div>;
};

const Node: React.FC<{ p: Leader; onOpen: (p: Leader) => void; info?: boolean }> = ({ p, onOpen, info }) => (
  <div className="org-node" onClick={() => onOpen(p)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onOpen(p)}>
    <img className="org-avatar" src={`${IMG}${p.img}`} alt={p.name} loading="lazy" />
    {info ? (
      <div className="org-node-info">
        <p className="org-name">{p.name}</p>
        <p className="org-role">{p.role}</p>
      </div>
    ) : (
      <>
        <p className="org-name">{p.name}</p>
        <p className="org-role">{p.role}</p>
      </>
    )}
  </div>
);

const Label: React.FC<{ t: { label: string; title: string }; style?: React.CSSProperties }> = ({ t, style }) => (
  <p className="org-tier-label" style={style}>{t.label} — {t.title}</p>
);

const Connector: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <div className={`org-connector ${className}`} style={style}><span className="org-dot" style={{ bottom: -4 }} /></div>
);

const STATS: [string, string, string, string][] = [
  ['M4 13c0-6 5-9 16-9 0 11-4 16-10 16-4 0-6-2-6-7Z', '', '26+', 'Brands'],
  ['M2 9l10-5 10 5-10 5-10-5Z', 'M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5', '18+', 'Divisions'],
  ['M2 12l4-3 4 2 3-3 3 2 4-2 2 3-3 6h-4l-2-2-2 2H6Z', '', '2000+', 'Team Strength'],
  ['M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z', 'circle', '28', 'States'],
  ['M15 9l-2 6-6 2 2-6 6-2Z', 'circle', '700+', 'Districts'],
];

const Modal: React.FC<{ p: Leader | null; onClose: () => void }> = ({ p, onClose }) => {
  useEffect(() => {
    if (!p) return;
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', h);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [p, onClose]);
  const last = useRef<Leader | null>(null);
  if (p) last.current = p;
  const d = last.current;
  return (
    <div id="igo-global-modal" className={`modal-overlay${p ? ' active' : ''}`} onClick={onClose} aria-hidden={!p}>
      {d && (
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <img className="modal-avatar" src={`${IMG}${d.img}`} alt={d.modalName} />
            <div>
              <h2 className="modal-title">{d.modalName}</h2>
              <div className="modal-subtitle">{d.modalTitle}</div>
            </div>
            <button className="modal-close" onClick={onClose} aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <div className="modal-body">
            <p>{d.desc}</p>
            {d.bullets.length > 0 && <h3>Highlights</h3>}
            <div className="modal-features">
              {d.bullets.map((b, i) => {
                const k = b.indexOf(':');
                return (
                  <div className="modal-feature-item" key={i}>
                    {k > -1 ? (
                      <>
                        <div className="modal-feature-title">{b.slice(0, k).trim()}</div>
                        <div className="modal-feature-desc">{b.slice(k + 1).trim()}</div>
                      </>
                    ) : b}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="modal-actions">
            <button className="lead-btn" onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const FONT_HREF = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Sora:wght@600;700;800&display=swap';

const Leadership: React.FC = () => {
  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_HREF}"]`)) return;
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = FONT_HREF;
    document.head.appendChild(l);
  }, []);
  const [active, setActive] = useState<Leader | null>(null);
  const [t1, t2, t3, t4, t5] = leadershipTiers;
  const close = () => setActive(null);
  return (
    <main className="igo-lead">
      <SEO
        title="Leadership"
        description="Meet the leaders driving India's fastest-growing farming ecosystem — from executive vision to department excellence."
        canonical="/leadership"
        ogImage="https://www.igoagriestate.com/images/leadership/leadership-core-managers.webp"
      />

      <section className="leadership-hero">
        <img src={`${IMG}leadership-core-managers.webp`} alt="IGO Group Leadership Team" className="leadership-hero-img" />
        <div className="leadership-hero-textwrap">
          <div className="container leadership-hero-content">
            <span className="eyebrow">OUR LEADERSHIP</span>
            <h1>The Minds Behind IGO</h1>
            <p>Meet the leaders driving India's fastest-growing farming ecosystem — from executive vision to department excellence.</p>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="container org-wrap">
          <Reveal className="org-hierarchy-title">
            <h2>IGO Group of Companies</h2>
            <div className="org-hierarchy-sub">Hierarchy Chart</div>
          </Reveal>

          <Label t={t1} />
          <Reveal className="org-root"><Node p={t1.rows[0][0]} onOpen={setActive} /></Reveal>
          <Connector />

          <Label t={t2} />
          <Reveal className="org-tier tier-2-wrap">
            <div className="org-tier-row" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              <span className="org-dot" style={{ top: -1 }} />
              <Node p={t2.rows[0][0]} onOpen={setActive} />
            </div>
          </Reveal>
          <Connector style={{ marginTop: '1.5rem' }} />

          <Label t={t3} />
          <Reveal className="org-tier tier-3-wrap">
            {t3.rows.map((r, i) => (
              <div className="org-tier-row" key={i} style={i === 0 ? { gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' } : undefined}>
                <span className="org-dot" style={{ top: -1 }} />
                {r.map((p) => <Node key={p.name} p={p} onOpen={setActive} />)}
              </div>
            ))}
          </Reveal>

          <Label t={t4} style={{ marginTop: '2.5rem' }} />
          <Connector className="tier-4-wrap" style={{ marginBottom: '1.5rem' }} />
          <div className="tier-4-wrap tier-4-panel">
            <div className="org-dept-groups">
              {t4.rows.map((r, i) => (
                <div className={`org-dept-row${i === t4.rows.length - 1 ? ' partial-row' : ''}`} key={i}>
                  {r.map((p) => <Node key={p.name} p={p} onOpen={setActive} />)}
                </div>
              ))}
            </div>
          </div>
          <Connector />

          <Label t={t5} />
          <Reveal className="org-tier-row tier-5-wrap">
            <span className="org-dot" style={{ top: -1 }} />
            {t5.rows[0].map((p) => <Node key={p.name} p={p} onOpen={setActive} info />)}
          </Reveal>

          <Reveal className="org-stat-bar">
            {STATS.map(([d1, d2, num, label]) => (
              <div className="org-stat-item" key={label}>
                <span className="org-stat-icon-wrap">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {d2 === 'circle' && <circle cx="12" cy="12" r="9" />}
                    <path d={d1} />
                    {d2 && d2 !== 'circle' && <path d={d2} />}
                  </svg>
                </span>
                <span><span className="org-stat-num">{num}</span><span className="org-stat-label">{label}</span></span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <Modal p={active} onClose={close} />
    </main>
  );
};

export default Leadership;
