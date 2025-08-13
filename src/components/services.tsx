import React from "react";
import { Link } from "react-router-dom";

const IconSearch: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IconUsers: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 11-8 0 4 4 0 018 0zm6 4v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6a2 2 0 012-2h12a2 2 0 012 2z" />
  </svg>
);

const IconOffice: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const IconMarket: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const IconContract: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
);

const IconCareer: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0H8m8 0a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
  </svg>
);


export interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  learnMoreLink: string;
}

export const ServiceItem: React.FC<ServiceItem> = ({ icon, title, description, features, learnMoreLink }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="mb-4 space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <Link to={learnMoreLink} className="text-red-600 hover:text-red-800 font-medium inline-flex items-center">
        Learn more
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};

export const services: ServiceItem[] = [
  {
    icon: <IconSearch />,
    title: "Executive Search",
    description: "Finding C-level executives and senior management professionals for leadership roles.",
    features: ["Executive headhunting", "Leadership assessment", "Succession planning"],
    learnMoreLink: "/job-seekers",
  },
  {
    icon: <IconUsers />,
    title: "Permanent Placement",
    description: "Full-time permanent positions across all industries and experience levels.",
    features: ["Skills matching", "Cultural fit assessment", "Career guidance"],
    learnMoreLink: "/job-seekers",
  },
  {
    icon: <IconOffice />,
    title: "Corporate Solutions",
    description: "Comprehensive recruitment solutions for businesses of all sizes.",
    features: ["Volume recruitment", "Onboarding support", "Retention strategies"],
    learnMoreLink: "/job-seekers",
  },
  {
    icon: <IconMarket />,
    title: "Market Intelligence",
    description: "Data-driven insights into salary trends, market conditions, and talent availability.",
    features: ["Salary benchmarking", "Market analysis", "Talent mapping"],
    learnMoreLink: "/job-seekers",
  },
  {
    icon: <IconContract />,
    title: "Contract Staffing",
    description: "Flexible staffing solutions for project-based and temporary assignments.",
    features: ["Project staffing", "Interim management", "Flexible contracts"],
    learnMoreLink: "/job-seekers",
  },
  {
    icon: <IconCareer />,
    title: "Career Consulting",
    description: "Professional career development and coaching services for job seekers.",
    features: ["Resume optimization", "Interview coaching", "Career planning"],
    learnMoreLink: "/job-seekers",
  },
];