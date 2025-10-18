"use client";

import React from "react";
import ProtectedRoute from "../../Components/ProtectedRoute";
import { useAuth } from "../../Components/AuthContext";

function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#fef7e6] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-4">
            Hello World!
          </h1>
          <p className="text-gray-700 text-lg">
            Welcome to your dashboard, {user?.fullName || user?.email?.split('@')[0]}!
          </p>
        </div>

        {/* Welcome Card */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👋</span>
            </div>
            <h2 className="text-2xl font-semibold text-green-700 mb-2">
              You're successfully logged in!
            </h2>
            <p className="text-gray-600">
              This is your personal dashboard where you can manage your account and orders.
            </p>
          </div>

          {/* User Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Your Account</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><strong>Name:</strong> {user?.fullName || 'Not provided'}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Phone:</strong> {user?.phone || 'Not provided'}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a 
              href="/shop" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Shop Now
            </a>
            <a 
              href="/tracking" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Track Orders
            </a>
            <a 
              href="/about" 
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              About Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  );
}

