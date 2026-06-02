// components/Catalog.js
import React, { useState, useEffect, useRef } from 'react';
import './Catalog.css';

// Static data moved outside component to prevent recreation on every render
const CATALOG_IMAGES = [
  'https://i.postimg.cc/DzrX1XgK/Whats-App-Image-2026-05-27-at-16-31-32-(9).jpg',
  'https://i.postimg.cc/6QrvCv0x/Whats-App-Image-2026-05-27-at-16-31-32-(10).jpg',
  'https://i.postimg.cc/25QZnZwp/Whats-App-Image-2026-05-27-at-16-31-32-(12).jpg',
  'https://i.postimg.cc/fbc9Y9v6/Whats-App-Image-2026-05-27-at-16-31-32-(21).jpg',
  'https://i.postimg.cc/SK6McMrx/Whats-App-Image-2026-05-27-at-16-31-32-(27).jpg',
  'https://i.postimg.cc/QMQTcTbH/Whats-App-Image-2026-05-27-at-16-31-32-(28).jpg',
  'https://i.postimg.cc/q7s323Ln/Whats-App-Image-2026-05-27-at-16-31-32-(29).jpg',
  'https://i.postimg.cc/tg3xFx5W/Whats-App-Image-2026-05-27-at-16-31-32-(30).jpg',
  'https://i.postimg.cc/XJnyLYH9/Whats-App-Image-2026-05-27-at-16-31-32-(31).jpg',
  'https://i.postimg.cc/NMQrDjJ1/Whats-App-Image-2026-05-27-at-16-31-32-(32).jpg',
  'https://i.postimg.cc/TwTW037Q/Whats-App-Image-2026-05-27-at-16-31-32-(33).jpg',
  'https://i.postimg.cc/ZRJyH57V/Whats-App-Image-2026-05-27-at-16-31-32-(34).jpg',
  'https://i.postimg.cc/TwQ54vBd/Whats-App-Image-2026-05-27-at-16-31-32-(35).jpg',
  'https://i.postimg.cc/xCgN4VBn/Whats-App-Image-2026-05-27-at-16-31-32-(36).jpg',
  'https://i.postimg.cc/hvjQF3qj/Whats-App-Image-2026-05-27-at-16-31-32-(37).jpg',
  'https://i.postimg.cc/5y0QckMy/Whats-App-Image-2026-05-27-at-16-31-32-(38).jpg',
  'https://i.postimg.cc/x8CNrFSv/Whats-App-Image-2026-05-27-at-16-31-32-(39).jpg',
  'https://i.postimg.cc/1XtVxYZ0/Whats-App-Image-2026-05-27-at-16-31-32-(40).jpg',
  'https://i.postimg.cc/T14LTqRq/Whats-App-Image-2026-05-27-at-16-31-32-(41).jpg',
  'https://i.postimg.cc/Gt58bJcx/Whats-App-Image-2026-05-27-at-16-31-32-(42).jpg',
  'https://i.postimg.cc/zvcbqSJx/Whats-App-Image-2026-05-27-at-16-31-32-(43).jpg',
  'https://i.postimg.cc/HnhcT4pS/Whats-App-Image-2026-05-27-at-16-31-32-(44).jpg',
  'https://i.postimg.cc/D0MJ7d2R/Whats-App-Image-2026-05-27-at-16-31-32-(45).jpg',
  'https://i.postimg.cc/fW207Zxz/Whats-App-Image-2026-05-27-at-16-31-32-(46).jpg',
  'https://i.postimg.cc/3rSDj7gm/Whats-App-Image-2026-05-27-at-16-31-32-(47).jpg',
  'https://i.postimg.cc/ryntGcSC/Whats-App-Image-2026-05-27-at-16-31-32-(48).jpg',
  'https://i.postimg.cc/yYD3v5PQ/Whats-App-Image-2026-05-27-at-16-31-32-(49).jpg',
  'https://i.postimg.cc/d0Y7Q0KS/Whats-App-Image-2026-05-27-at-16-31-33-(10).jpg',
  'https://i.postimg.cc/TP6y2P6x/Whats-App-Image-2026-05-27-at-16-31-33-(11).jpg',
  'https://i.postimg.cc/DzTWfzTF/Whats-App-Image-2026-05-27-at-16-31-33-(12).jpg',
  'https://i.postimg.cc/sDbQ8c6b/Whats-App-Image-2026-05-27-at-16-31-33-(7).jpg',
  'https://i.postimg.cc/kXL6ZcYP/Whats-App-Image-2026-05-27-at-16-31-33-(8).jpg',
  'https://i.postimg.cc/k5mVM5dc/Whats-App-Image-2026-05-27-at-16-31-33-(9).jpg',
  'https://i.postimg.cc/BvBjjGSg/Whats-App-Image-2026-06-02-at-12-20-03-(1).jpg',
  'https://i.postimg.cc/vB8c9SDw/Whats-App-Image-2026-06-02-at-12-20-03-(2).jpg',
  'https://i.postimg.cc/V675FBbL/Whats-App-Image-2026-06-02-at-12-20-03-(3).jpg',
  'https://i.postimg.cc/RFPqTQn9/Whats-App-Image-2026-06-02-at-12-20-03-(4).jpg',
  'https://i.postimg.cc/nzdM1YQh/Whats-App-Image-2026-06-02-at-12-20-03-(5).jpg',
  'https://i.postimg.cc/1XfX7np9/Whats-App-Image-2026-06-02-at-12-20-03-(6).jpg',
  'https://i.postimg.cc/wM7M4yhJ/Whats-App-Image-2026-06-02-at-12-20-04.jpg',
  'https://i.postimg.cc/RhNhp6c7/Whats-App-Image-2026-06-02-at-12-20-04-(1).jpg',
  'https://i.postimg.cc/nrCrSjvv/Whats-App-Image-2026-06-02-at-12-20-04-(2).jpg',
  'https://i.postimg.cc/T24pL06r/Whats-App-Image-2026-06-02-at-12-37-13.jpg',
  'https://i.postimg.cc/0jbjXMpd/Whats-App-Image-2026-06-02-at-12-37-13-(1).jpg',
  'https://i.postimg.cc/RhNhp6cd/Whats-App-Image-2026-06-02-at-12-37-13-(2).jpg',
  'https://i.postimg.cc/Kjwz6GfX/Whats-App-Image-2026-06-02-at-12-37-13-(3).jpg',
  'https://i.postimg.cc/8c952p4Q/Whats-App-Image-2026-06-02-at-12-37-13-(4).jpg',
  'https://i.postimg.cc/NFSM3sDv/Whats-App-Image-2026-06-02-at-12-37-13-(5).jpg',
  'https://i.postimg.cc/GtV2WLKC/Whats-App-Image-2026-06-02-at-12-37-13-(6).jpg',
  'https://i.postimg.cc/9XnrRbhg/Whats-App-Image-2026-06-02-at-12-37-13-(7).jpg',
  'https://i.postimg.cc/h45fzsBN/Whats-App-Image-2026-06-02-at-12-37-14.jpg',
  'https://i.postimg.cc/G35H8KCS/Whats-App-Image-2026-06-02-at-12-37-14-(1).jpg',
  'https://i.postimg.cc/L4bnYDpb/Whats-App-Image-2026-06-02-at-12-37-14-(2).jpg',
  'https://i.postimg.cc/wjKMFB32/Whats-App-Image-2026-06-02-at-12-37-15.jpg',
  'https://i.postimg.cc/8PfshvpX/Whats-App-Image-2026-06-02-at-12-37-15-(1).jpg',
  'https://i.postimg.cc/mgxkVrhT/Whats-App-Image-2026-06-02-at-12-37-15-(10).jpg',
  'https://i.postimg.cc/HkGn3LjY/Whats-App-Image-2026-06-02-at-12-37-15-(11).jpg',
  'https://i.postimg.cc/y8qxnNWc/Whats-App-Image-2026-06-02-at-12-37-15-(12).jpg',
  'https://i.postimg.cc/kXRDxSJ1/Whats-App-Image-2026-06-02-at-12-37-15-(2).jpg',
  'https://i.postimg.cc/wTR3hNqG/Whats-App-Image-2026-06-02-at-12-37-15-(4).jpg',
  'https://i.postimg.cc/yY3WFR15/Whats-App-Image-2026-06-02-at-12-37-15-(5).jpg',
  'https://i.postimg.cc/SNYjW9SH/Whats-App-Image-2026-06-02-at-12-37-15-(6).jpg',
  'https://i.postimg.cc/GhT9kDLW/Whats-App-Image-2026-06-02-at-12-37-15-(7).jpg',
  'https://i.postimg.cc/sDG1pWf2/Whats-App-Image-2026-06-02-at-12-37-15-(8).jpg',
  'https://i.postimg.cc/VL05jts6/Whats-App-Image-2026-06-02-at-12-37-15-(9).jpg',
  'https://i.postimg.cc/rpMmXY1K/Whats-App-Image-2026-06-02-at-12-37-16.jpg',
  'https://i.postimg.cc/3xgRqHDG/Whats-App-Image-2026-06-02-at-12-37-16-(1).jpg',
  'https://i.postimg.cc/L8zXWMZz/Whats-App-Image-2026-06-02-at-12-37-16-(2).jpg',
  'https://i.postimg.cc/x1KCZSbx/Whats-App-Image-2026-06-02-at-12-37-16-(3).jpg',
  'https://i.postimg.cc/JhMnVdN4/Whats-App-Image-2026-06-02-at-12-37-16-(4).jpg',
  'https://i.postimg.cc/Zq4RtD8Y/Whats-App-Image-2026-06-02-at-12-37-16-(5).jpg',
  'https://i.postimg.cc/CKS1T6Gx/Whats-App-Image-2026-06-02-at-12-37-16-(6).jpg'

];

