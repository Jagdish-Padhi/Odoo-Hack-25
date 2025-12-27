import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockEquipment, mockTeams, mockRequests } from '../services/mockData';

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [equipment, setEquipment] = useState([]);
  const [teams, setTeams] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEquipment(mockEquipment);
      setTeams(mockTeams);
      setRequests(mockRequests);
      setLoading(false);
    }, 500);
  }, []);

  // Equipment operations
  const addEquipment = (newEquipment) => {
    const equipmentWithId = {
      ...newEquipment,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setEquipment([...equipment, equipmentWithId]);
    return equipmentWithId;
  };

  const updateEquipment = (id, updates) => {
    setEquipment(equipment.map(eq => 
      eq.id === id ? { ...eq, ...updates } : eq
    ));
  };

  const deleteEquipment = (id) => {
    setEquipment(equipment.filter(eq => eq.id !== id));
  };

  // Team operations
  const addTeam = (newTeam) => {
    const teamWithId = {
      ...newTeam,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    setTeams([...teams, teamWithId]);
    return teamWithId;
  };

  const updateTeam = (id, updates) => {
    setTeams(teams.map(team => 
      team.id === id ? { ...team, ...updates } : team
    ));
  };

  const deleteTeam = (id) => {
    setTeams(teams.filter(team => team.id !== id));
  };

  // Request operations
  const addRequest = (newRequest) => {
    const requestWithId = {
      ...newRequest,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setRequests([...requests, requestWithId]);
    return requestWithId;
  };

  const updateRequest = (id, updates) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, ...updates } : req
    ));
  };

  const deleteRequest = (id) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  const getEquipmentById = (id) => {
    return equipment.find(eq => eq.id === id);
  };

  const getTeamById = (id) => {
    return teams.find(team => team.id === id);
  };

  const getRequestsByEquipment = (equipmentId) => {
    return requests.filter(req => req.equipmentId === equipmentId);
  };

  const getRequestsByTeam = (teamId) => {
    return requests.filter(req => req.teamId === teamId);
  };

  const value = {
    equipment,
    teams,
    requests,
    loading,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    addTeam,
    updateTeam,
    deleteTeam,
    addRequest,
    updateRequest,
    deleteRequest,
    getEquipmentById,
    getTeamById,
    getRequestsByEquipment,
    getRequestsByTeam,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
