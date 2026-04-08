"use client";

import { motion } from "framer-motion";
import { format } from "date-fns";
import { useCalendarStore } from "@/store/calendarStore";

export function MonthNav() {
  const { currentDate, goToNextMonth, goToPrevMonth } = useCalendarStore();

  return (
    <div className="flex items-center justify-between border-b border-ink/8 px-5 py-3">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={goToPrevMonth}
        className="flex h-8 w-8 items-center justify-center rounded-full font-sans text-sm text-ink-muted transition-colors hover:bg-paper-dark hover:text-ink"
      >
        ←
      </motion.button>

      <div className="text-center">
        <h2 className="font-serif text-xl font-semibold text-ink">{format(currentDate, "MMMM")}</h2>
        <p className="font-sans text-xs tracking-widest text-ink-muted">
          {format(currentDate, "yyyy")}
        </p>
      </div>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={goToNextMonth}
        className="flex h-8 w-8 items-center justify-center rounded-full font-sans text-sm text-ink-muted transition-colors hover:bg-paper-dark hover:text-ink"
      >
        →
      </motion.button>
    </div>
  );
}
