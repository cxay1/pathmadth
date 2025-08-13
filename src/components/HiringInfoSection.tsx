import React, { useState } from 'react';
import { hire1, hire2, hire3 } from '../assets/images';

interface HiringInfoItem {
  title: string;
  description: string;
  image: string;
}

const HiringInfoSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const hiringInfo: HiringInfoItem[] = [
    {
      title: "Write a standout job description",
      description: "Posting a job on Pathmatch is simple. With the help of job description templates and the addition of screener questions, your posts can appeal to more quality candidates so you're connecting with those who meet your most important job criteria.",
      image: hire1
    },
    {
      title: "Boost visibility for your roles",
      description: "If you want a larger number of applicants, sponsor your job to give it better visibility. As thousands of jobs are added to Pathmatch each day, free job postings lose visibility over time. Sponsoring your job by adding a daily or monthly budget ensures it appears more often and for longer in search results.",
      image: hire2
    },
    {
      title: "Showcase your company",
      description: "Positive employer branding helps businesses attract, engage, and hire the right employees. It can also help you fill positions faster, more effectively, and set you apart from your competitors. We can help you get started by putting your jobs and employee experience in front of the right potential candidates.",
      image: hire3
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
          Everything you need for end-to-end hiring
        </h2>
        <div className="flex justify-center space-x-8 text-sm text-gray-600 mb-8">
          <span className="border-b-2 border-transparent hover:border-red-500 cursor-pointer">Help me attract talent</span>
          <span className="border-b-2 border-red-500 font-semibold">Help me connect with candidates</span>
          <span className="border-b-2 border-transparent hover:border-red-500 cursor-pointer">Help me streamline the process</span>
        </div>
        <p className="text-center text-gray-700 mb-12">
          Make meaningful connections on one platform
        </p>
      </div>

      <div className="space-y-4">
        {hiringInfo.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset"
              aria-expanded={activeIndex === index}
              aria-controls={`accordion-content-${index}`}
            >
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <div className={`transform transition-transform duration-200 ${activeIndex === index ? 'rotate-180' : ''}`}>
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>

            {/* Accordion Content */}
            <div
              id={`accordion-content-${index}`}
              className={`transition-all duration-300 ease-in-out ${
                activeIndex === index 
                  ? 'max-h-96 opacity-100' 
                  : 'max-h-0 opacity-0 overflow-hidden'
              }`}
            >
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-48 h-32 object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
          Start connecting with candidates →
        </button>
      </div>
    </div>
  );
};

export default HiringInfoSection;