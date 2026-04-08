"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCalendarStore } from "@/store/calendarStore";
import { HeroPanel } from "@/components/HeroPanel";
import { MonthGrid } from "@/components/MonthGrid";
import { MonthNav } from "@/components/MonthNav";
import { NotesPanel } from "@/components/NotesPanel";
import { RingBinder } from "@/components/RingBinder";
import { MobileNotesToggle } from "@/components/MobileSheet";

export function CalendarShell() {
  const { currentDate } = useCalendarStore();
  const ref = useRef<HTMLDivElement>(null);
  const [allowTilt, setAllowTilt] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 150,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 150,
    damping: 30,
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    const apply = () => setAllowTilt(mediaQuery.matches);
    apply();
    mediaQuery.addEventListener("change", apply);
    return () => mediaQuery.removeEventListener("change", apply);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!allowTilt) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <div className="absolute left-1/2 top-0 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-ring/40" />

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: allowTilt ? rotateX : 0,
          rotateY: allowTilt ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full max-w-5xl"
      >
        <RingBinder />

        <div
          className="paper-surface relative overflow-hidden rounded-2xl bg-paper shadow-calendar"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="hidden min-h-[600px] h-full md:grid md:grid-cols-[2fr_1fr]">
            <div className="flex flex-col">
              <div className="relative h-52">
                <HeroPanel month={currentDate.getMonth()} />
              </div>
              <MonthNav />
              <MonthGrid />
            </div>
            <NotesPanel />
          </div>

          <div className="flex flex-col md:hidden">
            <div className="relative h-40">
              <HeroPanel month={currentDate.getMonth()} />
            </div>
            <MonthNav />
            <MonthGrid />
            <MobileNotesToggle />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
