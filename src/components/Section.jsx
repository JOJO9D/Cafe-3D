export default function Section({ number, children }) {
  return (
    <div className="mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#d5aa7b]">
      <span>{number}</span>
      <span className="h-px w-10 bg-[#d5aa7b]/60" />
      <span>{children}</span>
    </div>
  );
}

