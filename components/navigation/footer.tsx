"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  ChevronDown,
} from "lucide-react";
import Image from "next/image"; // Jangan lupa impor Image

// Data untuk link di footer
const footerLinks = [
  {
    title: "Ideas",
    links: [
      { name: "Relevance", href: "/ideas#relevance" },
      { name: "Goals & Success", href: "/ideas#goals" },
      { name: "Feasibility", href: "/ideas#feasibility" },
    ],
  },
  {
    title: "ELSI",
    links: [
      { name: "What is ELSI?", href: "/elsi#what-is-elsi" },
      { name: "Ethical Issues", href: "/elsi#ethical" },
      { name: "Legal Issues", href: "/elsi#legal" },
    ],
  },
  {
    title: "Lab Notebook",
    links: [
      { name: "Abstract", href: "/lab-notebook#abstract" },
      { name: "Wetlab", href: "/lab-notebook#wetlab" },
      { name: "Computational", href: "/lab-notebook#computational" },
    ],
  },
];


// Data untuk kontak
const contactDetails = [
  {
    icon: <Mail size={16} />,
    text: "contact@company.com",
    href: "mailto:contact@company.com",
  },
  {
    icon: <Phone size={16} />,
    text: "(414) 687 - 5892",
    href: "tel:+14146875892",
  },
  {
    icon: <MapPin size={16} />,
    text: "794 Mcallister St, San Francisco, 94102",
    href: "#",
  },
];

export default function Footer() {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  // PERBAIKAN: Fungsi toggle hanya akan berjalan jika di mobile
  const toggleSection = (title: string) => {
    // Cek lebar layar sebelum menjalankan fungsi
    if (window.innerWidth < 768) {
      // 768px adalah breakpoint default `md` di Tailwind
      setOpenSections((prev) => ({
        ...prev,
        [title]: !prev[title],
      }));
    }
  };

  return (
    <footer className="bg-background text-muted-foreground border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Kolom Logo dan Deskripsi */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/assets/icon/logo-lama.svg"
                alt="Logo"
                width={32}
                height={32}
              />
              <span className="font-bold text-lg text-foreground">Biomod</span>
            </Link>
            <p className="mt-4 text-sm">
              Deskripsi singkat tentang tim atau proyek Anda di sini.
            </p>
          </div>

          {/* Kolom Link Dinamis */}
          {footerLinks.map((section) => {
            const isOpen = !!openSections[section.title]; // Memastikan nilai boolean

            return (
              <div key={section.title}>
                <div
                  className="flex justify-between items-center cursor-pointer md:cursor-auto"
                  onClick={() => toggleSection(section.title)}
                  role="button"
                  aria-expanded={isOpen}
                  aria-controls={`footer-section-${section.title}`}
                >
                  <h3 className="font-bold text-foreground mb-4">
                    {section.title}
                  </h3>
                  <ChevronDown
                    size={20}
                    className={`md:hidden transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {/* PERBAIKAN: Logika kelas yang lebih bersih untuk mobile dropdown */}
                <ul
                  id={`footer-section-${section.title}`}
                  className={`space-y-3 transition-all duration-300 ease-in-out 
                    md:block md:max-h-none md:overflow-visible 
                    ${isOpen ? "max-h-96" : "max-h-0 overflow-hidden"}`}
                >
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          {/* Kolom Kontak */}
          <div>
            <h3 className="font-bold text-foreground mb-4">Contacts us</h3>
            <ul className="space-y-4">
              {contactDetails.map((item) => (
                <li key={item.text} className="flex items-start space-x-3">
                  <span className="mt-1 text-primary">{item.icon}</span>
                  <a
                    href={item.href}
                    className="text-sm hover:text-foreground transition-colors"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-8 border-border" />

        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p className="text-sm">Copyright © 2025 Biomod</p>
          <p className="text-sm">All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
