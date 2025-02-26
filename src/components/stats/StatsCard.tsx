'use client';

import { motion } from 'framer-motion';
import { CalendarIcon, MapIcon, ClockIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: 'calendar' | 'map' | 'clock';
  unit?: string;
}

const iconMap = {
  calendar: CalendarIcon,
  map: MapIcon,
  clock: ClockIcon,
};

export default function StatsCard({ title, value, icon, unit }: StatsCardProps) {
  const Icon = iconMap[icon];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value.toFixed(1)}{unit && <span className="text-lg ml-1">{unit}</span>}
          </p>
        </div>
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
    </motion.div>
  );
} 