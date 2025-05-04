import React, { useState, useEffect } from 'react';
import { FiEye, FiCheck, FiX, FiDownload, FiSearch, FiXCircle } from 'react-icons/fi';
import { supabase } from './supabaseClient';
import { useNavigate } from 'react-router-dom';

function ManageApplications() {
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  // Fetch data from Supabase
  useEffect(() => {
    if (loading) return;

    const fetchApplications = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from('applications').select('*');
        if (error) throw error;
        setApplications(data || []);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAction = async (id, action) => {
    try {
      let newStatus;
      if (action === 'shortlist') newStatus = 'Shortlisted';
      else if (action === 'reject') newStatus = 'Rejected';
      else return;

      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      setApplications((prev) =>
        prev.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error(`Error updating status:`, error);
    }
  };

  const filteredApplications = applications.filter((app) => {
    return (
      app.name?.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      app.email?.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  });

  const openModal = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedApplication(null);
    setShowModal(false);
  };

  const handleDownloadCV = async (fileName) => {
    try {
      const { data, error } = await supabase.storage
        .from('cv')
        .createSignedUrl(`cv/${fileName}`, 60); // 60 seconds expiration

      if (error) throw error;
      window.open(data.signedUrl, '_blank');
    } catch (error) {
      console.error('Error downloading CV:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Job Applications</h1>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <FiXCircle className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500">No applications found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied On
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{application.name}</div>
                            <div className="text-sm text-gray-500">{application.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.position}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(application.created_at).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          application.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          application.status === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {application.status || 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => openModal(application)}
                          className="text-indigo-600 hover:text-indigo-900"
                          title="View details"
                        >
                          <FiEye size={18} />
                        </button>
                        {application.cv_filename && (
                          <button
                            onClick={() => handleDownloadCV(application.cv_filename)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Download CV"
                          >
                            <FiDownload size={18} />
                          </button>
                        )}
                        {application.status !== 'Shortlisted' && (
                          <button
                            onClick={() => handleAction(application.id, 'shortlist')}
                            className="text-green-600 hover:text-green-900"
                            title="Shortlist candidate"
                          >
                            <FiCheck size={18} />
                          </button>
                        )}
                        {application.status !== 'Rejected' && (
                          <button
                            onClick={() => handleAction(application.id, 'reject')}
                            className="text-red-600 hover:text-red-900"
                            title="Reject candidate"
                          >
                            <FiX size={18} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Application Detail Modal */}
      {showModal && selectedApplication && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Application Details</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <FiXCircle size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Applicant Name</h3>
                <p className="mt-1">{selectedApplication.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1">{selectedApplication.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="mt-1">{selectedApplication.phone || 'Not provided'}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Position</h3>
                <p className="mt-1">{selectedApplication.position}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Applied On</h3>
                <p className="mt-1">{new Date(selectedApplication.created_at).toLocaleString()}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <p className="mt-1">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    selectedApplication.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    selectedApplication.status === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedApplication.status || 'Pending'}
                  </span>
                </p>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Cover Letter / Additional Information</h3>
              <p className="mt-1 whitespace-pre-line">{selectedApplication.cover_letter || 'No cover letter provided'}</p>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                {selectedApplication.cv_filename && (
                  <button
                    onClick={() => handleDownloadCV(selectedApplication.cv_filename)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    <FiDownload className="mr-2" />
                    Download CV
                  </button>
                )}
              </div>
              
              <div className="space-x-2">
                {selectedApplication.status !== 'Rejected' && (
                  <button
                    onClick={() => {
                      handleAction(selectedApplication.id, 'reject');
                      closeModal();
                    }}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  >
                    <FiX className="mr-2" />
                    Reject
                  </button>
                )}
                {selectedApplication.status !== 'Shortlisted' && (
                  <button
                    onClick={() => {
                      handleAction(selectedApplication.id, 'shortlist');
                      closeModal();
                    }}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  >
                    <FiCheck className="mr-2" />
                    Shortlist
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageApplications;