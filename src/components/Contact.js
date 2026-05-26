import React, { useState } from 'react';
import { bookAppointment } from '../api';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    preferredDate: '',
    preferredTime: '',
    productType: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await bookAppointment(formData);
      setSubmitted(true);
      setFormData({ 
        name: '', 
        phone: '', 
        email: '', 
        message: '',
        preferredDate: '',
        preferredTime: '',
        productType: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error booking consultation:', error);
      alert('Error booking consultation. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Updated Contact Numbers for RiM AUTO PARTS
  const phoneNumber1 = '7009564900';
  const whatsappNumber = '917009564900';
  const whatsappMessage = encodeURIComponent("Hello RiM AUTO PARTS, I'm interested in your auto parts products. I would like to know more about your brake pads, clutch plates, air filters, and bulk pricing.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-badge" style={{ color: 'white' }}>RiM AUTO PARTS</div>
          <div className="hero-icon">🔧</div>
          <h1>Contact <span>RiM AUTO PARTS</span></h1>
          <p>Premium quality auto components for all vehicle makes and models</p>
          <div className="hero-buttons">
            <a href={`tel:${phoneNumber1}`} className="hero-call-btn">
              📞 Call: {phoneNumber1}
            </a>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hero-wa-btn">
              💬 WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section">
        <div className="container">
          <div className="contact-info-grid">
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Call Our Experts</h3>
              <p><strong>
                <a href={`tel:${phoneNumber1}`}>{phoneNumber1}</a>
              </strong></p>
              <small>Mon-Sat, 9 AM - 7 PM</small>
              <small>Sunday: Closed</small>
            </div>
            <div className="info-card">
              <div className="info-icon">💬</div>
              <h3>WhatsApp Support</h3>
              <p><strong>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              </strong></p>
              <small>Quick responses for queries</small>
              <small>Get bulk pricing & technical support</small>
            </div>
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Visit Our Facility</h3>
              <p><strong>RiM AUTO PARTS</strong><br />
              Auto Parts Market Near N.M. College Mansa, Punjab 151505</p>
              <small>Showroom open for walk-in customers</small>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-container">
            <div className="form-info">
              <div className="form-info-badge">Get A Quote</div>
              <h2>Request <span>Price & Details</span></h2>
              <p>Get the best pricing for bulk orders, technical specifications, and delivery information for our complete range of auto parts.</p>
              <div className="benefits-list">
                <h4>Why choose RiM AUTO PARTS:</h4>
                <ul>
                  <li>✓ OEM Standard Quality Products</li>
                  <li>✓ 1+ Year Warranty on Select Items*</li>
                  <li>✓ Competitive Bulk Pricing</li>
                  <li>✓ Pan India Shipping Available</li>
                  <li>✓ GST Invoice for Businesses</li>
                  <li>✓ Technical Support & Installation Guidance</li>
                  <li>✓ Complete Range Under One Roof</li>
                </ul>
              </div>
            </div>

            <div className="form-wrapper">
              {submitted && (
                <div className="success-message">
                  <span className="success-icon">✓</span>
                  Query submitted successfully! Our sales team will contact you within 24 hours at <strong>{formData.phone}</strong>.
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name / Workshop Name <span>*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name or workshop name"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Phone Number <span>*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Product Category You're Interested In</label>
                  <select
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                  >
                    <option value="">Select product category</option>
                    <option value="brake-pads">Brake Pads & Brake Shoes</option>
                    <option value="clutch">Clutch Plates & Pressure Plates</option>
                    <option value="filters">Air Filters & Oil Filters</option>
                    <option value="engine-parts">Engine Components</option>
                    <option value="suspension">Suspension & Steering Parts</option>
                    <option value="electrical">Electrical & Lighting Components</option>
                    <option value="batteries">Batteries & Charging Systems</option>
                    <option value="cooling">Cooling System Parts</option>
                    <option value="exhaust">Exhaust System Components</option>
                    <option value="multiple">Multiple Products - Need Consultation</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Preferred Contact Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div className="form-group">
                    <label>Preferred Time</label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                    >
                      <option value="">Select time slot</option>
                      <option value="9:00-11:00">9:00 AM - 11:00 AM</option>
                      <option value="11:00-13:00">11:00 AM - 1:00 PM</option>
                      <option value="14:00-16:00">2:00 PM - 4:00 PM</option>
                      <option value="16:00-18:00">4:00 PM - 6:00 PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Your Requirements / Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Tell us about your vehicle fleet, workshop requirements, quantity needed, or specific vehicle models. Our experts will help you find the right auto parts."
                  />
                </div>

                <button type="submit" className="btn-submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <span className="spinner"></span> Sending...
                    </>
                  ) : (
                    'Send Inquiry →'
                  )}
                </button>
              </form>

              <div className="form-footer-note">
                <p>🔧 Our sales team will contact you within 24 hours to discuss your requirements and provide the best pricing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="section-badge">Visit Us</div>
          <h2>Find Our <span>Facility</span></h2>
          <p className="map-subtitle">Auto Parts Market Near N.M. College Mansa, Punjab 151505</p>
          <div className="map-container">
  <iframe 
    src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d1168.2292066070866!2d75.39402169661425!3d30.016996028630864!3m2!1i1024!2i768!4f13.1!2m1!1sauto%20parts%20market%20mansa!5e0!3m2!1sen!2sin!4v1779769502441!5m2!1sen!2sin" 
    width="100%" 
    height="450" 
    style={{ border: 0 }} 
    allowFullScreen="" 
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade"
    title="RiM AUTO PARTS Location"
  ></iframe>
</div>
          <div className="map-directions">
            <a 
              href="https://maps.google.com/?q=Royal+Industries+Mansa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="directions-btn"
            >
              🗺️ Get Directions →
            </a>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="wa-directions-btn"
            >
              💬 Ask for Directions on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="contact-trust">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <span className="trust-icon">🔧</span>
              <div>
                <h4>OEM Standard Quality</h4>
                <p>Premium auto components</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🇮🇳</span>
              <div>
                <h4>Made in India</h4>
                <p>Manufactured in Mansa, Punjab</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🛡️</span>
              <div>
                <h4>15+ Year Experience*</h4>
                <p>On select product categories</p>
              </div>
            </div>
            <div className="trust-item">
              <span className="trust-icon">⭐</span>
              <div>
                <h4>5000+ Clients Served</h4>
                <p>Across India</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;