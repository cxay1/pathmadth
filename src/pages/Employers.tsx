import React from 'react';
import { videoSrc } from '../assets/images';
import EmployerServices from '../components/EmployerServices';
import JobSeekerServices from '../components/JobSeekerServices';
import HiringInfoSection from '../components/HiringInfoSection';
import Footer from '../components/Footer';
import {Link} from "react-router-dom";

const Employers: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-4xl mx-auto py-2 flex-1 pt-24">
        {/* Hero Section */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-500 text-center mb-4">Welcome To The Employers Section Of PathMatch!</h1>
        <p className="text-lg text-zinc-800 text-center mb-10">
          We understand that finding the right talent is crucial to the success of your organization. At PathMatch, we are dedicated to providing businesses with customized recruitment solutions that connect you with top-tier candidates who fit your unique needs.
        </p>
        <div className="cta-buttons flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <Link
            to="/job-seekers"
            className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 text-center"
            role="button"
            tabIndex={0}
          >
            Browse Jobs
          </Link>
            <Link
              to="/auth"
              className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold border border-red-500 hover:bg-red-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              role="button"
              tabIndex={0}
            >
              Create Profile
            </Link>
        </div>

        {/* Video Section */}
        <div className="flex justify-center items-center w-full bg-black py-8 mb-10">
          <video
            src={videoSrc}
            controls
            className="mx-auto rounded-lg shadow-lg w-full max-w-3xl bg-black"
            poster=""
            aria-label="PathMatch Introduction Video"
          />
        </div>

        

        {/* Get Started Section */}
        <h2 className="text-2xl font-bold text-black mb-4">Get Started</h2>
        <ul className="list-disc list-inside text-gray-700 mb-10 space-y-2">
          <li>
            <span className="font-semibold">Submit a Job Opening:</span> Fill out our easy-to-use form to post your job vacancies directly on our platform. <Link to="/job-seekers" className="text-blue-600 underline hover:text-blue-800">Job Submission Form</Link>
          </li>
          <li>
            <span className="font-semibold">Contact Us for a Personalized Consultation:</span> Our team is here to discuss your hiring needs and explore how we can assist you in achieving your talent acquisition goals. <Link to="#contact" className="text-blue-600 underline hover:text-blue-800">Contact Us</Link>
          </li>
          <li>
            <span className="font-semibold">Explore Our Success Stories:</span> Learn how we’ve helped other companies build strong teams and meet their HR challenges. <Link to="#success-stories" className="text-blue-600 underline hover:text-blue-800">Success Stories</Link>
          </li>
        </ul>

        <div className="flex justify-center mt-8">
          <button
            type="button"
            className="bg-black text-white font-semibold px-10 py-3 rounded shadow hover:bg-red-200 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={() => {
              const form = document.getElementById('employer-form-section');
              if (form) form.scrollIntoView({ behavior: 'smooth' });
              else window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            FIND OUT MORE
          </button>
        </div>

        {/* Hiring Information Section */}
        <HiringInfoSection />

        {/* Employer Services Section */}
        <EmployerServices />
        {/* Job Seeker Services Section */}
        <JobSeekerServices />
      </div>
      <Footer /> 
    </div>
  );
};

export default Employers; 