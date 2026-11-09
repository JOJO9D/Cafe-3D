
import { ArrowUpRight, Coffee, Heart } from "lucide-react";
import Section from "./Section";

const popularItems = [
  {
    name: "Velvet Cappuccino",
    description: "Rich espresso with smooth, velvety milk.",
    price: "₹220",
    category: "COFFEE",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Caramel Cloud Latte",
    description: "Creamy latte with a sweet caramel finish.",
    price: "₹250",
    category: "FAVOURITE",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Classic Cold Brew",
    description: "Slow-steeped coffee served chilled.",
    price: "₹200",
    category: "COLD COFFEE",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85",
  },
];

export default function Popular() {
  return (
    <section
      id="menu"
      className="px-6 py-24 md:px-16 lg:px-24 md:py-32"
    >
      <Section number="01">The crowd favourites</Section>

      <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <h2 className="text-5xl font-light md:text-7xl">
            Popular
            <br />
            <span className="font-serif italic text-[#d5aa7b]">
              picks.
            </span>
          </h2>
        </div>

        <p className="max-w-sm text-sm leading-6 text-white/60">
          A few favourites, made with care and loved one cup at a time.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {popularItems.map((item, index) => (
          <article
            key={item.name}
            className="group overflow-hidden rounded-2xl border border-white/15 bg-[#171410]/90 backdrop-blur-md transition duration-300 hover:-translate-y-2 hover:border-[#d5aa7b]/60"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-2 text-[10px] tracking-[0.2em]">
                {index === 0 ? "BESTSELLER" : item.category}
              </span>

              <span className="absolute right-4 top-4 rounded-full bg-black/70 p-2">
                <Heart size={17} />
              </span>
            </div>

            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl">{item.name}</h3>
                <span className="shrink-0 text-[#d5aa7b]">
                  {item.price}
                </span>
              </div>

              <p className="mt-3 min-h-12 text-sm leading-6 text-white/55">
                {item.description}
              </p>

              <a
                href="#location"
                className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm transition hover:text-[#d5aa7b]"
              >
                <span>Come try it</span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
