// components/Catalog.js
import React, { useState, useEffect, useRef } from 'react';
import './Catalog.css';

// Static data moved outside component to prevent recreation on every render
const CATALOG_IMAGES = [
    'https://img.sanishtech.com/u/2251bba919048ee6e0b329dd018bd13a.jpg',
    'https://img.sanishtech.com/u/e137d284a1e83a508f5bde939c0814d8.png',
    'https://img.sanishtech.com/u/09d233e94e82e0b4d867820e81e9ca65.png',
    'https://img.sanishtech.com/u/79a16a738c73d42700c6a4208be6543f.png',
    'https://img.sanishtech.com/u/2088b2d0526111bc02755f2d52b5e4bc.png',
    'https://img.sanishtech.com/u/9492dacf3465fab72080a171386a2431.png',
    'https://img.sanishtech.com/u/5cc6bd5e6b9fb567d9a4586a67c2631f.png',
    'https://img.sanishtech.com/u/be425f0e54aeb3017f36c9d2cd4a678f.png',
    'https://img.sanishtech.com/u/df461497ebff831968b2684be01a1355.png',
    'https://img.sanishtech.com/u/f7c1e5a11a4c0e57991712e391522933.png',
    'https://img.sanishtech.com/u/662d5801d0f42c272c9a5238e795045b.png',
    'https://img.sanishtech.com/u/b24773527cdb427f6212fc776b7ad29f.png',
    'https://img.sanishtech.com/u/352247473ec1dd88c68baaa2ba8efa8e.png',
    'https://img.sanishtech.com/u/2582c1f21f78f9138fba9d6517864c79.png',
    'https://img.sanishtech.com/u/2582c1f21f78f9138fba9d6517864c79.png',
    'https://img.sanishtech.com/u/e9c6ae70d4aad888a82491097a99b017.png',
    'https://img.sanishtech.com/u/33ca4afec9a0baf5b66e999850b232f2.png',
    'https://img.sanishtech.com/u/4b377858b0d92c0e9545f4dbe767a295.png',
    'https://img.sanishtech.com/u/9280598cecd92021b7f2deb1390c348f.png',
    'https://img.sanishtech.com/u/9d903e35205c9df1a1d2cecbf43d4d80.png',
    'https://img.sanishtech.com/u/d8a8a02ecbaaf30857c0963d7debc329.png',
    'https://img.sanishtech.com/u/83887dc77e99538259c4e9662decb09e.png',
    'https://img.sanishtech.com/u/83887dc77e99538259c4e9662decb09e.png',
    'https://img.sanishtech.com/u/9e3e9a6266aa954ae25bdb3b0055ac22.png',
    'https://img.sanishtech.com/u/87a95f4f9db88c4a65a4211453e20dea.png',
    'https://img.sanishtech.com/u/12e0fe13a53ed9efb6a5bf2d21728349.png',
    'https://img.sanishtech.com/u/7332ecc821e29ebb90fcb40c5a3b0664.png',
    'https://img.sanishtech.com/u/f791f0442b67a958ab86cb680cf6767e.png',
    'https://img.sanishtech.com/u/33f6b171c9c0d8268f38ff8102376ac5.png',
    'https://img.sanishtech.com/u/37c9fe54779e6500523515cf67cb354c.png',
    'https://img.sanishtech.com/u/934cfeeb3a982d4ceba689893c685cea.png',
    'https://i.postimg.cc/ydTFyyBY/1.png',
'https://i.postimg.cc/NMx1kkYs/2.png',
'https://i.postimg.cc/sXJp44yV/3.png',
'https://i.postimg.cc/V6FjWW1s/4.png',
'https://i.postimg.cc/Y9x1zzkQ/5.png',
'https://i.postimg.cc/d3tGHZt8/6.png',
'https://i.postimg.cc/vTqfp8cP/7.png',
'https://i.postimg.cc/gjS8fcnt/8.png',
'https://i.postimg.cc/tJSWLRYc/9.png',
'https://i.postimg.cc/3NSmPrdz/10.jpg',
'https://i.postimg.cc/hvyTH4fk/11.jpg',
'https://i.postimg.cc/2ychPj1R/12.jpg',
'https://img.sanishtech.com/u/93e9d88503a36d08519320ea60ce5b6b.jpeg',
'https://img.sanishtech.com/u/297ddb68a892bb41ea874191428bd6cf.jpeg',
'https://i.postimg.cc/HnZXfWrY/15.jpg',
'https://img.sanishtech.com/u/56e14343e6bfeb54e4559abca3bebb81.jpeg',
'https://i.postimg.cc/Y0nYJ2v9/17.jpg',
'https://i.postimg.cc/QC41RNFH/18.jpg',
'https://i.postimg.cc/SRTCwQnj/19.jpg',
'https://i.postimg.cc/MZd7c5db/20.jpg',
'https://i.postimg.cc/xjtvk5t3/21.jpg',
'https://i.postimg.cc/c1XRKhXm/22.jpg',
'https://i.postimg.cc/zD0CL707/23.jpg',
'https://i.postimg.cc/pVqf9Cq4/24.jpg',
'https://img.sanishtech.com/u/1f8cfa1e1bcd0de808da3bf7fb9181ba.jpeg',
'https://i.postimg.cc/J7PNyxpV/26.jpg',
'https://i.postimg.cc/7Pm3C9Ky/27.jpg',
'https://i.postimg.cc/05cY6nVv/28.jpg',
'https://img.sanishtech.com/u/03e9b9926cc3596b74ee21e6472d5d55.jpeg',
'https://img.sanishtech.com/u/86d79c3c0f4a3f1ca2a0702a5071d7d2.jpeg',
'https://img.sanishtech.com/u/8281f7e46d27819c1037e4bef62cd857.jpeg',
'https://i.postimg.cc/m2kQ795J/31.jpg',
'https://i.postimg.cc/BQbx2FVd/32.jpg',
'https://i.postimg.cc/xT8KLmZQ/33.jpg',
'https://i.postimg.cc/CL5jb82L/34.jpg',
'https://i.postimg.cc/sDxp5WL2/35.jpg',

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