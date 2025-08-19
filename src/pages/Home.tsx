import { Link } from 'react-router-dom'
import { people, team } from '../assets/images';
import QuoteBanner from '../components/QuoteBanner';
import { motion } from 'framer-motion';
import React from 'react';
import Footer from '../components/Footer';
import { services, ServiceItem } from "../components/services";
import { processSteps, ProcessCard } from "../components/processSteps";

// FAQ data
const faqs = [
  {
    question: 'What are the benefits of using PathMatch for job search?',
    answer:
      'Using PathMatch for job search can provide you access to a larger network of job opportunities, career advice, and guidance on improving your resume and cover letter.',
  },
  {
    question: 'Does PathMatch offer internships for college students?',
    answer:
      'Yes, we offer internships for college students in various industries to help them gain valuable work experience and build their professional network.',
  },
  {
    question: 'How long does it take for PM", "CRM Data AnathMatch to respond to job applications?',
    answer:
      'We typically respond to job applications within 2-3 business days and will notify you if you are selected for an interview.',
  },
];

// Reusable StatCard component
function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center px-4">
      <div className="text-yellow-400 text-4xl mb-2">{icon}</div>
      <div className="text-2xl md:text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-white text-base opacity-80 text-center">{label}</div>
    </div>
  );
}

const Home = () => {
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] flex flex-col justify-center items-center overflow-hidden">
        {/* Background image */}
        <img
          src={people}
          alt="People background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Red overlay */}
        <div className="absolute inset-0 bg-red-900 bg-opacity-80 z-10" />
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full px-4 py-24 md:py-32">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold text-white text-center leading-tight mb-6"
          >
            Connect Top <span className="text-red-600">Talent</span> with<br className="hidden md:block" /> Leading Companies
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-2xl text-white text-center max-w-2xl mb-8"
          >
            Where talent meets opportunity. We deliver strategic recruitment solutions that drive career success and business performance—partnering with professionals and employers to achieve transformative outcomes.
          </motion.p>
          <motion.div className="flex flex-col sm:flex-row gap-4 mb-12" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Link
          to="/job-seekers"
              className="bg-red-500  hover:bgt-red-600 text-white font-bold px-8 py-4 rounded-lg shadow transition-colors text-lg flex items-center justify-center"
            >
              Find Your Dream Job <span className="ml-2">→</span>
            </Link>
            <Link
              to="/auth"
              className="bg-gray-100 bg-opacity-90 hover:bg-white text-red-700 font-bold px-8 py-4 rounded-lg shadow transition-colors text-lg flex items-center justify-center"
            >
              Hire Top Talent
        </Link>
          </motion.div>
          {/* Stats Row */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-8 w-full max-w-3xl justify-center">
            <StatCard
              icon={<svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 11-8 0 4 4 0 018 0zm6 4v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h12a2 2 0 012 2z" /></svg>}
              value="5,000+"
              label="Candidates Placed"
            />
            <StatCard
              icon={<svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a1 1 0 001 1h3m10-5h3a1 1 0 011 1v4a1 1 0 01-1 1h-3m-4 4v4m0 0H7a2 2 0 01-2-2v-4a2 2 0 012-2h10a2 2 0 012 2v4a2 2 0 01-2 2h-5z" /></svg>}
              value="500+"
              label="Partner Companies"
            />
            <StatCard
              icon={<svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v4h-1m-4 0h-1v-4H7m4 0h-1v4h-1m4 0h-1v4h-1m-4 0h-1v-4H7" /></svg>}
              value="95%"
              label="Success Rate"
            />
      </div>
        </div>
      </section>

      {/* Trusted Partner Section */}
      <section className="w-full bg-[#f7f9fb] py-20 px-4 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
        {/* Left: Text */}
        <div className="flex-1 max-w-xl">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Your Trusted Partner in <span className="text-red-600">Career Success</span>
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            With over a decade of experience in the recruitment industry, we've built our reputation on one simple principle: connecting the right people with the right opportunities. Our dedicated team of recruitment specialists understands that every career move is personal, and every hire is critical to business success.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            We don't just fill positions – we build lasting relationships. Our comprehensive approach combines deep industry knowledge, cutting-edge technology, and genuine care for both candidates and clients.
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center text-gray-700 text-base"><svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>15+ years of industry expertise</li>
            <li className="flex items-center text-gray-700 text-base"><svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Global network of top professionals</li>
            <li className="flex items-center text-gray-700 text-base"><svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Proven track record of success</li>
            <li className="flex items-center text-gray-700 text-base"><svg className="w-6 h-6 text-red-600 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>Personalized approach to every placement</li>
          </ul>
          <Link to="/about-us" className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg shadow transition-colors text-base">
            Learn More About Us <span className="ml-2">→</span>
          </Link>
        </div>
        {/* Right: Image with floating card */}
        <div className="flex-1 flex items-center justify-center relative max-w-xl w-full">
          <img src={team} alt="Our Team" className="rounded-3xl shadow-xl w-full h-auto object-cover" style={{maxHeight: 380}} />
          {/* Floating card */}
          <div className="absolute bottom-[-32px] left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-lg px-8 py-6 flex flex-col items-center border border-gray-100" style={{minWidth: 180}}>
            <span className="text-3xl font-extrabold text-red-600 mb-1">98%</span>
            <span className="text-gray-700 text-base font-medium">Client Satisfaction</span>
          </div>
        </div>
      </section>


      {/* Our Comprehensive Services Section */}
      <section className="w-full py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
              Our Comprehensive Services
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              From executive search to career consulting, we provide end-to-end recruitment solutions tailored to your specific needs.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <ServiceItem
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={service.features}
                learnMoreLink={service.learnMoreLink}
              />
            ))}
          </div>

          {/* Explore All Services Button */}
          <div className="text-center">
            <Link to="/job-seekers" className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors text-lg">
              Explore All Jobs <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Proven Process Section */}
      <section className="relative w-full py-20 px-4">
        {/* Team photo background with red overlay */}
        <img
          src={team}
          alt="Team background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-red-900 bg-opacity-80 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-6">
              Our Proven Process
            </h2>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              From initial consultation to successful placement, we follow a structured approach that ensures the best outcomes for both candidates and employers.
            </p>
          </div>

          {/* Process Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <ProcessCard
                  stepNumber={step.stepNumber}
                  icon={step.icon}
                  title={step.title}
                  description={step.description}
                  iconBgColor={step.iconBgColor}
                  iconColor={step.iconColor}
                />
                {/* Arrow between cards (hidden on mobile) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
        </div>

          {/* Call to Action */}
          <div className="text-center">
            <p className="text-lg text-gray-100 mb-8">
              Ready to experience our personalized approach?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors text-lg">
                Start Your Journey <span className="ml-2">→</span>
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors text-lg border-2 border-gray-200 hover:border-red-300">
                Learn More
              </button>
        </div>
      </div>
        </div>
      </section>

      
        <QuoteBanner />
        <section className="w-full bg-red-800 py-12 px-4 flex flex-col items-center">
        <form
          className="w-full max-w-4xl flex flex-col items-center mb-4"
          onSubmit={e => { e.preventDefault(); }}
        >
          <label htmlFor="newsletter-email" className="text-white text-xl font-medium mb-2 w-full text-left">
            Subscribe
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="Email"
              className="w-full bg-white text-red-600 px-4 py-3 rounded-md border-0 focus:ring-2 focus:ring-red-500 outline-none placeholder-gray-400 mb-4"
            autoComplete="email"
          />
          <button
            type="submit"
            className="w-full bg-gray-100 text-black font-semibold px-9 py-3 rounded-md hover:bg-gray-200 transition-colors"
          >
            SIGN UP
          </button>
        </form>
        <p className="text-gray-300 text-sm text-center mt-2">Get 10% off your first purchase when you sign up for our newsletter!</p>
      </section>
      {/* Footer Section */}
      <Footer />
    </div>
  )
}

export default Home 