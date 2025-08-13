import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import { hire1, hire2, hire3, hire4, hire5, hire6, hire7, hire8, hire9 } from '../assets/images';

interface HiringInfoItem {
  title: string;
  description: string;
  image: string;
}

interface TabSection {
  id: string;
  label: string;
  title: string;
  items: HiringInfoItem[];
}

const HiringInfoSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('attract-talent');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const tabSections: TabSection[] = [
    {
      id: 'attract-talent',
      label: 'Help me attract talent',
      title: 'Attract Top Talent to Your Organization',
      items: [
        {
          title: "Write a standout job description",
          description: "Posting a job on PathMatch is simple. With the help of job description templates and the addition of screener questions, your posts can appeal to more quality candidates so you're connecting with those who meet your most important job criteria.",
          image: hire1
        },
        {
          title: "Boost visibility for your roles",
          description: "If you want a larger number of applicants, sponsor your job to give it better visibility. As thousands of jobs are added to PathMatch each day, free job postings lose visibility over time. Sponsoring your job by adding a daily or monthly budget ensures it appears more often and for longer in search results.",
          image: hire2
        },
        {
          title: "Showcase your company",
          description: "Positive employer branding helps businesses attract, engage, and hire the right employees. It can also help you fill positions faster, more effectively, and set you apart from your competitors. We can help you get started by putting your jobs and employee experience in front of the right potential candidates.",
          image: hire3
        }
      ]
    },
    {
      id: 'connect-candidates',
      label: 'Help me connect with candidates',
      title: 'Make Meaningful Connections on One Platform',
      items: [
        {
          title: "Surface the right people",
          description: "A Smart Sourcing subscription helps you connect with matched candidates from a talent pool of millions of active job seekers, not those just looking to network.",
          image: hire4
        },
        {
          title: "Evaluate with the screening tools",
          description: "Pre-made screener questions can help you evaluate certain skills and filter out unqualified candidates so you're connecting with those who meet your most important job criteria.",
          image: hire5
        },
        {
          title: "Schedule and conduct interviews",
          description: "Interviewing on PathMatch is unique because it's built specifically for candidate management. The same platform where you're posting your jobs, setting your criteria for hiring, and reviewing resumes is where you can engage in a conversation with a candidate. Since everything happens in one place, it's easier to keep track of where candidates are in the process.",
          image: hire6
        }
      ]
    },
    {
      id: 'streamline-process',
      label: 'Help me streamline the process',
      title: 'Spend More Time on What Matters Most',
      items: [
        {
          title: "Integrate your ATS",
          description: "Automate data transfer between your Applicant Tracking System (ATS) and PathMatch. ATS Sync seamlessly transfers job and candidate data between PathMatch and your ATS to make hiring faster and easier. Spend less time going back and forth between systems and more time hiring.",
          image: hire7
        },
        {
          title: "Optimize your recruiting performance",
          description: "Gain an in-depth understanding of your local market and the roles you're hiring for with PathMatch Hiring Insights. These easy-to-use reports provide data-driven insight into local job market conditions to help you create job descriptions and other content designed to get results.",
          image: hire8
        },
        {
          title: "Host a hiring event",
          description: "In-person and virtual hiring events are like a personal job fair for your company with dedicated days for interviewing. PathMatch Hiring Events are our all-in-one hiring event solution with built-in talent attraction and recruitment automation.",
          image: hire9
        }
      ]
    }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setActiveAccordion(null); // Reset accordion when switching tabs
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const activeSection = tabSections.find(section => section.id === activeTab);

  return (
    <div className="w-full max-w-6xl mx-auto py-12">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8">
          Everything you need for end-to-end hiring
        </h2>
        
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 px-4">
          {tabSections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleTabClick(section.id)}
              className={`px-4 py-3 text-sm md:text-base font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 ${
                activeTab === section.id
                  ? 'bg-red-600 text-white shadow-lg border-1 border-red-600'
                  : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-red-300 hover:text-red-700 hover:bg-red-50'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Active Section Title */}
        {activeSection && (
          <div className="text-center mb-8">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
              {activeSection.title}
            </h3>
            <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
          </div>
        )}
      </div>

      {/* Tab Content */}
      {activeSection && (
        <div className="space-y-4">
          {activeSection.items.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white">
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset group"
                aria-expanded={activeAccordion === index}
                aria-controls={`accordion-content-${index}`}
              >
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-red-700 transition-colors duration-200">
                  {item.title}
                </h4>
                <div className={`transform transition-transform duration-300 ${activeAccordion === index ? 'rotate-180' : ''}`}>
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Accordion Content */}
              <div
                id={`accordion-content-${index}`}
                className={`transition-all duration-300 ease-in-out ${
                  activeAccordion === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}
              >
                <div className="px-6 py-6 bg-gradient-to-r from-gray-50 to-red-50 border-t border-gray-200">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed text-base lg:text-lg">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="relative group">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-56 h-36 object-cover rounded-xl shadow-lg border-2 border-white group-hover:shadow-xl transition-shadow duration-300"
                        />
                        <div className="absolute inset-0 bg-red-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Call to Action */}
      <div className="text-center mt-12">
        <Link to = "/job-seekers" className="bg-red-600 text-white px-10 py-4 rounded-xl font-semibold hover:bg-red-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
          Start connecting with candidates →
        </Link>
      </div>
    </div>
  );
};

export default HiringInfoSection;