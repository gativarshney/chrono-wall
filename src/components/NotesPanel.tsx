"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { useNotes } from "@/hooks/useNotes";
import { useCalendarStore } from "@/store/calendarStore";

const NOTE_COLORS = {
  yellow: "bg-amber-100 border-amber-200",
  blue: "bg-blue-100 border-blue-200",
  pink: "bg-pink-100 border-pink-200",
  green: "bg-emerald-100 border-emerald-200",
};

export function NotesPanel() {
  const { selectedRange } = useCalendarStore();
  const { rangeNotes, allNotes, addNewNote, updateNote, deleteNote, togglePinNote, rangeKey } =
    useNotes();
  const [activeColor, setActiveColor] = useState<"yellow" | "blue" | "pink" | "green">(
    "yellow"
  );

  const rangeLabel = selectedRange.start
    ? selectedRange.end
      ? `${format(selectedRange.start, "MMM d")} – ${format(selectedRange.end, "MMM d")}`
      : format(selectedRange.start, "MMM d")
    : "Select dates to add notes";

  const visibleNotes = rangeKey ? rangeNotes : allNotes;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-br-2xl border-l border-ink/8 bg-paper-dark/40">
      <div className="border-b border-ink/8 px-4 py-3">
        <p className="font-sans text-xs font-medium uppercase tracking-widest text-ink-muted">Notes</p>
        <p className="mt-0.5 font-serif text-sm text-ink">{rangeLabel}</p>
      </div>

      {rangeKey && (
        <div className="flex items-center gap-2 border-b border-ink/5 px-4 py-2">
          {(["yellow", "blue", "pink", "green"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setActiveColor(c)}
              className={`h-5 w-5 rounded-full border-2 transition-transform ${NOTE_COLORS[c]} ${
                activeColor === c ? "scale-125 border-ink" : "border-transparent"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mid/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper`}
            />
          ))}
          <button
            onClick={() => addNewNote(activeColor)}
            className="ml-auto rounded border border-ink/10 px-2 py-1 font-sans text-xs font-medium text-ink-muted transition-colors hover:border-ink/20 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mid/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            + Add note
          </button>
        </div>
      )}

      <div className="notes-scroll flex-1 space-y-3 overflow-y-auto p-4">
        <AnimatePresence>
          {visibleNotes.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`relative rounded-xl border p-3 ${NOTE_COLORS[note.color]}`}
            >
              <textarea
                value={note.content}
                onChange={(e) => updateNote(note.id, e.target.value)}
                placeholder="Write something..."
                rows={3}
                className="w-full min-h-[72px] resize-none bg-transparent font-sans text-sm text-ink placeholder:text-ink-muted/50 focus:outline-none"
              />
              <div className="mt-1 flex items-center gap-2">
                <button
                  onClick={() => togglePinNote(note.id)}
                  className={`text-xs transition-colors ${
                    note.pinned ? "text-ink" : "text-ink-muted/40 hover:text-ink"
                  }`}
                  title={note.pinned ? "Unpin" : "Pin"}
                >
                  {note.pinned ? "📌" : "○"}
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="ml-auto text-xs text-ink-muted/40 transition-colors hover:text-red-400"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {visibleNotes.length === 0 && (
          <p className="pt-4 text-center font-sans text-xs italic text-ink-muted/40">
            {rangeKey ? "No notes for this range yet." : "Select a date range to see or add notes."}
          </p>
        )}
      </div>
    </div>
  );
}
