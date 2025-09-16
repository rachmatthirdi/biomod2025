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
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Platform Features
            </h2>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation Hub</h3>
                <p className="text-muted-foreground">
                  Centralized space for research ideas and concepts
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚖️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Ethics Framework</h3>
                <p className="text-muted-foreground">
                  Comprehensive ELSI considerations
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Documentation</h3>
                <p className="text-muted-foreground">
                  Detailed lab notebook and progress tracking
                </p>
              </div>
            </div>
          </div>
        </section>

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
