"use client";

import { is } from "date-fns/locale";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// Tentukan tipe untuk posisi navbar
type NavbarPosition = "top" | "left" | "right";

// Tentukan tipe untuk nilai konteks
interface NavbarContextType {
  navbarPosition: NavbarPosition;
  setNavbarPosition: (position: NavbarPosition) => void;
}

// Buat Konteks dengan nilai default
const NavbarContext = createContext<NavbarContextType | undefined>(undefined);
const isMobile = typeof window !== "undefined" && window.innerWidth < 1280;

// Buat Provider yang akan membungkus aplikasi Anda
export function NavbarProvider({ children }: { children: ReactNode }) {
  const [navbarPosition, setNavbarPositionState] = isMobile
    ? useState<NavbarPosition>("top")
    : useState<NavbarPosition>("left");

  useEffect(() => {
    const savedPosition = localStorage.getItem(
      "navbarGlobalPosition"
    ) as NavbarPosition;
    if (savedPosition) {
      setNavbarPositionState(savedPosition);
    }
  }, []);

  // Fungsi untuk mengubah state dan menyimpannya ke localStorage
  const setNavbarPosition = (position: NavbarPosition) => {
    localStorage.setItem("navbarGlobalPosition", position);
    setNavbarPositionState(position);
  };

  const value = { navbarPosition, setNavbarPosition };

  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  );
}

// Buat custom hook untuk mempermudah penggunaan konteks
export function useNavbar() {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
}
