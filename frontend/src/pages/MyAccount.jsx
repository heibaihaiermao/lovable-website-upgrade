
import React, { useState } from 'react';
import { Header } from '../components/Header.jsx';
import { NavigationTabs } from '../components/NavigationTabs.jsx';
import { User, Mail, Lock, Bell, Palette, LogOut, Save } from 'lucide-react';

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    company: 'BlogForge Inc.',
    bio: 'Content creator and blogger passionate about sharing knowledge.',
    notifications: {
      email: true,
      push: false,
      marketing: true
    }
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Mail },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Palette }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-[#0d0e14] dark:via-[#151621] dark:to-[#0d0e14] text-gray-900 dark:text-white transition-all duration-500">
      <div className="fixed inset-0 bg-gradient-to-br from-violet-500/3 via-transparent to-blue-500/3 pointer-events-none" />
      
      <Header />
      <NavigationTabs />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Account</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-scale-in">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-violet-500 text-violet-600 dark:text-violet-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h3 className="font-medium text-red-800 dark:text-red-400 mb-2">Danger Zone</h3>
                    <p className="text-sm text-red-600 dark:text-red-400 mb-4">Once you delete your account, there is no going back.</p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Notification Preferences</h2>
                <div className="space-y-4">
                  {Object.entries(formData.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <div>
                        <h3 className="font-medium capitalize">{key} Notifications</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Receive {key} notifications about your account activity
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleNotificationChange(key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 dark:peer-focus:ring-violet-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button className="px-6 py-3 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Cancel
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-violet-500 to-blue-500 text-white rounded-lg hover:brightness-110 transition-all flex items-center gap-2">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccount;
