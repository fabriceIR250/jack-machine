import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Mail, FileText, Send, ClipboardList, Briefcase } from 'lucide-react';
import { supabase } from './admin/supabaseClient';

function Application() {
  const { id: jobId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
    coverLetter: ''
  });
  const [jobData, setJobData] = useState({
    title: '',
    type: '',
    salary: '',
    location: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError || !data?.user) {
        navigate('/login');
        return;
      }

      if (!jobId) {
        setError('Job ID is missing in the URL.');
        setLoading(false);
        return;
      }

      // Parse jobId to integer since it comes from URL params as string
      const jobIdInt = parseInt(jobId, 10);
      if (isNaN(jobIdInt)) {
        setError('Invalid Job ID format.');
        setLoading(false);
        return;
      }

      const { data: job, error: jobError } = await supabase
        .from('job_listings')
        .select('title, type, salary, location')
        .eq('id', jobIdInt)
        .single();

      if (jobError || !job) {
        setError('Failed to load job information.');
      } else {
        setJobData(job);
      }

      setLoading(false);
    };

    initialize();
  }, [navigate, jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      // 1. Get authenticated user
      const {
        data: { user },
        error: userError
      } = await supabase.auth.getUser();
    
      if (userError || !user) {
        setError('You must be logged in to apply.');
        return;
      }
    
      let resumeUrl = null;
    
      // 2. Upload the resume if provided
      if (formData.resume) {
        const fileName = `${Date.now()}_${formData.resume.name}`;
        const filePath = `${fileName}`;
    
        const { error: uploadError } = await supabase.storage
          .from('cv')
          .upload(filePath, formData.resume);
    
        if (uploadError) {
          console.error('Upload error:', uploadError);
          setError('Error uploading resume: ' + uploadError.message);
          return;
        }
    
        const { data: publicUrlData } = supabase.storage.from('cv').getPublicUrl(filePath);
        resumeUrl = publicUrlData?.publicUrl;
      }
    
      // Parse jobId to integer since it comes from URL params as string
      const jobIdInt = parseInt(jobId, 10);
      if (isNaN(jobIdInt)) {
        setError('Invalid Job ID format.');
        return;
      }

      // 3. Insert application with user_id
      const applicationData = {
        user_id: user.id,
        job_id: jobIdInt,  // Using integer value for job_id
        name: formData.name,
        email: formData.email,
        resume_url: resumeUrl,
        cover_letter: formData.coverLetter
      };
      
      // Only add these fields if they exist in jobData
      if (jobData.title) applicationData.position = jobData.title;
      if (jobData.type) applicationData.job_type = jobData.type;
      if (jobData.salary) applicationData.salary = jobData.salary;
      if (jobData.location) applicationData.location = jobData.location;
    
      console.log('Submitting application data:', applicationData);
      
      const { error: insertError } = await supabase
        .from('applications')
        .insert([applicationData]);
    
      if (insertError) {
        console.error('Insert error:', insertError);
        setError('Error submitting application: ' + insertError.message);
      } else {
        alert('Application submitted successfully!');
        navigate('/users/result/');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred: ' + err.message);
    }
  };
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Checking authentication...</div>;
  }

  return (
    <div className="py-12 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-8">
          <ClipboardList size={32} className="text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-800">Apply for: {jobData.title || '...'}</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

          <form className="bg-white shadow-lg rounded-lg p-8" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-gray-700 mb-2">
                  <User size={16} className="mr-2 text-blue-600" />
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-md py-3 px-4"
                />
              </div>

              <div>
                <label className="flex items-center text-gray-700 mb-2">
                  <Mail size={16} className="mr-2 text-blue-600" />
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border rounded-md py-3 px-4"
                />
              </div>

              <div className="col-span-2">
                <label className="flex items-center text-gray-700 mb-2">
                  <Briefcase size={16} className="mr-2 text-blue-600" />
                  Position
                </label>
                <input
                  type="text"
                  value={jobData.title}
                  disabled
                  className="w-full border rounded-md py-3 px-4 bg-gray-100 text-gray-700"
                />
              </div>

              <div className="col-span-2">
                <label className="text-gray-700 mb-1">Job Type</label>
                <input
                  type="text"
                  value={jobData.type}
                  disabled
                  className="w-full border rounded-md py-3 px-4 bg-gray-100 text-gray-700"
                />
              </div>

              <div>
                <label className="text-gray-700 mb-1">Salary</label>
                <input
                  type="text"
                  value={jobData.salary}
                  disabled
                  className="w-full border rounded-md py-3 px-4 bg-gray-100 text-gray-700"
                />
              </div>

              <div>
                <label className="text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={jobData.location}
                  disabled
                  className="w-full border rounded-md py-3 px-4 bg-gray-100 text-gray-700"
                />
              </div>

              <div className="col-span-2">
                <label className="flex items-center text-gray-700 mb-2">
                  <FileText size={16} className="mr-2 text-blue-600" />
                  Resume
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  required
                  className="w-full"
                />
              </div>

              <div className="col-span-2">
                <label className="flex items-center text-gray-700 mb-2">
                  <FileText size={16} className="mr-2 text-blue-600" />
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full border rounded-md py-3 px-4"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md flex items-center"
              >
                <Send size={18} className="mr-2" />
                Submit Application
              </button>
            </div>
          </form>

          <p className="text-center text-gray-500 text-sm mt-6">
            By submitting this application, you agree to our privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Application;