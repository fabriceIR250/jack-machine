import React, { useState, useEffect } from 'react';
import { FiEye, FiCheck, FiX, FiDownload, FiSearch } from 'react-icons/fi';
import { supabase } from './supabaseClient'; // Ensure this path is correct

function ManageApplications() {
  const [applications, setApplications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch applications from Supabase
  useEffect(() => {
    const fetchApplications = async () => {
      const { data, error } = await supabase
        .from('applications') // Make sure this table exists in your Supabase database
        .select('*');

      if (error) {
        console.error('Error fetching applications:', error);
      } else {
        setApplications(data);
      }
    };

    fetchApplications();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAction = (id, action) => {
    // Handle shortlist, reject, view, etc.
    // You can update the status in the Supabase database based on the action
    console.log(`Action: ${action} on application with ID: ${id}`);
    // Example of updating status for shortlisted applications
    if (action === 'shortlist') {
      supabase
        .from('applications')
        .update({ status: 'Shortlisted' })
        .eq('id', id)
        .then(({ error }) => {
          if (error) console.error('Error updating application:', error);
          else setApplications((prev) => prev.map((app) => app.id === id ? { ...app, status: 'Shortlisted' } : app));
        });
    }
  };

  const filteredApplications = applications.filter((app) => {
    return app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           app.email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Applications</h1>
            <p className="text-gray-600 mt-2">Review and manage job applications</p>
          </div>
          <div className="mt-4 md:mt-0 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search applications..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Candidate
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApplications.map((application) => (
                  <tr key={application.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">
                            {application.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{application.name}</div>
                          <div className="text-sm text-gray-500">{application.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{application.position}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        application.status === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                        application.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {application.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {application.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                          title="View"
                        >
                          <FiEye className="h-5 w-5" />
                        </button>
                        <button
                          className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50"
                          title="Shortlist"
                          onClick={() => handleAction(application.id, 'shortlist')}
                        >
                          <FiCheck className="h-5 w-5" />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Reject"
                        >
                          <FiX className="h-5 w-5" />
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"
                          title="Download CV"
                        >
                          <FiDownload className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between items-center">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredApplications.length}</span> of{' '}
                <span className="font-medium">{applications.length}</span> applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageApplications;
