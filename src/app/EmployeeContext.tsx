// app/context/EmployeeContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface EmployeeContextProps {
  employeeCode: string | null;
  setEmployeeCode: (code: string) => void;
}

const EmployeeContext = createContext<EmployeeContextProps | undefined>(undefined);

export const EmployeeProvider = ({ children }: { children: ReactNode }) => {
  const [employeeCode, setEmployeeCode] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve the initial value from localStorage only on the client
    const storedCode = localStorage.getItem("employeeCode");
    if (storedCode) {
      setEmployeeCode(storedCode);
    }
  }, []);

  const saveEmployeeCode = (code: string) => {
    setEmployeeCode(code);
    localStorage.setItem("employeeCode", code); // Persist in localStorage
  };

  return (
    <EmployeeContext.Provider value={{ employeeCode, setEmployeeCode: saveEmployeeCode }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee must be used within an EmployeeProvider");
  }
  return context;
};
