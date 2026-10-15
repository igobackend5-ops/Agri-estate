import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, MessageSquare, User, FileText, ArrowRight, Sprout } from 'lucide-react';
import './Contact.css';
import { submitLead } from '../lib/leadsService';
import SEO from '../components/SEO';
interface ContactProps {
  /** false when this component is embedded as a section inside another page (e.g. the homepage),
   * so it doesn't emit a duplicate <h1>/SEO tags for that page. Defaults to true (standalone /contact route). */
  standalone?: boolean;
}

const Contact: React.FC<ContactProps> = ({ standalone = true }) => {
  const Heading = standalone ? 'h1' : 'h2';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        notes: `Subject: ${formData.subject}\n\n${formData.message}`,
        type: 'contact'
      });
      setIsSuccess(true);
    } catch (error) {
      console.error('Submission failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      {standalone && (
        <SEO
          title="Contact IGO Agri Estates | Talk to Our Farm Investment Advisors"
          description="Get in touch with IGO Agri Estates — India's trusted agricultural land advisors. Call +91-7397789803, email us, or visit our Chennai office. We serve buyers and investors across Tamil Nadu, Karnataka, Maharashtra, Andhra Pradesh & Telangana."
          canonical="/contact"
          keywords="contact IGO agri estates, agricultural land advisor India, farm investment consultant Tamil Nadu, agri estate inquiry, buy farmland India contact"
          schema={{
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            '@id': 'https://www.igoagriestate.com/contact',
            name: 'Contact IGO Agri Estates',
            url: 'https://www.igoagriestate.com/contact',
            mainEntity: {
              '@type': 'Organization',
              name: 'IGO Agri Estates',
              telephone: '+91-7397789803',
              email: 'bd2@igogroups.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'No 17, Kovalan Street, 2nd Main Road, Uthandi Kanathur',
                addressLocality: 'Chennai',
                addressRegion: 'Tamil Nadu',
                postalCode: '600119',
                addressCountry: 'IN'
              }
            }
          }}
        />
      )}
    <section id="contact" className={`ct-section${standalone ? " ct-section--page" : ""}`}>
      <div className="ct-inner">
        <motion.aside
          className="ct-info"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <figure className="ct-photo">
            <img src="/images/login-bg.png" alt="Sunrise over lush green farmland" width={1024} height={1024} loading="lazy" decoding="async" />
            <figcaption className="ct-photo__text">
              <span>Get in Touch</span>
              <span>We&rsquo;re Here to Help</span>
              <i aria-hidden="true" />
            </figcaption>
          </figure>
          <div className="ct-info__body">
            <div className="ct-label"><span>Our Contact Details</span><i /></div>
            <ul className="ct-list">
              <li>
                <span className="ct-ico"><MapPin size={20} /></span>
                <div>
                  <h3>Main Office</h3>
                  <p>No 17, Kovalan Street, 2nd Main Road,<br />Uthandi Kanathur, Chennai - 600119</p>
                </div>
              </li>
              <li>
                <span className="ct-ico"><Phone size={20} /></span>
                <div>
                  <h3>Contact Line</h3>
                  <p><a href="tel:+917397789803">+91 7397789803</a></p>
                  <p><a href="tel:+917397789804">+91 7397789804</a></p>
                  <p><a href="tel:+917397789805">+91 7397789805</a></p>
                </div>
              </li>
              <li>
                <span className="ct-ico"><Mail size={20} /></span>
                <div>
                  <h3>Email Desk</h3>
                  <p><a href="mailto:bankingbackend.indiagreen@gmail.com">bankingbackend.indiagreen@gmail.com</a></p>
                  <p><a href="mailto:bd2@igogroups.com">bd2@igogroups.com</a></p>
                </div>
              </li>
            </ul>
          </div>
        </motion.aside>

        <motion.div
          className="ct-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
        >
          {isSuccess ? (
            <div className="ct-success">
              <span className="ct-success__icon"><Send size={30} /></span>
              <h3>Message Sent</h3>
              <p>Thank you for reaching out. A relationship manager will be in touch shortly.</p>
              <button type="button" onClick={() => setIsSuccess(false)}>Send Another Message</button>
            </div>
          ) : (
            <>
              <div className="ct-eyebrow"><i /><span>Contact Us</span><i /></div>
              <Heading className="ct-title">Let&rsquo;s Start a <span>Conversation</span></Heading>
              <p className="ct-sub">Have a question, need assistance, or want to explore our farm projects? Fill in the form below and our team will get back to you shortly.</p>

              <form onSubmit={handleSubmit} className="ct-form">
                <div className="ct-row">
                  <label className="ct-field" htmlFor="contact-name">
                    <span className="ct-ico"><User size={18} /></span>
                    <span className="ct-field__body">
                      <span className="ct-field__label">Your Name <b>*</b></span>
                      <input id="contact-name" required type="text" placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </span>
                  </label>
                  <label className="ct-field" htmlFor="contact-email">
                    <span className="ct-ico"><Mail size={18} /></span>
                    <span className="ct-field__body">
                      <span className="ct-field__label">Email Address <b>*</b></span>
                      <input id="contact-email" required type="email" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </span>
                  </label>
                </div>
                <label className="ct-field" htmlFor="contact-phone">
                  <span className="ct-ico"><Phone size={18} /></span>
                  <span className="ct-field__body">
                    <span className="ct-field__label">Phone Number <b>*</b></span>
                    <input id="contact-phone" required type="tel" placeholder="+91 XXXXX XXXXX" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </span>
                </label>
                <label className="ct-field" htmlFor="contact-subject">
                  <span className="ct-ico"><FileText size={18} /></span>
                  <span className="ct-field__body">
                    <span className="ct-field__label">Subject <b>*</b></span>
                    <input id="contact-subject" required type="text" placeholder="e.g. Inquiry about Sandalwood Estates" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                  </span>
                </label>
                <label className="ct-field ct-field--area" htmlFor="contact-message">
                  <span className="ct-ico"><MessageSquare size={18} /></span>
                  <span className="ct-field__body">
                    <span className="ct-field__label">Your Message <b>*</b></span>
                    <textarea id="contact-message" required rows={4} placeholder="How can we assist you today?" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </span>
                </label>

                <div className="ct-actions">
                  <button type="submit" disabled={isSubmitting} className="ct-btn">
                    {isSubmitting ? <span>Sending...</span> : (<><span>Send Message</span><ArrowRight size={16} /></>)}
                  </button>
                  <p className="ct-tag"><Sprout size={26} strokeWidth={1.5} /><span>Together for a<br />Greener Tomorrow</span></p>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default Contact;
