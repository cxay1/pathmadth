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
      title: "Surface the right people",
      description: "A Smart Sourcing subscription helps you connect with matched candidates from a talent pool of millions of active job seekers, not those just looking to network.",
      image: hire1
    },
    {
      title: "Evaluate with the screening tools",
      description: "Pre-made screener questions can help you evaluate certain skills and filter out unqualified candidates so you're connecting with those who meet your most important job criteria.",
      image: hire2
    },
    {
      title: "Schedule and conduct interviews",
      description: "Interviewing on PathMatch is unique because it's built specifically for candidate management. The same platform where you're posting your jobs, setting your criteria for hiring, and reviewing resumes is where you can engage in a conversation with a candidate. Since everything happens in one place, it's easier to keep track of where candidates are in the process.",
      image: hire3
    },
    {
      title: "Integrate your ATS",
      description: "Automate data transfer between your Applicant Tracking System (ATS) and PathMatch. ATS Sync seamlessly transfers job and candidate data between PathMatch and your ATS to make hiring faster and easier. Spend less time going back and forth between systems and more time hiring.",
      image: hire1
    },
    {
      title: "Optimize your recruiting performance",
      description: "Gain an in-depth understanding of your local market and the roles you're hiring for with PathMatch Hiring Insights. These easy-to-use reports provide data-driven insight into local job market conditions to help you create job descriptions and other content designed to get results.",
      image: hire2
    },
    {
      title: "Host a hiring event",
      description: "In-person and virtual hiring events are like a personal job fair for your company with dedicated days for interviewing. PathMatch Hiring Events are our all-in-one hiring event solution with built-in talent attraction and recruitment automation.",
      image: hire3
    }
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
          Everything you need for end-to-end hiring
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-gray-600 mb-8 px-4">
          <span className="border-b-2 border-transparent hover:border-red-500 cursor-pointer transition-colors duration-200 pb-1">
            Help me attract talent
          </span>
          <span className="border-b-2 border-red-500 font-semibold text-red-600 pb-1">
            Help me connect with candidates
          </span>
          <span className="border-b-2 border-transparent hover:border-red-500 cursor-pointer transition-colors duration-200 pb-1">
            Help me streamline the process
          </span>
        </div>
        <p className="text-center text-gray-700 text-lg mb-4">
          Make meaningful connections on one platform
        </p>
      </div>

      <div className="space-y-3">
        {hiringInfo.map((item, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full px-6 py-5 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset group"
              aria-expanded={activeIndex === index}
              aria-controls={`accordion-content-${index}`}
            >
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                {item.title}
              </h3>
              <div className={`transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="px-6 py-6 bg-gray-50 border-t border-gray-200">
                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                  <div className="flex-1">
                    <p className="text-gray-700 leading-relaxed text-base">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-48 h-32 object-cover rounded-lg shadow-md border border-gray-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 shadow-lg hover:shadow-xl">
          Start connecting with candidates →
        </button>
      </div>
    </div>
  );
};

export default HiringInfoSection;