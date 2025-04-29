import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import Testimonial from '../components/Testimonial';
import { Wrench, Check, Users, ArrowRight } from 'lucide-react';

export default function Home() {
  const services = [
    {
      icon: <Wrench className="h-6 w-6 text-blue-600" />,
      title: "Jackport Repair",
      description: "Professional repair services for all types of jackports with industry-leading warranty.",
      link: "/services"
    },
    {
      icon: <Check className="h-6 w-6 text-blue-600" />,
      title: "Diagnostics",
      description: "Comprehensive testing and troubleshooting to accurately identify jackport issues.",
      link: "/services"
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Join Our Team",
      description: "Looking for skilled technicians to join our growing team of jackport repair specialists.",
      link: "/careers"
    }
  ];

  const testimonials = [
    {
      rating: 5,
      quote: "Jack Machine repaired our industrial jackports in record time. Their technicians are professional and highly skilled. We won't go anywhere else!",
      author: "Michael J., Operations Manager"
    },
    {
      rating: 5,
      quote: "Their diagnosis was spot on and they fixed our jackport issue on the first visit. Fair pricing and excellent customer service.",
      author: "Sarah T., Production Supervisor"
    },
    {
      rating: 5,
      quote: "I applied for a position and was impressed by their professional recruitment process. Now I'm part of a talented team that values excellence.",
      author: "David R., Jackport Technician"
    }
  ];

  return (
    <div>
      <Hero 
        title="Professional Jackport Repair Services"
        subtitle="Expert diagnostics, reliable repairs, and quality parts for all your jackport needs."
        primaryButton={{ text: "Our Services", link: "/services", icon: <ArrowRight className="ml-2 h-4 w-4" /> }}
        secondaryButton={{ text: "Contact Us", link: "/contact" }}
      />
      
      {/* Featured Services */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}