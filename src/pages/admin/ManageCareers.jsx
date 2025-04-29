import React from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiBriefcase, FiDollarSign, FiMapPin, FiClock } from 'react-icons/fi';

const jobListings = [
  {
    id: 1,
    title: 'Front-End Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    salary: '$90,000 - $120,000',
    posted: '2 days ago',
    applications: 15,
  },
  {
    id: 2,
    title: 'Back-End Developer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$100,000 - $130,000',
    posted: '1 week ago',
    applications: 8,
  },
  {
    id: 3,
    title: 'UX Designer',
    department: 'Design',
    location: 'New York, NY',
    type: 'Contract',
    salary: '$70 - $90/hr',
    posted: '3 days ago',
    applications: 12,
  },
];

function ManageCareers() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Job Listings</h1>
            <p className="text-gray-600 mt-2">Create and manage your company's career opportunities</p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <FiPlus className="mr-2" />
            Add New Job
          </button>
        </div>

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
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageCareers;