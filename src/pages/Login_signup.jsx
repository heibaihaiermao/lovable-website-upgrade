import React, { useState } from "react";
import googleIcon from "../assets/login-google-icon.png";
import microsoftIcon from "../assets/login-microsoft-icon.png";

export default function Login_signup() {
  const [isSignup, setIsSignup] = useState(false);
  const handleToggle = () => setIsSignup(!isSignup);
  const handleSubmit = (e) => {
    e.preventDefault();
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
          <button className="w-full flex items-center justify-center gap-3 bg-white dark:text-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg hover:shadow-md transition-all duration-300">
            <img src={googleIcon} alt="Google" className="w-5 h-5" />
            {isSignup ? "Sign up with Google" : "Login with Google"}
          </button>
          <button className="w-full flex items-center justify-center gap-3 bg-white dark:text-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg hover:shadow-md transition-all duration-300">
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
              required
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
            className="w-full bg-gradient-to-r from-violet-500 to-blue-500 text-white font-semibold py-2 rounded-lg hover:brightness-110 transition-all duration-300"
          >
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
