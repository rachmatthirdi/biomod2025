import { Home, Lightbulb, Shield, BookText, Users } from "lucide-react";
import React from "react";

// Definisikan tipe untuk setiap item navigasi
export type NavItem = {
  name: string;
  href: string;
  sections: { name: string; href: string }[];
  icon: React.ComponentType<{ className?: string }>;
};

// Ekspor array yang berisi semua data navigasi Anda
export const navItems: NavItem[] = [
  {
    name: "Home",
    href: "/",
    sections: [],
    icon: Home,
  },
  {
    name: "Ideas",
    href: "/ideas",
    sections: [
      { name: "Section 1", href: "/ideas#section-1" },
      { name: "Section 2", href: "/ideas#section-2" },
      { name: "Section 3", href: "/ideas#section-3" },
    ],
    icon: Lightbulb,
  },
  {
    name: "ELSI",
    href: "/elsi",
    sections: [
      { name: "Section 1", href: "/elsi#section-1" },
      { name: "Section 2", href: "/elsi#section-2" },
      { name: "Section 3", href: "/elsi#section-3" },
    ],
    icon: Shield,
  },
  {
    name: "Lab Notebook",
    href: "/lab-notebook",
    sections: [
      { name: "Section 1", href: "/lab-notebook#section-1" },
      { name: "Section 2", href: "/lab-notebook#section-2" },
      { name: "Section 3", href: "/lab-notebook#section-3" },
    ],
    icon: BookText,
  },
  {
    name: "Team",
    href: "/team",
    sections: [
      { name: "Section 1", href: "/team#section-1" },
      { name: "Section 2", href: "/team#section-2" },
      { name: "Section 3", href: "/team#section-3" },
    ],
    icon: Users,
  },
];
