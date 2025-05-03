import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import ProductCard3D from '../ui/ProductCard3D';

const ProductsSection3D = ({ products }) => {
  const { isArabic } = useLanguage();
  
  // Textos según el idioma
  const texts = {
    title: isArabic ? 'منتجاتنا المميزة' : 'Our Featured Products',
    subtitle: isArabic 
      ? 'اكتشف مجموعة منتجاتنا عالية الجودة' 
      : 'Discover our high-quality product range',
    viewAll: isArabic ? 'عرض جميع المنتجات' : 'View All Products',
  };

  // Animación para el título
  const titleVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  // Animación para la línea divisoria
  const lineVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "80px",
      transition: { duration: 0.6, delay: 0.3, ease: "easeOut" }
    }
  };
  
  // Animación para los productos
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-24 overflow-hidden">
      {/* Fondo con gradiente y formas */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Formas decorativas flotantes */}
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-primary/5 animate-float-slow" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-secondary/5 animate-float-slower" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-accent/5 animate-float" />
      </div>
      
      <div className="container mx-auto px-4">
        {/* Encabezado de la sección */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={titleVariants}
          >
            {texts.title}
          </motion.h2>
          
          <div className="flex justify-center">
            <motion.div 
              className="h-1 bg-accent dark:bg-accent-light mb-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={lineVariants}
            />
          </div>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {texts.subtitle}
          </motion.p>
        </div>
        
        {/* Productos */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {products?.map((product, index) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard3D product={product} index={index} />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Botón Ver Todo */}
        <motion.div 
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <a 
            href="/products" 
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary to-primary-dark px-8 py-3 transition-all duration-300 hover:shadow-lg"
          >
            {/* Efecto Shine */}
            <span className="absolute top-0 left-0 h-full w-1/3 bg-white/20 skew-x-[25deg] -translate-x-32 transition-transform duration-700 group-hover:translate-x-48"></span>
            <span className="relative z-10 text-white font-medium">
              {texts.viewAll}
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection3D;
