/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../../firebaseConfig/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Briefcase, MapPin, Award } from "lucide-react";
import Swal from "sweetalert2";

interface ProfileDashboardProps {
  userId?: string;
  isLightMode: boolean;
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

const ProfileDashboard = ({ userId, isLightMode }: ProfileDashboardProps) => {
  const [user] = useAuthState(auth);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const currentUserId = userId || user?.uid;
        if (!currentUserId) return;

        const candidateRef = doc(firestore, "Candidates", currentUserId);
        const candidateDoc = await getDoc(candidateRef);

        if (candidateDoc.exists() && candidateDoc.data().linkedInData) {
          setProfileData(candidateDoc.data().linkedInData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load profile data",
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

  const cardStyle = {
    backgroundColor: isLightMode ? "#fff" : "#040411",
    color: isLightMode ? "#000" : "#fff",
    borderRadius: "1rem",
    borderColor: isLightMode ? "#dee2e6" : "#444",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
    overflow: "hidden",
  };

  const textStyle = {
    color: isLightMode ? "#666" : "#ccc",
  };

  if (loading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="card" style={cardStyle}>
              <div className="card-body">
                <div className="placeholder-glow">
                  <span className="placeholder col-6"></span>
                  <span className="placeholder w-75"></span>
                  <span className="placeholder" style={{ width: "25%" }}></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Profile Header */}
      <div className="card mb-4" style={cardStyle}>
        <div className="card-body">
          <div className="row">
            {person.profile_pic_url && (
              <div className="col-auto">
                <img
                  src={person.profile_pic_url}
                  alt={person.full_name}
                  className="rounded-circle"
                  style={{ width: "96px", height: "96px", objectFit: "cover" }}
                />
              </div>
            )}
            <div className="col">
              <h1 className="h3 mb-2">{person.full_name}</h1>
              {person.headline && (
                <p className="mb-2" style={textStyle}>
                  {person.headline}
                </p>
              )}
              {person.location && (
                <div className="d-flex align-items-center" style={textStyle}>
                  <MapPin size={16} className="me-2" />
                  <span>{person.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {person.summary && (
        <div className="card mb-4" style={cardStyle}>
          <div className="card-body">
            <h2 className="h4 mb-3">About</h2>
            <p style={textStyle}>{person.summary}</p>
          </div>
        </div>
      )}

      {/* Experience */}
      {person.experiences && person.experiences.length > 0 && (
        <div className="card mb-4" style={cardStyle}>
          <div className="card-body">
            <div className="d-flex align-items-center mb-4">
              <Briefcase className="me-2" />
              <h2 className="h4 mb-0">Experience</h2>
            </div>
            {person.experiences.map((exp, index) => (
              <div
                key={index}
                className="mb-4 ps-4"
                style={{
                  borderLeft: `2px solid ${isLightMode ? "#dee2e6" : "#444"}`,
                }}
              >
                <h3 className="h5 mb-1">{exp.title}</h3>
                <p className="mb-1" style={textStyle}>
                  {exp.company}
                </p>
                {exp.date_range && (
                  <p className="small mb-2" style={textStyle}>
                    {exp.date_range}
                  </p>
                )}
                {exp.description && (
                  <p className="mb-0" style={textStyle}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {person.skills && person.skills.length > 0 && (
        <div className="card mb-4" style={cardStyle}>
          <div className="card-body">
            <div className="d-flex align-items-center mb-4">
              <Award className="me-2" />
              <h2 className="h4 mb-0">Skills</h2>
            </div>
            <div className="d-flex flex-wrap gap-2">
              {person.skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge"
                  style={{
                    backgroundColor: isLightMode ? "#e3f2fd" : "#1a365d",
                    color: isLightMode ? "#1565c0" : "#90caf9",
                    padding: "0.5rem 1rem",
                    borderRadius: "2rem",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDashboard;
