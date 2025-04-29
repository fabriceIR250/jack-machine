import React from 'react';

function ServiceCard({ title, description }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
      <button className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-full self-start">
        Learn More
      </button>
    </div>
  );
}

export default ServiceCard;