import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button3D from './Button3D';

const ServiceCard3D = ({ 
  image, 
  title, 
  description, 
  icon, 
  color = 'primary', 
  link,
  buttonText = 'اطلب الآن'
}) => {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  
  // Set up 3D rotation effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);
  
  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    
    // Set motion values
    x.set(offsetX);
    y.set(offsetY);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  // Get color classes based on color prop
  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return 'from-primary/90 to-primary/30';
      case 'secondary':
        return 'from-secondary/90 to-secondary/30';
      case 'accent':
        return 'from-accent/90 to-accent/30';
      default:
        return 'from-primary/90 to-primary/30';
    }
  };

  const colorClasses = getColorClasses();

  return (
    <motion.div 
      ref={cardRef}
      className="relative h-[450px] rounded-xl overflow-hidden shadow-xl group cursor-pointer perspective-1000"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 w-full h-full z-0"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Gradient Overlay */}
      <div className={`absolute inset-0 z-10 bg-gradient-to-t ${colorClasses} opacity-90`} />
      
      {/* Content */}
      <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">
        <div className="mb-6" style={{ transform: "translateZ(40px)" }}>
          {/* Icon Container */}
          <motion.div 
            className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center mb-4"
            animate={{ 
              y: hovered ? -10 : 0,
              boxShadow: hovered ? '0 10px 25px rgba(0,0,0,0.2)' : '0 5px 15px rgba(0,0,0,0.1)'
            }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {icon}
          </motion.div>
          
          {/* Title */}
          <motion.h3 
            className="text-2xl font-bold text-white mb-2"
            animate={{ y: hovered ? -5 : 0 }}
            transition={{ delay: 0.05, duration: 0.2 }}
          >
            {title}
          </motion.h3>
          
          {/* Description */}
          <motion.p 
            className="text-white/90"
            animate={{ opacity: hovered ? 1 : 0.9 }}
            transition={{ delay: 0.1 }}
          >
            {description}
          </motion.p>
        </div>
        
        {/* Button */}
        <motion.div
          animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0.7 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 15 }}
          style={{ transform: "translateZ(50px)" }}
        >
          <Link to={link}>
            <Button3D variant="glass" className="w-full">
              {buttonText}
            </Button3D>
          </Link>
        </motion.div>
      </div>
      
      {/* Floating particles when hovered */}
      {hovered && (
        <>
          {[...Array(10)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-white/30"
              initial={{ 
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                x: Math.random() * 300 - 150,
                y: Math.random() * 450,
                opacity: 0
              }}
              animate={{ 
                y: -200, 
                opacity: [0, 0.5, 0],
                transition: { 
                  duration: Math.random() * 2 + 1, 
                  repeat: Infinity,
                  delay: Math.random() * 2
                }
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export default ServiceCard3D;
