"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCalendarStore } from "@/store/calendarStore";
import { useCalendar } from "@/hooks/useCalendar";
import { useRangeSelect } from "@/hooks/useRangeSelect";
import { DateCell } from "@/components/DateCell";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const PAGE_EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const pageCurlVariants = {
  enter: (direction: string) => ({
    rotateY: direction === "forward" ? 90 : -90,
    opacity: 0,
    transformOrigin: direction === "forward" ? "left center" : "right center",
  }),
  center: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.45, ease: PAGE_EASE },
  },
  exit: (direction: string) => ({
    rotateY: direction === "forward" ? -90 : 90,
    opacity: 0,
    transformOrigin: direction === "forward" ? "right center" : "left center",
    transition: { duration: 0.4, ease: PAGE_EASE },
  }),
};

export function MonthGrid() {
  const { currentDate, curlDirection } = useCalendarStore();
  const cells = useCalendar(currentDate);
  const { handleDateClick, isInRange, isRangeStart, isRangeEnd, setHoverDate } =
    useRangeSelect();

  return (
    <div
      style={{ perspective: "1200px" }}
      className="relative p-2 sm:p-4 md:flex-1 md:min-h-0"
    >
      <AnimatePresence mode="wait" custom={curlDirection}>
        <motion.div
          key={`${currentDate.getFullYear()}-${currentDate.getMonth()}`}
          custom={curlDirection}
          variants={pageCurlVariants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{ transformStyle: "preserve-3d" }}
          className="min-h-0"
        >
          <div className="mb-1 grid grid-cols-7 sm:mb-2">
            {DAY_LABELS.map((d) => (
              <div
                key={d}
                className="py-0.5 text-center text-[10px] font-medium uppercase tracking-wide text-ink-muted sm:py-1 sm:text-xs"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
            {cells.map((cell, i) => (
              <DateCell
                key={`${cell.date.toISOString()}-${i}`}
                cell={cell}
                isStart={isRangeStart(cell.date)}
                isEnd={isRangeEnd(cell.date)}
                isInRange={isInRange(cell.date)}
                onClick={handleDateClick}
                onHover={setHoverDate}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
