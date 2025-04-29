import React, { useState, useEffect } from 'react';

function Testimonial() {
  const testimonials = [
    {
      quote: "Jack Machine revived our hydraulic press that had been down for weeks. Their emergency service saved us!",
      name: "Sarah Johnson",
      role: "SteelTech Mfg.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      quote: "Preventive maintenance extended our equipment lifespan by 40%. Saved thousands in replacement costs.",
      name: "Michael Chen",
      role: "AeroDynamics Inc.",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "Mobile repair team arrived within 2 hours during critical failure. Professional service with warranty.",
      name: "David Rodriguez",
      role: "BuildRight Const.",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Client Testimonials
          </h2>
          <p className="text-gray-600">
            What our customers say about our services
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          {/* Compact Testimonial Card */}
          <div className="bg-white rounded-lg shadow-md h-[250px] overflow-hidden">
            <div className="p-6 h-full flex flex-col">
              <div className="flex-1">
                <svg
                  className="w-6 h-6 text-blue-400 mb-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-6a1 1 0 112 0V9a1 1 0 11-2 0v1zm0-3a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-gray-700 italic mb-4 line-clamp-3">
                  "{testimonials[currentTestimonial].quote}"
                </p>
              </div>
              <div className="flex items-center border-t pt-4">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-sm text-blue-600">
                    {testimonials[currentTestimonial].role}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Navigation Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${currentTestimonial === index ? 'bg-blue-600 w-4' : 'bg-gray-300'}`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;