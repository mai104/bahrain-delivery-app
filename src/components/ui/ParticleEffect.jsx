/**
 * ParticleEffect
 * 
 * CURRENTLY UNUSED
 * 
 * Purpose: Creates animated particle effects for background visual interest
 * Future Use: Will be used in various sections of the app to add visual interest
 *            and enhance the user experience in 3D mode
 * 
 * Note: This component creates customizable animated particles with different behaviors
 * (up, down, side, circular, random). It supports different colors, sizes, and animation
 * durations for creating varied visual effects across the application.
 */

import React from 'react';
import { motion } from 'framer-motion';

const ParticleEffect = ({ 
  count = 15, 
  color = 'primary', 
  minSize = 5, 
  maxSize = 15,
  minDuration = 3,
  maxDuration = 8,
  direction = 'up'
}) => {
  // اختيار اللون حسب التصنيف
  const getColorClass = () => {
    switch (color) {
      case 'primary':
        return 'bg-primary/10 dark:bg-primary-dark/20';
      case 'secondary':
        return 'bg-secondary/10 dark:bg-secondary-dark/20';
      case 'accent':
        return 'bg-accent/10 dark:bg-accent-dark/20';
      default:
        return 'bg-primary/10 dark:bg-primary-dark/20';
    }
  };
  
  // حساب انيميشن الحركة
  const getAnimation = (index) => {
    // حركة لأعلى
    if (direction === 'up') {
      return {
        y: [null, "-100px"],
        opacity: [0, 0.7, 0],
      };
    } 
    // حركة لأسفل
    else if (direction === 'down') {
      return {
        y: [null, "100px"],
        opacity: [0, 0.7, 0],
      };
    }
    // حركة للجانبين
    else if (direction === 'side') {
      return {
        x: [null, index % 2 === 0 ? "100px" : "-100px"],
        opacity: [0, 0.7, 0],
      };
    }
    // حركة دائرية
    else if (direction === 'circular') {
      return {
        x: [0, Math.cos(index) * 50],
        y: [0, Math.sin(index) * 50],
        opacity: [0, 0.7, 0],
      };
    }
    // حركة عشوائية
    else {
      return {
        x: [0, (Math.random() - 0.5) * 100],
        y: [0, (Math.random() - 0.5) * 100],
        opacity: [0, 0.7, 0],
      };
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${getColorClass()}`}
          style={{
            width: Math.random() * (maxSize - minSize) + minSize,
            height: Math.random() * (maxSize - minSize) + minSize,
            x: Math.random() * 200 + 50,
            y: Math.random() * 400 + 50,
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={getAnimation(i)}
          transition={{
            duration: Math.random() * (maxDuration - minDuration) + minDuration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleEffect;
