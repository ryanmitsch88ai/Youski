'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedProgressBarProps {
  value: number;
  label: string;
  unit?: string;
  color?: string;
}

export default function AnimatedProgressBar({ value, label, unit = '', color = 'blue' }: AnimatedProgressBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{label}</span>
        <motion.span
          className="text-sm font-semibold text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {value}{unit}
        </motion.span>
      </div>
      <div className="h-2 bg-gray-200 dark:bg-dark-accent rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-${color}-500`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
} 