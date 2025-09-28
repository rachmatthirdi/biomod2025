"use client";

import BackgroundWrapper from "@/components/layout/BackgroundWrapper";
import { useNavbar } from "@/app/context/NavbarContext";
import { useState, useEffect } from "react"; // 1. Impor useState dan useEffect

export default function HomePage() {
  const { navbarPosition } = useNavbar();

  // 2. Tambahkan state 'mounted' untuk melacak status render di klien
  const [mounted, setMounted] = useState(false);

  // 3. Gunakan useEffect untuk mengubah 'mounted' menjadi true setelah render pertama di klien
  useEffect(() => {
    setMounted(true);
  }, []);

  const marginClasses = {
    top: "pt-[100px]",
    left: "pl-[100px]",
    right: "pr-[100px]",
    bottom: "", // Tambahkan 'bottom' untuk konsistensi
  };

  // 4. Tentukan kelas yang akan digunakan.
  //    - Sebelum mounted, paksa gunakan 'top' agar cocok dengan server.
  //    - Setelah mounted, gunakan posisi yang sebenarnya dari konteks.
  const appliedMarginClass = mounted
    ? marginClasses[navbarPosition]
    : marginClasses.top;

  return (
    <BackgroundWrapper pageKey="home">
      <div
        className={`min-h-screen transition-all duration-0 ${appliedMarginClass}`}
      >
        {/* Hero Section */}
        <section className="py-5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Research Platform
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              A comprehensive platform for managing research ideas, ethical
              considerations, lab documentation, and team collaboration.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Ideas</h3>
                <p className="text-muted-foreground">
                  Explore innovative research concepts
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">ELSI</h3>
                <p className="text-muted-foreground">
                  Ethical, Legal & Social Implications
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Lab Notebook</h3>
                <p className="text-muted-foreground">
                  Document your research journey
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Team</h3>
                <p className="text-muted-foreground">Meet our research team</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        {/* <section className="py-20">
          <div className="sketchfab-embed-wrapper">
            <iframe
              title="Chlamydomonas"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; fullscreen; xr-spatial-tracking"
              src="https://sketchfab.com/models/bb65326ef6724edf87934787000b32df/embed"
              style={{ width: "100%", height: "480px" }}
            ></iframe>
            <p
              style={{
                fontSize: 13,
                fontWeight: "normal",
                margin: 5,
                color: "#4A4A4A",
              }}
            >
              <a
                href="https://sketchfab.com/3d-models/chlamydomonas-bb65326ef6724edf87934787000b32df?utm_medium=embed&utm_campaign=share-popup&utm_content=bb65326ef6724edf87934787000b32df"
                target="_blank"
                rel="nofollow"
                style={{ fontWeight: "bold", color: "#1CAAD9" }}
              >
                Chlamydomonas
              </a>{" "}
              by{" "}
              <a
                href="https://sketchfab.com/arloopa?utm_medium=embed&utm_campaign=share-popup&utm_content=bb65326ef6724edf87934787000b32df"
                target="_blank"
                rel="nofollow"
                style={{ fontWeight: "bold", color: "#1CAAD9" }}
              >
                arloopa
              </a>{" "}
              on{" "}
              <a
                href="https://sketchfab.com?utm_medium=embed&utm_campaign=share-popup&utm_content=bb65326ef6724edf87934787000b32df"
                target="_blank"
                rel="nofollow"
                style={{ fontWeight: "bold", color: "#1CAAD9" }}
              >
                Sketchfab
              </a>
            </p>
          </div>
        </section> */}

        {/* Call to Action */}
        <section className="bg-primary/5 py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Research Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our comprehensive platform designed to support every
              aspect of your research workflow.
            </p>
          </div>
        </section>
      </div>
    </BackgroundWrapper>
  );
}
