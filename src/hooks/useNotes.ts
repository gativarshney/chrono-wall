import { format } from "date-fns";
import { useCalendarStore } from "@/store/calendarStore";

export function useNotes() {
  const { notes, selectedRange, addNote, updateNote, deleteNote, togglePinNote } =
    useCalendarStore();

  const rangeKey = selectedRange.start
    ? `${format(selectedRange.start, "yyyy-MM-dd")}_${format(
        selectedRange.end || selectedRange.start,
        "yyyy-MM-dd"
      )}`
    : null;

  const sortNotes = <T extends (typeof notes)[number]>(list: T[]) =>
    [...list].sort((a, b) => {
      if (a.pinned !== b.pinned) return Number(b.pinned) - Number(a.pinned);
      return b.createdAt - a.createdAt;
    });

  const rangeNotes = rangeKey ? sortNotes(notes.filter((n) => n.rangeKey === rangeKey)) : [];
  const allNotes = sortNotes(notes);

  const addNewNote = (color: "yellow" | "blue" | "pink" | "green" = "yellow") => {
    if (!rangeKey) return;
    addNote({ rangeKey, content: "", color, pinned: false });
  };

  return {
    rangeNotes,
    allNotes,
    rangeKey,
    addNewNote,
    updateNote,
    deleteNote,
    togglePinNote,
  };
}
