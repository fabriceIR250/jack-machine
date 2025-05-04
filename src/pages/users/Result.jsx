import React, { useState, useEffect } from 'react';
import { supabase } from '../admin/supabaseClient';

const Result = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) throw new Error('User not logged in');

        const { data, error } = await supabase
          .from('applications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setApplications(data || []);
      } catch (err) {
        setError(err.message);
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusBadge = (status) => {
    const statusConfig = {
      approved: {
        text: 'Approved',
        color: 'bg-green-100 text-green-800',
        icon: (
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      },
      rejected: {
        text: 'Rejected',
        color: 'bg-red-100 text-red-800',
        icon: (
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )
      },
      shortlisted: {
        text: 'Shortlisted',
        color: 'bg-blue-100 text-blue-800',
        icon: (
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      pending: {
        text: 'Under Review',
        color: 'bg-yellow-100 text-yellow-800',
        icon: (
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      }
    };

    const config = statusConfig[status.toLowerCase()] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading your application results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Applications</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Application Results
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
            Track the status of all your job applications in one place
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No applications found</h3>
            <p className="mt-1 text-gray-500">You haven't applied to any jobs yet.</p>
            <div className="mt-6">
              <a
                href="/jobs"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Browse Jobs
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((application) => (
              <div key={application.id} className="bg-white shadow overflow-hidden rounded-lg divide-y divide-gray-200">
                <div className="px-6 py-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{application.job_title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{application.company_name || 'Company not specified'}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusBadge(application.status)}
                  </div>
                </div>
                
                <div className="px-6 py-4">
                  <p className="text-gray-700">{application.job_description || 'No description provided'}</p>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Job Type</p>
                    <p className="mt-1 text-sm text-gray-900">{application.job_type || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</p>
                    <p className="mt-1 text-sm text-gray-900">{application.salary || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Location</p>
                    <p className="mt-1 text-sm text-gray-900">{application.location || 'Remote'}</p>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Applied on <span className="font-medium">{new Date(application.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </p>
                    {application.status === 'rejected' && (
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        View Feedback
                      </button>
                    )}
                    {application.status === 'shortlisted' && (
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
                        Next Steps
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;