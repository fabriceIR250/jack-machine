import React from 'react';
import { Link } from 'react-router-dom';

function JobListing({ title, location, description, link }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-2">Location: {location}</p>
      <p className="text-gray-700 mb-4">{description}</p>
      <Link to={link} className="text-jack-blue hover:underline">
        Apply Now
      </Link>
    </div>
  );
}

export default JobListing;