import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Set dark mode based on saved preference in localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSaveSettings = () => {
    // Handle saving settings here, like calling an API
    console.log('Settings Saved:', { email, username, notificationsEnabled });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Settings</h2>

      {/* Dark Mode Toggle */}
      <div className="flex items-center mb-8">
        <input
          type="checkbox"
          id="darkMode"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          className="w-6 h-6 rounded-full bg-gray-300 dark:bg-gray-600 focus:outline-none"
        />
        <label htmlFor="darkMode" className="ml-2 text-sm text-gray-700 dark:text-gray-200">Enable Dark Mode</label>
      </div>

      {/* Profile Settings */}
      <div className="space-y-6 mb-8">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Profile Settings</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="profile" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Profile Picture</label>
            <input
              type="file"
              id="profile"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="mt-1 block w-full text-sm text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="space-y-6 mb-8">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Notification Settings</h3>
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="notifications"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:text-blue-400 dark:bg-gray-600"
          />
          <label htmlFor="notifications" className="text-sm font-medium text-gray-700 dark:text-gray-200">Enable Notifications</label>
        </div>
      </div>

      {/* Account Settings */}
      <div className="space-y-6 mb-8">
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Account Settings</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
