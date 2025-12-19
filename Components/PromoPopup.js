"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user has seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("hasSeenPromoPopup");

    if (!hasSeenPopup) {
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenPromoPopup", "true");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleImageClick = () => {
    setIsOpen(false);
    router.push("/shop");
  };

  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop, not the image
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-4xl w-full animate-fadeIn">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute -top-4 -right-4 bg-white rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold text-gray-800 hover:bg-gray-200 transition-colors shadow-lg z-10"
          aria-label="Close popup"
        >
          ×
        </button>
        <div
          className="cursor-pointer transform transition-transform hover:scale-105"
          onClick={handleImageClick}
        >
          <Image
            src="/static/images/Christmas-Web.png"
            alt="Save 15% off and get free shipping - Click to shop now"
            width={1200}
            height={400}
            className="rounded-lg shadow-2xl w-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
