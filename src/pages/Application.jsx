import React, { useState } from 'react';
import { User, Mail, Briefcase, FileText, Send, ClipboardList } from 'lucide-react';
import { supabase } from './admin/supabaseClient'; // Ensure Supabase client is configured correctly

function Application() {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    resume: null,
    coverLetter: ''
  });
  const [error, setError] = useState(null); // For handling errors

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file change for resume
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0]
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state on form submission

    // Handle file upload for resume
    let resumeUrl = null;
    if (formData.resume) {
      const { data, error: uploadError } = await supabase.storage
        .from('cv') // Update the bucket name to 'cv' here
        .upload(`cv/${formData.resume.name}`, formData.resume);

      if (uploadError) {
        console.error('Error uploading resume:', uploadError);
        setError('Error uploading resume. Please try again.');
        return;
      }
      resumeUrl = data.path; // Path to the uploaded resume file
    }

    // Insert data into the "applications" table
    const { error: insertError } = await supabase
      .from('applications') // Make sure to create this table in Supabase
      .insert([
        {
          name: formData.name,
          email: formData.email,
          position: formData.position,
          resume_url: resumeUrl,
          cover_letter: formData.coverLetter
        }
      ]);

    if (insertError) {
      console.error('Error submitting application:', insertError);
      setError('Error submitting application. Please try again.');
    } else {
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        position: '',
        resume: null,
        coverLetter: ''
      });
      alert('Application submitted successfully!');
    }
  };

  return (
    <div className="py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <ClipboardList size={32} className="text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-800">Job Application</h1>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
              <strong className="font-bold">Error: </strong>
              <span>{error}</span>
            </div>
          )}
          <form className="bg-white shadow-lg rounded-lg p-8 border border-gray-100" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="col-span-2 md:col-span-1">
                <label className="flex items-center text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  <User size={16} className="mr-2 text-blue-600" />
                  <span>Full Name</span>
                </label>
                <div className="relative">
                  <input
                    className="appearance-none border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              {/* Email Field */}
              <div className="col-span-2 md:col-span-1">
                <label className="flex items-center text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  <Mail size={16} className="mr-2 text-blue-600" />
                  <span>Email Address</span>
                </label>
                <div className="relative">
                  <input
                    className="appearance-none border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              {/* Position Field */}
              <div className="col-span-2">
                <label className="flex items-center text-gray-700 text-sm font-bold mb-2" htmlFor="position">
                  <Briefcase size={16} className="mr-2 text-blue-600" />
                  <span>Position Applying For</span>
                </label>
                <div className="relative">
                  <input
                    className="appearance-none border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                    id="position"
                    name="position"
                    type="text"
                    placeholder="e.g., Front-End Developer"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              {/* Resume Field */}
              <div className="col-span-2">
                <label className="flex items-center text-gray-700 text-sm font-bold mb-2" htmlFor="resume">
                  <FileText size={16} className="mr-2 text-blue-600" />
                  <span>Resume / CV</span>
                </label>
                <div className="relative mt-1">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col rounded-lg border-2 border-dashed border-gray-300 w-full h-32 p-6 group text-center hover:bg-gray-50 cursor-pointer">
                      <div className="flex flex-col items-center justify-center">
                        <FileText size={24} className="text-gray-400 group-hover:text-blue-600 transition duration-200" />
                        <p className="text-sm text-gray-500 mt-2">Drag your file here or click to browse</p>
                        <p className="text-xs text-gray-400 mt-1">PDF, DOC, or DOCX up to 5MB</p>
                      </div>
                      <input
                        className="hidden"
                        id="resume"
                        name="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                      />
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Cover Letter Field */}
              <div className="col-span-2">
                <label className="flex items-center text-gray-700 text-sm font-bold mb-2" htmlFor="coverLetter">
                  <FileText size={16} className="mr-2 text-blue-600" />
                  <span>Cover Letter (Optional)</span>
                </label>
                <div className="relative">
                  <textarea
                    className="appearance-none border border-gray-300 rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200"
                    id="coverLetter"
                    name="coverLetter"
                    rows="4"
                    placeholder="Tell us why you're interested in this position..."
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 flex items-center"
                type="submit"
              >
                <Send size={18} className="mr-2" />
                Submit Application
              </button>
            </div>
          </form>
          
          <p className="text-center text-gray-500 text-sm mt-6">
            By submitting this application, you agree to our privacy policy and terms of service.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Application;
// Note: Ensure to replace the bucket name and table name with your actual Supabase configuration.
// Also, make sure to handle file size and type validation as per your requirements.