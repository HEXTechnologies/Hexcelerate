"use client";
import React, { useState, useEffect } from "react";
import styles from "../styles/Categories.module.css";
import Sidebar from "./dashboardComponents/Sidebar";
import MobileNav from "./dashboardComponents/MobileNav";
import DesktopNav from "./dashboardComponents/DesktopNav";
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig/firebase';
import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  firebase_id: string;
  type: string;
  author: string;
  subtitle: string;
  description?: string;
  title: string;
}

const ProjectContent: React.FC = () => {
  const [isLightMode, setIsLightMode] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Firestore instance:', firestore);
    console.log('Project ID:', firestore._databaseId?.projectId);
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("shouldRefresh")) {
      sessionStorage.removeItem("shouldRefresh");
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const projectsCollection = collection(firestore, 'Projects');
        const projectSnapshot = await getDocs(projectsCollection);
        
        if (projectSnapshot.empty) {
          console.log('No projects found');
          setProjects([]);
        } else {
          const projectsList = projectSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              author: data.author || '',
              description: data.description || '',
              firebase_id: data.firebase_id || doc.id,
              subtitle: data.subtitle || '',
              title: data.title || '',
              type: data.type || ''
            } as Project;
          });
          
          console.log('Fetched projects:', projectsList);
          setProjects(projectsList);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch projects';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const isLight = savedTheme !== "dark";
      setIsLightMode(isLight);
    }
  }, []);

  const toggleLightMode = () => {
    const newTheme = isLightMode ? "dark" : "light";
    setIsLightMode(!isLightMode);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
    }
  };

  if (isLightMode === null) {
    return <div>Loading theme...</div>;
  }

  return (
    <div
      className={`mainContainer ${isLightMode ? "light-mode" : ""}`}
      style={{
        backgroundColor: isLightMode ? "#ffffff" : "#000000",
        color: isLightMode ? "#000000" : "#ffffff",
        minHeight: "100vh",
        transition: "background-color 0.5s ease",
      }}
    >
      <Sidebar
        isLightMode={isLightMode}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <MobileNav
        isLightMode={isLightMode}
        isMobileNavOpen={isMobileNavOpen}
        setIsMobileNavOpen={setIsMobileNavOpen}
        toggleLightMode={toggleLightMode}
      />
      <DesktopNav
        isLightMode={isLightMode}
        isSidebarOpen={isSidebarOpen}
        toggleLightMode={toggleLightMode}
      />

      <div
        style={{
          marginLeft: isSidebarOpen ? "280px" : "64px",
          transition: "margin-left 0.3s ease",
          paddingTop: "80px",
        }}
        className="d-none d-md-block"
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-11">
              <div className="content-container">
                <div className={`text-center mb-4 ${styles.titleWrapper}`}>
                  <h1
                    className={`display-4 display-md-3 display-lg-2 ${styles.title} text-break`}
                    style={{marginRight: "88px"}}
                  >
                    Projects
                  </h1>
                </div>

                <div className="px-4">
                  {loading && (
                    <div className="text-center p-4">
                      <p>Loading projects...</p>
                    </div>
                  )}
                  {error && (
                    <div className="text-center p-4 text-red-500">
                      <p>Error: {error}</p>
                      <button 
                        onClick={() => window.location.reload()}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      >
                        Retry
                      </button>
                    </div>
                  )}
                  {!loading && !error && projects.length === 0 && (
                    <div className="text-center p-4">
                      <p>No projects found.</p>
                    </div>
                  )}
                  {projects.map((project) => (
                    <ProjectCard key={project.firebase_id} project={project} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-md-none" style={{paddingTop: "80px"}}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 col-xxl-11">
              <div className="content-container">
                <div className="text-center mb-4">
                  <h1 className="display-4 display-md-3 display-lg-2 text-break">
                    Projects
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectContent;