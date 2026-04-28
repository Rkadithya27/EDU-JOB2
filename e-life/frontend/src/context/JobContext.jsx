import React, { createContext, useState, useContext } from 'react';

const JobContext = createContext();

export const useJobs = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([
    {
      id: 'job-1',
      title: 'Senior Frontend Engineer',
      company: 'TechFlow Solutions',
      location: 'Remote, US',
      salary: '$120,000 - $160,000',
      description: 'Looking for an experienced React developer to lead our frontend architecture.',
      skills: ['React', 'TypeScript', 'Redux'],
      applicants: 12
    },
    {
      id: 'job-2',
      title: 'Machine Learning Architect',
      company: 'AI Dynamics',
      location: 'San Francisco, CA',
      salary: '$180,000 - $220,000',
      description: 'Design and deploy scalable deep learning models for NLP applications.',
      skills: ['Python', 'PyTorch', 'AWS'],
      applicants: 5
    }
  ]);

  const addJob = (job) => {
    setJobs([...jobs, { ...job, id: `job-${Date.now()}`, applicants: Math.floor(Math.random() * 10) }]);
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, deleteJob }}>
      {children}
    </JobContext.Provider>
  );
};
