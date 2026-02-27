export default function HeroOrnament() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Soft gradient blob */}
      <div className="absolute -top-24 -right-24 h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-[520px] w-[520px] rounded-full bg-emerald-500/15 blur-3xl" />

      {/* Subtle grid */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="gridPattern"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
      </svg>
    </div>
  );
}