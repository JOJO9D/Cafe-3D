
import { Instagram as InstagramIcon, ArrowUpRight } from "lucide-react";
import Section from "./Section";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=700&q=80",
    alt: "Freshly prepared coffee",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80",
    alt: "Coffee beans and brewing",
  },
  {
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=700&q=80",
    alt: "Coffee being prepared",
  },
  {
    src: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=700&q=80",
    alt: "A cup of cafe coffee",
  },
];
export default function InstagramSection() {
  return (
    <section className="px-6 py-24 md:px-16 md:py-32">
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <Section number="05">Little moments</Section>
          <h2 className="text-4xl font-light md:text-6xl">
            A peek into our
            <span className="font-serif italic text-[#d5aa7b]"> world.</span>
          </h2>
        </div>

        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          className="flex w-fit items-center gap-2 text-sm text-white/70 transition hover:text-[#d5aa7b]"
        >
          <InstagramIcon size={18} /> Follow our journey <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
        {photos.map((photo, index) => (
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            key={photo.src}
            className={`group relative overflow-hidden rounded-2xl ${
              index % 2 === 1 ? "md:translate-y-7" : ""
            }`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/35">
              <InstagramIcon className="scale-75 text-white opacity-0 transition group-hover:scale-100 group-hover:opacity-100" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
