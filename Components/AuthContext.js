"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("secondSavourUser");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("secondSavourUser");
      }
    }
    setLoading(false);
  }, []);

  /**
   * Handle user login
   */
  const signIn = async (email, password) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.toLowerCase().trim(), 
          password 
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Login successful
        const userData = {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.fullName,
          phone: data.user.phone,
          signedInAt: new Date().toISOString()
        };

        setUser(userData);
        localStorage.setItem("secondSavourUser", JSON.stringify(userData));
        return { success: true, message: data.message };
      } else {
        // Login failed - return specific error message
        return { 
          success: false, 
          error: data.error || "Login failed",
          errorCode: data.errorCode,
          statusCode: response.status
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: "Unable to connect to server. Please check your internet connection.",
        errorCode: "NETWORK_ERROR"
      };
    }
  };

  /**
   * Handle user registration
   */
  const signUp = async (email, password, fullName, phone) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email.toLowerCase().trim(), 
          password, 
          fullName: fullName.trim(), 
          phone: phone ? phone.trim() : null 
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Registration successful - automatically log user in
        const userData = {
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.fullName,
          phone: data.user.phone,
          signedInAt: new Date().toISOString()
        };

        setUser(userData);
        localStorage.setItem("secondSavourUser", JSON.stringify(userData));
        return { success: true, message: data.message };
      } else {
        // Registration failed - return specific error message
        return { 
          success: false, 
          error: data.error || "Registration failed",
          errorCode: data.errorCode,
          statusCode: response.status
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: "Unable to connect to server. Please check your internet connection.",
        errorCode: "NETWORK_ERROR"
      };
    }
  };

  /**
   * Check if user exists by email
   */
  const checkUserExists = async (email) => {
    try {
      const response = await fetch(`http://localhost:8080/api/auth/check-email/${email.toLowerCase().trim()}`);
      const data = await response.json();

      if (response.ok) {
        return { 
          success: true, 
          exists: data.exists, 
          message: data.message 
        };
      } else {
        return { 
          success: false, 
          error: data.error || "Failed to check email",
          errorCode: data.errorCode
        };
      }
    } catch (error) {
      console.error('Check user error:', error);
      return { 
        success: false, 
        error: "Unable to connect to server",
        errorCode: "NETWORK_ERROR"
      };
    }
  };

  /**
   * Handle user logout
   */
  const signOut = () => {
    setUser(null);
    localStorage.removeItem("secondSavourUser");
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        checkUserExists,
        isAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
