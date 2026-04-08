export interface DateCell {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isWeekend: boolean;
  isHoliday: boolean;
  holidayName?: string;
}

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface Note {
  id: string;
  rangeKey: string;
  content: string;
  color: "yellow" | "blue" | "pink" | "green";
  createdAt: number;
  pinned: boolean;
}

export interface CosmicScene {
  month: number;
  name: string;
  particleColor: string;
  particleCount: number;
  nebulaColor: string;
  description: string;
}
