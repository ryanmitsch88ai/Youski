'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface AnimatedNumberProps {
  value: number;
  unit?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedNumber({ value, unit = '', duration = 2, className = '' }: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);

        if (progress < 1) {
          setDisplayValue(Math.floor(value * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setDisplayValue(value);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }
  }, [isInView, value, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      {displayValue.toLocaleString()}{unit}
    </motion.span>
  );
} 