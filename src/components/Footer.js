import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Updated Contact Numbers for RiM AUTO PARTS
  const phoneNumber1 = '7009564900';
  const whatsappNumber = '917009564900';
  const whatsappMessage = encodeURIComponent("Hello RiM AUTO PARTS, I'm interested in your auto parts products. I'd like to know more about your brake pads, clutch plates, air filters, and bulk pricing.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  // Social Media Links
  const IndiaMartLink = "https://www.indiamart.com/guru-nan-mansa/?srsltid=AfmBOopo00d7HA16sy7wThhaUmpSyKnpG7sT0X7U9BTHshODKRAku9_l";

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-logo">
            <div className="logo-icon">
              <p>RiM</p>
            </div>
          </div>
          <p className="brand-tagline">RiM AUTO PARTS | Since 2005</p>
          <p className="brand-description">Leading supplier of premium quality auto components including Brake Pads, Clutch Plates, Air Filters, Oil Filters, Engine Parts, Suspension Components, and complete automotive solutions.</p>
          <div className="trust-badges">
            <span>🇮🇳 Made in India</span>
            <span>🔧 OEM Standard</span>
            <span>🛡️ Quality Assured</span>
          </div>
          
          {/* Social Media Icons Section */}
          <div className="footer-social-section">
            <h4>Connect With Us</h4>
            <div className="social-icons-container">
              {/* WhatsApp */}
              <a href={whatsappLink} className="social-icon whatsapp" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="currentColor">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
              </a>
              
              
              {/* IndiaMart */}
              <a href={IndiaMartLink} className="social-icon IndiaMart" target="_blank" rel="noopener noreferrer" aria-label="IndiaMart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/about">About RiM AUTO PARTS</Link></li>
            <li><Link to="/catalog">Product Catalog</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/reviews">Customer Reviews</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Our Products</h3>
          <ul>
            <li><Link to="/products?category=brake-pads">🛞 Brake Pads & Brake Shoes</Link></li>
            <li><Link to="/products?category=clutch">⚙️ Clutch Plates & Pressure Plates</Link></li>
            <li><Link to="/products?category=filters">🌀 Air Filters & Oil Filters</Link></li>
            <li><Link to="/products?category=engine-parts">🔧 Engine Components</Link></li>
            <li><Link to="/products?category=suspension">🔄 Suspension & Steering Parts</Link></li>
            <li><Link to="/products?category=electrical">⚡ Electrical & Lighting</Link></li>
            <li><Link to="/products?category=cooling">❄️ Cooling System Parts</Link></li>
            <li><Link to="/products">View All Products →</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact & Location</h3>
          <ul className="contact-info">
            <li>
              <span className="contact-icon">📍</span>
              <span>Auto Parts Market Near N.M. College Mansa, Punjab 151505</span>
            </li>
            <li>
              <span className="contact-icon">📞</span>
              <span>
                <a href={`tel:${phoneNumber1}`}>{phoneNumber1}</a>
              </span>
            </li>
            <li>
              <span className="contact-icon">💬</span>
              <span>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
              </span>
            </li>
            <li>
              <span className="contact-icon">🕒</span>
              <span>Monday - Saturday: 9:00 AM - 7:00 PM<br />Sunday: By Appointment Only</span>
            </li>
            <li>
  <span className="contact-icon">✉️</span>
  <span>
    <a href="mailto:gnmsrim@gmail.com">gnmsrim@gmail.com</a>
  </span>
</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {currentYear} RiM AUTO PARTS. All rights reserved.</p>
          <p className="footer-tagline">🔧 Premium Quality Auto Components | OEM Standard | Workshops & Retail 🔧</p>
          <div className="footer-social-links">
            <a href={whatsappLink} className="footer-social-link" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="14" height="14" fill="currentColor">
                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
              WhatsApp
            </a>
            <a href={IndiaMartLink} className="footer-social-link" target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/>
              </svg>
              IndiaMart
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;