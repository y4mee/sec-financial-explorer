"use client";

import { createContext } from "react";
import { useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [companyName, setCompanyName] = useState("");

  return (
    <AppContext.Provider value={{ data, setData, companyName, setCompanyName }}>
      {children}
    </AppContext.Provider>
  );
};
