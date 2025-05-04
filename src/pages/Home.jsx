import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import Testimonial from '../components/Testimonial';
import { Wrench, Check, Users, ArrowRight, Star, Clock, Shield, Cog, Droplet, Gauge, GraduationCap, Construction, Lightbulb } from 'lucide-react';
import { supabase } from './admin/supabaseClient';

// Icon map to match icon names stored in Supabase
const iconMap = {
  Wrench: <Wrench className="h-6 w-6 text-blue-600" />,
  Check: <Check className="h-6 w-6 text-blue-600" />,
  Users: <Users className="h-6 w-6 text-blue-600" />,
  Clock: <Clock className="h-6 w-6 text-blue-600" />,
  Shield: <Shield className="h-6 w-6 text-blue-600" />,
  Cog: <Cog className="h-6 w-6 text-blue-600" />,
  Droplet: <Droplet className="h-6 w-6 text-blue-600" />,
  Gauge: <Gauge className="h-6 w-6 text-blue-600" />,
  GraduationCap: <GraduationCap className="h-6 w-6 text-blue-600" />,
  Construction: <Construction className="h-6 w-6 text-blue-600" />,
  Lightbulb: <Lightbulb className="h-6 w-6 text-blue-600" />,
  Star: <Star className="h-6 w-6 text-blue-600" />,
};

export default function Home() {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('services')
          .select('*');

        if (error) throw error;

        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*');

        if (error) throw error;

        setTestimonials(data);
      } catch (error) {
        console.error('Error fetching testimonials:', error.message);
      }
    };

    fetchServices();
    fetchTestimonials();
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="overflow-hidden">
      <Hero 
        title="Professional Jackport Repair Services"
        subtitle="Expert diagnostics, reliable repairs, and quality parts for all your jackport needs."
        primaryButton={{ text: "Our Services", link: "/services", icon: <ArrowRight className="ml-2 h-4 w-4" /> }}
        secondaryButton={{ text: "Contact Us", link: "/contact" }}
        backgroundImage="/images/hero-background.jpg"
      />

      {/* Featured Services */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
              Quality solutions for all your jackport connectivity needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                icon={iconMap[service.icon] || <Wrench className="h-6 w-6 text-blue-600" />}
                photo={service.image_url}
                title={service.name}
                description={service.description}
                link={service.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold sm:text-4xl">What Our Clients Say</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
              Trusted by professionals across the industry
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial 
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                rating={testimonial.rating}
                photo={testimonial.photo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Repair Your Jackport?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today for fast, reliable service you can trust
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/contact"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
            >
              Get a Free Quote
            </a>
            <a
              href="/services"
              className="px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              Learn About Services
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
