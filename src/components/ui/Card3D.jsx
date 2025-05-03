import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Card3D = ({ 
  children, 
  className = '', 
  glassEffect = false,
  depth = 20,
  rotationFactor = 15,
  scaleFactor = 1.02,
  ...props 
}) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Create motion values for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Add spring animations for smoother movement
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  
  // Transform rotation based on mouse position
  const rotateX = useTransform(springY, [-0.5, 0.5], [rotationFactor, -rotationFactor]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-rotationFactor, rotationFactor]);
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate normalized position (-0.5 to 0.5)
    const normalizedX = (e.clientX - centerX) / rect.width;
    const normalizedY = (e.clientY - centerY) / rect.height;
    
    x.set(normalizedX);
    y.set(normalizedY);
  };

  // Handle hover events
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  // Card style based on effects
  const cardStyle = `
    ${glassEffect ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-white dark:bg-gray-800'}
    rounded-2xl ${glassEffect ? 'shadow-glow' : 'shadow-lg'}
    ${className}
  `;

  return (
    <motion.div
      ref={cardRef}
      className={cardStyle}
      style={{
        transformStyle: "preserve-3d",
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      whileHover={{ scale: scaleFactor }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* 3D Shadows */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-black/20 blur-lg"
          style={{
            transform: `translateZ(-${depth}px)`,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          exit={{ opacity: 0 }}
        />
      )}
      
      {/* Inner content with 3D positioning */}
      <motion.div
        className="relative p-6 z-10"
        style={{
          transform: `translateZ(${depth/2}px)`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </motion.div>
      
      {/* Shine effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.div>
  );
};

export default Card3D;
