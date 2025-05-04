import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function Dashboard() {
  const [totalServices, setTotalServices] = useState(0);
  const [totalCareers, setTotalCareers] = useState(0);
  const [newApplications, setNewApplications] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check authentication and set localStorage
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('adminAuth');
      if (storedUser) {
        setLoading(false);
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate('/admin/login');
      } else {
        const customUser = {
          id: user.id,
          isAuthenticated: true,
          username: user.user_metadata?.username || 'unknown',
        };
        localStorage.setItem('user', JSON.stringify(customUser));
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Fetch data from Supabase
  useEffect(() => {
    if (loading) return;

    const fetchData = async () => {
      try {
        const { data: servicesData } = await supabase
          .from('services')
          .select('id');
        setTotalServices(servicesData?.length || 0);

        const { data: careersData } = await supabase
          .from('job_listings')
          .select('id');
        setTotalCareers(careersData?.length || 0);

        const { data: applicationsData } = await supabase
          .from('applications')
          .select('id')
          .eq('status', 'Shortlisted');
        setNewApplications(applicationsData?.length || 0);

        const { data: activityData } = await supabase
          .from('activity')
          .select('id, action_type, description, created_at')
          .order('created_at', { ascending: false })
          .limit(5);
        setRecentActivities(activityData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [loading]);

  const statCards = [
    { title: 'Total Services', value: totalServices, color: 'bg-indigo-500' },
    { title: 'Total Careers', value: totalCareers, color: 'bg-emerald-500' },
    { title: 'New Applications', value: newApplications, color: 'bg-amber-500' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`${card.color} rounded-xl shadow-lg overflow-hidden text-white`}
            >
              <div className="p-6">
                <p className="text-sm font-medium opacity-80">{card.title}</p>
                <p className="text-3xl font-bold mt-2">{card.value}</p>
              </div>
              <div className="px-6 py-3 bg-black bg-opacity-10">
                <p className="text-xs font-medium">View details →</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{activity.description}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(activity.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
