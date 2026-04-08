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

  const rangeNotes = rangeKey ? notes.filter((n) => n.rangeKey === rangeKey) : [];
  const allNotes = [...notes].sort((a, b) => Number(b.pinned) - Number(a.pinned));

  const addNewNote = (color: "yellow" | "blue" | "pink" | "green" = "yellow") => {
    if (!rangeKey) return;
    addNote({ rangeKey, content: "", color, pinned: false });
  };

  return { rangeNotes, allNotes, rangeKey, addNewNote, updateNote, deleteNote, togglePinNote };
}
