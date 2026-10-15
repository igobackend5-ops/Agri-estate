import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, ArrowRight, Leaf } from 'lucide-react';
import SEO from '../components/SEO';
import './Faq.css';

const FAQS: { q: string; a: string }[] = [
  { q: 'What types of agricultural land do you offer?', a: 'We offer managed farmland across India, including organic farmland, mango and other plantation estates, greenhouse-ready plots, open cultivation land and paddy fields. Every listing comes with verified documentation, clear boundaries and transparent pricing.' },
  { q: 'Do you provide support for farm development and infrastructure?', a: 'Yes. Our team supports the full journey from land preparation, soil testing and levelling to irrigation, fencing, greenhouse setup, plantation, and farm sheds, storage and roads, all planned around your goals and budget.' },
  { q: 'What is the process to start a farm project with your company?', a: 'It starts with a free consultation to understand your goals. We then shortlist verified land, arrange a site visit, complete documentation, and move into farm planning, development and ongoing support, with a dedicated team at every step.' },
  { q: 'Are there any government subsidies or financial assistance available?', a: 'Many agricultural activities qualify for central and state schemes, such as support for drip irrigation, greenhouses and horticulture. Our advisors guide you on the schemes that may apply to your project and help with the application process. Eligibility depends on the scheme and your location.' },
  { q: 'How can I schedule a site visit?', a: 'You can request a site visit through the Contact page, by calling +91 7397789803, or by emailing bd2@igogroups.com. Our team will confirm a convenient date and accompany you to the property.' },
  { q: 'Can I get expert consultation before investing?', a: 'Absolutely. We offer a free initial consultation covering location, soil, water access, legal status and expected returns, so you can make an informed decision with confidence before you commit.' },
  { q: 'What is the typical timeline for project completion?', a: 'Timelines depend on project size and scope. A basic farm setup can take a few weeks, while a fully developed farm with greenhouse, irrigation and plantation typically takes a few months. We share a clear schedule before work begins.' },
  { q: 'Do you provide post-project support and maintenance?', a: 'Yes. After handover we continue to support you with farm management guidance, crop planning, maintenance and troubleshooting, so your farm keeps performing season after season.' },
];

const MORE: { q: string; a: string }[] = [
  { q: 'Are the land titles verified?', a: 'Yes. Every property goes through legal verification of title, encumbrance and land-use status before it is listed, and we share the documentation with you openly.' },
  { q: 'Can NRIs invest in agricultural land through you?', a: 'Eligibility for agricultural land depends on Indian regulations and the state concerned. Our advisors explain the rules that apply to your situation and can guide you on suitable structures.' },
  { q: 'Do you offer managed farming services?', a: 'We offer end-to-end farm development and management support, from plantation to maintenance, so owners who cannot be on site every day still get a productive farm.' },
  { q: 'Which locations do you operate in?', a: 'We serve buyers and investors across Tamil Nadu, Karnataka, Maharashtra, Andhra Pradesh and Telangana, with a growing network of regional partners across India.' },
  { q: 'Are there any hidden charges?', a: 'No. We follow a transparent process, with all costs for land, registration, development and services explained clearly up front.' },
  { q: 'How do I contact your team?', a: 'Call +91 7397789803, email bd2@igogroups.com, or use the form on our Contact page. Our team will get back to you shortly.' },
];

const Faq: React.FC = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [showMore, setShowMore] = useState(false);
  const items = showMore ? [...FAQS, ...MORE] : FAQS;

  return (
    <>
      <SEO
        title="FAQ | Agricultural Land & Farm Development Questions"
        description="Answers to common questions about IGO Agri Estates farmland, farm development, site visits, subsidies, timelines and post-project support."
        canonical="/faq"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [...FAQS, ...MORE].map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />
      <section className="fq-section" id="faq" aria-labelledby="fq-heading">
        <div className="fq-inner">
          <div className="fq-left">
            <div className="fq-eyebrow"><i /><span>Frequently Asked Questions</span><i /></div>
            <h1 id="fq-heading" className="fq-title">Find Answers to<br /><span>Your Questions</span></h1>
            <p className="fq-sub">We&rsquo;ve compiled the most common questions about our farm projects, services and process — to help you make informed decisions with confidence.</p>
            <figure className="fq-media">
              <span className="fq-blob" aria-hidden="true" />
              <div className="fq-frame">
                <img src="/images/hero-bg.png" alt="Aerial view of green crop rows, a greenhouse and mountains in soft morning light" width={1024} height={1024} loading="lazy" decoding="async" />
                <figcaption className="fq-badge"><span><Leaf size={16} /></span>Sustainable Farming<br />for a Better Future</figcaption>
              </div>
            </figure>
          </div>

          <div className="fq-right">
            <ul className="fq-list">
              {items.map((f, i) => {
                const isOpen = open === i;
                return (
                  <li key={f.q} className={`fq-item${isOpen ? ' is-open' : ''}`}>
                    <h2>
                      <button type="button" className="fq-btn" aria-expanded={isOpen} aria-controls={`fq-a-${i}`} id={`fq-q-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                        <span className="fq-q">Q</span>
                        <span className="fq-text">{f.q}</span>
                        <span className="fq-plus"><Plus size={18} strokeWidth={2.2} /></span>
                      </button>
                    </h2>
                    <div id={`fq-a-${i}`} role="region" aria-labelledby={`fq-q-${i}`} className="fq-answer">
                      <div><p>{f.a}</p></div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="fq-more">
              <button type="button" className="fq-more__btn" onClick={() => setShowMore(s => !s)}>
                {showMore ? 'Show Fewer Questions' : 'View More Questions'} <ArrowRight size={16} style={{ transform: showMore ? 'rotate(-90deg)' : undefined }} />
              </button>
              <Link to="/contact" className="fq-more__link">Still have questions? Contact us</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Faq;
