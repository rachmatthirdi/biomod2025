import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
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
  return (
    // Menggunakan variabel tema semantik: bg-background, text-muted-foreground, border-border
    <footer className="bg-background text-muted-foreground border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Kolom Logo dan Deskripsi */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            {/* Judul menggunakan text-foreground untuk kontras yang lebih tinggi */}
            <h2 className="text-xl font-bold text-foreground mb-4">Logo</h2>
            <p className="text-sm mb-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit aliquam.
            </p>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  // Ikon menggunakan text-muted-foreground dan berubah menjadi text-foreground saat di-hover
                  className="hover:text-foreground transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            {/* Link khusus menggunakan warna primary */}
            <Link
              href="#"
              className="font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Meet Our Team
            </Link>
          </div>

          {/* Kolom Link Dinamis */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-bold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
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
          ))}

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
