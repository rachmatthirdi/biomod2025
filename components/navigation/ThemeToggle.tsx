"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useLongPress } from "@/hooks/useLongPress";
import { useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [tooltip, setTooltip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);

  const longPressHandlers = useLongPress(
    (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      setTooltip({
        text: "Toggle between light and dark theme",
        x: rect.left + rect.width / 2,
        y: rect.bottom + 8,
      });
    },
    () => {
      setTooltip(null);
    }
  );

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative h-16 w-16 p-0 m-0"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        {...longPressHandlers}
      >
        <Sun className="!h-8 !w-8 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute !h-8 !w-8 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {tooltip && (
        <div
          className="fixed z-[100] bg-background border rounded-md shadow-lg h-16 w-16 px-2 py-1 text-sm pointer-events-none"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: "translateX(-50%)",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  );
}
