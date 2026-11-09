import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Plus,
  Minus,
  ShoppingBag,
  Coffee,
  X,
} from "lucide-react";

const categories = ["All", "Coffee", "Cold Drinks", "Bakery", "Food"];

const menuItems = [
  {
    id: 1,
    name: "Velvet Latte",
    category: "Coffee",
    description: "Smooth espresso, steamed milk, delicate foam.",
    price: 220,
    tag: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Dark Mocha",
    category: "Coffee",
    description: "Rich espresso blended with dark chocolate.",
    price: 250,
    tag: "Rich & bold",
    image:
      "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Caramel Cloud",
    category: "Cold Drinks",
    description: "Iced coffee, silky cream and caramel.",
    price: 270,
    tag: "Guest favourite",
    image:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Cold Brew",
    category: "Cold Drinks",
    description: "Slow-steeped coffee served over ice.",
    price: 230,
    tag: "Slow brewed",
    image:
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Butter Croissant",
    category: "Bakery",
    description: "Golden, flaky layers baked fresh every morning.",
    price: 160,
    tag: "Fresh daily",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Cinnamon Roll",
    category: "Bakery",
    description: "Soft cinnamon swirls with a sweet glaze.",
    price: 180,
    tag: "Sweet comfort",
    image:
      "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 7,
    name: "Morning Toast",
    category: "Food",
    description: "Sourdough toast with creamy avocado.",
    price: 290,
    tag: "Brunch pick",
    image:
      "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 8,
    name: "Cafe Sandwich",
    category: "Food",
    description: "Toasted bread, fresh greens and house dressing.",
    price: 320,
    tag: "Made to order",
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=85",
  },
];

