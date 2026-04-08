"use client";

import { useRef } from "react";
import { format } from "date-fns";
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
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
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

  const getStateClass = () => {
    if (isStart || isEnd) return "bg-ink text-paper shadow-date-hover z-10";
    if (isInRange) return "aurora-range text-ink";
    if (cell.isToday) return "border border-ink/30 text-ink font-semibold";
    if (!cell.isCurrentMonth) return "text-ink-muted/30";
    if (cell.isWeekend) return "text-ink-muted";
    return "text-ink hover:bg-paper-dark";
  };

  return (
    <div
      ref={ref}
      className={`date-cell relative flex aspect-square w-full cursor-pointer select-none flex-col items-center justify-center rounded-lg font-sans text-sm font-medium transition-all duration-150 ${getStateClass()}`}
      onClick={() => onClick(cell.date)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => onHover(cell.date)}
      title={cell.holidayName}
    >
      {format(cell.date, "d")}
      {cell.isHoliday && (
        <span className="absolute bottom-1 h-1 w-1 rounded-full bg-aurora-mid" />
      )}
      {cell.isToday && <span className="absolute right-1 top-1 h-1 w-1 rounded-full bg-ink" />}
    </div>
  );
}
