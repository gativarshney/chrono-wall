"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NotesPanel } from "@/components/NotesPanel";

export function MobileNotesToggle() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-30 rounded-full border border-ink/15 bg-paper/95 px-4 py-2.5 text-center font-sans text-sm font-semibold text-ink shadow-lg backdrop-blur transition-colors hover:border-ink/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aurora-mid/60"
      >
        Notes
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
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.05}
              onDragEnd={(_, info) => {
                const shouldClose = info.offset.y > 180 || info.velocity.y > 500;
                if (shouldClose) setOpen(false);
              }}
              className="fixed bottom-0 left-0 right-0 z-50 flex h-[85dvh] max-h-[95dvh] min-h-0 flex-col overflow-hidden rounded-t-[2.5rem] bg-paper shadow-[0_-25px_60px_-15px_rgba(0,0,0,0.4)] pb-[env(safe-area-inset-bottom)] ring-1 ring-ink/5 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(#000_10%,transparent_11%)] before:bg-[size:10px_10px] before:opacity-[0.015]"
            >
              <div className="flex w-full cursor-grab items-center justify-center pt-4 pb-2 active:cursor-grabbing">
                <div className="h-1.5 w-12 rounded-full bg-ink/15" />
              </div>
              <div className="shrink-0 flex items-center justify-between border-b border-ink/10 bg-paper px-6 py-4">
                <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-ink-muted/80">Notes Archive</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close notes panel"
                  className="flex items-center gap-1.5 rounded-full bg-ink/5 px-3 py-1.5 font-sans text-xs font-medium text-ink transition-all active:scale-95 focus-visible:outline-none"
                >
                  <span className="text-[10px] opacity-40">✕</span>
                  <span>Close</span>
                </button>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden bg-paper/50">
                <NotesPanel mobile />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