const formatPrice = (price) => `₹${price}`;

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState({});
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const categoryMatch =
        activeCategory === "All" || item.category === activeCategory;

      const searchMatch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const cartCount = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const cartTotal = menuItems.reduce(
    (total, item) => total + item.price * (cart[item.id] || 0),
    0
  );

  const updateCart = (id, change) => {
    setCart((previous) => {
      const nextQuantity = (previous[id] || 0) + change;
      const updated = { ...previous };

      if (nextQuantity <= 0) {
        delete updated[id];
      } else {
        updated[id] = nextQuantity;
      }

      return updated;
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#140d09] text-[#f5eee4]">
      {/* Menu-only coffee splash background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
       
<img
  src="https://images.unsplash.com/photo-1528834453660-4b21e1ef0bf2?auto=format&fit=crop&w=1800&q=85"
  alt="Coffee being poured"
  className="absolute right-0 top-0 h-[85vh] backgroundRepeat:repeat-y w-full object-cover object-center opacity-50"
/>

        <div className="absolute inset-0 bg-gradient-to-r from-[#140d09] via-[#140d09]/80 to-[#140d09]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#140d09]/10 via-[#140d09]/35 to-[#140d09]" />
        <div className="absolute left-[-10%] top-40 h-80 w-80 rounded-full bg-[#9a633e]/10 blur-[120px]" />
        <div className="absolute right-[-10%] top-[700px] h-96 w-96 rounded-full bg-[#c59a70]/10 blur-[140px]" />
      </div>

      <div className="relative z-10">
        {/* Menu hero */}
        <section className="relative flex min-h-[78vh] flex-col justify-center px-6 pb-20 pt-28 sm:px-10 lg:px-20">
          <div className="max-w-4xl">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center gap-3 text-xs tracking-[0.4em] text-[#d4a77c]"
            >
              <span className="h-px w-10 bg-[#d4a77c]" />
              SLOW DOWN. SIP SOMETHING GOOD.
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="max-w-4xl font-serif text-6xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl lg:text-[110px]"
            >
              Made for
              <br />
              your <span className="italic text-[#c99b70]">slow</span> moments.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 max-w-md text-sm leading-7 text-[#d1c5b6]"
            >
              Thoughtfully brewed coffee, little sweet things, and comforting
              bites. Find your favourite and stay a little longer.
            </motion.p>

            <motion.a
              href="#menu-items"
              whileHover={{ x: 6 }}
              className="mt-9 inline-flex items-center gap-3 rounded-full border border-[#c99b70]/50 bg-[#c99b70]/10 px-6 py-3 text-sm transition-colors hover:bg-[#c99b70]/20"
            >
              Explore the menu <ArrowDown size={16} />
            </motion.a>
          </div>

          <div className="absolute bottom-8 right-8 hidden items-center gap-3 text-xs tracking-[0.2em] text-white/45 md:flex">
            <Coffee size={17} />
            BREWED WITH INTENTION
          </div>
        </section>

        {/* Menu controls */}
        <section id="menu-items" className="px-5 pb-32 sm:px-10 lg:px-20">
          <div className="mb-10 flex flex-col justify-between gap-6 border-b border-white/15 pb-7 md:flex-row md:items-end">
            <div>
              <p className="mb-3 text-xs tracking-[0.35em] text-[#c99b70]">
                THE GOOD STUFF
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl">
                Our menu<span className="text-[#c99b70]">.</span>
              </h2>
            </div>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Find your favourite..."
              className="w-full border-b border-white/25 bg-transparent px-1 py-3 text-sm text-[#f5eee4] outline-none transition-colors placeholder:text-white/40 focus:border-[#c99b70] md:max-w-xs"
            />
          </div>

          {/* Category filters */}
          <div className="mb-10 flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm transition-all duration-300 ${
                  activeCategory === category
                    ? "border-[#c99b70] bg-[#c99b70] text-[#17110d]"
                    : "border-white/20 bg-black/10 text-white/70 hover:border-[#c99b70]/70 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Menu cards */}
          <motion.div
            layout
            className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <div className="relative mb-5 aspect-[4/4.5] overflow-hidden rounded-2xl border border-white/10 bg-[#211a15]/35">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-110 group-hover:opacity-55"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#100d0a]/75 via-transparent to-black/10" />

                    <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-[#17120f]/65 px-3 py-1.5 text-[10px] tracking-wider text-[#f3d9bd] backdrop-blur-md">
                      {item.tag}
                    </span>

                    <button
                      onClick={() => updateCart(item.id, 1)}
                      aria-label={`Add ${item.name} to cart`}
                      className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-[#17120f]/75 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-[#c99b70] hover:bg-[#c99b70] hover:text-[#17120f]"
                    >
                      <Plus size={19} />
                    </button>

                    {cart[item.id] > 0 && (
                      <span className="absolute bottom-4 left-4 rounded-full bg-[#c99b70] px-3 py-1.5 text-xs font-medium text-[#17120f]">
                        Added · {cart[item.id]}
                      </span>
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-[#c99b70]">
                        {item.category}
                      </p>
                      <h3 className="font-serif text-2xl transition-colors group-hover:text-[#d7ae86]">
                        {item.name}
                      </h3>
                      <p className="mt-2 max-w-[240px] text-sm leading-6 text-white/55">
                        {item.description}
                      </p>
                    </div>

                    <span className="pt-1 text-sm text-[#e6c6a5]">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="py-20 text-center text-white/60">
              No items found. Try another search.
            </div>
          )}
        </section>

        {/* Bottom call-to-action */}
        <section className="mx-5 mb-24 overflow-hidden rounded-3xl border border-[#c99b70]/20 bg-[#3b291d]/35 px-6 py-14 text-center backdrop-blur-sm sm:mx-10 sm:py-20 lg:mx-20">
          <p className="mb-4 text-xs tracking-[0.35em] text-[#d7ae86]">
            YOUR TABLE IS WAITING
          </p>
          <h2 className="font-serif text-4xl sm:text-6xl">
            Good coffee. <span className="italic text-[#c99b70]">Good company.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-white/65">
            Take a breath, pick your favourite, and make a little room for
            something good today.
          </p>
          <a
            href="#menu-items"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#c99b70] px-6 py-3 text-sm text-[#17110d] transition hover:bg-[#e0bc98]"
          >
            Find your favourite <ArrowRight size={16} />
          </a>
        </section>
      </div>

      {/* Floating order button */}
      <AnimatePresence>
        {cartCount > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            onClick={() => setShowCart(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-4 rounded-full border border-white/15 bg-[#211811]/90 px-5 py-4 text-white shadow-2xl shadow-black/30 backdrop-blur-xl transition hover:border-[#c99b70]/60"
          >
            <span className="relative">
              <ShoppingBag size={20} />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#c99b70] text-[10px] text-black">
                {cartCount}
              </span>
            </span>
            <span className="text-sm">Your order</span>
            <span className="text-sm text-[#e6c6a5]">{formatPrice(cartTotal)}</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cart drawer */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.button
              aria-label="Close cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 z-[60] cursor-default bg-black/60 backdrop-blur-sm"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="fixed bottom-0 right-0 top-0 z-[70] flex w-full max-w-md flex-col border-l border-white/10 bg-[#19130f]/95 p-6 text-[#f5eee4] shadow-2xl backdrop-blur-2xl sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs tracking-[0.3em] text-[#c99b70]">
                    SLOWBREW
                  </p>
                  <h2 className="mt-2 font-serif text-3xl">Your order</h2>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  aria-label="Close order"
                  className="rounded-full border border-white/15 p-2 transition hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-5">
                {menuItems
                  .filter((item) => cart[item.id])
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-white/10 py-5"
                    >
                      <img
                        src={item.image}
                        alt=""
                        className="h-20 w-20 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif text-xl">{item.name}</h3>
                        <p className="mt-1 text-sm text-[#c99b70]">
                          {formatPrice(item.price)}
                        </p>
                        <div className="mt-3 flex items-center gap-3">
                          <button
                            onClick={() => updateCart(item.id, -1)}
                            aria-label={`Remove one ${item.name}`}
                            className="rounded-full border border-white/20 p-1.5 hover:border-[#c99b70]"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="text-sm">{cart[item.id]}</span>
                          <button
                            onClick={() => updateCart(item.id, 1)}
                            aria-label={`Add one ${item.name}`}
                            className="rounded-full border border-white/20 p-1.5 hover:border-[#c99b70]"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm">
                        {formatPrice(item.price * cart[item.id])}
                      </p>
                    </div>
                  ))}

                {cartCount === 0 && (
                  <p className="py-10 text-center text-sm text-white/55">
                    Your order is empty.
                  </p>
                )}
              </div>

              <div className="border-t border-white/10 pt-5">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm text-white/60">Subtotal</span>
                  <span className="font-serif text-2xl">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
                <button
                  disabled={cartCount === 0}
                  onClick={() =>
                    alert("Order checkout will be connected soon!")
                  }
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#c99b70] px-5 py-4 text-sm font-medium text-[#17110d] transition hover:bg-[#e0bc98] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Continue to checkout <ArrowRight size={17} />
                </button>
                <p className="mt-3 text-center text-xs text-white/40">
                  Made fresh, just for you.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}