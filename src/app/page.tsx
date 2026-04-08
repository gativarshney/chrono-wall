import { CalendarApp } from "@/components/CalendarApp";

export default function Home() {
  return (
    <main className="relative">
      <div className="pointer-events-none fixed inset-0 bg-wall">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(80,50,120,0.15)_0%,transparent_70%)]" />
      </div>
      <CalendarApp />
    </main>
  );
}
