import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

function About() {

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-badge">EST. 2005</div>
          <h1>RiM</h1>
          <div className="hero-tagline">RiM AUTO PARTS</div>
          <p>Quality Auto Components • Reliable Performance • Trusted Since Decades</p>
          <div className="hero-cta">
            <Link to="/products" className="hero-btn primary">Explore Products</Link>
            <a href="#story" className="hero-btn secondary">Our Story</a>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-number">5000+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Years Experience*</span>
            </div>
            <div className="hero-stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Quality Assured</span>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story" id="story">
        <div className="container">
          <div className="story-content">
            <div className="section-badge">Our Journey</div>
            <h2>The <span>RiM</span> Story</h2>
            <p><strong>RiM AUTO PARTS</strong> was established with a vision to provide high-quality, reliable, and affordable auto components to vehicle owners and workshops across India. From humble beginnings in Mansa, Punjab, we've grown into a trusted name in the automotive parts industry.</p>
            <p>Our product range includes <strong>Brake Pads, Clutch Plates, Air Filters, Oil Filters, Suspension Parts, Engine Components, Lighting Systems, Electrical Parts, Cooling System Components, Exhaust Parts, and all related spare parts for commercial and passenger vehicles.</strong></p>
            <div className="story-highlight">
              <div className="highlight-icon">🇮🇳</div>
              <div className="highlight-text">
                <strong>Proudly Made in India - Mansa, Punjab</strong>
                <span>Manufactured with premium materials and strict quality control</span>
              </div>
            </div>
          </div>
          <div className="story-image">
            <div className="image-overlay"></div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="container">
          <div className="section-badge center">Our Purpose</div>
          <h2>Mission & Vision</h2>
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🔧</div>
              <h3>Our Mission</h3>
              <p>To provide reliable, durable, and affordable auto parts that keep vehicles running safely and efficiently across India with uncompromising quality.</p>
              <div className="mission-stats">
                <div>✓ 5000+ Happy Customers</div>
                <div>✓ 98% Customer Satisfaction</div>
              </div>
            </div>
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Our Vision</h3>
              <p>To become India's most trusted auto parts brand, recognized for quality, durability, and commitment to vehicle safety and performance.</p>
              <div className="mission-stats">
                <div>✓ #1 Auto Parts Brand in Region</div>
                <div>✓ 500+ Cities Served</div>
              </div>
            </div>
            <div className="mission-card">
              <div className="mission-icon">💎</div>
              <h3>Core Values</h3>
              <p>Quality First • Durability Always • Customer Trust • Innovation • Made in India</p>
              <div className="mission-stats">
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="about-features">
        <div className="container">
          <div className="section-badge center">Why Choose Us</div>
          <h2>RiM Stands Apart</h2>
          <p className="section-subtitle">
            Engineered for performance. Built for durability. Designed for safety.
          </p>

          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-icon">🛞</div>
              <h3>Premium Brake Parts</h3>
              <p>High-performance brake pads and rotors for superior stopping power and safety.</p>
              <div className="feature-tag">Ceramic Technology</div>
            </div>

            <div className="feature-box">
              <div className="feature-icon">⚙️</div>
              <h3>Transmission Components</h3>
              <p>Heavy-duty clutch plates and transmission parts for smooth gear shifts.</p>
              <div className="feature-tag">15+ Year Experience*</div>
            </div>

            <div className="feature-box">
              <div className="feature-icon">🌀</div>
              <h3>Premium Filters</h3>
              <p>High-flow air filters and oil filters for better engine performance and longevity.</p>
              <div className="feature-tag">OEM Standard</div>
            </div>

            <div className="feature-box">
              <div className="feature-icon">🇮🇳</div>
              <h3>Made in India</h3>
              <p>Proudly manufactured in Mansa, Punjab with premium materials and strict quality checks.</p>
              <div className="feature-tag">Proudly Indian</div>
            </div>

            <div className="feature-box">
              <div className="feature-icon">🔧</div>
              <h3>Complete Range</h3>
              <p>From brake systems to engine components, we have everything under one roof.</p>
              <div className="feature-tag">One Stop Shop</div>
            </div>

            <div className="feature-box">
              <div className="feature-icon">📞</div>
              <h3>Expert Support</h3>
              <p>Technical support available for product selection and installation guidance.</p>
              <div className="feature-tag">Pan India Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">15<span>+</span></div>
              <div className="stat-label">Years Experience*</div>
              <div className="stat-desc">Industry expertise</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5000<span>+</span></div>
              <div className="stat-label">Happy Customers</div>
              <div className="stat-desc">Across India</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100<span>%</span></div>
              <div className="stat-label">Quality Assured</div>
              <div className="stat-desc">Premium materials</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">20<span>+</span></div>
              <div className="stat-label">Product Categories</div>
              <div className="stat-desc">Complete range</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="about-testimonials">
        <div className="container">
          <div className="section-badge center">Testimonials</div>
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="quote-icon">“</div>
              <p>RiM's brake pads and clutch plates have been excellent for our workshop. The quality is top-notch and the durability is outstanding!</p>
              <div className="customer-info">
                <div className="customer-avatar">RK</div>
                <div className="customer-details">
                  <h4>Rajesh Khanna</h4>
                  <div className="rating">★★★★★</div>
                  <small>Workshop Owner</small>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-icon">“</div>
              <p>We've been using RiM auto parts for our fleet of vehicles. The quality and pricing are very competitive. Highly recommended!</p>
              <div className="customer-info">
                <div className="customer-avatar">SP</div>
                <div className="customer-details">
                  <h4>Sunil Patel</h4>
                  <div className="rating">★★★★★</div>
                  <small>Fleet Manager</small>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="quote-icon">“</div>
              <p>The air filters and engine components from RiM are excellent quality. Their brake pads are our go-to choice for all vehicles.</p>
              <div className="customer-info">
                <div className="customer-avatar">AM</div>
                <div className="customer-details">
                  <h4>Amit Mehta</h4>
                  <div className="rating">★★★★★</div>
                  <small>Auto Mechanic</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <h2>Ready to Get Quality Auto Parts?</h2>
          <p>Get the best quality auto components at competitive prices. Pan India shipping available.</p>
          <div className="cta-buttons">
            <Link to="/products" className="btn-primary">Explore Products</Link>
            <a href="tel:+919815097851" className="btn-primary">Request a Quote</a>
          </div>
          <div className="cta-features">
            <span>✓ Free Shipping on Bulk Orders</span>
            <span>✓ GST Invoice Available</span>
            <span>✓ Technical Support</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;