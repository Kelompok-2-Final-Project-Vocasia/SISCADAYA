// AuthContext.js
import React, { createContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // tempatkan fungsi untuk login dan logout di sini jika diperlukan

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
