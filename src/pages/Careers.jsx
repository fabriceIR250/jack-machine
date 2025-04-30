import React, { useEffect, useState } from 'react';
import { supabase } from './admin/supabaseClient'; // Import your Supabase client
import { Users, Briefcase, Search, Code, Database, Globe, MapPin } from 'lucide-react';

function Careers() {
  const [jobListings, setJobListings] = useState([]); // State to hold the job listings

  // Fetch job listings from Supabase on component mount
  useEffect(() => {
    const fetchJobListings = async () => {
      const { data, error } = await supabase
        .from('job_listings') // Replace with your actual table name
        .select('*'); // Select all job listings

      if (error) {
        console.error("Error fetching job listings:", error);
      } else {
        setJobListings(data); // Set the fetched job listings to state
      }
    };

    fetchJobListings();
  }, []); // Empty array ensures this effect runs only once

  return (
    <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center mb-4">
            <Users size={32} className="text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Join Our Team</h1>
          </div>
          <div className="w-24 h-1 bg-blue-600 rounded mb-8"></div>
          <p className="text-lg text-gray-600 max-w-2xl text-center">
            We're always looking for talented individuals to join us and help shape the future of technology.
            Check out our open positions below.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mb-12">
          <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-md">
            <Search size={20} className="text-blue-600 mr-2" />
            <span className="text-gray-700 font-medium">Currently hiring for {jobListings.length} positions</span>
          </div>
          <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-md">
            <Globe size={20} className="text-blue-600 mr-2" />
            <span className="text-gray-700 font-medium">Remote-friendly culture</span>
          </div>
          <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-md">
            <Briefcase size={20} className="text-blue-600 mr-2" />
            <span className="text-gray-700 font-medium">Competitive benefits</span>
          </div>
        </div>

        {/* Display job listings dynamically */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {jobListings.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition duration-300">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Code size={24} className="text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">{job.title}</h2>
                </div>
                <div className="flex items-center mb-4 text-gray-600">
                  <MapPin size={18} className="mr-2" />
                  <span>{job.location}</span>
                </div>
                <p className="text-gray-600 mb-6">
                  {job.description}
                </p>
                
                {/* Display skills dynamically */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {job.skills && job.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
                <a href="/application" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300">
                  Apply Now
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-600 rounded-lg shadow-lg p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Don't see the right fit?</h2>
              <p className="text-blue-100">Send us your resume anyway. We're always looking for talented individuals.</p>
            </div>
            <a href="/contact" className="inline-flex items-center bg-white text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-md transition duration-300">
              Contact Us
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Careers;
