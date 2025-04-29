import React from 'react';
import { User, Mail, Briefcase, FileText, Send, ClipboardList } from 'lucide-react';

function Application() {
  return (
    <div className="py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <ClipboardList size={32} className="text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-800">Job Application</h1>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <form className="bg-white shadow-lg rounded-lg p-8 border border-gray-100">
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
                    type="text"
                    placeholder="Your Name"
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
                    type="email"
                    placeholder="your.email@example.com"
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
                    type="text"
                    placeholder="e.g., Front-End Developer"
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
                        type="file"
                        accept=".pdf,.doc,.docx"
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
                    rows="4"
                    placeholder="Tell us why you're interested in this position..."
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