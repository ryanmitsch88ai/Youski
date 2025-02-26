'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Line, Bar, HeatMap } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Dynamic import of components that need to be client-side only
const StatsCard = dynamic(() => import('@/components/stats/StatsCard'), {
  ssr: false,
  loading: () => <div className="h-[200px] bg-gray-100 dark:bg-dark-card animate-pulse rounded-xl" />
});

const LeaderboardCard = dynamic(() => import('@/components/stats/LeaderboardCard'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-gray-100 dark:bg-dark-card animate-pulse rounded-xl" />
});

const AchievementsCard = dynamic(() => import('@/components/stats/AchievementsCard'), {
  ssr: false,
  loading: () => <div className="h-[300px] bg-gray-100 dark:bg-dark-card animate-pulse rounded-xl" />
});

export default function StatsPage() {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [skiData, setSkiData] = useState({
    daysSkied: [],
    resortHeatmap: [],
    sessionStats: []
  });

  useEffect(() => {
    const fetchSkiData = async () => {
      if (!user) return;
      
      try {
        // Fetch ski data from Firebase
        // This is placeholder data - replace with actual Firebase queries
        const mockData = {
          daysSkied: [
            { date: '2024-01', count: 5 },
            { date: '2024-02', count: 8 },
            { date: '2024-03', count: 12 }
          ],
          resortHeatmap: [
            { resort: 'Vail', visits: 15 },
            { resort: 'Aspen', visits: 8 },
            { resort: 'Park City', visits: 6 }
          ],
          sessionStats: [
            { date: '2024-03-01', duration: 4.5, avgSpeed: 25 },
            { date: '2024-03-02', duration: 5.2, avgSpeed: 28 },
            { date: '2024-03-03', duration: 3.8, avgSpeed: 22 }
          ]
        };

        setSkiData(mockData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching ski data:', error);
        setLoading(false);
      }
    };

    fetchSkiData();
  }, [user]);

  const skiDaysData = {
    labels: skiData.daysSkied.map(d => d.date),
    datasets: [{
      label: 'Days Skied',
      data: skiData.daysSkied.map(d => d.count),
      fill: true,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4
    }]
  };

  const resortData = {
    labels: skiData.resortHeatmap.map(r => r.resort),
    datasets: [{
      label: 'Resort Visits',
      data: skiData.resortHeatmap.map(r => r.visits),
      backgroundColor: 'rgb(59, 130, 246)',
      borderRadius: 8
    }]
  };

  const sessionData = {
    labels: skiData.sessionStats.map(s => s.date),
    datasets: [
      {
        label: 'Average Speed (mph)',
        data: skiData.sessionStats.map(s => s.avgSpeed),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        yAxisID: 'y'
      },
      {
        label: 'Duration (hours)',
        data: skiData.sessionStats.map(s => s.duration),
        borderColor: 'rgb(234, 88, 12)',
        backgroundColor: 'rgba(234, 88, 12, 0.1)',
        yAxisID: 'y1'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(107, 114, 128)'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(107, 114, 128, 0.1)'
        },
        ticks: {
          color: 'rgb(107, 114, 128)'
        }
      },
      x: {
        grid: {
          color: 'rgba(107, 114, 128, 0.1)'
        },
        ticks: {
          color: 'rgb(107, 114, 128)'
        }
      }
    }
  };

  const sessionChartOptions = {
    ...chartOptions,
    scales: {
      ...chartOptions.scales,
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Speed (mph)'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Duration (hours)'
        },
        grid: {
          drawOnChartArea: false
        }
      }
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <p className="text-lg text-gray-700 dark:text-gray-300">Please sign in to view your stats.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Ski Performance
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your progress and compare with other skiers
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Days"
            value={skiData.daysSkied.reduce((acc, curr) => acc + curr.count, 0)}
            icon="calendar"
          />
          <StatsCard
            title="Resorts Visited"
            value={skiData.resortHeatmap.length}
            icon="map"
          />
          <StatsCard
            title="Avg Session"
            value={skiData.sessionStats.reduce((acc, curr) => acc + curr.duration, 0) / skiData.sessionStats.length}
            unit="hrs"
            icon="clock"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ski Days Over Time */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Ski Days Over Time
            </h2>
            <div className="h-[300px]">
              <Line data={skiDaysData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Resort Visits */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Most Visited Resorts
            </h2>
            <div className="h-[300px]">
              <Bar data={resortData} options={chartOptions} />
            </div>
          </motion.div>

          {/* Session Stats */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-lg lg:col-span-2"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Session Performance
            </h2>
            <div className="h-[300px]">
              <Line data={sessionData} options={sessionChartOptions} />
            </div>
          </motion.div>
        </div>

        {/* Achievements and Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AchievementsCard achievements={userProfile?.achievements || []} />
          <LeaderboardCard />
        </div>
      </motion.div>
    </div>
  );
} 