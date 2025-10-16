"use client";

import React, { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    questionType: "",
    otherType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Google Form Configuration
  // TO GET ENTRY IDs: Open your Google Form, right-click > Inspect > find input fields
  // and look for names like "entry.123456789"
  const FORM_ID = "1FAIpQLSdWVOsYOotFYWeeQZH0Ih_Yl1eMPOqeFFDvJA2Zs7Ou_6VIWw";
  const FORM_ACTION_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

  // Entry IDs from your Google Form (extracted from prefill URL)
  const ENTRY_IDS = {
    name: "entry.1120704116", // Name field
    email: "entry.289370982", // Email field  
    questionType: "entry.1617426854", // Type of Question field
    otherType: "entry.765322602", // If Other field
    message: "entry.352955490", // Questions or Comments field
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Construct form data for Google Forms
      const formDataToSend = new FormData();
      
      // Add fields matching Google Form structure
      const fullName = `${formData.firstName} ${formData.lastName}`;
      formDataToSend.append(ENTRY_IDS.name, fullName);
      formDataToSend.append(ENTRY_IDS.email, formData.email);
      formDataToSend.append(ENTRY_IDS.questionType, formData.questionType);
      
      if (formData.questionType === "Other:" && formData.otherType) {
        formDataToSend.append(ENTRY_IDS.otherType, formData.otherType);
      }
      
      formDataToSend.append(ENTRY_IDS.message, formData.message);

      // Submit to Google Form using fetch with no-cors mode
      await fetch(FORM_ACTION_URL, {
        method: "POST",
        mode: "no-cors",
        body: formDataToSend,
      });

      // Since no-cors doesn't give us response, we assume success
      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        questionType: "",
        otherType: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <main className="bg-[#FEF7E6] min-h-screen w-full text-black pt-[8rem] pb-16">
      <div className="mx-auto w-[90%] max-w-[600px]">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: "Tanker, sans-serif" }}
          >
            CONTACT US
          </h1>
          <p className="text-lg text-gray-700">Reach out with your questions</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12 border-2 border-gray-200">
          <h2 className="text-2xl font-bold mb-8 text-center">
            Get in contact with us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-my-green transition-colors bg-[#FEF7E6]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-my-green transition-colors bg-[#FEF7E6]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-my-green transition-colors bg-[#FEF7E6]"
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
            </div>

            {/* Type of Question */}
            <div>
              <select
                name="questionType"
                value={formData.questionType}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-my-green transition-colors bg-[#FEF7E6] appearance-none cursor-pointer"
                style={{
                  fontFamily: "Poppins, sans-serif",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                  backgroundPosition: "right 1rem center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "1.5em 1.5em",
                }}
              >
                <option value="">Type of Question</option>
                <option value="Partnership">Partnership</option>
                <option value="Product Information">Product Information</option>
                <option value="Order/Shipping Status">Order/Shipping Status</option>
                <option value="General Feedback">General Feedback</option>
                <option value="Other:">Other:</option>
              </select>
            </div>

            {/* Other Type (conditional) */}
            {formData.questionType === "Other:" && (
              <div>
                <input
                  type="text"
                  name="otherType"
                  value={formData.otherType}
                  onChange={handleChange}
                  placeholder="If Other, please specify"
                  className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-my-green transition-colors bg-[#FEF7E6]"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                />
              </div>
            )}

            {/* Message */}
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                rows="6"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-my-green transition-colors bg-[#FEF7E6] resize-none"
                style={{ fontFamily: "Poppins, sans-serif" }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-my-green text-white font-bold py-4 rounded-full hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="p-4 bg-green-50 border-2 border-green-500 rounded-lg text-center">
                <p className="text-green-800 font-semibold">
                  Thank you! Your message has been sent successfully.
                </p>
              </div>
            )}
            {submitStatus === "error" && (
              <div className="p-4 bg-red-50 border-2 border-red-500 rounded-lg text-center">
                <p className="text-red-800 font-semibold">
                  Something went wrong. Please try again or email us directly at
                  sales@secondsavour.ca
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}

