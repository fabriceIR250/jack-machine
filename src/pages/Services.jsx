import React, { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import { supabase } from './admin/supabaseClient'; // 👈 Use imported client
import {
  Wrench, Clock, Shield, Cog, Droplet, Gauge, GraduationCap, Construction,
  Lightbulb, Users, Check
} from 'lucide-react';

// Map icon names from DB to Lucide icons
const iconMap = {
  Wrench: <Wrench className="h-6 w-6 text-blue-600" />,
  Clock: <Clock className="h-6 w-6 text-blue-600" />,
  Shield: <Shield className="h-6 w-6 text-blue-600" />,
  Cog: <Cog className="h-6 w-6 text-blue-600" />,
  Droplet: <Droplet className="h-6 w-6 text-blue-600" />,
  Gauge: <Gauge className="h-6 w-6 text-blue-600" />,
  GraduationCap: <GraduationCap className="h-6 w-6 text-blue-600" />,
  Construction: <Construction className="h-6 w-6 text-blue-600" />,
  Lightbulb: <Lightbulb className="h-6 w-6 text-blue-600" />,
  Users: <Users className="h-6 w-6 text-blue-600" />,
  Check: <Check className="h-6 w-6 text-blue-600" />,
};

function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('services')
        .select('*');

      if (error) {
        console.error('Error fetching services:', error);
      } else {
        setServices(data);
      }
    }

    fetchServices();
  }, []);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h1>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            Comprehensive solutions for all your jackport needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={iconMap[service.icon] || <Cog className="h-6 w-6 text-blue-600" />}
              photo={service.photo}
              title={service.name}
              description={service.description}
              link={service.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
