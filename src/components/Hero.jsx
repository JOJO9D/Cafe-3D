import { ArrowDown, ArrowUpRight } from "lucide-react";
export default function Hero() {
  return (
    <section
      id="about"
      className="px-6 py-24 md:px-16 lg:px-24"
    >
      <div className="max-w-3xl">
        <p className="mb-6 text-xs uppercase tracking-[0.35em] text-[#d5aa7b]">
          Coffee • Community • Comfort
        </p>

        <h1 className="text-6xl font-light leading-[0.95] tracking-tight sm:text-7xl md:text-9xl">
          Slow mornings.
          <br />
          <span className="font-serif italic text-[#d5aa7b]">
            Better coffee.
          </span>
        </h1>

        <p className="mt-8 max-w-lg text-base leading-7 text-white/70 md:text-lg">
          A little corner of calm in a busy world. Freshly brewed coffee,
          handcrafted bites, and moments worth slowing down for.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="#menu"
            className="flex items-center gap-3 rounded-full bg-[#d5aa7b] px-6 py-3 text-sm font-medium text-[#17130f] transition hover:bg-white"
          >
            Explore our menu <ArrowUpRight size={17} />
          </a>

          <a
            href="#about"
            className="flex items-center gap-3 rounded-full border border-white/30 px-6 py-3 text-sm transition hover:bg-white/10"
          >
            Discover our story
          </a>
        </div>
      </div>

      <a
        href="#menu"
        className="mt-20 flex w-fit items-center gap-3 text-xs uppercase tracking-[0.25em] text-white/60"
      >
        Scroll to explore <ArrowDown size={16} />
      </a>

      <div className="absolute bottom-12 right-8 hidden text-right md:block">

      </div>
    </section>
  );
}
