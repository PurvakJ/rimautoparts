import React, { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../api';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([{ value: 'all', label: 'All Products', icon: '🔧' }]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productImageIndices, setProductImageIndices] = useState({});

  // Updated Contact Numbers for RiM AUTO PARTS
  const phoneNumber1 = '7009564900';
  const whatsappNumber = '917009564900';

  // Helper function to safely get product name as string
  const getProductName = (product) => {
    if (product && product.name !== undefined && product.name !== null) {
      return String(product.name);
    }
    return '';
  };

  // Helper function to safely get product description as string
  const getProductDescription = (product) => {
    if (product && product.description !== undefined && product.description !== null) {
      return String(product.description);
    }
    return '';
  };

  // Function to navigate product images without opening modal
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

  const getCategoryDisplayName = useCallback((categoryValue) => {
    const displayNames = {
      'brake-system': 'Brake System Parts',
      'transmission': 'Transmission Components',
      'engine-parts': 'Engine Parts',
      'suspension': 'Suspension Parts',
      'electrical': 'Electrical Parts',
      'cooling-system': 'Cooling System',
      'exhaust': 'Exhaust System',
      'lighting': 'Lighting & Lamps',
      'body-parts': 'Body Parts',
      'filters': 'Air & Oil Filters',
      'clutch': 'Clutch System',
      'brake-pads': 'Brake Pads',
      'oil-filters': 'Oil Filters',
      'air-filters': 'Air Filters',
      'spark-plugs': 'Spark Plugs',
      'batteries': 'Batteries',
      'belts': 'Belts & Hoses'
    };
    if (!categoryValue) return 'Products';
    return displayNames[categoryValue] || 
           categoryValue?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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
      'filters': '🌀',
      'clutch': '🔧',
      'brake-pads': '🛞',
      'oil-filters': '🛢️',
      'air-filters': '🌬️',
      'spark-plugs': '⚡',
      'batteries': '🔋',
      'belts': '⛓️'
    };
    return icons[category] || '🔧';
  }, []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      const validProducts = data.filter(product => product && product.id);
      
      const sanitizedProducts = validProducts.map(product => ({
        ...product,
        name: getProductName(product),
        description: getProductDescription(product)
      }));
      
      setProducts(sanitizedProducts);
      
      const seenCategories = new Set();
      const uniqueCategories = [];
      
      for (const product of sanitizedProducts) {
        if (product.category && !seenCategories.has(product.category)) {
          seenCategories.add(product.category);
          uniqueCategories.push(product.category);
        }
      }
      
      const dynamicCategories = uniqueCategories.map(cat => ({
        value: cat,
        label: getCategoryDisplayName(cat),
        icon: getCategoryIcon(cat)
      }));
      
      setCategories([
        { value: 'all', label: 'All Products', icon: '🔧' },
        ...dynamicCategories
      ]);
    } catch (error) {
      console.error('Error loading products:', error);
      // Fallback products for RiM AUTO PARTS
      const fallbackProducts = [
        { id: 1, name: "Premium Ceramic Brake Pads", price: 2499, description: "High-performance ceramic brake pads with superior stopping power. Low dust, quiet operation, and long-lasting durability.", images: ["https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&auto=format"], category: "brake-pads", featured: true },
        { id: 2, name: "Heavy Duty Clutch Plate", price: 3850, description: "Performance clutch plate with premium friction material for smooth engagement and long life.", images: ["https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&auto=format"], category: "clutch", featured: true },
        { id: 3, name: "High Flow Air Filter", price: 1899, description: "Premium air filter with high airflow for better engine performance and fuel efficiency.", images: ["https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&auto=format"], category: "air-filters", featured: true },
        { id: 4, name: "Synthetic Oil Filter", price: 899, description: "High-efficiency oil filter for superior engine protection. Removes 99% of contaminants.", images: ["https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&auto=format"], category: "oil-filters", featured: false },
        { id: 5, name: "Iridium Spark Plugs (Set of 4)", price: 1299, description: "Premium iridium spark plugs for better ignition, fuel efficiency, and longer life.", images: ["https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&auto=format"], category: "spark-plugs", featured: false },
        { id: 6, name: "Car Battery 12V 60Ah", price: 5499, description: "Maintenance-free car battery with high cranking power and long life. 18 months warranty.", images: ["https://images.unsplash.com/photo-1562408590-e32931084e23?w=600&auto=format"], category: "batteries", featured: true }
      ];
      setProducts(fallbackProducts);
      
      const seenCategories = new Set();
      const uniqueCategories = [];
      for (const product of fallbackProducts) {
        if (product.category && !seenCategories.has(product.category)) {
          seenCategories.add(product.category);
          uniqueCategories.push(product.category);
        }
      }
      
      const dynamicCategories = uniqueCategories.map(cat => ({
        value: cat,
        label: getCategoryDisplayName(cat),
        icon: getCategoryIcon(cat)
      }));
      
      setCategories([
        { value: 'all', label: 'All Products', icon: '🔧' },
        ...dynamicCategories
      ]);
    } finally {
      setLoading(false);
    }
  }, [getCategoryDisplayName, getCategoryIcon]);

  const filterProducts = useCallback(() => {
    let filtered = products.filter(product => {
      const matchesCategory = category === 'all' || product.category === category;
      const productName = getProductName(product);
      const productDescription = getProductDescription(product);
      const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           productDescription.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    setFilteredProducts(filtered);
  }, [products, category, searchTerm]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedProduct]);

  const getCategoryName = useCallback((category) => {
    return getCategoryDisplayName(category);
  }, [getCategoryDisplayName]);

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedProduct && selectedProduct.images && selectedProduct.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedProduct.images.length);
    }
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedProduct && selectedProduct.images && selectedProduct.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedProduct.images.length) % selectedProduct.images.length);
    }
  };

  const openWhatsApp = (productName) => {
    const safeProductName = productName ? String(productName) : 'this product';
    const message = encodeURIComponent(`Hello RiM AUTO PARTS, I'm interested in the "${safeProductName}" auto part. Could you please share more details and the best price for bulk/retail?`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const renderProductName = (product) => {
    const name = getProductName(product);
    return name || 'Product';
  };

  const renderProductDescription = (product, maxLength = 70) => {
    const desc = getProductDescription(product);
    if (!desc) return 'Premium quality auto part for reliable performance';
    return desc.length > maxLength ? `${desc.substring(0, maxLength)}...` : desc;
  };

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="container">
          <div className="hero-badge" style={{ color: 'white' }}>RiM AUTO PARTS</div>
          <div className="hero-icon">🔧</div>
          <h1>Our <span>Auto Parts Range</span></h1>
          <p>Discover premium quality auto components for all vehicle makes and models. OEM standard with quality assurance.</p>
        </div>
      </section>

      <div className="products-container">
        <div className="filters-section">
          <div className="filter-group">
            <label>Category:</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>
        
          <div className="filter-group search-group">
            <label>Search:</label>
            <input
              type="text"
              placeholder="Search products (Brake Pads, Clutch, Filters...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="results-count">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading our premium auto parts collection...</p>
          </div>
        ) : (
          <>
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <div className="no-products-icon">🔧</div>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
                <button 
                  className="btn-reset"
                  onClick={() => {
                    setCategory('all');
                    setSearchTerm('');
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => {
                  const currentImgIndex = productImageIndices[product.id] || 0;
                  const hasMultipleImages = product.images && product.images.length > 1;
                  
                  return (
                    <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
                      <div className="product-image-container">
                        {product.images && product.images[0] ? (
                          <>
                            <img 
                              src={product.images[currentImgIndex]} 
                              alt={renderProductName(product)} 
                              className="product-image"
                              loading="lazy"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=600&auto=format';
                              }}
                            />
                            {hasMultipleImages && (
                              <>
                                <button 
                                  className="product-image-nav prev-nav" 
                                  onClick={(e) => prevProductImage(e, product.id, product.images.length)}
                                  aria-label="Previous image"
                                >
                                  ❮
                                </button>
                                <button 
                                  className="product-image-nav next-nav" 
                                  onClick={(e) => nextProductImage(e, product.id, product.images.length)}
                                  aria-label="Next image"
                                >
                                  ❯
                                </button>
                                <div className="image-counter">
                                  {currentImgIndex + 1} / {product.images.length}
                                </div>
                              </>
                            )}
                          </>
                        ) : (
                          <div className="image-placeholder">
                            <span>🔧</span>
                          </div>
                        )}
                      </div>
                      <div className="product-info">
                        <span className="product-category">
                          {getCategoryIcon(product.category)} {getCategoryName(product.category)}
                        </span>
                        <h3 className="product-title">
                          {renderProductDescription(product)}
                        </h3>
                        <p className="product-description">
                          {renderProductName(product)} 
                        </p>
                        <div className="product-footer">
                          <button className="view-details-btn">View Details →</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Product Modal with Image Slider */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content product-detail-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setSelectedProduct(null)}>×</button>
            
            <div className="product-detail-gallery">
              {selectedProduct.images && selectedProduct.images.length > 0 ? (
                <div className="image-slider-container">
                  <div className="main-slider-image">
                    <img 
                      src={selectedProduct.images[currentImageIndex]} 
                      alt={`${renderProductName(selectedProduct)} - ${currentImageIndex + 1}`}
                    />
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                      />
                    ))}
                  </div>
                  <div className="thumbnail-strip">
                    {selectedProduct.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`thumbnail ${currentImageIndex === idx ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(idx);
                        }}
                      >
                        <img src={img} alt={`Thumbnail ${idx + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="gallery-placeholder">
                  <span>🔧</span>
                </div>
              )}
            </div>
            
            <div className="product-detail-info">
              <span className="product-category-tag">
                {getCategoryIcon(selectedProduct.category)} {getCategoryName(selectedProduct.category)}
              </span>
              <h2>
                {renderProductDescription(selectedProduct)}
              </h2>
              <p className="full-description">
                {renderProductName(selectedProduct)} 
              </p>
              <div className="contact-actions">
                <a href={`tel:${phoneNumber1}`} className="call-now-btn">📞 Call for Best Price</a>
                <button onClick={() => openWhatsApp(renderProductName(selectedProduct))} className="wa-consult-btn">
                  💬 Chat on WhatsApp
                </button>
                <a href="/contact" className="consult-btn">Request a Quote →</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;