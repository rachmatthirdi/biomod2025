import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/footer";
import { NavbarProvider } from "@/app/context/NavbarContext";

const roboto = Roboto({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Research Platform",
  description:
    "A comprehensive research platform with Ideas, ELSI, Lab Notebook, and Team sections",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <NavbarProvider>
            <Navbar />
            <main className="pt-0">{children}</main>
            <Footer />
          </NavbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
