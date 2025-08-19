import React, { useState, ChangeEvent, FormEvent, useReducer } from 'react';
import { Link } from 'react-router-dom';
import JobCard from "../components/JobCard";
import JobDetailsModal from "../components/JobDetailsModal";
import { AnimatePresence, motion } from 'framer-motion';
import { applicationsApi } from '../utils/api';
import Footer from '../components/Footer';
import jobsData from '../data/jobs.json';

const FlipModal = ({ isOpen, onClose, children, jobTitle, companyName }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full mx-4 flex flex-col"
          style={{ transformOrigin: 'center bottom', perspective: '1000px', maxHeight: '90vh', overflowY: 'auto' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            aria-label="Close modal"
            type="button"
          >
            &times;
          </button>

          <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-2xl font-bold text-red-900">{jobTitle}</h2>
            <p className="text-lg text-red-600">{companyName}</p>
          </div>

          <div className="pt-2 pb-1 px-1 flex-1 flex flex-col gap-4">{children}</div>

          <div className="border-t border-gray-200 pt-4 mt-4 text-center">
            <p className="text-sm text-gray-600 mb-2">Having trouble with your application?</p>
            <a
              href="mailto:info.pathmatch@gmail.com"
              className="inline-flex items-center text-red-600 hover:text-red-800 font-medium transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Contact us at info.pathmatch@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const initialFilters = {
  search: '',
  location: '',
  jobType: '',
};

const initialState = (jobs: any[]) => ({
  jobs,
  visibleJobs: jobs.slice(0, 12),
  filters: initialFilters,
  showAll: false,
  filteredJobs: jobs,
});

function jobReducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_FILTERS': {
      const { search, location, jobType } = action.payload;
      const filtered = state.jobs.filter((job: any) => {
        const matchesSearch =
          !search ||
          job.title.toLowerCase().includes(search.toLowerCase()) ||
          job.company.toLowerCase().includes(search.toLowerCase());
        const matchesLocation = !location || job.location === location;
        const matchesJobType = !jobType || job.jobType === jobType;
        return matchesSearch && matchesLocation && matchesJobType;
      });
      return {
        ...state,
        filters: action.payload,
        filteredJobs: filtered,
        visibleJobs: state.showAll ? filtered : filtered.slice(0, 12),
      };
    }
    case 'SHOW_MORE': {
      return { ...state, showAll: true, visibleJobs: state.filteredJobs };
    }
    case 'RESET_FILTERS': {
      return {
        ...state,
        filters: initialFilters,
        filteredJobs: state.jobs,
        visibleJobs: state.showAll ? state.jobs : state.jobs.slice(0, 12),
      };
    }
    default:
      return state;
  }
}

const allLocations = ["Remote", "Hybrid", "On-site"];
const allJobTypes = ["Full-time", "Part-time", "Contract"];

