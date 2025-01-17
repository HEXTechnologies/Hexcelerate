/* eslint-disable @next/next/no-img-element */
"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles.css";
import "../../styles/Lightmode.css";
import "../../styles/HomeTopandIntro.css";
import "../../styles/HomeCategory.css";
import "../../styles/HomeHowItWorks.css";
import "../../styles/HomeChatBots.css";

import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Tochigami",
    subtitle: "The 1st Real Estate Social App",
    description:
      "A revolutionary platform connecting real estate professionals and clients through social networking features.",
    image: "../../tochigami.png",
  },
  {
    title: "Haumana Exchange Marketplace",
    subtitle: "The 1st student managed online marketplace at UH Manoa",
    description:
      "A dedicated marketplace platform enabling UH Manoa students to buy, sell, and exchange items within their community.",
    image: "../../haumana.png",
  },
  {
    title: "UHSPACE Data Hub",
    subtitle: "2nd Place in HACC 2024",
    description:
      "A modernized version of Hawaii's Open Data Portal, making government data more accessible and user-friendly.",
    image: "../../uhspace.png",
  },
  {
    title: "CutTheFluff - URL Analyzer Chat",
    subtitle: "Zero-tolerance AI powered by Llama 3.1 + Redis",
    description:
      "An intelligent chat system that provides precise URL analysis and answers without ambiguity.",
    image: "../../cutthefluff.png",
  },
  {
    title: "AI-Powered Codebase Assistant",
    subtitle: "Retrieval-Augmented Generation (RAG) Tool",
    description:
      "A sophisticated tool that helps developers navigate and understand GitHub repositories through AI assistance.",
    image: "../../codebase.png",
  },
  {
    title: "Brain Tumor Classification",
    subtitle: "AI-Powered MRI Analysis",
    description:
      "A Streamlit application leveraging artificial intelligence to analyze and classify brain MRI scans.",
    image: "../../brain.png",
  },
  {
    title: "Customer Churn Prediction",
    subtitle: "AI-Powered Business Intelligence",
    description:
      "A Streamlit application combining classical ML and AI to predict and prevent customer churn.",
    image: "../../churn.png",
  },
];

const Experience = () => {
  const handleNavigation = () => {
    window.location.href = "/Waitlist";
  };

  useEffect(() => {
    const boxes = document.querySelectorAll(".AnimatedBox");

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    boxes.forEach((box) => observer.observe(box));
    return () => boxes.forEach((box) => observer.unobserve(box));
  }, []);

  return (
    <div className="ExperienceDiv px-5 pt-5">
      <Link
        href="/"
        className="position-fixed"
        style={{
          top: "30px",
          left: "30px",
          zIndex: 1000,
          backgroundColor: "white",
          borderRadius: "50%",
          padding: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s ease",
        }}
      >
        <ArrowLeft size={20} />
      </Link>
      <div id="Experience" className="experience-section">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h1
            className="text-center custom-h1 AnimatedBox text-white"
            style={{
              marginTop: "20px",
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.5s ease",
            }}
          >
            Discover Why Companies Choose Us
          </h1>
          <h4
            className="text-center custom-h1 AnimatedBox text-white mt-2"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.5s ease",
            }}
          >
            Proven Results, Earned Trust!
          </h4>
        </div>

        {projects.map((project, index) => (
          <Row key={index} className="d-flex align-items-center my-5">
            <Col
              xs={10}
              md={4}
              className="d-flex justify-content-start ps-md-5"
            >
              <div
                className="AnimatedBox"
                style={{
                  opacity: 0,
                  transform: "translateY(20px)",
                  transition: "all 0.5s ease 0.2s",
                }}
              >
                <h1 className="custom-heading mb-3">{project.title}</h1>
                <h5 className="custom-h4 mb-3 text-white">
                  {project.subtitle}
                </h5>
                <p className="custom-h4 mb-5 text-white">
                  {project.description}
                </p>
              </div>
            </Col>

            <Col xs={12} md={8} className="d-flex justify-content-end ps-md-8">
              <div
                className="HowItWorksImageWrapper p-4 text-center AnimatedBox"
                style={{
                  marginBottom: "60px",
                  opacity: 0,
                  transform: "translateY(20px)",
                  transition: "all 0.5s ease 0.4s",
                }}
              >
                <img
                  className="HowItWorksVideo"
                  style={{ width: "100%", height: "auto" }}
                  src={project.image}
                  alt={project.title}
                />
              </div>
            </Col>
          </Row>
        ))}

        <div className="d-flex flex-column align-items-center justify-content-center mb-5">
          <h1
            className="custom-h1 AnimatedBox text-white text-center mb-3"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "all 0.5s ease",
            }}
          >
            READY TO BOOST YOUR DEVELOPMENT SPEED?
          </h1>
          <button
            onClick={handleNavigation}
            className="btn btn-primary gradient-button mx-4 mb-5"
            style={{
              fontSize: "0.9rem",
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "10px",
              transform: "translateY(20px)",
              transition: "all 0.5s ease 0.2s",
            }}
          >
            Join Our Pre-Seed Waitlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Experience;
