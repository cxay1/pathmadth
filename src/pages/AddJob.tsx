import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface JobFormData {
  title: string;
  company: string;
  jobType: string;
  location: string;
  salaryRange: string;
  description: string;
  requiredSkills: string[];
  benefits: string[];
}

const AddJob: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    company: '',
    jobType: '',
    location: '',
    salaryRange: '',
    description: '',
    requiredSkills: [''],
    benefits: ['']
  });

  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
  const locations = ['Remote', 'On-site', 'Hybrid'];
  const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';

  const handleInputChange = (field: keyof JobFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'requiredSkills' | 'benefits', index: number, value: string) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].map((item, i) => i === index ? value : item) }));
  };

  const addArrayItem = (field: 'requiredSkills' | 'benefits') => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field: 'requiredSkills' | 'benefits', index: number) => {
    setFormData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const filteredData = {
        ...formData,
        requiredSkills: formData.requiredSkills.filter(skill => skill.trim() !== ''),
        benefits: formData.benefits.filter(benefit => benefit.trim() !== '')
      };

      const response = await fetch(`${API_BASE_URL}/api/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(filteredData)
      });

      if (response.ok) {
        alert('Job posted successfully!');
        navigate('/job-seekers');
      } else {
        const error = await response.json().catch(() => ({} as any));
        alert(`Error: ${error.message || 'Failed to post job'}`);
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Error posting job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-red-900 mb-2">Post a New Job</h1>
            <p className="text-gray-600">Fill out the form below to create a new job posting</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                <input type="text" id="title" required value={formData.title} onChange={(e) => handleInputChange('title', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" placeholder="e.g., Senior Software Engineer" />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                <input type="text" id="company" required value={formData.company} onChange={(e) => handleInputChange('company', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" placeholder="e.g., TechCorp Solutions" />
              </div>
              <div>
                <label htmlFor="jobType" className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
                <select id="jobType" required value={formData.jobType} onChange={(e) => handleInputChange('jobType', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors">
                  <option value="">Select job type</option>
                  {jobTypes.map(type => (<option key={type} value={type}>{type}</option>))}
                </select>
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                <select id="location" required value={formData.location} onChange={(e) => handleInputChange('location', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors">
                  <option value="">Select location</option>
                  {locations.map(location => (<option key={location} value={location}>{location}</option>))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700 mb-2">Salary Range *</label>
                <input type="text" id="salaryRange" required value={formData.salaryRange} onChange={(e) => handleInputChange('salaryRange', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" placeholder="e.g., $80,000 - $120,000" />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
              <textarea id="description" required rows={6} value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors resize-vertical" placeholder="Provide a detailed description of the role, responsibilities, and what you're looking for in a candidate..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills *</label>
              <div className="space-y-3">
                {formData.requiredSkills.map((skill, index) => (
                  <div key={index} className="flex gap-2">
                    <input type="text" value={skill} onChange={(e) => handleArrayChange('requiredSkills', index, e.target.value)} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" placeholder="e.g., React, Node.js, TypeScript" />
                    {formData.requiredSkills.length > 1 && (
                      <button type="button" onClick={() => removeArrayItem('requiredSkills', index)} className="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">Remove</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('requiredSkills')} className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-red-400 hover:text-red-600 transition-colors">+ Add Skill</button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Benefits & Perks</label>
              <div className="space-y-3">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-2">
                    <input type="text" value={benefit} onChange={(e) => handleArrayChange('benefits', index, e.target.value)} className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors" placeholder="e.g., Health insurance, 401(k) matching, Remote work" />
                    {formData.benefits.length > 1 && (
                      <button type="button" onClick={() => removeArrayItem('benefits', index)} className="px-4 py-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors">Remove</button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('benefits')} className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-red-400 hover:text-red-600 transition-colors">+ Add Benefit</button>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button type="button" onClick={() => navigate('/job-seekers')} className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">{isSubmitting ? 'Posting Job...' : 'Post Job'}</button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AddJob;