import React, { useEffect, useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiBriefcase, FiDollarSign, FiMapPin, FiClock } from 'react-icons/fi';
import { supabase } from './supabaseClient'; // Import supabase client

function ManageCareers() {
  const [jobListings, setJobListings] = useState([]);
  const [showForm, setShowForm] = useState(false); // Track form visibility
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

  // Fetch job listings from Supabase
  useEffect(() => {
    const fetchJobListings = async () => {
      const { data, error } = await supabase
        .from('job_listings') // Your table name in Supabase
        .select('*'); // Select all columns

      if (error) {
        console.error('Error fetching job listings:', error);
      } else {
        setJobListings(data); // Set the job listings state
      }
    };

    fetchJobListings(); // Call the function to fetch data
  }, []); // Empty dependency array to fetch data only once when component mounts

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewJob({
      ...newJob,
      [name]: value,
    });
  };

  // Handle job form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('job_listings') // Your table name
      .insert([{
        ...newJob, // Insert the new job
      }]);

    if (error) {
      console.error('Error adding job:', error);
    } else {
      setShowForm(false); // Hide form after successful submission
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
      // Re-fetch job listings to reflect the newly added job
      const { data } = await supabase.from('job_listings').select('*');
      setJobListings(data);
    }
  };

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
            onClick={() => setShowForm(!showForm)} // Toggle form visibility
          >
            <FiPlus className="mr-2" />
            Add New Job
          </button>
        </div>

        {/* Display the form to add a new job if showForm is true */}
        {showForm && (
          <div className="bg-white shadow-sm rounded-xl p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New Job</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newJob.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={newJob.department}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={newJob.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Job Type</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={newJob.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={newJob.salary}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="posted" className="block text-sm font-medium text-gray-700">Posted</label>
                <input
                  type="text"
                  id="posted"
                  name="posted"
                  value={newJob.posted}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              {/* Add Description and Skills fields */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Job Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={newJob.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  rows={3}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Required Skills</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  value={newJob.skills}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applications
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Posted
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                        <div className="text-gray-700"><strong>Description:</strong> {job.description}</div>
                        <div className="text-gray-700"><strong>Skills:</strong> {job.skills}</div>
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
          <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between items-center">
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of{' '}
                <span className="font-medium">3</span> jobs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCareers;
