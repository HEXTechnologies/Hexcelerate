import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BsArrowLeftRight } from "react-icons/bs";

const Introduction: React.FC = () => {
  const [isCompanyView, setIsCompanyView] = useState(true);

  const content = {
    company: {
      header: "For Companies",
      subheader: "How We Deliver Gold-Standard Talent",
      features: [
        {
          title: "AI-Driven Talent Discovery",
          description:
            "Our advanced AI analyzes LinkedIn profiles, filters candidates by skills and experience, and matches top talent to your specific needs. Intelligent algorithms ensure precise, efficient hiring.",
        },
        {
          title: "Real-World Skill Assessments",
          description:
            "Evaluate candidates through real-world projects and tasks graded by our experts. Gain deeper insights into their capabilities and potential, ensuring informed hiring decisions.",
        },
        {
          title: "Effortless Screening and Interviews",
          description:
            "Save time with customized AI interview bots that reflect your company culture. Screen and assess candidates seamlessly while maintaining high standards.",
        },
      ],
    },
    candidate: {
      header: "For Candidates",
      subheader: "AI to Fast-Track Your Career Success",
      features: [
        {
          title: "Personalized Job Matching",
          description:
            "Sync your LinkedIn profile to unlock AI-powered job matches tailored to your skills and goals. Connect instantly with companies seeking your unique expertise.",
        },
        {
          title: "Skill Showcasing Projects",
          description:
            "Complete real-world tasks and projects to demonstrate your abilities. Graded assessments enhance your profile and help you stand out to top employers.",
        },
        {
          title: "AI-Powered Interview Preparation",
          description:
            "Engage with company-specific AI chatbots for personalized interview experiences. Get evaluated while gaining insights to prepare for your next big opportunity.",
        },
      ],
    },
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
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    boxes.forEach((box) => {
      observer.observe(box);
    });

    return () => {
      boxes.forEach((box) => observer.unobserve(box));
    };
  }, []);

  const currentContent = isCompanyView ? content.company : content.candidate;

  return (
    <div id="Introduction" className="IntroDiv px-4 pt-5">
      <div className="text-center mb-5 mt-5">
        <h1 className="text-white fw-bold mb-3">{currentContent.header}</h1>
        <h4 className="text-white">{currentContent.subheader}</h4>
        <button
          onClick={() => setIsCompanyView(!isCompanyView)}
          className="btn btn-primary gradient-button px-4 py-2 mt-4"
          style={{
            borderRadius: "20px",
          }}
        >
          <BsArrowLeftRight size={12} />
        </button>
      </div>

      <Row className="d-flex justify-content-center align-items-stretch gap-md-4 gap-2">
        {currentContent.features.map((item, index) => (
          <Col
            key={index}
            xs={12}
            lg={3}
            md={5}
            className="d-flex flex-column align-items-center"
          >
            <div
              className="IntroBox p-4 text-center border card-shadow mt-4 AnimatedBox"
              data-box={index + 1}
              style={{
                height: "400px",
                maxWidth: "300px",
                width: "100%",
                opacity: 0,
                transform: "translateY(30px)",
                transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${
                  index * 0.2
                }s`,
                letterSpacing: 0.5,
              }}
            >
              <h3 className="feature-title mb-4">{item.title}</h3>
              <p className="feature-description">{item.description}</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Introduction;