const PDF_URL = 'https://drive.google.com/file/d/1gl96BZAmUGR0huUsn_XhQG_Pt6f7XOTG/view?usp=sharing';

const Catalog = () => {
  const [visiblePairs, setVisiblePairs] = useState(5); // Show 5 pairs initially (10 images)
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const scrollContainerRef = useRef(null);

  // Group images into pairs
  const getImagePairs = () => {
    const pairs = [];
    for (let i = 0; i < CATALOG_IMAGES.length; i += 2) {
      pairs.push({
        left: CATALOG_IMAGES[i],
        right: CATALOG_IMAGES[i + 1] || null // Handle odd number of images
      });
    }
    return pairs;
  };

  const imagePairs = getImagePairs();
  const totalPairs = imagePairs.length;
  const visiblePairsData = imagePairs.slice(0, visiblePairs);

  // Detect iOS device
  useEffect(() => {
    const checkIOS = () => {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    };
    setIsIOS(checkIOS());
  }, []);

  // Progressive loading with Intersection Observer
  useEffect(() => {
    let observer;
    let loadingTimeout;
    
    const loadMorePairs = () => {
      if (isLoadingMore) return;
      if (visiblePairs >= totalPairs) return;
      
      setIsLoadingMore(true);
      
      loadingTimeout = setTimeout(() => {
        setVisiblePairs(prev => Math.min(prev + 3, totalPairs)); // Load 3 more pairs at a time
        setIsLoadingMore(false);
      }, 500);
    };
    
    const setupObserver = () => {
      const lastPair = document.querySelector('.catalog-pair:last-child');
      if (lastPair) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && visiblePairs < totalPairs) {
              loadMorePairs();
            }
          },
          { threshold: 0.1, rootMargin: '100px' }
        );
        
        observer.observe(lastPair);
      }
    };
    
    const timeoutId = setTimeout(setupObserver, 100);
    
    return () => {
      if (observer) observer.disconnect();
      clearTimeout(timeoutId);
      clearTimeout(loadingTimeout);
    };
  }, [visiblePairs, totalPairs, isLoadingMore]);

  // Manual scroll listener as fallback
  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        
        const { scrollTop, scrollHeight, clientHeight } = container;
        const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
        
        if (scrollPercentage > 0.8 && !isLoadingMore && visiblePairs < totalPairs) {
          setIsLoadingMore(true);
          
          setTimeout(() => {
            setVisiblePairs(prev => Math.min(prev + 3, totalPairs));
            setIsLoadingMore(false);
          }, 300);
        }
      }, 150);
    };
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(scrollTimeout);
    };
  }, [visiblePairs, totalPairs, isLoadingMore]);

  // Lazy load images with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src && !img.src) {
              img.src = src;
              img.classList.add('loaded');
            }
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '100px', threshold: 0.01 }
    );
    
    const images = document.querySelectorAll('.catalog-page-image[data-src]');
    images.forEach(img => observer.observe(img));
    
    return () => observer.disconnect();
  }, [visiblePairs]);

  const handleDownload = () => {
    window.open(PDF_URL, '_blank');
  };

  const loadMorePages = () => {
    if (!isLoadingMore && visiblePairs < totalPairs) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisiblePairs(prev => Math.min(prev + 3, totalPairs));
        setIsLoadingMore(false);
      }, 300);
    }
  };

  // Get page numbers for each image in a pair
  const getLeftPageNumber = (pairIndex) => {
    return pairIndex * 2 + 1;
  };

  const getRightPageNumber = (pairIndex) => {
    return pairIndex * 2 + 2;
  };

  // Render catalog view with pairs (2 images side by side)
  const renderCatalogView = () => {
    const hasMore = visiblePairs < totalPairs;
    
    return (
      <div className="catalog-scroll-view" ref={scrollContainerRef}>
        {visiblePairsData.map((pair, pairIndex) => (
          <div key={pairIndex} className="catalog-pair">
            {/* Left Image */}
            <div className="catalog-page-item">
              {isIOS ? (
                <img 
                  data-src={pair.left}
                  alt={`RIM AUTO PARTS Catalog Page ${getLeftPageNumber(pairIndex)}`}
                  className="catalog-page-image lazy"
                  loading="lazy"
                />
              ) : (
                <img 
                  src={pair.left}
                  alt={`RIM AUTO PARTS Catalog Page ${getLeftPageNumber(pairIndex)}`}
                  className="catalog-page-image"
                  loading="lazy"
                />
              )}
              <div className="catalog-page-number">Page {getLeftPageNumber(pairIndex)}</div>
            </div>
            
            {/* Right Image (if exists) */}
            {pair.right && (
              <div className="catalog-page-item">
                {isIOS ? (
                  <img 
                    data-src={pair.right}
                    alt={`RIM AUTO PARTS Catalog Page ${getRightPageNumber(pairIndex)}`}
                    className="catalog-page-image lazy"
                    loading="lazy"
                  />
                ) : (
                  <img 
                    src={pair.right}
                    alt={`RIM AUTO PARTS Catalog Page ${getRightPageNumber(pairIndex)}`}
                    className="catalog-page-image"
                    loading="lazy"
                  />
                )}
                <div className="catalog-page-number">Page {getRightPageNumber(pairIndex)}</div>
              </div>
            )}
          </div>
        ))}
        
        {hasMore && (
          <div className="loading-more-container">
            {isLoadingMore ? (
              <div className="loading-indicator">
                <div className="loader"></div>
                <p>Loading more pages...</p>
              </div>
            ) : (
              <button className="load-more-button" onClick={loadMorePages}>
                Load More Pages ({totalPairs - visiblePairs} pairs remaining)
              </button>
            )}
          </div>
        )}
        
        {!hasMore && visiblePairs > 0 && (
          <div className="end-of-catalog">
            <p>✓ End of Catalog</p>
            <p className="total-pages-count">Total {CATALOG_IMAGES.length} product pages</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>RIM AUTO PARTS - Product Catalog 2025</h1>
        <p className="catalog-subtitle">
          Premium Quality Auto Components
        </p>
        <p className="catalog-description">
          Brake Pads • Clutch Plates • Air Filters • Oil Filters • Engine Parts • Suspension Parts • Electrical Components • And More
        </p>
      </div>

      <div className="catalog-content">
        {renderCatalogView()}

        <div className="download-section">
          <button 
            className="download-button"
            onClick={handleDownload}
            aria-label="Download PDF catalog"
          >
            <span className="download-icon">📥</span>
            <span>Download Complete Product Catalog (PDF)</span>
            <span className="download-icon">📄</span>
          </button>
          <p className="download-info">RIM AUTO PARTS Catalog 2025 • Complete product range with technical specifications</p>
          <p className="download-contact">📞 For bulk orders & custom requirements: <a href="tel:9815097851">98150-97851</a> | <a href="tel:7986295488">79862-95488</a></p>
        </div>
      </div>
    </div>
  );
};

export default Catalog;