// app/context/DirectionContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DirectionContextProps {
  isRtl: boolean;
  toggleDirection: () => void;
}

const DirectionContext = createContext<DirectionContextProps | undefined>(undefined);

export const DirectionProvider = ({ children }: { children: ReactNode }) => {
  const [isRtl, setIsRtl] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('isRtl') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('isRtl', isRtl.toString());
      document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
    }
  }, [isRtl]);

  const toggleDirection = () => {
    setIsRtl((prevIsRtl) => !prevIsRtl);
  };

  return (
    <DirectionContext.Provider value={{ isRtl, toggleDirection }}>
      <html lang={isRtl ? "ar" : "en"} dir={isRtl ? "rtl" : "ltr"}>
        <body>
          {children}
        </body>
      </html>
    </DirectionContext.Provider>
  );
};

export const useDirection = () => {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error('useDirection must be used within a DirectionProvider');
  }
  return context;
};
