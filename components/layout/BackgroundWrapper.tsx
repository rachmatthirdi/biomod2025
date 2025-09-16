"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

// Tipe untuk data background (didefinisikan manual karena dari JSON)
interface BackgroundData {
  [key: string]: {
    light: string;
    dark: string;
  };
}

interface BackgroundWrapperProps {
  children: React.ReactNode;
  pageKey: string; // Tipe berubah menjadi string karena tidak ada lagi type-safety dari TS
}

export default function BackgroundWrapper({
  children,
  pageKey,
}: BackgroundWrapperProps) {
  const [mounted, setMounted] = useState(false);
  // State baru untuk menyimpan data JSON dan status loading
  const [backgrounds, setBackgrounds] = useState<BackgroundData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    fetch("/data/background-data.json") // Path relatif ke file di folder public
      .then((res) => res.json())
      .then((data) => {
        setBackgrounds(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Gagal memuat backgroundData.json:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Tampilkan loading atau fallback jika data belum siap
  if (isLoading || !backgrounds) {
    return <div className="min-h-screen relative">{children}</div>;
  }

  const imagePaths = backgrounds[pageKey] || backgrounds.default;
  const lightBg = imagePaths.light;
  const darkBg = imagePaths.dark;

  // Logika untuk hydration tetap sama
  if (!mounted) {
    return (
      <div
        className="min-h-screen relative"
        style={{
          backgroundImage: `url(${lightBg})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        {children}
      </div>
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const backgroundUrl = currentTheme === "dark" ? darkBg : lightBg;

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        transition: "background-image 0.3s ease-in-out",
      }}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
