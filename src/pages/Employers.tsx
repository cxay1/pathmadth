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
              to="/signup"
              className="bg-white text-red-500 px-6 py-3 rounded-lg font-semibold border border-red-500 hover:bg-red-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
              role="button"
              tabIndex={0}
            >
              Create Profile
            </Link>
        </div>

        {/* Video Section */}
        <div className="w-full bg-black py-8 mb-10 rounded-lg">
          <div className="relative w-full aspect-video max-w-6xl mx-auto px-4">
            <video
              src={videoSrc}
              controls
              className="absolute inset-0 w-full h-full rounded-lg shadow-2xl object-cover"
              poster=""
              aria-label="PathMatch Introduction Video"
            />
          </div>
        </div>

        {/* Why Partner Section */}
        <h2 className="text-2xl font-bold text-black mb-4">Why Partner with PathMatch?</h2>
        <p className="text-gray-700 ml-8">
          At PathMatch, we recognize the challenges of navigating the competitive job market and the importance of building strong teams. Our tailored approach ensures that you not only find candidates with the right skills but also those who align with your company’s culture and goals. Here’s how we can support your hiring process:
        </p>

        <div className="space-y-8 mb-12">
          {/* 1. Tailored Recruitment Solutions */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">1. Tailored Recruitment Solutions</h3>
            <p className="text-gray-700">
              We don’t believe in one-size-fits-all. Our team takes the time to understand your specific hiring needs, crafting customized recruitment strategies that resonate with your organizational objectives. Whether you need to fill temporary roles or seek full-time talent, we have the solutions to meet your requirements.
            </p>
          </div>
          {/* 2. Access to a Diverse Talent Pool */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">2. Access to a Diverse Talent Pool</h3>
            <p className="text-gray-700">
              With our extensive network and broad reach, we provide access to a diverse range of candidates across various industries. We believe that diverse teams drive innovation and success, so we focus on finding talent from different backgrounds and experiences.
            </p>
          </div>
          {/* 3. Streamlined Hiring Process */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">3. Streamlined Hiring Process</h3>
            <p className="text-gray-700">
              Our expertise in recruitment allows us to manage the entire process efficiently—from sourcing candidates and conducting initial screenings to coordinating interviews and providing you with feedback. This means you can focus on what you do best: running your business.
            </p>
          </div>
          {/* 4. Comprehensive Candidate Assessments */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">4. Comprehensive Candidate Assessments</h3>
            <p className="text-gray-700">
              We utilize proven assessment tools and interview techniques to evaluate candidates thoroughly. Our detailed evaluations ensure that you receive only the most qualified individuals who meet your criteria and can contribute effectively to your team.
            </p>
          </div>
          {/* 5. Employer Branding Support */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">5. Employer Branding Support</h3>
            <p className="text-gray-700">
              At PathMatch, we understand that attracting top talent requires a strong employer brand. We work with you to enhance your job postings and showcase your company culture, values, and benefits to make your opportunities more appealing to candidates.
            </p>
          </div>
          {/* 6. Ongoing Support and Consultation */}
          <div>
            <h3 className="text-xl font-semibold text-black mb-2">6. Ongoing Support and Consultation</h3>
            <p className="text-gray-700">
              Our partnership doesn’t end once the position is filled. We provide ongoing support to help you integrate new hires into your team successfully and offer consultation on workforce planning and employee engagement strategies.
            </p>
          </div>
        </div>

        {/* Get Started Section */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-8">
            Get Started Today
          </h2>
          <p className="text-lg text-gray-600 text-center mb-10 max-w-3xl mx-auto">
            Ready to transform your hiring process? Choose the option that best fits your needs and let's build your dream team together.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Submit Job Opening Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-red-300 group">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4 group-hover:bg-red-200 transition-colors">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Submit a Job Opening</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Fill out our easy-to-use form to post your job vacancies directly on our platform and reach qualified candidates instantly.
              </p>
              <Link 
                to="/job-seekers" 
                className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 group"
              >
                Job Submission Form
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            {/* Consultation Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-red-300 group">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4 group-hover:bg-red-200 transition-colors">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Personalized Consultation</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our team is here to discuss your hiring needs and explore how we can assist you in achieving your talent acquisition goals.
              </p>
              <Link 
                to="#contact" 
                className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 group"
              >
                Contact Us
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>

            {/* Success Stories Card */}
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-red-300 group">
              <div className="flex items-center mb-4">
                <div className="bg-red-100 p-3 rounded-full mr-4 group-hover:bg-red-200 transition-colors">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Success Stories</h3>
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Learn how we've helped other companies build strong teams and meet their HR challenges with proven results.
              </p>
              <Link 
                to="#success-stories" 
                className="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 group"
              >
                Success Stories
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-red-600 font-semibold text-lg mb-4">
              🚀 Ready to revolutionize your hiring process?
            </p>
            <p className="text-gray-600 text-sm">
              Join hundreds of companies that trust PathMatch for their recruitment needs
            </p>
          </div>
        </div>

        <div className="flex justify-center mt-8 mb-12">
          <button
            type="button"
            className="bg-red-600 text-white font-bold px-12 py-4 rounded-lg shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform hover:scale-105"
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