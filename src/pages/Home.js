// pages/Home.js - Dynamic Products Only (No Static Products)
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getReviews, addReview } from '../api';
import './Home.css';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [reviewFormData, setReviewFormData] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  const [heroCarouselIndex, setHeroCarouselIndex] = useState(0);
  const [welcomeCarouselIndex, setWelcomeCarouselIndex] = useState(0);
  const [productImageIndices, setProductImageIndices] = useState({});

  // Hero Carousel Images
  const heroCarouselImages = useMemo(() => [
    {
      url: "https://i.pinimg.com/1200x/60/ae/0f/60ae0fac72e5560068c1ca3ec61692d0.jpg",
      title: "Premium Auto Parts",
      subtitle: "Quality You Can Trust",
      description: "Genuine components for all vehicle models"
    },
    {
      url: "https://i.pinimg.com/736x/95/c2/3c/95c23c3caae018596436eaed8c481735.jpg",
      title: "Heavy Duty Clutch Plates",
      subtitle: "Performance & Durability",
      description: "Engineered for smooth gear shifts"
    },
    {
      url: "https://i.pinimg.com/736x/a5/86/ca/a586cafc485e5dd2ae437bf31375e48a.jpg",
      title: "Ceramic Brake Pads",
      subtitle: "Superior Stopping Power",
      description: "Safety first with premium quality"
    },
    {
      url: "https://i.pinimg.com/736x/1e/a2/cf/1ea2cf9a03281c25a5d14a4e9805befc.jpg",
      title: "Complete Auto Solutions",
      subtitle: "Brakes to Transmission",
      description: "One stop for all auto parts"
    }
  ], []);

  // Static Reviews (Fallback if API fails)
  const staticReviews = useMemo(() => [
    {
      id: 'review-1',
      name: 'Rajesh Kumar',
      rating: 5,
      comment: 'Excellent quality brake pads! The stopping power is amazing. Highly recommended for all vehicle owners.',
      date: '2024-03-15'
    },
    {
      id: 'review-2',
      name: 'Priya Singh',
      rating: 5,
      comment: 'Very satisfied with the clutch plate. Smooth gear shifts and great durability. Customer support is also very helpful.',
      date: '2024-03-10'
    },
    {
      id: 'review-3',
      name: 'Amit Sharma',
      rating: 4,
      comment: 'Good quality air filters at reasonable prices. Fast delivery and genuine products. Will order again.',
      date: '2024-03-05'
    }
  ], []);

  // Welcome Carousel Images
  const welcomeCarouselImages = useMemo(() => [
    {
      url: "https://i.postimg.cc/44zdjQy4/IMG-2741.jpg",
      alt: "Tie End Rod",
      caption: "Tie End Rod"
    }, 
    {
      url: "https://i.postimg.cc/445GzLnz/IMG-2751.jpg",
      alt: "Front Bush Kit",
      caption: "Front Bush Kit"
    }, 
    {
      url: "https://i.postimg.cc/NM24QPSv/IMG-2791.jpg",
      alt: "Engine Parts",
      caption: "Engine Components"
    },    
    {
      url: "https://i.postimg.cc/hjcwvnL2/IMG-2761.jpg",
      alt: "Auto Parts",
      caption: "Genuine Parts"
    },
    {
      url: "https://i.postimg.cc/1tsTXSGL/IMG-2760.jpg",
      alt: "Quality Parts",
      caption: "Quality Assurance"
    },
    {
      url: "https://i.postimg.cc/XNwfxF0m/IMG-2805.jpg",
      alt: "Auto Components",
      caption: "Auto Components"
    }
  ], []);

  // Auto-slide for hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCarouselIndex((prev) => (prev + 1) % heroCarouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroCarouselImages.length]);

  // Auto-slide for welcome carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setWelcomeCarouselIndex((prev) => (prev + 1) % welcomeCarouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [welcomeCarouselImages.length]);

  const nextProductImage = (e, productId, totalImages) => {
    e.stopPropagation();
    setProductImageIndices(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages
    }));
  };

  const prevProductImage = (e, productId, totalImages) => {
    e.stopPropagation();
    setProductImageIndices(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const phoneNumber1 = '7009564900';
  const whatsappNumber = '917009564900';
  const whatsappMessage = encodeURIComponent("Hello RiM Auto Parts, I'm interested in your auto parts products. Please share details.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
  
  const instagramLink = "https://www.instagram.com/rimmansa/";
  const facebookLink = "https://www.facebook.com/steelk001/";
  const justdialLink = "https://www.justdial.com/Mansa/Royal-Industries-Mansa-Kot-Lallu/9999P1652-1652-171230152122-Z2M7_BZDET";

  const galleryItems = useMemo(() => [
    { id: 1, image: "https://i.postimg.cc/vHszdhvJ/IMG-2795.jpg", title: "E N G I N E", fullTitle: "ENGINE MOUNT", description: "Premium Engine Mount" },
    { id: 2, image: "https://i.postimg.cc/vZ7tBV0F/IMG-2774.jpg", title: "S U S P E N S I O N", fullTitle: "SUSPENSION BALL JOINT", description: "Suspension Ball Joint" },
    { id: 3, image: "https://i.postimg.cc/fbTqQCDH/IMG-2779.jpg", title: "T R A I L I N G  A R M", fullTitle: "TRAILING ARM BUSH", description: "High-Performance Arm Bush" },
    { id: 4, image: "https://i.postimg.cc/GtYqxSxB/IMG-2781.jpg", title: "S T A R T  M O U N T", fullTitle: "START MOUNT", description: "Quality Engine Components" }
  ], []);

  const getCategoryDisplayName = useCallback((categoryValue) => {
    const displayNames = {
      'brake-system': 'Brake System',
      'transmission': 'Transmission Parts',
      'engine-parts': 'Engine Components',
      'suspension': 'Suspension Parts',
      'electrical': 'Electrical Parts',
      'cooling-system': 'Cooling System',
      'exhaust': 'Exhaust System',
      'lighting': 'Lighting & Lamps',
      'body-parts': 'Body Parts',
      'filters': 'Filters'
    };
    return displayNames[categoryValue] || categoryValue?.replace(/-/g, ' ').toUpperCase();
  }, []);

  const getCategoryIcon = useCallback((category) => {
    const icons = {
      'brake-system': '🛞',
      'transmission': '⚙️',
      'engine-parts': '🔧',
      'suspension': '🔄',
      'electrical': '⚡',
      'cooling-system': '❄️',
      'exhaust': '💨',
      'lighting': '💡',
      'body-parts': '🚗',
      'filters': '🌀'
    };
    return icons[category] || '🔧';
  }, []);

  const openWhatsApp = (productName) => {
    const message = encodeURIComponent(`Hello RiM Auto Parts, I'm interested in "${productName}". Could you please share details and price?`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const nextImage = (e) => { 
    e.stopPropagation(); 
    if (selectedProduct?.images?.length) 
      setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length); 
  };
  
  const prevImage = (e) => { 
    e.stopPropagation(); 
    if (selectedProduct?.images?.length) 
      setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length); 
  };

  // Get 6 random products from the list
  const getRandomProducts = (allProducts, count = 6) => {
    if (!allProducts || allProducts.length === 0) return [];
    const shuffled = [...allProducts];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  };

  // Load Products - Only dynamic products, no static fallback
  const loadProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    try {
      const data = await getProducts();
      console.log('Products loaded:', data);
      
      if (data && Array.isArray(data) && data.length > 0) {
        const validProducts = data.filter(product => product && product.id);
        // Get 6 random products from API
        const randomProducts = getRandomProducts(validProducts, 6);
        setFeaturedProducts(randomProducts);
      } else {
        // Show empty array if no products from API
        setFeaturedProducts([]);
        console.warn('No products received from API');
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setFeaturedProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  // Load Reviews with fallback to static reviews
  const loadReviews = useCallback(async () => {
    setIsLoadingReviews(true);
    try {
      const allReviews = await getReviews();
      console.log('Reviews loaded:', allReviews);
      
      if (allReviews && Array.isArray(allReviews) && allReviews.length > 0) {
        const shuffled = [...allReviews];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        setReviews(shuffled.slice(0, 3));
      } else {
        // Use static reviews as fallback
        setReviews(staticReviews);
      }
    } catch (error) {
      console.error('Error loading reviews:', error);
      // Use static reviews on error
      setReviews(staticReviews);
    } finally {
      setIsLoadingReviews(false);
    }
  }, [staticReviews]);

  useEffect(() => {
    loadProducts();
    loadReviews();
  }, [loadProducts, loadReviews]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProduct]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewFormData.name || !reviewFormData.comment) {
      alert('Please fill in all fields');
      return;
    }
    setReviewSubmitting(true);
    try {
      await addReview(reviewFormData);
      setReviewSuccess(true);
      setReviewFormData({ name: '', rating: 5, comment: '' });
      setTimeout(() => { setReviewSuccess(false); setShowReviewForm(false); }, 3000);
      // Refresh reviews after submission
      loadReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
    } finally {
      setReviewSubmitting(false);
    }
  };

  return (
    <div className="home">
      <div className="scroll-progress"></div>

      {/* HERO CAROUSEL SECTION */}
      <section className="hero-carousel-section">
        <div className="hero-carousel-container">
          <div className="hero-carousel-track" style={{ transform: `translateX(-${heroCarouselIndex * 100}%)` }}>
            {heroCarouselImages.map((image, index) => (
              <div key={index} className="hero-carousel-slide">
                <div className="hero-slide-bg">
                  <img src={image.url} alt={image.title} />
                  <div className="hero-slide-overlay"></div>
                </div>
                <div className="hero-slide-content">
                  <div className="hero-content-wrapper">
                    <span className="hero-badge">RiM AUTO PARTS</span>
                    <h1 className="hero-title">
                      <span className="hero-title-line">{image.title}</span>
                      <span className="hero-title-sub">{image.subtitle}</span>
                    </h1>
                    <p className="hero-description">{image.description}</p>
                    <div className="hero-buttons">
                      <Link to="/products" className="hero-btn-primary">Explore Products →</Link>
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="hero-btn-secondary">💬 WhatsApp</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="hero-carousel-nav prev" onClick={() => {
            setHeroCarouselIndex((prev) => (prev - 1 + heroCarouselImages.length) % heroCarouselImages.length);
          }}>❮</button>
          <button className="hero-carousel-nav next" onClick={() => {
            setHeroCarouselIndex((prev) => (prev + 1) % heroCarouselImages.length);
          }}>❯</button>
          
          <div className="hero-carousel-dots">
            {heroCarouselImages.map((_, index) => (
              <button 
                key={index} 
                className={`hero-dot ${heroCarouselIndex === index ? 'active' : ''}`}
                onClick={() => setHeroCarouselIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="container">
          <div className="welcome-grid">
            <div className="welcome-image-carousel">
              <div className="carousel-container-small">
                <div className="carousel-track-small" style={{ transform: `translateX(-${welcomeCarouselIndex * 100}%)` }}>
                  {welcomeCarouselImages.map((image, index) => (
                    <div key={index} className="carousel-item-small">
                      <img src={image.url} alt={image.alt} />
                    </div>
                  ))}
                </div>
                <button className="carousel-nav-small prev" onClick={() => {
                  setWelcomeCarouselIndex((prev) => (prev - 1 + welcomeCarouselImages.length) % welcomeCarouselImages.length);
                }}>❮</button>
                <button className="carousel-nav-small next" onClick={() => {
                  setWelcomeCarouselIndex((prev) => (prev + 1) % welcomeCarouselImages.length);
                }}>❯</button>
                <div className="carousel-dots-small">
                  {welcomeCarouselImages.map((_, index) => (
                    <button 
                      key={index} 
                      className={`dot-small ${welcomeCarouselIndex === index ? 'active' : ''}`}
                      onClick={() => setWelcomeCarouselIndex(index)}
                    />
                  ))}
                </div>
              </div>
              <div className="welcome-buttons-carousel">
                <Link to="/products" className="btn-primary">Browse Products</Link>
              </div>
            </div>
            <div className="welcome-content">
              <div className="welcome-badge">AN ISO 9001:2015 CERTIFIED COMPANY</div>
              <h1>Welcome To <br></br><span>RiM AUTO PARTS</span></h1>
              <p>Your trusted partner for premium quality auto parts. From brake systems and clutch plates to engine components and filters, every product is crafted for durability, performance, and complete vehicle safety.</p>
              <div className="welcome-features">
                <div className="welcome-feature"><span>✓</span> GST Invoice</div>
                <div className="welcome-feature"><span>✓</span> Pan India Shipping</div>
                <div className="welcome-feature"><span>✓</span> Technical Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section - 6 Dynamic Products */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Premium Quality</div>
            <h2>Featured <span>Products</span></h2>
            <p className="section-subtitle">Discover our most popular auto parts trusted by mechanics nationwide</p>
          </div>
          
          {isLoadingProducts ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading products...</p>
            </div>
          ) : (
            <>
              {featuredProducts.length > 0 ? (
                <div className="products-grid">
                  {featuredProducts.map((product, idx) => {
                    const currentImgIndex = productImageIndices[product.id] || 0;
                    const hasMultipleImages = product.images && product.images.length > 1;
                    
                    return (
                      <div 
                        key={product.id || idx} 
                        className="product-card" 
                        onClick={() => setSelectedProduct(product)}
                      >
                        <div className="product-image-container">
                          {product.images && product.images[0] ? 
                            <>
                              <img 
                                src={product.images[currentImgIndex]} 
                                alt={product.name || 'Auto Part'} 
                                className="product-image" 
                                loading="lazy"
                                onError={(e) => { 
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/400x300?text=Auto+Part';
                                }} 
                              />
                              {hasMultipleImages && (
                                <>
                                  <button 
                                    className="product-image-nav prev-nav" 
                                    onClick={(e) => prevProductImage(e, product.id, product.images.length)}
                                  >
                                    ❮
                                  </button>
                                  <button 
                                    className="product-image-nav next-nav" 
                                    onClick={(e) => nextProductImage(e, product.id, product.images.length)}
                                  >
                                    ❯
                                  </button>
                                  <div className="image-counter">
                                    {currentImgIndex + 1} / {product.images.length}
                                  </div>
                                </>
                              )}
                            </>
                            : (
                              <div className="image-placeholder">
                                <span>🔧</span>
                                <p>No Image</p>
                              </div>
                            )}
                        </div>
                        <div className="product-info">
                          <span className="product-category">
                            {getCategoryIcon(product.category)} {getCategoryDisplayName(product.category)}
                          </span>
                          <h3 className="product-title">
                            {product.name || product.description?.substring(0, 70) || 'Auto Part'}
                          </h3>
                          <p className="product-description">
                            {product.description || `Premium quality ${product.category || 'auto part'} for your vehicle`}
                          </p>
                          <div className="product-footer">
                            <button className="view-details-btn">View Details →</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="no-products">
                  <div className="loading-container">
                    <p>No products available at the moment. Please check back later.</p>
                  </div>
                </div>
              )}
              
              {featuredProducts.length > 0 && (
                <div className="view-all-container">
                  <Link to="/products" className="btn-view-all">View Complete Range →</Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Parallax Section */}
      <section className="parallax-section">
        <div className="parallax-overlay"></div>
        <div className="container">
          <div className="parallax-content">
            <span className="parallax-badge">Why Choose RiM Auto Parts?</span>
            <h2>Genuine <span>Auto Components</span></h2>
            <p>From brake systems and clutch plates to engine components and filters, every RiM Auto Parts product is crafted for durability, performance, and complete vehicle safety.</p>
            <div className="parallax-features">
              <div className="parallax-feature"><span>✓</span><p>Brake System Parts</p></div>
              <div className="parallax-feature"><span>✓</span><p>Transmission Components</p></div>
              <div className="parallax-feature"><span>✓</span><p>Engine & Filter Parts</p></div>
            </div>
            <Link to="/catalog" className="btn-parallax">Download Catalog →</Link>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <div className="gallery-container">
        {galleryItems.map((item) => (
          <div key={item.id} className="gallery-item" style={{ backgroundImage: `url(${item.image})` }}>
            <div className="gallery-overlay">
              <h3>
                <span className="vertical-text">{item.title}</span>
                <span className="horizontal-text">{item.fullTitle}</span>
              </h3>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">Testimonials</div>
            <h2>What Our <span>Customers Say</span></h2>
            <p className="section-subtitle">Trusted by Mechanics & Vehicle Owners</p>
          </div>
          
          <div className="review-form-wrapper">
            {!showReviewForm ? (
              <button className="btn-write-review" onClick={() => setShowReviewForm(true)}>
                ✍️ Write a Review
              </button>
            ) : (
              <div className="review-form-container">
                <h3>Share Your Experience with RiM Auto Parts</h3>
                <form onSubmit={handleReviewSubmit}>
                  <div className="form-group">
                    <input 
                      type="text" 
                      placeholder="Your Name *" 
                      value={reviewFormData.name} 
                      onChange={(e) => setReviewFormData({ ...reviewFormData, name: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <div className="rating-input">
                      {[...Array(5)].map((_, i) => (
                        <button 
                          key={i} 
                          type="button" 
                          className={`star-btn ${i+1 <= reviewFormData.rating ? 'active' : ''}`} 
                          onClick={() => setReviewFormData({ ...reviewFormData, rating: i+1 })}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea 
                      placeholder="Your Review *" 
                      value={reviewFormData.comment} 
                      onChange={(e) => setReviewFormData({ ...reviewFormData, comment: e.target.value })} 
                      rows="3" 
                      required 
                    />
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-submit" disabled={reviewSubmitting}>
                      {reviewSubmitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                    <button type="button" className="btn-cancel" onClick={() => setShowReviewForm(false)}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          
          {reviewSuccess && (
            <div className="success-message">✓ Thank you for your valuable feedback!</div>
          )}
          
          {isLoadingReviews ? (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading reviews...</p>
            </div>
          ) : (
            <>
              <div className="reviews-grid">
                {reviews.length > 0 ? (
                  reviews.map((review, idx) => (
                    <div key={review.id || idx} className="review-card">
                      <div className="review-header">
                        <div className="reviewer-info">
                          <div className="reviewer-avatar">{review.name?.charAt(0) || 'U'}</div>
                          <div>
                            <h3>{review.name || 'Anonymous'}</h3>
                            <div className="rating-stars">
                              {'★'.repeat(review.rating || 5)}
                              {'☆'.repeat(5 - (review.rating || 5))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>{review.comment || 'Great products and service!'}</p>
                    </div>
                  ))
                ) : (
                  <div className="no-reviews">
                    <p>No reviews yet. Be the first to share your experience!</p>
                  </div>
                )}
              </div>
              <div className="view-all-reviews">
                <Link to="/reviews" className="btn-view-all">View All Reviews →</Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Need Bulk Order or Custom Auto Parts?</h2>
            <p>Get the best rates for workshops, garages, and auto part dealers. We supply across India.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn-primary">Request a Quote</Link>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn-wa">💬 Chat on WhatsApp</a>
            </div>
            <div className="cta-features">
              <span>✓ GST Invoice</span>
              <span>✓ Pan India Shipping</span>
              <span>✓ Technical Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Bar */}
      <section className="contact-bar">
        <div className="container">
          <div className="contact-bar-content">
            <div className="contact-item">
              <span className="contact-icon phone-icon">📞</span>
              <div>
                <h4>Call Our Experts</h4>
                <a href={`tel:${phoneNumber1}`}>{phoneNumber1}</a> 
              </div>
            </div>
            
            <div className="contact-divider"></div>
            
            <div className="contact-item">
              <span className="contact-icon whatsapp-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" fill="currentColor">
                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                </svg>
              </span>
              <div>
                <h4>WhatsApp Us</h4>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Click to Chat →</a>
              </div>
            </div>
            
            <div className="contact-divider"></div>
            
            <div className="contact-item">
              <span className="contact-icon location-icon">📍</span>
              <div>
                <h4>RiM Auto Parts</h4>
                <p>Mansa, Punjab (Auto Parts Market Near N.M. College Mansa, Punjab 151505)</p>
              </div>
            </div>
            
            <div className="contact-divider"></div>
            
            <div className="contact-item social-icons">
              <span className="contact-icon social-icon-label">📱</span>
              <div>
                <h4>Follow Us</h4>
                <div className="social-links">
                  <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="social-link instagram" aria-label="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" fill="currentColor">
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                    </svg>
                  </a>
                  <a href={facebookLink} target="_blank" rel="noopener noreferrer" className="social-link facebook" aria-label="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" fill="currentColor">
                      <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                    </svg>
                  </a>
                  <a href={justdialLink} target="_blank" rel="noopener noreferrer" className="social-link justdial" aria-label="Justdial">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 13c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content product-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedProduct(null)}>×</button>
            <div className="product-detail-gallery">
              {selectedProduct.images && selectedProduct.images.length > 0 ? (
                <div className="image-slider-container">
                  <div className="main-slider-image">
                    <img src={selectedProduct.images[currentImageIndex]} alt={selectedProduct.name} />
                    {selectedProduct.images.length > 1 && (
                      <>
                        <button className="slider-nav prev-nav" onClick={prevImage}>❮</button>
                        <button className="slider-nav next-nav" onClick={nextImage}>❯</button>
                      </>
                    )}
                  </div>
                  <div className="slider-dots">
                    {selectedProduct.images.map((_, idx) => (
                      <button 
                        key={idx} 
                        className={`slider-dot ${currentImageIndex === idx ? 'active' : ''}`} 
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }} 
                      />
                    ))}
                  </div>
                  <div className="thumbnail-strip">
                    {selectedProduct.images.map((img, idx) => (
                      <div 
                        key={idx} 
                        className={`thumbnail ${currentImageIndex === idx ? 'active' : ''}`} 
                        onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                      >
                        <img src={img} alt={`Thumb ${idx + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="gallery-placeholder"><span>🔧</span></div>
              )}
            </div>
            <div className="product-detail-info">
              <span className="product-category-tag">
                {getCategoryIcon(selectedProduct.category)} {getCategoryDisplayName(selectedProduct.category)}
              </span>
              <h2>{selectedProduct.description || selectedProduct.name}</h2>
              <p className="full-description">
                {selectedProduct.name
                  ? `${selectedProduct.name} - Premium quality auto part designed for durability and performance. Manufactured to OEM standards.`
                  : 'Premium quality auto part designed for durability and performance. Manufactured to OEM standards.'}
              </p>
              <div className="contact-actions">
                <a href={`tel:${phoneNumber1}`} className="call-now-btn">📞 Call for Best Price</a>
                <button onClick={() => openWhatsApp(selectedProduct.name)} className="wa-consult-btn">💬 Chat on WhatsApp</button>
                <Link to="/contact" className="consult-btn">Get Quote →</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;