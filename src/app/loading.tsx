export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "#07070a" }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(90deg, #e63946 0px, #e63946 1px, transparent 1px, transparent 80px),
            repeating-linear-gradient(0deg, #e63946 0px, #e63946 1px, transparent 1px, transparent 80px)
          `,
        }}
      />

      <div className="flex flex-col items-center gap-5">
        {/* Spinner — diamond shape ala Valorant */}
        <div className="relative w-12 h-12 flex items-center justify-center">
          {/* Rotating border */}
          <div
            className="absolute inset-0 animate-spin"
            style={{
              border: "2px solid transparent",
              borderTopColor: "#e63946",
              borderRadius: "50%",
            }}
          />
          {/* Inner diamond */}
          <div
            className="w-4 h-4 rotate-45"
            style={{ background: "rgba(230,57,70,0.3)", border: "1px solid rgba(230,57,70,0.6)" }}
          />
        </div>

        <div className="flex flex-col items-center gap-1">
          <p
            className="text-xs font-bold uppercase tracking-[0.3em]"
            style={{ color: "rgba(230,57,70,0.7)" }}
          >
            Memuat
          </p>
          {/* Blinking dots */}
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{
                  background: "rgba(230,57,70,0.5)",
                  animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
