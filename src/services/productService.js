/**
 * Product Service
 * 
 * This service handles all API requests related to products.
 * It provides methods for fetching products, product details, and related products.
 */

// Simulated product data - will be replaced with actual API calls
const mockProducts = [
  {
    id: 1,
    name: 'مياه معدنية - عبوة كبيرة',
    nameEn: 'Mineral Water - Large Bottle',
    description: 'مياه معدنية نقية، عبوة 18 لتر مناسبة للاستخدام المنزلي',
    descriptionEn: 'Pure mineral water, 18-liter bottle suitable for home use',
    price: 1.5,
    oldPrice: 1.8,
    discount: 16,
    image: '/images/water-large.jpg',
    category: 'water',
    rating: 4.8,
    reviewsCount: 124,
    sizes: [
      { id: 1, name: '18 لتر', nameEn: '18 Liters', price: 1.5 },
      { id: 2, name: '12 لتر', nameEn: '12 Liters', price: 1.2 }
    ],
    features: [
      { id: 1, name: 'مصفاة 100%', nameEn: '100% Filtered' },
      { id: 2, name: 'معادن طبيعية', nameEn: 'Natural Minerals' }
    ],
    images: ['/images/water-large-1.jpg', '/images/water-large-2.jpg'],
  },
  {
    id: 2,
    name: 'مياه معدنية - عبوة صغيرة (كرتون)',
    nameEn: 'Mineral Water - Small Bottles (Carton)',
    description: 'كرتون مياه معدنية، 24 عبوة × 330 مل',
    descriptionEn: 'Carton of mineral water, 24 bottles × 330 ml',
    price: 3.2,
    oldPrice: null,
    discount: 0,
    image: '/images/water-small.jpg',
    category: 'water',
    rating: 4.6,
    reviewsCount: 89,
    sizes: [
      { id: 1, name: '24 عبوة', nameEn: '24 Bottles', price: 3.2 },
      { id: 2, name: '12 عبوة', nameEn: '12 Bottles', price: 1.8 }
    ],
    features: [
      { id: 1, name: 'سهلة الحمل', nameEn: 'Easy to Carry' },
      { id: 2, name: 'مثالية للرحلات', nameEn: 'Perfect for Trips' }
    ],
    images: ['/images/water-small-1.jpg', '/images/water-small-2.jpg'],
  },
  {
    id: 3,
    name: 'اسطوانة غاز منزلية كبيرة',
    nameEn: 'Large Home Gas Cylinder',
    description: 'اسطوانة غاز منزلية كبيرة سعة 22 كجم',
    descriptionEn: 'Large home gas cylinder, 22 kg capacity',
    price: 8.5,
    oldPrice: 9.5,
    discount: 10,
    image: '/images/gas-large.jpg',
    category: 'gas',
    rating: 4.9,
    reviewsCount: 156,
    sizes: [
      { id: 1, name: '22 كجم', nameEn: '22 kg', price: 8.5 }
    ],
    features: [
      { id: 1, name: 'مناسبة للمطابخ الكبيرة', nameEn: 'Suitable for Large Kitchens' },
      { id: 2, name: 'تدوم لفترة طويلة', nameEn: 'Long-lasting' }
    ],
    images: ['/images/gas-large-1.jpg', '/images/gas-large-2.jpg'],
  },
  {
    id: 4,
    name: 'اسطوانة غاز منزلية صغيرة',
    nameEn: 'Small Home Gas Cylinder',
    description: 'اسطوانة غاز منزلية صغيرة سعة 12 كجم',
    descriptionEn: 'Small home gas cylinder, 12 kg capacity',
    price: 5.5,
    oldPrice: null,
    discount: 0,
    image: '/images/gas-small.jpg',
    category: 'gas',
    rating: 4.7,
    reviewsCount: 102,
    sizes: [
      { id: 1, name: '12 كجم', nameEn: '12 kg', price: 5.5 }
    ],
    features: [
      { id: 1, name: 'مناسبة للشقق الصغيرة', nameEn: 'Suitable for Small Apartments' },
      { id: 2, name: 'سهلة الحمل', nameEn: 'Easy to Carry' }
    ],
    images: ['/images/gas-small-1.jpg', '/images/gas-small-2.jpg'],
  }
];

/**
 * Get all products
 * @param {Object} options - Filter options
 * @returns {Promise} - Promise that resolves to an array of products
 */
export const getProducts = async (options = {}) => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...mockProducts];
      
      // Apply category filter
      if (options.category) {
        filtered = filtered.filter(p => p.category === options.category);
      }
      
      // Apply search filter
      if (options.search) {
        const searchLower = options.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(searchLower) || 
          p.nameEn.toLowerCase().includes(searchLower)
        );
      }
      
      resolve(filtered);
    }, 500); // Simulate network delay
  });
};

/**
 * Get a product by ID
 * @param {number} id - Product ID
 * @returns {Promise} - Promise that resolves to a product object
 */
export const getProductById = async (id) => {
  // Simulate API request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === Number(id));
      
      if (product) {
        resolve(product);
      } else {
        reject(new Error('Product not found'));
      }
    }, 500); // Simulate network delay
  });
};

/**
 * Get related products
 * @param {number} id - Product ID to exclude
 * @param {string} category - Category to match
 * @param {number} limit - Maximum number of products to return
 * @returns {Promise} - Promise that resolves to an array of products
 */
export const getRelatedProducts = async (id, category, limit = 4) => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      const related = mockProducts
        .filter(p => p.id !== Number(id) && p.category === category)
        .slice(0, limit);
      
      resolve(related);
    }, 500); // Simulate network delay
  });
};

export default {
  getProducts,
  getProductById,
  getRelatedProducts
};
