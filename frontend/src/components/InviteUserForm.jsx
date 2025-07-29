import React, { useState } from 'react';

export const InviteUserForm = ({ onInvite }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('Viewer');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && name && role) {
      onInvite(email, name, role);
      setEmail('');
      setName('');
      setRole('Viewer');
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Invite New User</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Owner">Owner</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            type="submit" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send Invitation
          </button>
        </div>
      </form>
    </div>
  );
};