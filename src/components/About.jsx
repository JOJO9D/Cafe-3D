
import { ArrowUpRight } from "lucide-react";
import Section from "./Section";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="px-6 py-24 md:px-16 lg:px-24 md:py-32"
    >
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">

        {/* LEFT: Text */}
        <div className="order-2 md:order-1">
          <Section number="02">Our little story</Section>

          <h2 className="text-5xl font-light leading-tight md:text-6xl">
            Not just coffee.
            <br />
            <span className="font-serif italic text-[#d5aa7b]">
              A feeling.
            </span>
          </h2>

          <p className="mt-7 max-w-lg text-base leading-8 text-white/65">
            We believe the best moments don't need to be rushed.
            From the first aroma of freshly ground beans to the
            last sip of your favourite cup, slowbrew is a place
            to pause and reconnect.
          </p>

          <p className="mt-4 max-w-lg text-base leading-8 text-white/65">
            Come with a book, bring a friend, or simply enjoy
            a little time for yourself. There is always a seat
            waiting for you.
          </p>

          <a
            href="#location"
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#d5aa7b]/60 px-6 py-3 text-sm transition hover:bg-[#d5aa7b] hover:text-black"
          >
            Come say hello
            <ArrowUpRight size={17} />
          </a>
        </div>

        {/* RIGHT: Image */}
        <div className="group relative order-1 ml-auto h-[350px] w-full overflow-hidden rounded-3xl border border-white/10 transition-all duration-700 ease-in-out group-hover:scale-x-75 md:order-2 md:h-[520px]">
  <img
    src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?auto=format&fit=crop&w=1200&q=85"
    alt="Cafe interior"
    loading="lazy"
    className="h-full w-full object-cover opacity-100 transition-opacity duration-700 ease-in-out group-hover:opacity-10"
  />

  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

  <div className="pointer-events-none absolute bottom-6 left-6">
    <p className="text-xs uppercase tracking-[0.3em] text-[#d5aa7b]">
      Your everyday escape
    </p>
    <p className="mt-2 font-serif text-2xl italic text-white md:text-3xl">
      Made with warmth.
    </p>
  </div>
</div>
      </div>
    </section>
  );
}
