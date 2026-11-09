
import { Star } from "lucide-react";
import Section from "./Section";

const reviews = [
  {
    name: "Aarav M.",
    text: "Beautiful atmosphere, amazing cappuccino, and the perfect place to unwind.",
    type: "Coffee lover",
  },
  {
    name: "Meera S.",
    text: "The coffee is lovely, the staff are warm, and every corner feels cosy.",
    type: "Regular visitor",
  },
  {
    name: "Rohan K.",
    text: "My new favourite place for weekend coffee and conversations.",
    type: "Weekend regular",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="px-6 py-24 md:px-16 md:py-20">
      <Section number="03">Kind words</Section>

      <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <h2 className="text-5xl font-light md:text-7xl">
          Good coffee.
          <br />
          <span className="font-serif italic text-[#d5aa7b]">
            Good people.
          </span>
        </h2>

        <p className="max-w-xs text-sm leading-6 text-white/55">
          The best part of our cafe is the people who make it special.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {reviews.map((review) => (
          <article
            key={review.name}
            className="rounded-2xl border border-white/15 bg-black/25 p-7 backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#d5aa7b]/60"
          >
            <div className="mb-6 flex gap-1 text-[#d5aa7b]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} fill="currentColor" />
              ))}
            </div>

            <p className="min-h-24 font-serif text-xl leading-8 italic text-white/90">
              “{review.text}”
            </p>

            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="font-medium">{review.name}</p>
              <p className="mt-1 text-xs text-white/45">{review.type}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-6 text-xs text-white/40">
        Sample reviews for design preview. Replace with real customer feedback.
      </p>
    </section>
  );
}
