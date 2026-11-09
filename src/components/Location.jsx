
import { ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import Section from "./Section";

export default function Location() {
  return (
    <section id="location" className="px-6 py-24 md:px-16 md:py-20">
      <Section number="04">Find your slow</Section>

      <div className="grid  rounded-3xl border border-white/15 bg-[#211b15]/75 p-7 backdrop-blur-md md:grid-cols-2 md:p-12 transition-opacity duration-400 ease-in-out hover:opacity-80">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-[#d5aa7b]">
            Your table is waiting
          </p>

          <h2 className="mt-5 text-5xl font-light md:text-6xl">
            Meet us
            <br />
            <span className="font-serif italic text-[#d5aa7b]">
              over coffee.
            </span>
          </h2>

          <p className="mt-6 max-w-md leading-7 text-white/60">
            Drop in for your favourite brew, catch up with friends, or
            spend a quiet afternoon with us.
          </p>

          <a
            href="https://maps.google.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d5aa7b] px-6 py-3 text-sm font-medium text-black transition hover:bg-white"
          >
            Get directions <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="flex flex-col justify-center gap-7 md:pl-10">
          <div className="flex gap-4">
            <MapPin className="mt-1 shrink-0 text-[#d5aa7b]" />
            <div>
              <h3 className="font-medium">Find us</h3>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Add your cafe address here
                <br />
                Your city, India
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Clock3 className="mt-1 shrink-0 text-[#d5aa7b]" />
            <div>
              <h3 className="font-medium">Opening hours</h3>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Monday – Sunday
                <br />
                Add your opening and closing time
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Phone className="mt-1 shrink-0 text-[#d5aa7b]" />
            <div>
              <h3 className="font-medium">Say hello</h3>
              <p className="mt-2 text-sm leading-6 text-white/55">
                Add your cafe phone number
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
