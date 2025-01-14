"use client";

import React, { useState, useRef } from "react";
import { ArrowLeft, Send, HelpCircle } from "lucide-react";
import { database } from "../../../.firebase/firebase";
import { ref, push } from "firebase/database";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

export default function Waitlist() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: {
      value: "",
      helper: "Your name will be used to personalize your experience.",
    },
    email: {
      value: "",
      helper:
        "We'll use this to notify you when we launch and send important updates.",
    },
    organization: {
      value: "",
      helper: "Company, university, or organization you're affiliated with.",
    },
    role: {
      value: "",
      helper:
        "Select the option that best describes your current situation or needs.",
    },
    source: {
      value: "",
      helper: "Help us understand how you found out about our platform.",
    },
  });

  const roleOptions = {
    "Hiring Companies": [
      "Company actively hiring full-time",
      "Company offering internships",
      "Company seeking contractors",
      "Startup building team",
    ],
    "Job Seekers": [
      "Professional seeking full-time role",
      "Student seeking internship",
      "Contractor seeking projects",
      "Career transitioner",
    ],
    Educational: [
      "University/College representative",
      "Career counselor",
      "Educational institution",
      "Training provider",
    ],
    Other: [
      "Recruiter/Hiring agency",
      "Industry researcher",
      "Career coach",
      "Other",
    ],
  };

  const sourceOptions = [
    "LinkedIn",
    "Search Engine (Google, Bing, etc.)",
    "Friend or Colleague",
    "Social Media",
    "Professional Network",
    "Conference or Event",
    "University/College",
    "Email Newsletter",
    "Online Advertisement",
    "Blog or Article",
    "Other",
  ];

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    try {
      const token = await recaptchaRef.current?.getValue();
      if (!token) {
        setStatus({
          type: "error",
          message: "Please complete the reCAPTCHA verification.",
        });
        return;
      }

      // Format data for Firebase
      const waitlistData = {
        timestamp: new Date().toISOString(),
        name: formData.name.value,
        email: formData.email.value,
        organization: formData.organization.value,
        role: formData.role.value,
        source: formData.source.value,
      };

      // Push to Firebase under 'Waitlist' node
      const waitlistRef = ref(database, "Waitlist");
      await push(waitlistRef, waitlistData);

      setStatus({
        type: "success",
        message: "Successfully joined the waitlist! Redirecting...",
      });

      // Reset form and redirect
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to join waitlist. Please try again.",
      });
      console.error("Error submitting to waitlist:", error);
    }
  };

  const renderTooltip = (text: string) => (
    <Tooltip className="custom-tooltip">{text}</Tooltip>
  );

  const renderField = (
    fieldName: keyof typeof formData,
    label: string,
    type: "text" | "email" | "select" | "source" = "text"
  ) => (
    <div className="mb-4">
      <div className="d-flex align-items-center mb-2">
        <label className="form-label mb-0 text-white">{label}</label>
        <OverlayTrigger
          placement="right"
          overlay={renderTooltip(formData[fieldName].helper)}
        >
          <button
            type="button"
            className="btn btn-link text-blue-400 p-0 ms-2"
            style={{ backgroundColor: "transparent" }}
          >
            <HelpCircle size={16} />
          </button>
        </OverlayTrigger>
      </div>
      {type === "select" ? (
        <select
          className="form-select bg-black text-white border-blue-800"
          value={formData[fieldName].value}
          onChange={(e) =>
            setFormData({
              ...formData,
              [fieldName]: { ...formData[fieldName], value: e.target.value },
            })
          }
          required
        >
          <option value="">Select your role</option>
          {Object.entries(roleOptions).map(([category, options]) => (
            <optgroup key={category} label={category}>
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      ) : type === "source" ? (
        <select
          className="form-select bg-black text-white border-blue-800"
          value={formData[fieldName].value}
          onChange={(e) =>
            setFormData({
              ...formData,
              [fieldName]: { ...formData[fieldName], value: e.target.value },
            })
          }
          required
        >
          <option value="">Select source</option>
          {sourceOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="form-control bg-black"
          style={{ color: "white" }}
          value={formData[fieldName].value}
          onChange={(e) =>
            setFormData({
              ...formData,
              [fieldName]: { ...formData[fieldName], value: e.target.value },
            })
          }
          required
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-black py-5">
      <div className="container">
        <Link
          href="/"
          className="text-white mb-5"
          style={{ display: "flex", alignItems: "center" }}
        >
          <ArrowLeft size={20} className="mr-2" />
        </Link>

        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div
              className="card bg-black border border-blue-800"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold text-white">
                    Join Our Waitlist
                  </h2>
                  <p className="text-white mt-2">
                    Be the first to experience AI-Enhanced LinkedIn Insights
                  </p>
                </div>

                <form onSubmit={handleSubmit}>
                  {renderField("name", "Full Name")}
                  {renderField("email", "Email Address", "email")}
                  {renderField("organization", "Organization")}
                  {renderField("role", "Your Role", "select")}
                  {renderField(
                    "source",
                    "Where did you hear about us?",
                    "source"
                  )}

                  <div className="mb-4">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                      theme="dark"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-50 bg-blue border-white"
                  >
                    <Send size={18} />
                    &nbsp;&nbsp; Join Waitlist
                  </button>
                </form>

                {status.type && (
                  <div
                    className={`mt-4 p-3 rounded text-center ${
                      status.type === "success"
                        ? "bg-success text-white border border-white"
                        : "bg-alert text-white border border-white"
                    }`}
                  >
                    {status.message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
