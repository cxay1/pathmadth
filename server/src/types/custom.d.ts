import { Database } from 'supabase-js';

export type JobType = 'full_time' | 'part_time' | 'contract' | 'internship' | 'remote';
export type ApplicationStatus = 'submitted' | 'reviewed' | 'interviewing' | 'offered' | 'rejected' | 'withdrawn';

// Extend the Database interface with your custom types
declare module '@supabase/supabase-js' {
  export interface Database {
    public: {
      Tables: {
        profiles: {
          Row: {
            id: string;
            user_id: string;
            role: 'job_seeker' | 'employer' | 'admin';
            first_name: string | null;
            last_name: string | null;
            avatar_url: string | null;
            created_at: string;
            updated_at: string;
          };
        };
        job_seekers: {
          Row: {
            id: string;
            headline: string | null;
            summary: string | null;
            education: any[] | null;
            experience: any[] | null;
            skills: string[] | null;
            resume_url: string | null;
            location: string | null;
            is_active: boolean;
          };
        };
        employers: {
          Row: {
            id: string;
            company_name: string;
            company_description: string | null;
            company_logo_url: string | null;
            company_website: string | null;
            industry: string | null;
            company_size: string | null;
            headquarters_location: string | null;
            is_verified: boolean;
          };
        };
        jobs: {
          Row: {
            id: string;
            employer_id: string;
            title: string;
            description: string;
            requirements: string[];
            responsibilities: string[];
            job_type: JobType;
            location: string | null;
            salary_range: string | null;
            is_active: boolean;
            posted_at: string;
            expires_at: string;
          };
        };
        applications: {
          Row: {
            id: string;
            job_id: string;
            job_seeker_id: string;
            cover_letter: string | null;
            status: ApplicationStatus;
            applied_at: string;
            updated_at: string;
          };
        };
      };
    };
  }
}