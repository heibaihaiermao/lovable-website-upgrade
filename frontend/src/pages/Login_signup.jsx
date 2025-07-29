import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from "../assets/login-google-icon.png";
import microsoftIcon from "../assets/login-microsoft-icon.png";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../client";

export default function Login_signup() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp, signIn, user, loading: authLoading } = useAuth();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate]);

  // Show loading while checking authentication status
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleToggle = () => {
    setIsSignup(!isSignup);
    setError("");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOAuthSignIn = async (provider) => {
    setError("");
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) {
        setError(`Failed to sign in with ${provider}: ${error.message}`);
      }
    } catch (err) {
      setError(`Unexpected error with ${provider} authentication`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isSignup) {
        const userData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          full_name: `${formData.firstName} ${formData.lastName}`
        };
        
        const { error } = await signUp(formData.email, formData.password, userData);
        
        if (error) {
          setError(error.message);
        } else {
          // Show success message for signup
          setError("Check your email for verification link!");
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          setError(error.message);
        } else {
          // Navigate to dashboard on successful login
          navigate("/dashboard");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 space-y-6 transition-colors duration-300">
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setIsSignup(false)}
            className={`w-1/2 py-2 text-lg font-semibold rounded-l-xl transition-all duration-300 ${
              !isSignup
                ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsSignup(true)}
            className={`w-1/2 py-2 text-lg font-semibold rounded-r-xl transition-all duration-300 ${
              isSignup
                ? "bg-gradient-to-r from-violet-500 to-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            Signup
          </button>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-3">
          <button 
            onClick={() => handleOAuthSignIn('google')}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg transition-all duration-300 ${
              loading 
                ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed" 
                : "bg-white dark:bg-gray-700 hover:shadow-md"
            } dark:text-white`}
          >
            <img src={googleIcon} alt="Google" className="w-5 h-5" />
            {isSignup ? "Sign up with Google" : "Login with Google"}
          </button>
          <button 
            onClick={() => handleOAuthSignIn('azure')}
            disabled={loading}
            className={`w-full flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg transition-all duration-300 ${
              loading 
                ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed" 
                : "bg-white dark:bg-gray-700 hover:shadow-md"
            } dark:text-white`}
          >
            <img src={microsoftIcon} alt="Microsoft" className="w-5 h-5" />
            {isSignup ? "Sign up with Microsoft" : "Login with Microsoft"}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600" />
          <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600" />
        </div>

        {/* Error Message */}
        {error && (
          <div className={`p-3 rounded-lg text-sm ${
            error.includes("Check your email") 
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" 
              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
          }`}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {isSignup && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={6}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {!isSignup && (
            <div className="text-right text-sm">
              <a href="/forgot-password" className="text-blue-500 hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-2 rounded-lg transition-all duration-300 ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-gradient-to-r from-violet-500 to-blue-500 text-white hover:brightness-110"
            }`}
          >
            {loading ? "Processing..." : (isSignup ? "Create Account" : "Login")}
          </button>
        </form>
      </div>
    </div>
  );
}
