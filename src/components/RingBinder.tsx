export function RingBinder() {
  const rings = Array.from({ length: 7 });

  return (
    <div className="absolute -top-5 left-0 right-0 z-10 flex justify-around px-12">
      {rings.map((_, i) => (
        <div
          key={i}
          className="h-10 w-8 rounded-full border-4 border-ring"
          style={{
            background: "linear-gradient(135deg, #C0C0C0, #8B8B8B, #C0C0C0)",
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.3)",
          }}
        />
      ))}
    </div>
  );
}
