import { useState } from "react";
import { isAfter, isBefore, isSameDay } from "date-fns";
import { useCalendarStore } from "@/store/calendarStore";

export function useRangeSelect() {
  const { selectedRange, setRangeStart, setRangeEnd, clearRange } = useCalendarStore();
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    if (!selectedRange.start || selectedRange.end) {
      setRangeStart(date);
    } else if (isBefore(date, selectedRange.start)) {
      setRangeStart(date);
    } else if (isSameDay(date, selectedRange.start)) {
      clearRange();
    } else {
      setRangeEnd(date);
    }
  };

  const isInRange = (date: Date): boolean => {
    if (!selectedRange.start) return false;
    const end = selectedRange.end || hoverDate;
    if (!end) return false;
    return isAfter(date, selectedRange.start) && isBefore(date, end);
  };

  const isRangeStart = (date: Date) =>
    selectedRange.start ? isSameDay(date, selectedRange.start) : false;
  const isRangeEnd = (date: Date) =>
    selectedRange.end ? isSameDay(date, selectedRange.end) : false;

  return {
    handleDateClick,
    isInRange,
    isRangeStart,
    isRangeEnd,
    hoverDate,
    setHoverDate,
    selectedRange,
  };
}
