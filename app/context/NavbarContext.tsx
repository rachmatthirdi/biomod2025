"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Tentukan tipe untuk posisi navbar
type NavbarPosition = "top" | "left" | "right";

// Tentukan tipe untuk nilai konteks
interface NavbarContextType {
  navbarPosition: NavbarPosition;
  setNavbarPosition: (position: NavbarPosition) => void;
}

// Buat Konteks dengan nilai default
const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

// Buat Provider yang akan membungkus aplikasi Anda
// Ganti seluruh fungsi NavbarProvider Anda dengan yang ini
export function NavbarProvider({ children }: { children: ReactNode }) {
  // Panggil useState HANYA SEKALI dan tentukan nilai awal di dalamnya
  const [navbarPosition, setNavbarPositionState] = useState<NavbarPosition>(
    () => {
      // Gunakan fungsi ini untuk "lazy initial state", yang hanya berjalan sekali
      if (typeof window !== "undefined") {
        // 1. Cek localStorage terlebih dahulu
        const savedPosition = localStorage.getItem(
          "navbarGlobalPosition"
        ) as NavbarPosition;
        if (savedPosition) {
          return savedPosition;
        }

        // 2. Jika tidak ada, tentukan berdasarkan ukuran layar
        const isMobile = window.innerWidth < 1280;
        return isMobile ? "top" : "left";
      }

      // Fallback default jika window tidak tersedia (misalnya saat server-side rendering)
      return "left";
    }
  );

  // useEffect tidak lagi diperlukan untuk mengambil data dari localStorage,
  // karena sudah ditangani saat inisialisasi state di atas. Ini juga
  // menyelesaikan warning 'exhaustive-deps'.

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
