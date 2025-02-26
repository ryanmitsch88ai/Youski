'use client';

import { useTheme } from '@/lib/contexts/ThemeContext';
import { SunIcon, MoonIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-gray-200 dark:bg-dark-accent hover:bg-gray-300 dark:hover:bg-dark-card transition-colors"
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 360 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <MoonIcon className="w-5 h-5 text-blue-400" />
        ) : (
          <SunIcon className="w-5 h-5 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
} 