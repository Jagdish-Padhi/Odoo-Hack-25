import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password, role) => {
    // Mock authentication - replace with real API call
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role: role || 'technician', // admin, manager, technician
      name: email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=3b82f6&color=fff`,
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return mockUser;
  };

  const signup = (email, password, name, role) => {
    // Mock signup - replace with real API call
    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role: role || 'technician',
      name: name || email.split('@')[0],
      avatar: `https://ui-avatars.com/api/?name=${name || email.split('@')[0]}&background=3b82f6&color=fff`,
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return mockUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isManager: user?.role === 'manager' || user?.role === 'admin',
    isTechnician: user?.role === 'technician',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
