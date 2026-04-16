"use client";

import { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  

  return (
    <AppContext.Provider value={{ data, setData, companyName, setCompanyName, error, setError, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};
