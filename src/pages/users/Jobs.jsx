import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { supabase } from '../admin/supabaseClient'; // Adjust path if needed

const Jobs = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('job_listings')
        .select('*');

      if (error) {
        setError(`Error fetching job listings: ${error.message}`);
        console.error('Error fetching job listings:', error);
      } else {
        setJobListings(data);
      }

      setLoading(false);
    };

    fetchJobs();
  }, []);

  if (loading) return <div>Loading jobs...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800">Job Listings</h1>

        {jobListings.length === 0 ? (
          <p className="text-gray-600 mt-4">No job listings available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {jobListings.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-md rounded-lg overflow-hidden p-4"
              >
                <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                <p className="text-sm text-gray-600 mt-2">{job.description}</p>
                <div className="mt-4">
                  <button
                    onClick={() => navigate(`/application/${job.id}`)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
