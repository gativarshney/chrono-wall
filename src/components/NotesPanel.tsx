"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { format } from "date-fns";
import { useNotes } from "@/hooks/useNotes";
import { useCalendarStore } from "@/store/calendarStore";

const NOTE_COLORS = {
  yellow: "bg-[#fef9c3] border-amber-200/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border-b-amber-300/50",
  blue: "bg-[#e0f2fe] border-blue-200/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border-b-blue-300/50",
  pink: "bg-[#fce7f3] border-pink-200/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border-b-pink-300/50",
  green: "bg-[#dcfce7] border-emerald-200/80 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border-b-emerald-300/50",
};

interface NotesPanelProps {
  mobile?: boolean;
}

export function NotesPanel({ mobile = false }: NotesPanelProps) {
  const { selectedRange } = useCalendarStore();
  const {
    rangeNotes,
    allNotes,
    addNewNote,
    updateNote,
    deleteNote,
    togglePinNote,
    rangeKey,
  } = useNotes();
  const [activeColor, setActiveColor] = useState<"yellow" | "blue" | "pink" | "green">(
    "yellow"
  );
  const [savedNoteId, setSavedNoteId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevNoteLengthRef = useRef(0);

  // Auto-scroll to top when new note is added in mobile view
  useEffect(() => {
    const visibleNotes = rangeKey ? rangeNotes : allNotes;
    if (mobile && scrollContainerRef.current && visibleNotes.length > prevNoteLengthRef.current) {
      // New note was added, scroll to top
      scrollContainerRef.current.scrollTop = 0;
    }
    prevNoteLengthRef.current = visibleNotes.length;
  }, [rangeNotes, allNotes, rangeKey, mobile]);

  const rangeLabel = selectedRange.start
    ? selectedRange.end
      ? `${format(selectedRange.start, "MMM d")} – ${format(selectedRange.end, "MMM d")}`
      : format(selectedRange.start, "MMM d")
    : "Select dates to add notes";

  const visibleNotes = rangeKey ? rangeNotes : allNotes;
  const canAdd = Boolean(rangeKey);

  return (
    <div
      className={`flex h-full w-full min-h-0 flex-col overflow-hidden ${
        mobile ? "bg-transparent" : "bg-paper-dark/40 rounded-br-2xl border-l border-ink/8"
      }`}
    >
      {!mobile && (
        <div className="border-b border-ink/8 px-4 py-3">
          <p className="font-sans text-xs font-medium uppercase tracking-widest text-ink-muted">
            Notes
          </p>
          <p className="mt-0.5 font-serif text-sm text-ink">{rangeLabel}</p>
        </div>
      )}

      {mobile && (
        <div className="shrink-0 px-6 py-6 border-b border-ink/5 bg-paper/80 space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-sans text-[9px] font-bold uppercase tracking-widest text-aurora-dark/60 mb-1">Active Timeline</p>
              <div className="font-serif text-base text-ink leading-tight truncate">{rangeLabel}</div>
            </div>
            {rangeKey && (
              <button
                onClick={() => addNewNote(activeColor)}
                className="shrink-0 h-12 w-12 rounded-full bg-ink flex items-center justify-center text-paper shadow-xl active:scale-90 transition-all ring-1 ring-ink/10"
                aria-label="Add note"
              >
                <span className="text-2xl leading-none font-light">+</span>
              </button>
            )}
          </div>
          
          {rangeKey && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2.5">
                {(["yellow", "blue", "pink", "green"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveColor(c)}
                    title={`Select ${c} color`}
                    className={`h-8 w-8 rounded-full border-2 transition-all ${NOTE_COLORS[c]} ${
                      activeColor === c ? "scale-110 border-ink shadow-lg ring-2 ring-ink/5" : "border-transparent opacity-50"
                    }`}
                  />
                ))}
              </div>
              <p className="font-sans text-[10px] uppercase font-bold tracking-widest text-ink-muted/30">Select Color</p>
            </div>
          )}
        </div>
      )}

      <div ref={scrollContainerRef} className={`notes-scroll flex-1 min-h-0 overflow-y-auto ${mobile ? "space-y-0 p-4" : "space-y-3 p-4"}`}>
        {!mobile && (
          <>
            {!canAdd && (
              <div className="border-b border-ink/5 px-4 py-2 mb-3">
                <p className="font-sans text-[11px] text-ink-muted/70">
                  Select a start and end date to add notes for that range.
                </p>
              </div>
            )}
            {rangeKey && (
              <div className="sticky top-0 z-[2] border-b border-ink/5 bg-paper/85 px-4 py-2 mb-3 backdrop-blur-sm flex items-center gap-2">
                {(["yellow", "blue", "pink", "green"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveColor(c)}
                    title={`Select ${c} color`}
                    className={`h-6 w-6 rounded-full border-2 transition-transform ${NOTE_COLORS[c]} ${
                      activeColor === c ? "scale-110 border-ink shadow-sm" : "border-transparent"
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
          </>
        )}

        <div className={`space-y-3`}>
          <AnimatePresence>
          {visibleNotes.map((note) => (
            <motion.div
              key={note.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`relative rounded-2xl border p-4 ${NOTE_COLORS[note.color]} transition-shadow active:shadow-md`}
            >
              <textarea
                value={note.content}
                onChange={(e) => updateNote(note.id, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    setSavedNoteId(note.id);
                    window.setTimeout(() => setSavedNoteId((prev) => (prev === note.id ? null : prev)), 1100);
                    (e.currentTarget as HTMLTextAreaElement).blur();
                  }
                }}
                placeholder="Tap to write..."
                rows={3}
                className="w-full min-h-[80px] resize-none bg-transparent font-sans text-sm leading-relaxed text-ink placeholder:text-ink-muted/30 focus:outline-none"
                title="Press Enter to save, Shift+Enter for new line"
              />
              <div className="mt-1 flex items-center gap-2">
                <button
                  onClick={() => togglePinNote(note.id)}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                    note.pinned ? "bg-black/5 text-ink" : "text-ink-muted/40 hover:bg-black/5 hover:text-ink"
                  }`}
                  title={note.pinned ? "Unpin" : "Pin"}
                >
                  {note.pinned ? "📌" : "○"}
                </button>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-ink-muted/40 transition-colors hover:bg-red-50 hover:text-red-500"
                >
                  ✕
                </button>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <p className="text-[10px] font-sans text-ink-muted/50">Enter = save, Shift+Enter = newline</p>
                {savedNoteId === note.id && (
                  <span className="rounded-full bg-emerald-200/70 px-2 py-0.5 text-[10px] font-semibold text-emerald-900">
                    Saved
                  </span>
                )}
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>

        {visibleNotes.length === 0 && (
          <div className={`flex flex-col items-center justify-center py-20 px-6 text-center`}>
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-paper/50 text-3xl shadow-inner shadow-ink/5">
              📝
            </div>
            <p className="font-serif text-base text-ink leading-relaxed">
              {rangeKey 
                ? "Your timeline starts here." 
                : "A moment in time..."}
            </p>
            <p className="mt-1 font-sans text-xs text-ink-muted/50 max-w-[200px]">
              {rangeKey 
                ? "Tap '+ Add note' above to capture your thoughts for this period." 
                : "Select a date range on the calendar to begin your journey."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
