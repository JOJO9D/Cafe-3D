import { ArrowUp, Coffee } from "lucide-react";
export default function Footer() {
  return (
    <footer className="border-t border-white/15 px-6 pb-8 pt-5 md:px-16">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <a href="#hero" className="flex items-center gap-2">
            <Coffee size={24} />
            <span className="text-xl font-semibold">
              slowbrew<span className="text-[#d5aa7b]">.</span>
            </span>
          </a>

          <p className="mt-4 max-w-sm text-sm leading-6 text-white/50">
            Take a breath. Take a sip. Stay a little longer.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm text-white/65">
          <a href="#about" className="transition hover:text-[#d5aa7b]">
            Our Story
          </a>
          <a href="#menu" className="transition hover:text-[#d5aa7b]">
            Menu
          </a>
          <a href="#reviews" className="transition hover:text-[#d5aa7b]">
            Reviews
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="transition hover:text-[#d5aa7b]"
          >
          
          </a>
          <a
            href="#hero"
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition hover:border-[#d5aa7b] hover:text-[#d5aa7b]"
          >
            <ArrowUp size={17} />
          </a>
        </div>
      </div>

      
    </footer>
  );
}
