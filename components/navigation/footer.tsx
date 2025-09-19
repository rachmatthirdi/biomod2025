"use client";
import Link from "next/link";
import { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
} from "lucide-react";

// Data untuk link di footer agar mudah dikelola
const footerLinks = [
  {
    title: "Ideas",
    links: [
      { name: "Relevance", href: "#" },
      { name: "Goals & Success Criteria", href: "#" },
      { name: "Feasibility", href: "#" },
      { name: "Challenges", href: "#" },
      { name: "Design Process and Logic", href: "#" },
    ],
  },
  {
    title: "ELSI",
    links: [
      { name: "What is ELSI?", href: "#" },
      { name: "Ethical Issues", href: "#" },
      { name: "Legal Issues", href: "#" },
      { name: "Social Issues", href: "#" },
      { name: "Reference", href: "#" },
    ],
  },
  {
    title: "Lab Notebook",
    links: [
      { name: "Abstract", href: "#" },
      { name: "Wetlab", href: "#" },
      { name: "Computational", href: "#" },
      { name: "Further Directions", href: "#" },
      { name: "Lorem", href: "#" },
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

// Data untuk ikon sosial media
const socialLinks = [
  { icon: <Facebook size={18} />, href: "#", label: "Facebook" },
  { icon: <Twitter size={18} />, href: "#", label: "Twitter" },
  { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
  { icon: <Linkedin size={18} />, href: "#", label: "LinkedIn" },
  { icon: <Youtube size={18} />, href: "#", label: "YouTube" },
];

export default function Footer() {
  // BARU: State untuk melacak bagian mana yang terbuka di mobile
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    {}
  );

  // BARU: Fungsi untuk toggle status buka/tutup
  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  return (
    // Menggunakan variabel tema semantik: bg-background, text-muted-foreground, border-border
    <footer className="bg-background text-muted-foreground border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Kolom Logo dan Deskripsi (tidak ada perubahan signifikan) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            {/* ... (kode logo, deskripsi, dan sosial media sama) */}
          </div>

          {/* Kolom Link Dinamis (MODIFIKASI DI SINI) */}
          {footerLinks.map((section) => {
            // BARU: Cek apakah section ini sedang terbuka
            const isOpen = openSections[section.title];

            return (
              <div key={section.title}>
                {/* BARU: Judul sekarang bisa di-klik untuk toggle di mobile */}
                <div
                  className="flex justify-between items-center cursor-pointer md:cursor-auto"
                  onClick={() => toggleSection(section.title)}
                  role="button"
                  aria-expanded={isOpen}
                  aria-controls={`footer-section-${section.title}`}
                >
                  <h3 className="font-bold text-foreground mb-4 md:mb-4">
                    {section.title}
                  </h3>
                  {/* BARU: Ikon Chevron yang hanya tampil di mobile dan berputar saat aktif */}
                  <ChevronDown
                    size={20}
                    className={`md:hidden transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {/* BARU: Modifikasi UL untuk dropdown di mobile */}
                <ul
                  id={`footer-section-${section.title}`}
                  className={`space-y-3 overflow-hidden transition-all duration-300 ease-in-out md:max-h-none ${
                    isOpen ? "max-h-96" : "max-h-0" // Buka/tutup dropdown
                  }`}
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
                  {/* Ikon kontak menggunakan warna primary */}
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

        {/* Garis pemisah menggunakan border-border */}
        <hr className="my-8 border-border" />

        {/* Bagian Copyright */}
        <div className="flex flex-col items-center justify-between sm:flex-row">
          <p className="text-sm">Copyright © 2025 Biomod</p>
          <p className="text-sm">All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
