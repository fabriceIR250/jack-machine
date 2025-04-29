import React from 'react';
import ServiceCard from '../components/ServiceCard';

function Services() {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Our Services</h1>
        <p className="text-xl text-center text-gray-600 mb-12">Comprehensive solutions for all your jackport needs</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Repair Services */}
          <ServiceCard
            title="Hydraulic Jack Repair"
            description="Expert diagnosis and repair of all hydraulic jack systems with 6-month warranty"
            icon="🔧"
          />
          <ServiceCard
            title="Emergency On-Site Repair"
            description="24/7 mobile repair service for urgent jack failures at your location"
            icon="🚛"
          />
          <ServiceCard
            title="Preventive Maintenance"
            description="Scheduled maintenance plans to extend equipment lifespan"
            icon="🛡️"
          />
          
          {/* Parts & Accessories */}
          <ServiceCard
            title="Genuine Parts Replacement"
            description="Authentic OEM and compatible parts for all major jack brands"
            icon="⚙️"
          />
          <ServiceCard
            title="Lubrication Services"
            description="Specialized lubrication for smooth operation and corrosion prevention"
            icon="🛢️"
          />
          <ServiceCard
            title="Pressure Testing"
            description="Comprehensive pressure testing to ensure safety standards"
            icon="📊"
          />
          
          {/* Job Services */}
          <ServiceCard
            title="Technician Training"
            description="Certification programs for aspiring jackport repair technicians"
            icon="🎓"
          />
          <ServiceCard
            title="Equipment Rental"
            description="Temporary replacement jacks while yours is being repaired"
            icon="🏗️"
          />
          <ServiceCard
            title="Consultation Services"
            description="Expert advice on jack maintenance and fleet management"
            icon="💡"
          />
        </div>
      </div>
    </div>
  );
}

export default Services;