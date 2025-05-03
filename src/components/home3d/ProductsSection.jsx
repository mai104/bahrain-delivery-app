import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import Button3D from '../ui/Button3D';
import ProductCard3D from './ProductCard3D';

// Sample product data
const dummyProducts = [
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
    category: 'water'
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
    category: 'water'
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
    category: 'gas'
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
    category: 'gas'
  }
];

const ProductsSection = () => {
  const { isArabic } = useLanguage();
  
  // Texts based on language
  const texts = {
    featuredProducts: isArabic ? 'منتجاتنا المميزة' : 'Featured Products',
    viewAll: isArabic ? 'عرض الكل' : 'View All',
  };

  // Localize products based on language
  const localizedProducts = dummyProducts.map(product => ({
    ...product,
    name: isArabic ? product.name : product.nameEn,
    description: isArabic ? product.description : product.descriptionEn
  }));

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <motion.h2 
            className="text-3xl font-bold text-gray-800 dark:text-white"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            {texts.featuredProducts}
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/products">
              <Button3D variant="outline">
                {texts.viewAll}
              </Button3D>
            </Link>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {localizedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard3D product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
