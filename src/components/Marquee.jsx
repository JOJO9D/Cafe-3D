export default function Marquee() {
  const text = "GOOD COFFEE • SLOW DAYS • GOOD COMPANY •";

  return (
    <div className="overflow-hidden border-y border-white/15 bg-[#171410]/70 py-5">
      <div className="flex min-w-max animate-marquee gap-8 text-sm uppercase tracking-[0.3em] text-[#d5aa7b]">
        {Array.from({ length: 6 }).map((_, index) => (
          <span key={index}>{text}</span>
        ))}
      </div>
    </div>
  );
}
