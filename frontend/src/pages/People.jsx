import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header.jsx';
import { NavigationTabs } from '../components/NavigationTabs.jsx';
import { InviteUserForm } from '../components/InviteUserForm.jsx';
import { TeamMembersTable } from '../components/TeamMembersTable.jsx';
import { getCurrentWorkspace, getWorkspaceData, setWorkspaceData } from '../utils/workspaceManager';

const People = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  // Load workspace-specific team members
  useEffect(() => {
    const currentWorkspace = getCurrentWorkspace();
    if (currentWorkspace) {
      const workspaceMembers = getWorkspaceData(currentWorkspace.id, 'teamMembers') || [];
      setTeamMembers(workspaceMembers);
    }
  }, []);

  // Save team members when they change
  const updateTeamMembers = (newMembers) => {
    setTeamMembers(newMembers);
    const currentWorkspace = getCurrentWorkspace();
    if (currentWorkspace) {
      setWorkspaceData(currentWorkspace.id, 'teamMembers', newMembers);
    }
  };

  const handleRoleChange = (id, newRole) => {
    const updatedMembers = teamMembers.map(member => 
      member.id === id ? { ...member, role: newRole } : member
    );
    updateTeamMembers(updatedMembers);
  };

  const handleRemoveMember = (id) => {
    const updatedMembers = teamMembers.filter(member => member.id !== id);
    updateTeamMembers(updatedMembers);
  };

  const handleInviteUser = (email, name, role) => {
    const newMember = {
      id: Date.now(),
      email,
      name,
      role,
    };
    updateTeamMembers([...teamMembers, newMember]);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-[#121524] text-gray-800 dark:text-white transition-colors duration-300">
      <div className="relative z-20">
        <Header />
      </div>
      <div className="relative z-10">
        <NavigationTabs />
      </div>

      <div className="mt-10 px-6">
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-8 rounded-2xl shadow-md transition-colors duration-300 min-h-[600px]">
          <h1 className="text-2xl font-bold mb-2">Team Members & Permissions</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Invite virtual assistants, writers, or collaborators to your workspaces. Each user can be assigned a role:
          </p>

          <TeamMembersTable 
            members={teamMembers}
            onRoleChange={handleRoleChange}
            onRemoveMember={handleRemoveMember}
          />

          <div className="mt-8">
            <InviteUserForm onInvite={handleInviteUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default People;