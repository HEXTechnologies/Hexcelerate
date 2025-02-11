import React from 'react';

interface ProjectProps {
  project: {
    id: string;
    author: string;
    description: string;
    firebase_id: string;
    subtitle: string;
    title: string;
    type: string;
  };
}

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
  const { type, author, subtitle, title } = project;
  
  return (
    <div className="w-full p-4 mb-4 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors duration-200 flex items-center justify-between">
      <div className="flex items-center gap-x-6 w-full flex-nowrap">

        {/* Middle section - Title and Subtitle */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <h5 className="text-sm">{author}</h5>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>

        {/* Right section - Status */}
        <div className="flex items-center gap-x-4 shrink-0">
          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
            {type.toUpperCase()}
          </span>
          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
            NOT STARTED
          </span>
          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm whitespace-nowrap">
            EXPIRES IN 6 DAYS
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;