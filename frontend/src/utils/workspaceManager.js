// Workspace management utilities using localStorage

export const STORAGE_KEYS = {
  WORKSPACES: 'blogforge_workspaces',
  CURRENT_WORKSPACE: 'blogforge_current_workspace',
  WORKSPACE_DATA: 'blogforge_workspace_data'
};

// Initialize default workspaces if none exist
export const initializeWorkspaces = () => {
  const existingWorkspaces = getWorkspaces();
  if (existingWorkspaces.length === 0) {
    const defaultWorkspaces = [
      { id: '1', name: 'My Personal Brand', createdAt: new Date().toISOString() },
      { id: '2', name: 'Company Blog', createdAt: new Date().toISOString() }
    ];
    localStorage.setItem(STORAGE_KEYS.WORKSPACES, JSON.stringify(defaultWorkspaces));
    setCurrentWorkspace(defaultWorkspaces[0]);
    return defaultWorkspaces;
  }
  return existingWorkspaces;
};

// Get all workspaces
export const getWorkspaces = () => {
  try {
    const workspaces = localStorage.getItem(STORAGE_KEYS.WORKSPACES);
    return workspaces ? JSON.parse(workspaces) : [];
  } catch (error) {
    console.error('Error getting workspaces:', error);
    return [];
  }
};

// Add new workspace
export const addWorkspace = (name) => {
  const workspaces = getWorkspaces();
  const newWorkspace = {
    id: Date.now().toString(),
    name,
    createdAt: new Date().toISOString()
  };
  
  const updatedWorkspaces = [...workspaces, newWorkspace];
  localStorage.setItem(STORAGE_KEYS.WORKSPACES, JSON.stringify(updatedWorkspaces));
  
  // Initialize empty data for the new workspace
  initializeWorkspaceData(newWorkspace.id);
  
  return newWorkspace;
};

// Set current workspace
export const setCurrentWorkspace = (workspace) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_WORKSPACE, JSON.stringify(workspace));
};

// Get current workspace
export const getCurrentWorkspace = () => {
  try {
    const workspace = localStorage.getItem(STORAGE_KEYS.CURRENT_WORKSPACE);
    return workspace ? JSON.parse(workspace) : null;
  } catch (error) {
    console.error('Error getting current workspace:', error);
    return null;
  }
};

// Initialize empty data for a workspace
export const initializeWorkspaceData = (workspaceId) => {
  const workspaceData = {
    blogs: [],
    contentStrategy: null,
    branding: null,
    automations: [],
    events: [],
    teamMembers: []
  };
  
  setWorkspaceData(workspaceId, workspaceData);
};

// Get workspace-specific data
export const getWorkspaceData = (workspaceId, dataType = null) => {
  try {
    const allData = localStorage.getItem(STORAGE_KEYS.WORKSPACE_DATA);
    const parsedData = allData ? JSON.parse(allData) : {};
    
    if (!parsedData[workspaceId]) {
      initializeWorkspaceData(workspaceId);
      return getWorkspaceData(workspaceId, dataType);
    }
    
    return dataType ? parsedData[workspaceId][dataType] : parsedData[workspaceId];
  } catch (error) {
    console.error('Error getting workspace data:', error);
    return dataType ? [] : {};
  }
};

// Set workspace-specific data
export const setWorkspaceData = (workspaceId, dataType, data) => {
  try {
    const allData = localStorage.getItem(STORAGE_KEYS.WORKSPACE_DATA);
    const parsedData = allData ? JSON.parse(allData) : {};
    
    if (!parsedData[workspaceId]) {
      parsedData[workspaceId] = {
        blogs: [],
        contentStrategy: null,
        branding: null,
        automations: [],
        events: [],
        teamMembers: []
      };
    }
    
    if (typeof dataType === 'string') {
      parsedData[workspaceId][dataType] = data;
    } else {
      // If dataType is actually the full data object
      parsedData[workspaceId] = dataType;
    }
    
    localStorage.setItem(STORAGE_KEYS.WORKSPACE_DATA, JSON.stringify(parsedData));
  } catch (error) {
    console.error('Error setting workspace data:', error);
  }
};

// Delete workspace
export const deleteWorkspace = (workspaceId) => {
  const workspaces = getWorkspaces();
  const updatedWorkspaces = workspaces.filter(ws => ws.id !== workspaceId);
  localStorage.setItem(STORAGE_KEYS.WORKSPACES, JSON.stringify(updatedWorkspaces));
  
  // Remove workspace data
  const allData = localStorage.getItem(STORAGE_KEYS.WORKSPACE_DATA);
  if (allData) {
    const parsedData = JSON.parse(allData);
    delete parsedData[workspaceId];
    localStorage.setItem(STORAGE_KEYS.WORKSPACE_DATA, JSON.stringify(parsedData));
  }
};