"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NotesPanel } from "@/components/NotesPanel";

export function MobileNotesToggle() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mx-4 mb-4 rounded-xl border border-ink/10 py-3 text-center font-sans text-sm font-medium text-ink-muted transition-colors hover:border-ink/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mid/60 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
      >
        Notes ↑
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-ink/40"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 h-[78vh] max-h-[680px] overflow-hidden rounded-t-3xl bg-paper"
            >
              <div className="mx-auto mb-1 mt-3 h-1 w-12 rounded-full bg-ink/20" />
              <div className="flex items-center justify-between border-b border-ink/10 px-4 py-2">
                <p className="font-sans text-xs uppercase tracking-widest text-ink-muted">Notes</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close notes panel"
                  className="rounded-md px-2 py-1 font-sans text-xs text-ink-muted transition-colors hover:bg-paper-dark hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mid/60"
                >
                  Close
                </button>
              </div>
              <NotesPanel />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
