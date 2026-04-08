import {
  eachDayOfInterval,
  addDays,
  isSameMonth,
  isToday,
  isWeekend,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import type { DateCell } from "@/types";

const HOLIDAYS: Record<string, string> = {
  "01-26": "Republic Day",
  "08-15": "Independence Day",
  "10-02": "Gandhi Jayanti",
  "12-25": "Christmas",
};

export function useCalendar(currentDate: Date): DateCell[] {
  const monthStart = startOfMonth(currentDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  // Keep a fixed 6-row calendar grid (42 cells) for stable layout across months.
  const gridEnd = addDays(gridStart, 41);

  return eachDayOfInterval({ start: gridStart, end: gridEnd }).map((date) => {
    const key = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
    return {
      date,
      isCurrentMonth: isSameMonth(date, currentDate),
      isToday: isToday(date),
      isWeekend: isWeekend(date),
      isHoliday: !!HOLIDAYS[key],
      holidayName: HOLIDAYS[key],
    };
  });
}
