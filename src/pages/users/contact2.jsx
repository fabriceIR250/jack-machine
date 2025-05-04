import React, { useState } from 'react';
import { supabase } from '../admin/supabaseClient';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    const { error } = await supabase.from('user_messages').insert([form]);
    if (error) {
      setStatus('Error submitting message. Please try again.');
      console.error(error);
    } else {
      setStatus('Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h1>
      {status && (
        <div className={`mb-4 text-sm ${status.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
          {status}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-600">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded h-32"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
// This code defines a simple contact form using React and Supabase. The form collects the user's name, email, and message, and submits it to a Supabase table called 'user_messages'. The component also handles form submission and displays success or error messages based on the result of the submission. The styling is done using Tailwind CSS classes for a clean and modern look.