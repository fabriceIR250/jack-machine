import React, { useState, useEffect } from 'react';

function HeroCarousel() {
  const slides = [
    // Jackport Repair Slides
    {
      title: "Expert Jackport Repair Services",
      description: "Fast, reliable repairs for hydraulic, bottle, and floor jacks. 24-hour emergency service available.",
      image: "https://primetechsupport.com/cdn/shop/files/laptop-dc-jack-repairs-service-product-image-3-b2c.webp?v=1688067384",
      cta: "Request Repair",
      type: "service"
    },
    {
      title: "Preventive Maintenance Plans",
      description: "Avoid costly breakdowns with our scheduled maintenance programs for all jack types.",
      image: "https://bluefolder.com/wp-content/uploads/2019/11/Blog-Preventive-Maintenance-Plan-cropped-2-1.png",
      cta: "View Plans",
      type: "service"
    },
    
    // Job Opportunity Slides
    {
      title: "Join Our Repair Team",
      description: "We're hiring certified jackport technicians with competitive pay and benefits.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnWcKm8YDAeyZ3e4qoHl-AAA6Pr03BWAeiG2weD05AeVqCZ91hppw7iXMEsCziaF9Z1jQ&usqp=CAU",
      cta: "Apply Now",
      type: "career"
    },
    {
      title: "Apprenticeship Program",
      description: "No experience? Start your career with our paid training program for aspiring technicians.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR77BvZYrbkp4DcyiysebHXVwm01h8OBknoXg&s",
      cta: "Learn More",
      type: "career"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slide Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ 
          backgroundImage: `url(${slides[currentSlide].image})`,
          backgroundPosition: slides[currentSlide].type === "service" ? "center 30%" : "center center"
        }}
      >
        <div className={`absolute inset-0 ${slides[currentSlide].type === "service" ? 'bg-blue-900/70' : 'bg-gray-900/70'}`}></div>
      </div>
      
      {/* Slide Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6 md:px-12 z-10">
          <div className="max-w-2xl text-white">
            {/* Tag Badge */}
            <span className={`inline-block px-4 py-1 mb-4 rounded-full text-sm font-semibold ${slides[currentSlide].type === "service" ? 'bg-blue-600' : 'bg-amber-600'}`}>
              {slides[currentSlide].type === "service" ? 'Our Services' : 'Career Opportunities'}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fadeIn">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl mb-8 animate-fadeIn delay-100">
              {slides[currentSlide].description}
            </p>
            <button className={`${slides[currentSlide].type === "service" ? 'bg-blue-600 hover:bg-blue-700' : 'bg-amber-600 hover:bg-amber-700'} text-white font-bold py-3 px-8 rounded-lg text-lg animate-fadeIn delay-200 transition-all`}>
              {slides[currentSlide].cta}
            </button>
          </div>
        </div>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${currentSlide === index ? (slide.type === "service" ? 'bg-blue-400 w-6' : 'bg-amber-400 w-6') : 'bg-white/50 w-2'}`}
            aria-label={`Go to ${slide.type} slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;