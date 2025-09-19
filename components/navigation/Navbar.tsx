"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { useLongPress } from "@/hooks/useLongPress";
import { navItems, NavItem } from "@/lib/navData";
import { useNavbar } from "@/app/context/NavbarContext";
import Image from "next/image";

export default function Navbar() {
  const { navbarPosition, setNavbarPosition } = useNavbar();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
    transform: string;
  } | null>(null);
  const pathname = usePathname();

  // Ganti useEffect deteksi tabrakan Anda dengan yang ini
  useEffect(() => {
    if (tooltip && tooltipRef.current) {
      const tooltipEl = tooltipRef.current;
      const tooltipRect = tooltipEl.getBoundingClientRect();
      const viewportWidth = 100 * window.innerWidth;
      const viewportHeight = 100 * window.innerHeight;
      const gap = 10; // Jarak aman dari tepi layar

      if (tooltipRect.right > viewportWidth) {
        tooltipEl.style.left = `${viewportWidth - tooltipRect.width / 2}px`;
      }

      // 2. Cek & perbaiki jika tooltip keluar dari sisi KIRI layar
      //    Kondisi `&& navbarPosition !== 'right'` SANGAT PENTING di sini.
      //    Ini mencegah logika ini berjalan saat navbar di kanan, karena saat itu
      //    tooltip memang seharusnya berada di sisi kiri.
      if (tooltipRect.left < 0 && navbarPosition !== "right") {
        tooltipEl.style.left = `${gap}px`;
      }

      // 3. Cek & perbaiki tabrakan vertikal (atas dan bawah)
      if (tooltipRect.bottom > viewportHeight) {
        tooltipEl.style.top = `${viewportHeight - tooltipRect.height - gap}px`;
      }
      if (tooltipRect.top < 0) {
        tooltipEl.style.top = `${gap}px`;
      }
    }
  }, [tooltip, navbarPosition]); // Pastikan dependency array menyertakan navbarPosition

  // ====================================================================
  // PERBAIKAN 1: MENGATASI HYDRATION ERROR
  // State `mounted` untuk memastikan logika klien hanya berjalan setelah mounting.
  // ====================================================================
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Ganti fungsi showTooltip Anda dengan yang ini
  const showTooltip = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const tooltipText = element.getAttribute("data-tooltip") || "";
    if (!tooltipText) return;

    let x = 0,
      y = 0,
      transform = "";

    const gap = 10; // Jarak yang Anda inginkan (10px)

    switch (navbarPosition) {
      case "left":
        // Posisi: 10px di sebelah kanan ikon
        x = rect.right + gap;
        // Sejajarkan titik tengah vertikal tooltip dengan titik tengah vertikal ikon
        y = rect.top + rect.height / 2;
        // Transformasi: Geser ke atas sebesar 50% dari TINGGI tooltip itu sendiri
        transform = "translateY(-50%)";
        break;

      case "right":
        // Posisi: 10px di sebelah kiri ikon
        x = rect.left - gap;
        // Sejajarkan titik tengah vertikal
        y = rect.top + rect.height / 2;
        // Transformasi: Geser ke kiri 100% dari LEBAR tooltip, lalu geser ke atas 50% dari TINGGI tooltip
        transform = "translateX(-100%) translateY(-50%)";
        break;

      default: // Untuk 'top' dan 'bottom'
        // Posisi: 10px di bawah ikon
        y = rect.bottom + gap;
        // Sejajarkan titik tengah horizontal tooltip dengan titik tengah horizontal ikon
        x = rect.left + rect.width / 2;
        // Transformasi: Geser ke kiri sebesar 50% dari LEBAR tooltip itu sendiri
        transform = "translateX(-50%)";
        break;
    }

    setTooltip({ text: tooltipText, x, y, transform });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    showTooltip(e.currentTarget);
  };

  // Handler long-press untuk item biasa
  const longPressHandlers = useLongPress(
    (element: HTMLElement) =>
      handleMouseEnter({
        currentTarget: element,
      } as React.MouseEvent<HTMLElement>),
    () => setTooltip(null)
  );

  // ====================================================================
  // PERBAIKAN 2: MEMPERBAIKI TOOLTIP PADA LOGO
  // Menggabungkan logika ubah posisi DAN tampilkan/sembunyikan tooltip.
  // ====================================================================
  const logoLongPressHandlers = useLongPress(
    (element: HTMLElement) => {
      // Aksi 1: Ubah posisi navbar
      if (navbarPosition === "top") setNavbarPosition("left");
      else if (navbarPosition === "left") setNavbarPosition("right");
      else setNavbarPosition("top");

      // Aksi 2: Tampilkan tooltip
      handleMouseEnter({
        currentTarget: element,
      } as React.MouseEvent<HTMLElement>);
    },
    () => setTooltip(null) // Sembunyikan tooltip saat dilepas
  );

  // ====================================================================
  // PERBAIKAN 3: MEMPERBAIKI LOGIKA POSISI & MENGHILANGKAN DUPLIKASI
  // Satu useEffect yang rapi untuk menangani posisi default saat resize/load.
  // Logika ini sekarang hanya berjalan setelah `mounted`.
  // ====================================================================
  useEffect(() => {
    if (!mounted) return; // Hanya jalankan jika sudah di client

    const handleResize = () => {
      const isMobile = window.innerWidth < 1080;
      if (isMobile && navbarPosition === "top") {
        setNavbarPosition("left"); // Otomatis ke kiri di mobile jika posisi 'top'
      }
      if (!isMobile && navbarPosition !== "top") {
        setNavbarPosition("top"); // Otomatis ke atas di desktop jika posisi bukan 'top'
      }
    };

    handleResize(); // Cek sekali saat komponen siap
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mounted, navbarPosition, setNavbarPosition]); // Dependensi yang benar

  const handleMainLinkClick = (item: NavItem) => {
    const isHorizontal = navbarPosition === "top";
    if (!isHorizontal || item.sections.length === 0) {
      window.location.href = item.href;
      return;
    }
    if (expandedItem === item.name) {
      window.location.href = item.href;
    } else {
      setExpandedItem(item.name);
    }
  };

  const positionClasses = {
    top: `top-0 left-1/2 -translate-x-1/2 w-[90vw] xl:w-[70vw] h-[50px] rounded-3xl border xl:my-5 my-3 mx-auto`,
    left: `top-1/2 -translate-y-1/2 left-0 w-[50px] h-[50vh] rounded-3xl border xl:mx-5 mx-3`,
    right: `top-1/2 -translate-y-1/2 right-0 w-[50px] h-[50vh] rounded-3xl border xl:mx-5 mx-3`,
  };

  const layoutClasses = {
    top: "flex-row",
    left: "flex-col py-4 space-y-4",
    right: "flex-col py-4 space-y-4",
  };

  const isHorizontal = navbarPosition === "top";

  // Jika belum mounted, render null agar tidak ada mismatch
  if (!mounted) {
    return null;
  }

  return (
    <>
      <nav
        className={`fixed z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${positionClasses[navbarPosition]}`}
      >
        <div
          className={`container h-full py-1 lg:py-0 lg:px-5 mx-auto px-2 flex justify-between items-center ${layoutClasses[navbarPosition]}`}
        >
          <div
            className="cursor-pointer p-1"
            {...logoLongPressHandlers}
            onMouseEnter={handleMouseEnter}
            data-tooltip={`Long-press to change navbar position`}
          >
            <Link href="/">
              <Image
                src="/assets/icon/logo-lama.svg"
                alt="Logo Icon"
                width={32}
                height={32}
                className="!h-8 !w-8 !xl:h-10"
              />
            </Link>
          </div>

          <div
            className={`flex items-center ${
              isHorizontal ? "flex-row space-x-1" : "flex-col space-y-2"
            }`}
          >
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <Button
                  variant="ghost"
                  className={`flex items-center !h-2 !w-2 m-2 p-5 lg:m-10 !lg:p-4 ${
                    pathname === item.href
                      ? "bg-accent p-5 mx-5 lg:px-16 lg:py-5"
                      : ""
                  }`}
                  onClick={() => handleMainLinkClick(item)}
                  {...longPressHandlers}
                  onMouseEnter={handleMouseEnter}
                  data-tooltip={`${item.name} page`}
                >
                  <item.icon
                    className={`!h-6 !w-6 ${
                      pathname === item.href && !isHorizontal
                        ? "text-primary"
                        : ""
                    }`}
                  />
                  <span
                    className={`${
                      !isHorizontal ? "hidden" : "hidden lg:inline"
                    }`}
                  >
                    {item.name}
                  </span>
                </Button>
              </div>
            ))}
          </div>

          <div
            className={`flex items-center ${
              isHorizontal
                ? "flex-row space-x-2"
                : "flex-col-reverse space-y-2 space-y-reverse"
            }`}
            onMouseEnter={handleMouseEnter}
            data-tooltip={`Toggle dark/light mode`}
          >
            <ThemeToggle />
          </div>
        </div>
      </nav>
      {tooltip && (
        <div
          ref={tooltipRef}
          className="fixed z-[100] bg-background border rounded-md shadow-lg px-2 py-1 text-sm pointer-events-none animate-in fade-in-0 whitespace-nowrap"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: tooltip.transform,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  );
}
