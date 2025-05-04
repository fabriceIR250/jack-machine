import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../admin/supabaseClient';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const activityIcon = (
  <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
);

function UserDashboard() {
  const [totalJobs, setTotalJobs] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch user profile
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', supabase.auth.user()?.id);
        
        if (userError) throw userError;
        setUserProfile(userData[0]);

        // Fetch total jobs
        const { data: jobsData, error: jobsError } = await supabase
          .from('job_listing')
          .select('id');
        
        if (jobsError) throw jobsError;
        setTotalJobs(jobsData.length);

        // Fetch applied jobs
        const { data: applicationsData, error: applicationsError } = await supabase
          .from('applications')
          .select('id')
          .eq('user_id', supabase.auth.user()?.id);
        
        if (applicationsError) throw applicationsError;
        setAppliedJobs(applicationsData.length);

        // Fetch recent activity
        const { data: activityData, error: activityError } = await supabase
          .from('activity')
          .select('id, message, created_at')
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (activityError) throw activityError;
        setRecentActivities(activityData);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    { 
      title: 'Total Jobs', 
      value: totalJobs, 
      color: 'from-indigo-500 to-indigo-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    { 
      title: 'Applied Jobs', 
      value: appliedJobs, 
      color: 'from-emerald-500 to-emerald-600',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl md:text-4xl font-bold text-gray-800"
          >
            Welcome to Your Dashboard
          </motion.h1>
          {userProfile && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-gray-600 mt-2"
            >
              Hello, <span className="font-semibold text-indigo-600">{userProfile.name || 'User'}</span>! Here's your latest update.
            </motion.p>
          )}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`bg-gradient-to-r ${card.color} rounded-xl shadow-lg overflow-hidden text-white hover:shadow-xl transition-shadow duration-300`}
            >
              <div className="p-6 flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium opacity-90">{card.title}</p>
                  <p className="text-3xl font-bold mt-2">{card.value}</p>
                </div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                  {card.icon}
                </div>
              </div>
              <div className="px-6 py-3 bg-black bg-opacity-10 hover:bg-opacity-20 transition-colors duration-200 cursor-pointer">
                <p className="text-xs font-medium flex items-center justify-between">
                  View details
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200 flex items-center">
                View All
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
          
          <div className="divide-y divide-gray-100">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div 
                  key={activity.id} 
                  className="p-6 hover:bg-gray-50 transition-colors duration-150 flex items-start"
                >
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4 flex-shrink-0">
                    {activityIcon}
                  </div>
                  <div className="flex-grow">
                    <p className="font-medium text-gray-800">{activity.message}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(activity.created_at).toLocaleString()}
                    </p>
                  </div>
                  <button className="text-gray-400 hover:text-indigo-600 transition-colors duration-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No recent activities found
              </div>
            )}
          </div>
        </motion.div>

        {/* Additional Content Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors duration-200 flex flex-col items-center">
                <svg className="w-6 h-6 text-indigo-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-sm font-medium">Search Jobs</span>
              </button>
              <button className="p-4 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors duration-200 flex flex-col items-center">
                <svg className="w-6 h-6 text-emerald-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span className="text-sm font-medium">Update Profile</span>
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h3>
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 rounded-full" 
                style={{ width: `${Math.min((appliedJobs / Math.max(totalJobs, 1)) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              You've applied to {appliedJobs} out of {totalJobs} available jobs ({Math.round((appliedJobs / Math.max(totalJobs, 1)) * 100)}%)
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default UserDashboard;