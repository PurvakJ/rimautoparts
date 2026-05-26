import React, { useState, useEffect, useCallback } from 'react';
import { 
  getProducts, addProduct, updateProduct, deleteProduct,
  getAppointments, updateAppointment, deleteAppointment,
  getReviews, updateReview, deleteReview
} from '../api';
import './Admin.css';

function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  
  // Filter states for products
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [showCategoryInput, setShowCategoryInput] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    featured: false,
    images: []
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [tempImagePreviews, setTempImagePreviews] = useState([]);

  // Cloudinary configuration
  const CLOUDINARY_CLOUD_NAME = "dm9gg8yss";
  const CLOUDINARY_UPLOAD_PRESET = "images";

  // RiM AUTO PARTS Admin Credentials
  const ADMIN_CREDENTIALS = {
    username: 'rimadmin',
    password: 'RIM@2025'
  };

  // Helper function to safely get string value
  const safeToString = (value) => {
    if (value === null || value === undefined) return '';
    return String(value);
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
    return displayNames[categoryValue] || categoryValue?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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

  // Extract unique categories from products in the order they appear
  const extractCategoriesFromProducts = useCallback((productsData) => {
    const seenCategories = new Set();
    const uniqueCategories = [];
    
    for (const product of productsData) {
      if (product.category && !seenCategories.has(product.category)) {
        seenCategories.add(product.category);
        uniqueCategories.push(product.category);
      }
    }
    
    return uniqueCategories;
  }, []);

  // Update categories whenever products change
  useEffect(() => {
    if (products.length > 0) {
      const extractedCategories = extractCategoriesFromProducts(products);
      setCategories(extractedCategories);
      
      if (formData.category === '' && extractedCategories.length > 0) {
        setFormData(prev => ({ ...prev, category: extractedCategories[0] }));
      }
    }
  }, [products, extractCategoriesFromProducts, formData.category]);

  // Define loadData with useCallback
  const loadData = useCallback(async () => {
    try {
      if (activeTab === 'products') {
        const data = await getProducts();
        const sanitizedProducts = data.map(product => ({
          ...product,
          name: safeToString(product.name),
          description: safeToString(product.description),
          price: product.price || 0
        }));
        setProducts(sanitizedProducts);
      } else if (activeTab === 'appointments') {
        const data = await getAppointments();
        setAppointments(data);
      } else if (activeTab === 'reviews') {
        const data = await getReviews();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  }, [activeTab]);

  // Filter and sort products
  const filterAndSortProducts = useCallback(() => {
    let filtered = products.filter(product => {
      const matchesCategory = category === 'all' || product.category === category;
      const productName = safeToString(product.name).toLowerCase();
      const productDescription = safeToString(product.description).toLowerCase();
      const searchTermLower = safeToString(searchTerm).toLowerCase();
      const matchesSearch = productName.includes(searchTermLower) ||
                           productDescription.includes(searchTermLower);
      return matchesCategory && matchesSearch;
    });

    switch(sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'name-asc':
        filtered.sort((a, b) => safeToString(a.name).localeCompare(safeToString(b.name)));
        break;
      case 'name-desc':
        filtered.sort((a, b) => safeToString(b.name).localeCompare(safeToString(a.name)));
        break;
      case 'category-asc':
        filtered.sort((a, b) => {
          const categoryA = getCategoryDisplayName(a.category) || '';
          const categoryB = getCategoryDisplayName(b.category) || '';
          return categoryA.localeCompare(categoryB);
        });
        break;
      case 'category-desc':
        filtered.sort((a, b) => {
          const categoryA = getCategoryDisplayName(a.category) || '';
          const categoryB = getCategoryDisplayName(b.category) || '';
          return categoryB.localeCompare(categoryA);
        });
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, category, searchTerm, sortBy, getCategoryDisplayName]);

  // Check for existing auth on component mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('RiMAdminAuth');
    const authTime = localStorage.getItem('RiMAdminAuthTime');
    
    if (savedAuth === 'true' && authTime) {
      const now = new Date().getTime();
      const expiryTime = parseInt(authTime) + (24 * 60 * 60 * 1000);
      
      if (now < expiryTime) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('RiMAdminAuth');
        localStorage.removeItem('RiMAdminAuthTime');
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
    
    setIsLoading(false);
  }, []);

  // Load data when authenticated and tab changes
  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [activeTab, isAuthenticated, loadData]);

  // Apply filters when products, category, searchTerm, or sortBy changes
  useEffect(() => {
    if (products.length > 0) {
      filterAndSortProducts();
    } else {
      setFilteredProducts([]);
    }
  }, [products, category, searchTerm, sortBy, filterAndSortProducts]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === ADMIN_CREDENTIALS.username && 
        loginData.password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      setLoginError('');
      localStorage.setItem('RiMAdminAuth', 'true');
      localStorage.setItem('RiMAdminAuthTime', new Date().getTime().toString());
      setLoginData({ username: '', password: '' });
    } else {
      setLoginError('Invalid username or password');
      setLoginData({ ...loginData, password: '' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('RiMAdminAuth');
    localStorage.removeItem('RiMAdminAuthTime');
    localStorage.removeItem('RiMAdminSession');
    
    setIsAuthenticated(false);
    setActiveTab('products');
    setProducts([]);
    setFilteredProducts([]);
    setAppointments([]);
    setReviews([]);
    setShowModal(false);
    setEditingItem(null);
    setCategory('all');
    setSearchTerm('');
    setSortBy('default');
    setCategories([]);
    
    window.location.reload();
  };

  const uploadImageToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}`);
      }

      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files);
    
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024;
      if (!isValidType) alert(`${file.name} is not an image file`);
      if (!isValidSize) alert(`${file.name} is too large (max 5MB)`);
      return isValidType && isValidSize;
    });

    if (validFiles.length > 0) {
      setSelectedFiles([...selectedFiles, ...validFiles]);
      
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setTempImagePreviews([...tempImagePreviews, ...newPreviews]);
    }
  };

  const removeSelectedImage = (index) => {
    URL.revokeObjectURL(tempImagePreviews[index]);
    
    const newSelectedFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = tempImagePreviews.filter((_, i) => i !== index);
    
    setSelectedFiles(newSelectedFiles);
    setTempImagePreviews(newPreviews);
  };

  const uploadAllImages = async () => {
    if (selectedFiles.length === 0) return [];
    
    setUploadingImages(true);
    const uploadedUrls = [];
    
    for (let i = 0; i < selectedFiles.length; i++) {
      try {
        setUploadProgress(prev => ({ ...prev, [i]: 'uploading' }));
        const url = await uploadImageToCloudinary(selectedFiles[i]);
        uploadedUrls.push(url);
        setUploadProgress(prev => ({ ...prev, [i]: 'completed' }));
      } catch (error) {
        console.error(`Failed to upload image ${i + 1}:`, error);
        setUploadProgress(prev => ({ ...prev, [i]: 'failed' }));
        alert(`Failed to upload image ${i + 1}. Please try again.`);
      }
    }
    
    setUploadingImages(false);
    return uploadedUrls;
  };

  const addNewCategory = async () => {
    if (newCategory && newCategory.trim()) {
      const categoryValue = newCategory.trim().toLowerCase().replace(/\s+/g, '-');
      
      if (categories.includes(categoryValue)) {
        alert('Category already exists!');
        return;
      }
      
      const updatedCategories = [...categories, categoryValue];
      setCategories(updatedCategories);
      setFormData({ ...formData, category: categoryValue });
      setNewCategory('');
      setShowCategoryInput(false);
      
      alert('New category added! It will be available when you save a product with this category.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let allImages = [...formData.images];
    
    if (selectedFiles.length > 0) {
      const uploadedUrls = await uploadAllImages();
      allImages = [...allImages, ...uploadedUrls];
      
      if (uploadedUrls.length !== selectedFiles.length) {
        alert('Some images failed to upload. Please try again.');
        return;
      }
    }
    
    if (allImages.length === 0) {
      alert('Please add at least one product image');
      return;
    }

    const productData = {
      ...formData,
      name: safeToString(formData.name),
      description: safeToString(formData.description),
      price: parseFloat(formData.price),
      images: allImages
    };

    try {
      if (editingItem) {
        await updateProduct({ ...productData, id: editingItem.id });
        alert('Product updated successfully!');
      } else {
        await addProduct(productData);
        alert('Product added successfully!');
      }
      setShowModal(false);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  };

  const handleDelete = async (item, type) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        if (type === 'product') {
          await deleteProduct({ id: item.id });
          alert('Product deleted successfully!');
          loadData();
        } else if (type === 'appointment') {
          await deleteAppointment({ id: item.id });
          alert('Appointment deleted successfully!');
          loadData();
        } else if (type === 'review') {
          await deleteReview({ id: item.id });
          alert('Review deleted successfully!');
          loadData();
        }
      } catch (error) {
        console.error('Error deleting:', error);
        alert('Error deleting item. Please try again.');
      }
    }
  };

  const handleStatusUpdate = async (appointment, status) => {
    try {
      await updateAppointment({ id: appointment.id, status });
      alert('Appointment status updated!');
      loadData();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Error updating status. Please try again.');
    }
  };

  const handleFeaturedToggle = async (review) => {
    try {
      await updateReview({ id: review.id, featured: !review.featured });
      alert('Review featured status updated!');
      loadData();
    } catch (error) {
      console.error('Error updating review:', error);
      alert('Error updating review. Please try again.');
    }
  };

  const resetForm = () => {
    tempImagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    
    setFormData({
      name: '',
      description: '',
      price: '',
      category: categories.length > 0 ? categories[0] : '',
      featured: false,
      images: []
    });
    setSelectedFiles([]);
    setTempImagePreviews([]);
    setUploadProgress({});
    setEditingItem(null);
  };

  const openEditModal = (product) => {
    setEditingItem(product);
    setFormData({
      name: safeToString(product.name),
      description: safeToString(product.description),
      price: product.price,
      category: product.category,
      featured: product.featured,
      images: product.images || []
    });
    setSelectedFiles([]);
    setTempImagePreviews([]);
    setUploadProgress({});
    setShowModal(true);
  };

  const removeExistingImage = (indexToRemove) => {
    const newImages = formData.images.filter((_, index) => index !== indexToRemove);
    setFormData({ ...formData, images: newImages });
  };

  const resetFilters = () => {
    setCategory('all');
    setSearchTerm('');
    setSortBy('default');
  };

  if (isLoading) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-box">
          <div className="login-header">
            <div className="login-icon">🔧</div>
            <h1>RiM AUTO PARTS</h1>
            <p>Admin Dashboard</p>
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-box">
          <div className="login-header">
            <div className="login-icon">🔧</div>
            <h1>RiM AUTO PARTS</h1>
            <p>Admin Dashboard Login</p>
            <span className="tagline">Quality Auto Parts | Trusted Since 2005</span>
          </div>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={loginData.username}
                onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                placeholder="Enter admin username"
                required
                autoFocus
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                placeholder="Enter admin password"
                required
              />
            </div>
            {loginError && <div className="login-error">{loginError}</div>}
            <button type="submit" className="login-btn">Login to Dashboard</button>
          </form>
          <div className="login-footer">
            <p>📍 Quality Auto Parts Since 2005</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-title">
            <span className="admin-icon">🔧</span>
            <h1>RiM AUTO PARTS Admin</h1>
            <span className="admin-badge">Quality Auto Components</span>
          </div>
          <div className="admin-contact-info">
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>
      
      <div className="admin-tabs">
        <button 
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`} 
          onClick={() => setActiveTab('products')}
        >
          🔧 Products ({products.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`} 
          onClick={() => setActiveTab('appointments')}
        >
          📅 Enquiries ({appointments.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} 
          onClick={() => setActiveTab('reviews')}
        >
          ⭐ Customer Reviews ({reviews.length})
        </button>
      </div>

      {activeTab === 'products' && (
        <div className="admin-content">
          <div className="admin-actions">
            <button className="btn-add" onClick={() => {
              resetForm();
              setShowModal(true);
            }}>
              + Add New Product
            </button>
          </div>

          {/* Filters Section */}
          <div className="filters-section">
            <div className="filters-grid">
              <div className="filter-group">
                <label>Category:</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="filter-select"
                  disabled={categories.length === 0}
                >
                  <option value="all">🔧 All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {getCategoryIcon(cat)} {getCategoryDisplayName(cat)}
                    </option>
                  ))}
                </select>
                {categories.length === 0 && (
                  <span className="no-categories-msg">No categories available</span>
                )}
              </div>

              <div className="filter-group search-group">
                <label>🔍 Search:</label>
                <input
                  type="text"
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>

              <div className="filter-group">
                <label>📊 Sort By:</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="default">⭐ Database Order (Default)</option>
                  <option value="price-low">💰 Price: Low to High</option>
                  <option value="price-high">💰 Price: High to Low</option>
                  <option value="name-asc">🔤 Name: A to Z</option>
                  <option value="name-desc">🔤 Name: Z to A</option>
                  <option value="category-asc">📂 Category: A to Z</option>
                  <option value="category-desc">📂 Category: Z to A</option>
                </select>
              </div>

              {(category !== 'all' || searchTerm || sortBy !== 'default') && (
                <div className="filter-group filter-actions">
                  <button onClick={resetFilters} className="btn-clear-filters">
                    🗑️ Clear Filters
                  </button>
                </div>
              )}
            </div>

            <div className="filter-summary">
              <span>
                Showing {filteredProducts.length} of {products.length} products
                {searchTerm && <span> | Search: "{searchTerm}"</span>}
                {category !== 'all' && <span> | Category: {getCategoryDisplayName(category)}</span>}
                {sortBy !== 'default' && (
                  <span> | Sorted by: {
                    sortBy === 'price-low' ? 'Price (Low to High)' : 
                    sortBy === 'price-high' ? 'Price (High to Low)' : 
                    sortBy === 'name-asc' ? 'Name (A-Z)' :
                    sortBy === 'name-desc' ? 'Name (Z-A)' :
                    sortBy === 'category-asc' ? 'Category (A-Z)' :
                    sortBy === 'category-desc' ? 'Category (Z-A)' : 'Database Order'
                  }</span>
                )}
              </span>
            </div>
          </div>
          
          <div className="table-container">
            {filteredProducts.length === 0 ? (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your search or filter criteria</p>
                <button onClick={resetFilters} className="btn-reset-filters">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Images</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Featured</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr key={product.id}>
                      <td className="image-cell">
                        <div className="mini-gallery">
                          {product.images && product.images.slice(0, 2).map((img, idx) => (
                            <img 
                              key={idx} 
                              src={img} 
                              alt={safeToString(product.name)} 
                              className="mini-image"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                              }}
                            />
                          ))}
                          {product.images && product.images.length > 2 && (
                            <span className="more-indicator">+{product.images.length - 2}</span>
                          )}
                        </div>
                      </td>
                      <td className="product-name-cell">{safeToString(product.name)}</td>
                      <td className="price-cell">₹{(product.price || 0).toLocaleString()}</td>
                      <td>
                        <span className="category-badge">
                          {getCategoryIcon(product.category)} {getCategoryDisplayName(product.category)}
                        </span>
                      </td>
                      <td>
                        <span className={`featured-badge ${product.featured ? 'yes' : 'no'}`}>
                          {product.featured ? '★ Featured' : '☆ Not Featured'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="btn-edit" onClick={() => openEditModal(product)}>Edit</button>
                          <button className="btn-delete" onClick={() => handleDelete(product, 'product')}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="admin-content">
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name/Company</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Product Type</th>
                  <th>Requirements</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td>{new Date(appointment.date).toLocaleDateString()}</td>
                    <td>{safeToString(appointment.name)}</td>
                    <td>{safeToString(appointment.phone)}</td>
                    <td>{safeToString(appointment.email) || '-'}</td>
                    <td>{safeToString(appointment.productType) || '-'}</td>
                    <td className="message-cell">{safeToString(appointment.message) || '-'}</td>
                    <td>
                      <select 
                        value={appointment.status} 
                        onChange={(e) => handleStatusUpdate(appointment, e.target.value)}
                        className={`status-select ${appointment.status}`}
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="confirmed">✓ Contacted</option>
                        <option value="completed">✅ Order Placed</option>
                        <option value="cancelled">✗ Cancelled</option>
                      </select>
                    </td>
                    <td>
                      <button className="btn-delete" onClick={() => handleDelete(appointment, 'appointment')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="admin-content">
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Rating</th>
                  <th>Review</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(review => (
                  <tr key={review.id}>
                    <td>{new Date(review.date).toLocaleDateString()}</td>
                    <td>{safeToString(review.name)}</td>
                    <td>
                      <div className="rating-stars">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                    </td>
                    <td className="comment-cell">{safeToString(review.comment)}</td>
                    <td>
                      <button 
                        className={`featured-btn ${review.featured ? 'active' : ''}`}
                        onClick={() => handleFeaturedToggle(review)}
                      >
                        {review.featured ? '★ Featured' : '☆ Feature'}
                      </button>
                    </td>
                    <td>
                      <button className="btn-delete" onClick={() => handleDelete(review, 'review')}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content product-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? '✏️ Edit Product' : '➕ Add New Product'}</h2>
              <button className="close-modal" onClick={() => setShowModal(false)}>×</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Product Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g., RiM Premium Ceramic Brake Pads"
                />
              </div>
              
              <div className="form-group">
                <label>Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  placeholder="Detailed description including specifications, compatibility, warranty information, etc..."
                  rows="4"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    placeholder="e.g., 2499"
                    step="1"
                  />
                </div>
                
                <div className="form-group">
                  <label>Category *</label>
                  <div className="category-select-wrapper">
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      disabled={categories.length === 0}
                    >
                      {categories.length === 0 ? (
                        <option value="">No categories available</option>
                      ) : (
                        categories.map(cat => (
                          <option key={cat} value={cat}>
                            {getCategoryIcon(cat)} {getCategoryDisplayName(cat)}
                          </option>
                        ))
                      )}
                    </select>
                    <button 
                      type="button" 
                      className="btn-add-category"
                      onClick={() => setShowCategoryInput(!showCategoryInput)}
                    >
                      + New Category
                    </button>
                  </div>
                  
                  {showCategoryInput && (
                    <div className="new-category-input">
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter new category (e.g., brake-pads)"
                        className="category-input"
                      />
                      <button type="button" onClick={addNewCategory} className="btn-confirm-category">
                        Add
                      </button>
                      <button type="button" onClick={() => setShowCategoryInput(false)} className="btn-cancel-category">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  ⭐ Feature this product on homepage
                </label>
              </div>
              
              <div className="form-group">
                <label>Product Images *</label>
                
                {editingItem && formData.images.length > 0 && (
                  <div className="existing-images-section">
                    <label>Current Images:</label>
                    <div className="image-grid">
                      {formData.images.map((imgUrl, index) => (
                        <div key={index} className="image-url-item">
                          <div className="image-preview-container">
                            <img 
                              src={imgUrl} 
                              alt={`Product ${index + 1}`} 
                              className="image-preview-thumb"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/100x100?text=Invalid+URL';
                              }}
                            />
                            <button 
                              type="button" 
                              className="remove-image-btn"
                              onClick={() => removeExistingImage(index)}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="image-upload-section">
                  <label>Upload New Images:</label>
                  <div className="file-input-wrapper">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageSelection}
                      className="file-input"
                      id="image-upload"
                      disabled={uploadingImages}
                    />
                    <label htmlFor="image-upload" className="file-input-label">
                      📁 Choose Product Images
                    </label>
                    <p className="helper-text">
                      Supported formats: JPG, PNG, WebP (Max 5MB each) | High-quality images recommended
                    </p>
                  </div>
                  
                  {tempImagePreviews.length > 0 && (
                    <div className="image-urls-list">
                      <label>Images to Upload ({tempImagePreviews.length}):</label>
                      <div className="image-grid">
                        {tempImagePreviews.map((preview, index) => (
                          <div key={index} className="image-url-item">
                            <div className="image-preview-container">
                              <img 
                                src={preview} 
                                alt={`Preview ${index + 1}`} 
                                className="image-preview-thumb"
                              />
                              <button 
                                type="button" 
                                className="remove-image-btn"
                                onClick={() => removeSelectedImage(index)}
                                disabled={uploadingImages}
                              >
                                ✕
                              </button>
                              {uploadProgress[index] === 'uploading' && (
                                <div className="upload-progress-overlay">
                                  <div className="spinner"></div>
                                </div>
                              )}
                              {uploadProgress[index] === 'completed' && (
                                <div className="upload-success-overlay">✓</div>
                              )}
                              {uploadProgress[index] === 'failed' && (
                                <div className="upload-failed-overlay">✗</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {uploadingImages && (
                  <div className="uploading-indicator">
                    <div className="spinner"></div>
                    <p>Uploading images to Cloudinary...</p>
                  </div>
                )}
              </div>
              
              <div className="modal-actions">
                <button 
                  type="submit" 
                  className="btn-submit-product"
                  disabled={uploadingImages || categories.length === 0}
                >
                  {uploadingImages ? 'Uploading Images...' : (editingItem ? 'Update Product' : 'Add Product')}
                </button>
                <button 
                  type="button" 
                  className="btn-cancel-modal" 
                  onClick={() => setShowModal(false)}
                  disabled={uploadingImages}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;