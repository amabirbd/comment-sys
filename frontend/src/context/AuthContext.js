// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const localStorageUser = localStorage.getItem('user')
  // const {userDetails} = JSON.parse(localStorageUser)

  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const loggedInUser = await authService.login(credentials);
    const {userDetails} = loggedInUser;
    // setUser(userDetails);
    localStorage.setItem('token', JSON.stringify(loggedInUser));
    localStorage.setItem('user', JSON.stringify(userDetails));

    const loggedUser = JSON.parse(localStorage.getItem('user'))
    setUser(loggedUser)
    return loggedUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
