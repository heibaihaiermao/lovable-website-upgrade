import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Login_signup from './pages/Login_signup.jsx';
import Landing from './pages/Landing.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Calendar from './pages/Calendar.jsx';
import Automations from './pages/Automations.jsx';
import Branding from './pages/Branding.jsx';
// import People from './pages/People.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

function App() {
  return (
    <Router>
      <div className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen w-full transition-colors duration-300 relative">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/automations" element={<Automations />} />
          <Route path="/branding" element={<Branding />} />
          {/*<Route path="/people" element={<People />} /> */}
          <Route path="/login" element={<Login_signup />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>

        {/* Global Theme Toggle */}
        <div className="fixed bottom-5 right-5 z-50">
          <ThemeToggle />
        </div>
      </div>
    </Router>
  );
}

export default App;
