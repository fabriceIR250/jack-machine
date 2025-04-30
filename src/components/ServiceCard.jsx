import React, { useState } from 'react';

function ServiceCard({ icon, photo, title, description, link }) {
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    setHasError(true);  // When error occurs, use the default image
  };

  const imageUrl = hasError 
    ? '/path/to/default-placeholder-image.jpg'  // Default image URL when error occurs
    : photo;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col transition-transform hover:scale-[1.02] hover:shadow-lg">
      {/* Photo section */}
      <div className="relative h-48 w-full">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
          onError={handleImageError} // Fallback handler for error
        />
      </div>

      {/* Content section */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Icon and Title */}
        <div className="flex items-center mb-4">
          <div className="mr-3 p-2 bg-blue-50 rounded-full">
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>

        {/* Button */}
        <a
          href={link}
          className="mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full text-center transition-colors"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

export default ServiceCard;
