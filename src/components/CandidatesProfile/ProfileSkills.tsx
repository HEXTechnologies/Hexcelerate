// components/CandidatesProfile/ProfileSkills.tsx
"use client";

import { Award, ChevronRight } from "lucide-react";

interface ProfileSkillsProps {
  skills: string[];
  isLightMode: boolean;
}

const ProfileSkills = ({ skills, isLightMode }: ProfileSkillsProps) => {
  const cardStyle = {
    backgroundColor: isLightMode ? "#fff" : "#040411",
    color: isLightMode ? "#000" : "#fff",
    borderRadius: "1rem",
    borderColor: isLightMode ? "#dee2e6" : "#444",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    marginBottom: "1.5rem",
    overflow: "hidden",
  };

  const skillBadgeStyle = {
    backgroundColor: isLightMode
      ? "rgba(21, 101, 192, 0.08)"
      : "rgba(144, 202, 249, 0.08)",
    color: isLightMode ? "#1565c0" : "#90caf9",
    padding: "8px 16px",
    borderRadius: "12px",
    margin: "4px",
    display: "inline-block",
    fontSize: "0.9rem",
    border: `1px solid ${
      isLightMode ? "rgba(21, 101, 192, 0.12)" : "rgba(144, 202, 249, 0.12)"
    }`,
    transition: "all 0.2s ease",
  };

  // Define category keywords
  const categoryKeywords = {
    "Programming Languages": [
      "Python",
      "JavaScript",
      "PHP",
      "C++",
      "Java",
      "TypeScript",
      "Ruby",
      "Go",
      "Swift",
      "Kotlin",
      "Rust",
      "Scala",
      "R",
      "MATLAB",
      "Shell",
      "Perl",
      "SQL",
    ],
    "Web Technologies": [
      "React",
      "Angular",
      "Vue",
      "Node",
      "Express",
      "Django",
      "Flask",
      "Laravel",
      "HTML",
      "CSS",
      "Bootstrap",
      "Tailwind",
      "Firebase",
      "AWS",
      "Azure",
      "Vercel",
      "Netlify",
      "Heroku",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "GraphQL",
      "REST",
      "API",
      "WebSocket",
      "OAuth",
      "JWT",
      "Webpack",
      "Babel",
      "npm",
      "yarn",
    ],
    "AI & Machine Learning": [
      "Machine Learning",
      "Deep Learning",
      "Neural Networks",
      "NLP",
      "Computer Vision",
      "TensorFlow",
      "PyTorch",
      "Keras",
      "Scikit-learn",
      "OpenCV",
      "YOLO",
      "Transformers",
      "GPT",
      "BERT",
      "Reinforcement Learning",
      "Data Mining",
      "Feature Engineering",
    ],
    "Data Science & Analytics": [
      "Data Analysis",
      "Data Visualization",
      "Statistics",
      "Pandas",
      "NumPy",
      "SciPy",
      "Matplotlib",
      "Seaborn",
      "Tableau",
      "Power BI",
      "Excel",
      "SQL",
      "Big Data",
      "ETL",
      "Data Warehouse",
      "Data Lake",
      "Data Engineering",
      "Business Intelligence",
    ],
    "Cloud & DevOps": [
      "AWS",
      "Azure",
      "GCP",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Git",
      "GitHub",
      "GitLab",
      "Bitbucket",
      "CI/CD",
      "Infrastructure as Code",
      "Terraform",
      "Ansible",
      "Prometheus",
      "Grafana",
      "ELK Stack",
      "Linux",
      "Unix",
      "Shell Scripting",
    ],
    "Mobile Development": [
      "iOS",
      "Android",
      "React Native",
      "Flutter",
      "Xamarin",
      "Swift",
      "Kotlin",
      "Mobile UI/UX",
      "App Store",
      "Google Play",
      "Mobile Security",
      "Push Notifications",
    ],
    "Soft Skills": [
      "Leadership",
      "Communication",
      "Team Management",
      "Project Management",
      "Agile",
      "Scrum",
      "Problem Solving",
      "Critical Thinking",
      "Time Management",
      "Collaboration",
    ],
  };

  // Function to categorize skills
  const categorizeSkills = (skillsList: string[]) => {
    const categorizedSkills: { [key: string]: string[] } = {};
    const assignedSkills = new Set();

    // First pass: categorize skills based on exact or partial matches
    Object.entries(categoryKeywords).forEach(([category, keywords]) => {
      const matchedSkills = skillsList.filter((skill) =>
        keywords.some(
          (keyword) =>
            skill.toLowerCase().includes(keyword.toLowerCase()) ||
            keyword.toLowerCase().includes(skill.toLowerCase())
        )
      );

      if (matchedSkills.length > 0) {
        categorizedSkills[category] = matchedSkills;
        matchedSkills.forEach((skill) => assignedSkills.add(skill));
      }
    });

    // Add uncategorized skills to "Other Skills"
    const otherSkills = skillsList.filter(
      (skill) => !assignedSkills.has(skill)
    );
    if (otherSkills.length > 0) {
      categorizedSkills["Other Skills"] = otherSkills;
    }

    return categorizedSkills;
  };

  const categorizedSkills = categorizeSkills(skills);

  return (
    <div className="card mb-4" style={cardStyle}>
      <div className="card-body p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div className="d-flex align-items-center">
            <Award
              className="me-2"
              style={{ color: isLightMode ? "#666" : "#8c8c9e" }}
            />
            <h2 className="h4 mb-0">Skills</h2>
          </div>
          <span
            className="badge"
            style={{
              backgroundColor: isLightMode
                ? "rgba(0,0,0,0.05)"
                : "rgba(255,255,255,0.05)",
              color: isLightMode ? "#666" : "#8c8c9e",
              padding: "4px 12px",
              borderRadius: "12px",
              fontSize: "0.9rem",
            }}
          >
            {skills.length} Total
          </span>
        </div>

        {Object.entries(categorizedSkills).map(([category, categorySkills]) => (
          <div key={category} className="mb-4">
            <div
              className="d-flex align-items-center mb-2"
              style={{ color: isLightMode ? "#666" : "#8c8c9e" }}
            >
              <ChevronRight size={16} className="me-1" />
              <h3 className="h6 mb-0" style={{ fontSize: "0.9rem" }}>
                {category} ({categorySkills.length})
              </h3>
            </div>
            <div className="d-flex flex-wrap gap-1 ps-4">
              {categorySkills.map((skill, index) => (
                <span key={index} className="badge" style={skillBadgeStyle}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSkills;
