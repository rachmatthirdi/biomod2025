"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { useLongPress } from "@/hooks/useLongPress";
import { navItems, NavItem } from "@/lib/navData";
import { useNavbar } from "@/app/context/NavbarContext";
import { cn } from "@/lib/utils";

// ====================================================================
// KOMPONEN MEMOIZED UNTUK SETIAP ITEM NAVIGASI
// ====================================================================
// const MemoizedNavItem = memo(function MemoizedNavItem({
//   item,
//   isActive,
//   isHorizontal,
//   onMouseEnter,
//   onMainLinkClick,
//   longPressHandlers,
// }: {
//   item: NavItem;
//   isActive: boolean;
//   isHorizontal: boolean;
//   onMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
//   onMainLinkClick: (item: NavItem) => void;
//   longPressHandlers: ReturnType<typeof useLongPress>;
// }) {
//   return (
//     <div key={item.name} className="relative">
//       <Button
//         variant="ghost"
//         className={cn(
//           "flex items-center !h-auto !w-auto m-2 p-3 lg:m-1 lg:p-2 transition-colors hover:bg-accent hover:text-accent-foreground hover:rounded-md",
//           isActive && "bg-accent text-accent-foreground rounded-md"
//         )}
//         onClick={() => onMainLinkClick(item)}
//         {...longPressHandlers}
//         onMouseEnter={onMouseEnter}
//         data-tooltip={`${item.name} page`}
//       >
//         <item.icon
//           className={cn(
//             "!h-6 !w-6",
//             isActive && !isHorizontal && "text-primary"
//           )}
//         />
//         <span className={cn(!isHorizontal ? "hidden" : "hidden lg:inline")}>
//           {item.name}
//         </span>
//       </Button>
//     </div>
//   );
// });

// ====================================================================
// KOMPONEN NAVBAR UTAMA
// ====================================================================
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const showTooltip = useCallback(
    (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      const tooltipText = element.getAttribute("data-tooltip") || "";
      if (!tooltipText) return;

      let x = 0,
        y = 0,
        transform = "";
      const gap = 10;

      switch (navbarPosition) {
        case "left":
          x = rect.right + gap;
          y = rect.top + rect.height / 2;
          transform = "translateY(-50%)";
          break;
        case "right":
          x = rect.left - gap;
          y = rect.top + rect.height / 2;
          transform = "translateX(-100%) translateY(-50%)";
          break;
        default:
          y = rect.bottom + gap;
          x = rect.left + rect.width / 2;
          transform = "translateX(-50%)";
          break;
      }
      setTooltip({ text: tooltipText, x, y, transform });
    },
    [navbarPosition]
  );

  useEffect(() => {
    if (tooltip && tooltipRef.current) {
      const tooltipEl = tooltipRef.current;
      const tooltipRect = tooltipEl.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const gap = 10;

      let newLeft = tooltip.x;
      let newTop = tooltip.y;

      if (tooltipRect.right > viewportWidth) {
        newLeft = viewportWidth - tooltipRect.width - gap;
      }
      if (tooltipRect.left < 0 && navbarPosition !== "right") {
        newLeft = gap;
      }
      if (tooltipRect.bottom > viewportHeight) {
        newTop = viewportHeight - tooltipRect.height - gap;
      }
      if (tooltipRect.top < 0) {
        newTop = gap;
      }

      tooltipEl.style.left = `${newLeft}px`;
      tooltipEl.style.top = `${newTop}px`;
    }
  }, [tooltip, navbarPosition]);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      showTooltip(e.currentTarget);
    },
    [showTooltip]
  );

  const hideTooltip = useCallback(() => setTooltip(null), []);

  const longPressHandlers = useLongPress(
    (element: HTMLElement) => showTooltip(element),
    hideTooltip
  );

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

  useEffect(() => {
    if (!mounted) return;
    const handleResize = () => {
      const isMobile = window.innerWidth < 1080;
      if (isMobile && navbarPosition === "top") {
        setNavbarPosition("left");
      }
      if (!isMobile && navbarPosition !== "top") {
        setNavbarPosition("top");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted, navbarPosition, setNavbarPosition]);

  const handleMainLinkClick = useCallback(
    (item: NavItem) => {
      const isHorizontal = navbarPosition === "top";
      if (
        !isHorizontal ||
        item.sections.length === 0 ||
        expandedItem === item.name
      ) {
        window.location.href = item.href;
      } else {
        setExpandedItem(item.name);
      }
    },
    [navbarPosition, expandedItem]
  );

  const isHorizontal = navbarPosition === "top";

  const positionClasses = {
    top: "top-0 left-1/2 -translate-x-1/2 w-[90vw] xl:w-[70vw] h-[50px] rounded-3xl border xl:my-5 my-3 mx-auto",
    left: "top-1/2 -translate-y-1/2 left-0 w-[50px] h-[50vh] rounded-3xl border xl:mx-5 mx-3",
    right:
      "top-1/2 -translate-y-1/2 right-0 w-[50px] h-[50vh] rounded-3xl border xl:mx-5 mx-3",
  };

  const layoutClasses = {
    top: "flex-row",
    left: "flex-col py-4 space-y-4",
    right: "flex-col py-4 space-y-4",
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <nav
        className={`fixed z-50 bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${positionClasses[navbarPosition]}`}
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
            className={`flex items-center text-white ${
              isHorizontal ? "flex-row space-x-1" : "flex-col space-y-2"
            }`}
          >
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                <Button
                  variant="ghost"
                  className={`flex items-center lg:my-4 px-2 hover:text-white hover:bg-gray-200 hover:rounded-md${
                    pathname === item.href
                      ? "bg-white border-b-4"
                      : ""
                  }`}
                  onClick={() => handleMainLinkClick(item)}
                  {...longPressHandlers}
                  onMouseEnter={handleMouseEnter}
                  data-tooltip={`${item.name} page`}
                >
                  <item.icon
                    className={`!h-6 !w-6  text-white${
                      pathname === item.href && !isHorizontal
                        ? "text-primary "
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
            className={`flex items-center text-white ${
              isHorizontal
                ? "flex-row space-x-2"
                : "flex-col-reverse space-y-2 space-y-reverse"
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={hideTooltip}
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
