// src/context/NavbarContext.tsx
import { createContext, useContext, useState } from "react";

type NavbarContextType = {
  showNavbar2: boolean;
  setShowNavbar2: (val: boolean) => void;
};

const NavbarContext = createContext<NavbarContextType>({
  showNavbar2: false,
  setShowNavbar2: () => {},
});

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [showNavbar2, setShowNavbar2] = useState(false);
  return (
    <NavbarContext.Provider value={{ showNavbar2, setShowNavbar2 }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbar = () => useContext(NavbarContext);