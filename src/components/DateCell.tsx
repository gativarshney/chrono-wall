"use client";

import { useRef, useState } from "react";
import { format, isSameDay } from "date-fns";
import type { DateCell as DateCellType } from "@/types";

interface Props {
  cell: DateCellType;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  onClick: (date: Date) => void;
  onHover: (date: Date | null) => void;
}

export function DateCell({
  cell,
  isStart,
  isEnd,
  isInRange,
  onClick,
  onHover,
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const [allowMagnetic, setAllowMagnetic] = useState(true);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!allowMagnetic) return;
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    ref.current.style.transform = `translate(${x * 4}px, ${y * 4}px) translateZ(8px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "";
    onHover(null);
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    const isTouch = e.pointerType === "touch";
    setAllowMagnetic(!isTouch);
    if (isTouch) {
      onHover(cell.date);
    }
  };

  const getStateClass = () => {
    if (isStart || isEnd)
      return "bg-ink text-paper shadow-date-hover z-10 ring-1 ring-ink/30";
    if (isInRange) return "aurora-range text-ink font-semibold";
    if (cell.isToday) return "border border-ink/30 text-ink font-semibold";
    if (!cell.isCurrentMonth) return "text-ink-muted/30";
    if (cell.isWeekend) return "text-ink-muted";
    return "text-ink hover:bg-paper-dark";
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-label={format(cell.date, "PPPP")}
      aria-pressed={isStart || isEnd || isInRange || isSameDay(cell.date, new Date())}
      className={`date-cell relative isolate flex aspect-square w-full cursor-pointer select-none flex-col items-center justify-center rounded-md font-sans text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mid/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:rounded-lg sm:text-sm md:aspect-auto md:h-[clamp(2.65rem,4.7vh,3.3rem)] ${getStateClass()}`}
      onClick={() => onClick(cell.date)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => onHover(cell.date)}
      onPointerDown={handlePointerDown}
      onTouchStart={() => onHover(cell.date)}
      title={cell.holidayName}
    >
      <span className="relative z-[2]">{format(cell.date, "d")}</span>
      {cell.isHoliday && (
        <span className="absolute bottom-1 z-[2] h-1 w-1 rounded-full bg-aurora-mid" />
      )}
      {cell.isToday && (
        <span className="absolute right-1 top-1 z-[2] h-1 w-1 rounded-full bg-ink" />
      )}
    </button>
  );
}
