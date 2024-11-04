// app/contexts/EmployeeContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface EmployeeContextType {
  employeeCode: string | null;
  setEmployeeCode: (code: string) => void;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employeeCode, setEmployeeCode] = useState<string | null>(null);

  return (
    <EmployeeContext.Provider value={{ employeeCode, setEmployeeCode }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = (): EmployeeContextType => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee must be used within an EmployeeProvider");
  }
  return context;
};
