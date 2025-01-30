/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../../../firebaseConfig/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Briefcase, GraduationCap, MapPin, Award } from 'lucide-react';
import Swal from 'sweetalert2';

interface ProfileDashboardProps {
  userId?: string;
}

interface Experience {
  company: string;
  title: string;
  description?: string;
  date_range?: string;
  duration?: string;
}

interface Education {
  school: string;
  degree?: string;
  field?: string;
  date_range?: string;
}

interface ProfileData {
  person: {
    full_name?: string;
    headline?: string;
    location?: string;
    profile_pic_url?: string;
    summary?: string;
    experiences?: Experience[];
    education?: Education[];
    skills?: string[];
  };
  company?: {
    name: string;
    website?: string;
    industry?: string;
    employee_count?: string;
    description?: string;
  };
}

const ProfileDashboard = ({ userId }: ProfileDashboardProps) => {
  const [user] = useAuthState(auth);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const currentUserId = userId || user?.uid;
        if (!currentUserId) return;

        const candidateRef = doc(firestore, 'Candidates', currentUserId);
        const candidateDoc = await getDoc(candidateRef);

        if (candidateDoc.exists() && candidateDoc.data().linkedInData) {
          setProfileData(candidateDoc.data().linkedInData);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load profile data'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, userId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No profile data available</p>
        </div>
      </div>
    );
  }

  const { person } = profileData;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-start gap-6">
          {person.profile_pic_url && (
            <img
              src={person.profile_pic_url}
              alt={person.full_name}
              className="w-24 h-24 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{person.full_name}</h1>
            {person.headline && (
              <p className="text-gray-600 mt-1">{person.headline}</p>
            )}
            {person.location && (
              <div className="flex items-center mt-2 text-gray-500">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{person.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {person.summary && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-600 whitespace-pre-line">{person.summary}</p>
        </div>
      )}

      {/* Experience */}
      {person.experiences && person.experiences.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Briefcase className="w-5 h-5 mr-2" />
            <h2 className="text-xl font-semibold">Experience</h2>
          </div>
          <div className="space-y-6">
            {person.experiences.map((exp, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <h3 className="font-medium">{exp.title}</h3>
                <p className="text-gray-600">{exp.company}</p>
                {exp.date_range && (
                  <p className="text-sm text-gray-500">{exp.date_range}</p>
                )}
                {exp.description && (
                  <p className="mt-2 text-gray-600">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {person.education && person.education.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <GraduationCap className="w-5 h-5 mr-2" />
            <h2 className="text-xl font-semibold">Education</h2>
          </div>
          <div className="space-y-6">
            {person.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <h3 className="font-medium">{edu.school}</h3>
                {edu.degree && edu.field && (
                  <p className="text-gray-600">{edu.degree} - {edu.field}</p>
                )}
                {edu.date_range && (
                  <p className="text-sm text-gray-500">{edu.date_range}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {person.skills && person.skills.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center mb-4">
            <Award className="w-5 h-5 mr-2" />
            <h2 className="text-xl font-semibold">Skills</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {person.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;