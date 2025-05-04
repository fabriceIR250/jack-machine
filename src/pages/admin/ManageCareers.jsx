import React, { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiBriefcase, FiDollarSign, FiMapPin, FiClock } from 'react-icons/fi';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

function ManageCareers() {
  const [jobListings, setJobListings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    department: '',
    location: '',
    type: '',
    salary: '',
    posted: '',
    applications: 0,
    description: '',
    skills: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check authentication status
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

  // Fetch job listings from Supabase
  useEffect(() => {
    if (loading) return;

    const fetchJobListings = async () => {
      try {
        const { data, error } = await supabase
          .from('job_listings')
          .select('*');

        if (error) throw error;
        setJobListings(data || []);
      } catch (error) {
        console.error('Error fetching job listings:', error);
      }
    };

    fetchJobListings();
  }, [loading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({
      ...newJob,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase
        .from('job_listings')
        .insert([newJob]);

      if (error) throw error;

      // Refresh job listings
      const { data } = await supabase.from('job_listings').select('*');
      setJobListings(data || []);
      setShowForm(false);
      setNewJob({
        title: '',
        department: '',
        location: '',
        type: '',
        salary: '',
        posted: '',
        applications: 0,
        description: '',
        skills: '',
      });
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      const { error } = await supabase
        .from('job_listings')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setJobListings(jobListings.filter(job => job.id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Job Listings</h1>
            <p className="text-gray-600 mt-2">Create and manage your company's career opportunities</p>
          </div>
          <button
            className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => setShowForm(!showForm)}
          >
            <FiPlus className="mr-2" />
            Add New Job
          </button>
        </div>

        {showForm && (
          <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Job</h2>
            <form onSubmit={handleFormSubmit}>
              {/* Form fields remain the same */}
              {/* ... */}
            </form>
          </div>
        )}

        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applications
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posted
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {jobListings.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.department}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <FiMapPin className="mr-1.5 flex-shrink-0" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FiBriefcase className="mr-1.5 flex-shrink-0" />
                          {job.type}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FiDollarSign className="mr-1.5 flex-shrink-0" />
                          {job.salary}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {job.applications} applicants
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <FiClock className="mr-1.5 flex-shrink-0" />
                        {job.posted}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                          title="Edit"
                        >
                          <FiEdit2 className="h-5 w-5" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Delete"
                          onClick={() => handleDeleteJob(job.id)}
                        >
                          <FiTrash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCareers;