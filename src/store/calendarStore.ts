import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { DateRange, Note } from "@/types";

interface CalendarStore {
  currentDate: Date;
  selectedRange: DateRange;
  notes: Note[];
  isPageCurling: boolean;
  curlDirection: "forward" | "backward";
  goToNextMonth: () => void;
  goToPrevMonth: () => void;
  setRangeStart: (date: Date) => void;
  setRangeEnd: (date: Date) => void;
  clearRange: () => void;
  addNote: (note: Omit<Note, "id" | "createdAt">) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
  togglePinNote: (id: string) => void;
}

const reviveDate = (value: unknown, fallback: Date | null): Date | null => {
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed;
  }
  return fallback;
};

export const useCalendarStore = create<CalendarStore>()(
  persist(
    (set) => ({
      currentDate: new Date(),
      selectedRange: { start: null, end: null },
      notes: [],
      isPageCurling: false,
      curlDirection: "forward",

      goToNextMonth: () => {
        set({ isPageCurling: true, curlDirection: "forward" });
        setTimeout(() => {
          set((state) => ({
            currentDate: new Date(
              state.currentDate.getFullYear(),
              state.currentDate.getMonth() + 1,
              1
            ),
            isPageCurling: false,
          }));
        }, 500);
      },

      goToPrevMonth: () => {
        set({ isPageCurling: true, curlDirection: "backward" });
        setTimeout(() => {
          set((state) => ({
            currentDate: new Date(
              state.currentDate.getFullYear(),
              state.currentDate.getMonth() - 1,
              1
            ),
            isPageCurling: false,
          }));
        }, 500);
      },

      setRangeStart: (date) => set({ selectedRange: { start: date, end: null } }),
      setRangeEnd: (date) =>
        set((state) => ({ selectedRange: { ...state.selectedRange, end: date } })),
      clearRange: () => set({ selectedRange: { start: null, end: null } }),

      addNote: (note) =>
        set((state) => ({
          notes: [
            ...state.notes,
            { ...note, id: crypto.randomUUID(), createdAt: Date.now() },
          ],
        })),
      updateNote: (id, content) =>
        set((state) => ({
          notes: state.notes.map((n) => (n.id === id ? { ...n, content } : n)),
        })),
      deleteNote: (id) =>
        set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
      togglePinNote: (id) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, pinned: !n.pinned } : n
          ),
        })),
    }),
    {
      name: "chrono-wall-storage",
      merge: (persistedState, currentState) => {
        const persisted = (persistedState ?? {}) as Partial<CalendarStore>;
        const persistedRange = persisted.selectedRange as
          | Partial<DateRange>
          | undefined;

        return {
          ...currentState,
          ...persisted,
          currentDate: reviveDate(persisted.currentDate, currentState.currentDate) ?? new Date(),
          selectedRange: {
            start: reviveDate(
              persistedRange?.start,
              currentState.selectedRange.start
            ),
            end: reviveDate(persistedRange?.end, currentState.selectedRange.end),
          },
        };
      },
    }
  )
);
