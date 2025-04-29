import React from 'react';
import ContactForm from '../components/ContactForm'; // Assuming you have this

function Contact() {
  return (
    <div className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 mb-4">
              We'd love to hear from you! Please fill out the form below or reach
              out to us via the following:
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Email: contact@jackmachine.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Main St, Anytown USA</li>
            </ul>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;