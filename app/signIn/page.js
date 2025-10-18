"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../Components/AuthContext";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signIn, isAuthenticated, user } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const result = await signIn(email, password);

      if (result.success) {
        // Redirect to dashboard after successful login
        router.push("/dashboard");
      } else {
        // Handle different error scenarios
        switch (result.errorCode) {
          case "USER_NOT_FOUND":
            setError("User not found. Please sign up first or check your email address.");
            break;
          case "INVALID_CREDENTIALS":
            setError("Invalid email or password. Please try again.");
            break;
          case "NETWORK_ERROR":
            setError("Unable to connect to server. Please check your internet connection.");
            break;
          default:
            setError(result.error || "Login failed. Please try again.");
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fef7e6] flex flex-col">
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full">
          {/* Sign In Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-black mb-6">SIGN IN</h1>
            <p className="text-gray-700 text-lg">Reach out with your questions</p>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mb-12">
            <p className="text-gray-700 text-lg">
              Already a member?{" "}
              <a href="/signup" className="text-black underline hover:text-gray-600 transition-colors font-semibold">
                Sign Up
              </a>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Email Field */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-6 py-4 border-2 border-black rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-black text-lg"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 pr-20 border-2 border-black rounded-full bg-gray-200 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-black text-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-12 h-8 flex items-center justify-center bg-gray-200 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-300 hover:text-gray-800 transition-colors text-xs font-medium cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-green-700 text-white rounded-full hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-semibold text-lg"
            >
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#fef7e6] px-4 py-16 mt-auto border-t border-gray-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Company */}
            <div>
              <h3 className="font-bold text-black mb-6 text-lg">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/about" className="text-gray-700 hover:text-black transition-colors text-base">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-gray-700 hover:text-black transition-colors text-base">
                    Our Blog
                  </a>
                </li>
                <li>
                  <a href="/contact" className="text-gray-700 hover:text-black transition-colors text-base">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h3 className="font-bold text-black mb-6 text-lg">Socials</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-700 hover:text-black transition-colors text-base">
                    Tiktok
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-black transition-colors text-base">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-black transition-colors text-base">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            {/* Other */}
            <div>
              <h3 className="font-bold text-black mb-6 text-lg">Other</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/privacy" className="text-gray-700 hover:text-black transition-colors text-base">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-700 hover:text-black transition-colors text-base">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            {/* Built By */}
            <div className="text-right">
              <p className="text-gray-700 text-base">
                Built by the Second<br />
                Savour Team.
              </p>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-gray-300">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-700 mb-4 md:mb-0 text-lg">
                Savour the flavour.
              </p>
              <div className="text-4xl font-bold text-black">
                SECOND SAVOUR
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
