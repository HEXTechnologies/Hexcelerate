import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { BsArrowLeftRight } from "react-icons/bs";
import Link from "next/link";

const DevelopmentIntro: React.FC = () => {
  const [isCompanyView, setIsCompanyView] = useState(true);

  const content = {
    company: {
      header: "Special Services We Offer",
      subheader: "Partner with Gold Standard UH Manoa Talent",
      features: [
        {
          title: "Guaranteed Excellence",
          description:
            "Access highly skilled UH Manoa students for your development needs. Our gold standard candidates are carefully selected based on their academic performance, technical skills, and potential to deliver exceptional results.",
        },
        {
          title: "Flexible Management",
          description:
            "Choose your preferred level of involvement. Either manage the project directly with our talented developers, or opt for our full project management service where we handle everything while keeping you informed of progress.",
        },
        {
          title: "Local Impact",
          description:
            "Partner with Hawaii's top student developers while contributing to the local tech community. Our UH Manoa gold standard students bring fresh perspectives and innovative solutions to your projects.",
        },
      ],
    },
    candidate: {
      header: "Opportunities We Provide Locally",
      subheader: "Your Path to Professional Excellence",
      features: [
        {
          title: "Gold Standard Opportunity",
          description:
            "Join our elite team of UH Manoa developers. As a gold standard candidate, you'll have the opportunity to work on real projects and potentially secure direct employment with our company.",
        },
        {
          title: "Guaranteed Experience",
          description:
            "Gain hands-on experience with actual client projects. We ensure meaningful work experiences that contribute to your professional growth while making a real impact for local businesses.",
        },
        {
          title: "Professional Development",
          description:
            "Receive mentorship and guidance from experienced professionals. Our program is designed to help gold standard UH students transition successfully into their tech careers while working on exciting projects.",
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
    <div id="Services" className="IntroDiv px-4 pt-5">
      <div className="text-center mb-5">
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
      <div className="d-flex justify-content-center mb-2">
        <h3 className="text-white fw-bold">See Why Companies Trust Us</h3>
      </div>
      <div className="d-flex justify-content-center mb-5">
        <Link href="/Experience">
          <button
            className="btn btn-primary gradient-button px-3 py-2"
            style={{
              borderRadius: "10px",
              fontSize: "0.9rem",
              transition: "transform 0.2s ease",
              marginTop: "10px",
            }}
          >
            View Previous Projects
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DevelopmentIntro;