const JobSeekers: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
    resume: null as File | null,
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [state, dispatch] = useReducer(jobReducer, jobsData as any, initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setForm(prev => ({ ...prev, resume: e.target.files![0] }));
      setAttachments([e.target.files[0]]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedJob) { alert('Please select a job position first.'); return; }
    if (!form.email || !form.name) { alert('Please fill in all required fields.'); return; }
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('job_title', selectedJob.title);
      formData.append('applicant_name', form.name);
      formData.append('applicant_email', form.email);
      formData.append('cover_letter', form.message || '');
      formData.append('phone', form.phone || '');
      if (form.resume) formData.append('resume', form.resume);

      // Submit via API helper
      await applicationsApi.submitPublic(formData);

      {
        setShowSuccessMessage(true);
        setForm({ name: '', phone: '', email: '', message: '', resume: null });
        setAttachments([]);
        setTimeout(() => { setShowSuccessMessage(false); setIsModalOpen(false); }, 3000);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'SET_FILTERS', payload: { ...state.filters, [name]: value } });
  };

  const handleShowMore = () => dispatch({ type: 'SHOW_MORE' });
  const handleResetFilters = () => dispatch({ type: 'RESET_FILTERS' });
  const handleApply = () => { setIsDetailsModalOpen(false); setIsModalOpen(true); };
  const handleViewDetails = (jobData: any) => { setSelectedJob(jobData); setIsDetailsModalOpen(true); };
  const handleModalClose = () => { setIsDetailsModalOpen(false); setSelectedJob(null); };

  return (
    <div className="min-h-screen flex flex-col">
      <FlipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={selectedJob?.title || 'Job Application'}
        companyName={selectedJob?.company || ''}
      >
        <div className="w-full" id="job-application-form">
          {showSuccessMessage ? (
            <div className="text-center py-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-4">
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Application Submitted Successfully!</h3>
                <p className="text-green-700 mb-4">Thank you for applying to <strong>{selectedJob?.title}</strong> at <strong>{selectedJob?.company}</strong>.</p>
                <p className="text-green-600 text-sm">We've sent a confirmation email to <strong>{form.email}</strong>. Our team will review your application and get back to you soon.</p>
              </div>
              <div className="text-sm text-gray-500">This modal will close automatically in a few seconds...</div>
            </div>
          ) : (
            <>
              <h1 className="text-4xl md:text-5xl font-bold text-red-800 text-center mb-8">WE ARE HIRING!</h1>
              <h2 className="text-2xl md:text-2xl text-black text-center mb-10">Join Our Team</h2>
              <p className="text-red-600 bg-neutral-100 rounded px-4 py-2 text-center mb-8">
                If you're interested in one of our open positions, start by applying here and attaching your resume.
              </p>
              <form onSubmit={handleSubmit} className="bg-white rounded-lg p-0 md:p-0 flex flex-col gap-4">
                <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full bg-gray-100 text-black px-4 py-3 rounded-none border-0 focus:ring-2 focus:ring-red-500 outline-none placeholder-gray-500" autoComplete="name" />
                <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full bg-gray-100 text-black px-4 py-3 rounded-none border-0 focus:ring-2 focus:ring-red-500 outline-none placeholder-gray-500" autoComplete="tel" />
                <input type="email" name="email" placeholder="Email*" value={form.email} onChange={handleChange} required className="w-full bg-gray-100 text-black px-4 py-3 rounded-none border-0 focus:ring-2 focus:ring-red-500 outline-none placeholder-gray-500" autoComplete="email" />
                <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} rows={5} className="w-full bg-gray-100 text-black px-4 py-3 rounded-none border-0 focus:ring-2 focus:ring-red-500 outline-none placeholder-gray-500 resize-y" />
                <div className="flex items-center justify-between mt-2">
                  <label className="flex items-center text-gray-700 cursor-pointer">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828M7 7h.01" /></svg>
                    Attach Resume
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
                  </label>
                  <span className="text-gray-500 text-sm">Attachments ({attachments.length})</span>
                </div>
                <div className="mt-6 flex flex-col items-center">
                  <button type="submit" disabled={isSubmitting} className={`font-semibold px-8 py-3 rounded shadow transition-colors w-full max-w-xs ${isSubmitting ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-red-700 text-white hover:bg-red-800'}`}>{isSubmitting ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}</button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="mt-2 text-red-600 hover:underline" disabled={isSubmitting}>Cancel</button>
                  <p className="text-xs text-zinc-600 text-center mt-4">
                    This site is protected by reCAPTCHA and the Google <a href="https://policies.google.com/privacy" className="underline hover:text-red-600">Privacy Policy</a> and <a href="https://policies.google.com/terms" className="underline hover:text-red-600">Terms of Service</a> apply.
                  </p>
                </div>
              </form>
            </>
          )}
        </div>
      </FlipModal>

      {selectedJob && (
        <JobDetailsModal isOpen={isDetailsModalOpen} onClose={handleModalClose} job={selectedJob} onApply={handleApply} />
      )}

      <section className="job-seekers-directory w-full mt-16">
        <div className="directory-hero bg-red-50 py-10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-4">Job Seekers</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Welcome to the Job Seekers section of PathMatch! - where your career journey begins. We're dedicated to transforming your job search into career success.
            </p>
            <div className="cta-buttons flex flex-col sm:flex-row justify-center gap-4">
              <div className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">Browse Jobs</div>
              <button onClick={() => setIsModalOpen(true)} className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">Apply Here</button>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 py-8 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 md:gap-6 items-center">
            <div className="flex-1 w-full">
              <div className="relative">
                <input type="text" name="search" value={state.filters.search} onChange={handleFilterChange} placeholder="Search jobs or companies..." className="w-full rounded-lg border border-red-200 bg-white py-3 pl-10 pr-4 text-gray-700 focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-colors" />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></span>
              </div>
            </div>
            <select name="location" value={state.filters.location} onChange={handleFilterChange} className="w-full md:w-56 rounded-lg border border-gray-200 bg-white py-3 px-4 text-gray-700 focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-colors">
              <option value="">Location</option>
              {allLocations.map(loc => (<option key={loc} value={loc}>{loc}</option>))}
            </select>
            <select name="jobType" value={state.filters.jobType} onChange={handleFilterChange} className="w-full md:w-56 rounded-lg border border-gray-200 bg-white py-3 px-4 text-gray-700 focus:ring-2 focus:ring-red-200 focus:border-red-400 transition-colors">
              <option value="">Job Type</option>
              {allJobTypes.map(type => (<option key={type} value={type}>{type}</option>))}
            </select>
          </div>
          <div className="max-w-7xl mx-auto mt-4 text-gray-500 text-base">Showing {state.filteredJobs.length} jobs</div>
        </div>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}>
              {state.visibleJobs.map((job: any, index: number) => (
                <motion.div key={index} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                  <JobCard title={job.title} company={job.company} jobType={job.jobType} location={job.location} salaryRange={job.salaryRange} description={job.description} requiredSkills={job.requiredSkills} postedTime={job.postedTime} onApply={() => { setSelectedJob(job); setIsModalOpen(true); }} onViewDetails={() => handleViewDetails(job)} />
                </motion.div>
              ))}
            </motion.div>
            {state.visibleJobs.length < state.filteredJobs.length && (
              <div className="text-center mt-12">
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors" onClick={handleShowMore}>View More <span className="ml-2">→</span></button>
              </div>
            )}
          </div>
        </section>

        <div className="why-section py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-black mb-12">Why Job Seekers Choose PathMatch</h2>
            <div className="benefits-grid justify-center grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="benefit-card text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300"><div className="icon mx-auto mb-4 text-4xl text-blue-500">🔍</div><h3 className="text-xl font-semibold mb-2 ">Smart Job Matching</h3><p className="text-gray-600">Our AI matches you to roles that fit your skills and goals - no more endless scrolling.</p></div>
              <div className="benefit-card text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300"><div className="icon mx-auto mb-4 text-4xl text-blue-500">📚</div><h3 className="text-xl font-semibold mb-2">Career Development</h3><p className="text-gray-600">Access courses, certifications, and resources to advance your skills.</p></div>
              <div className="benefit-card text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300"><div className="icon mx-auto mb-4 text-4xl text-blue-500">🤝</div><h3 className="text-xl font-semibold mb-2">Personalized Support</h3><p className="text-gray-600">Get resume reviews, interview prep, and 1:1 coaching from experts.</p></div>
              <div className="benefit-card text-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-all duration-300"><div className="icon mx-auto mb-4 text-4xl text-blue-500">🌐</div><h3 className="text-xl font-semibold mb-2">Networking Events</h3><p className="text-gray-600">Connect with employers at virtual job fairs and industry meetups.</p></div>
            </div>
            <div className="flex justify-center mt-8">
              <button type="button" className="bg-black text-white font-semibold px-10 py-3 rounded shadow hover:bg-red-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-red-500" onClick={() => { const el = document.getElementById('job-application-form'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>FIND OUT MORE</button>
            </div>
          </div>
        </div>

        <div className="how-it-works py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-black mb-12">Your Path to Success</h2>
            <div className="steps flex flex-col md:flex-row justify-between items-center">
              <div className="step text-center mb-8 md:mb-0"><div className="step-number bg-red-500 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4 text-lg font-semibold">1</div><h3 className="text-xl font-semibold mb-2">Submit Your Resume</h3><p className="max-w-xs text-zinc-600">Send your resume to potential employers and get hired</p></div>
              <div className="hidden md:block text-3xl text-black">→</div>
              <div className="step text-center mb-8 md:mb-0"><div className="step-number bg-red-500 text-white rounded-full h-12 w-12 flex items-center justify-center mx:auto mb-4 text-lg font-semibold">2</div><h3 className="text-xl font-semibold mb-2">Get Matched</h3><p className="max-w-xs text-zinc-600">Receive personalized job recommendations</p></div>
              <div className="hidden md:block text-3xl text-red-500">→</div>
              <div className="step text-center"><div className="step-number bg-red-500 text-white rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4 text-lg font-semibold">3</div><h3 className="text-xl font-semibold mb-2">Land Your Role</h3><p className="max-w-xs text-zinc-600">Apply with our support and start your new career</p></div>
            </div>
          </div>
        </div>

        <div className="final-cta py-16 bg-red-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of job seekers who found their dream roles through PathMatch</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link to="/auth" className="bg-white text-red-500 px-6 py-3 rounded-lg hover:text-white font-semibold hover:bg-red-800 transition-colors">Get Started - It's Free</Link>
              <button type="button" className="bg-transparent text-white px-6 py-3 rounded-lg font-semibold border border-white hover:bg-white hover:text-red-800 transition-colors" onClick={() => { const el = document.getElementById('job-application-form'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>Schedule a Meet</button>
            </div>
            <div className="stats flex flex-col sm:flex-row justify-center gap-8">
              <div className="stat"><p className="text-4xl font-bold">92%</p><p className="text-blue-200">Job match success rate</p></div>
              <div className="stat"><p className="text-4xl font-bold">24h</p><p className="text-blue-200">Avg. first interview time</p></div>
              <div className="stat"><p className="text-4xl font-bold">10k+</p><p className="text-blue-200">Careers launched</p></div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default JobSeekers;