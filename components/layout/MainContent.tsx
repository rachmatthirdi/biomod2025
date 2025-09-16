"use client";

import { useNavbar } from "@/app/context/NavbarContext";
import React from "react";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { navbarPosition } = useNavbar();

  // PERUBAHAN: Tambahkan kunci 'bottom' dengan string kosong ''
  const paddingClasses = {
    top: "mt-[calc(7vh+2*5rem)]",
    left: "ml-[calc(10vw+2*2rem)] lg:ml-[calc(10vw+2*5rem)]",
    right: "mr-[calc(10vw+2*2rem)] lg:mr-[calc(10vw+2*5rem)]",
    bottom: "",
  };

  return (
    <main
      className={`min-h-screen ${paddingClasses[navbarPosition]} transition-all duration-300`}
    >
      {children}
    </main>
  );
}
