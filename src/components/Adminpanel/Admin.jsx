
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Coffee,
  LayoutDashboard,
  CalendarCheck,
  Users,
  UtensilsCrossed,
  CalendarDays,
  Settings,
  LogOut,
  Search,
  Check,
  X,
  Clock,
} from "lucide-react";

const initialBookings = [
  {
    id: 1,
    name: "Aarav Sharma",
    phone: "98XXXXXX10",
    date: "2026-10-29",
    time: "06:00 PM",
    guests: 2,
    event: "Date Night",
    status: "Pending",
  },
  {
    id: 2,
    name: "Priya Verma",
    phone: "97XXXXXX20",
    date: "2026-10-30",
    time: "07:00 PM",
    guests: 4,
    event: "Birthday",
    status: "Confirmed",
  },
  {
    id: 3,
    name: "Rahul Singh",
    phone: "99XXXXXX30",
    date: "2026-10-31",
    time: "05:00 PM",
    guests: 3,
    event: "Regular Visit",
    status: "Pending",
  },
];

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Bookings", icon: CalendarCheck },
  { label: "Customers", icon: Users },
  { label: "Menu Items", icon: UtensilsCrossed },
  { label: "Events", icon: CalendarDays },
];

export default function Admin() {
  const navigate = useNavigate();
  const [active, setActive] = useState("Overview");
  const [bookings, setBookings] = useState(initialBookings);
  const [search, setSearch] = useState("");

  const updateStatus = (id, status) => {
    setBookings((current) =>
      current.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

  const filtered = bookings.filter((booking) =>
    `${booking.name} ${booking.phone} ${booking.event}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const pending = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const confirmed = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const card =
    "rounded-2xl border border-white/[0.08] bg-[#1b211d] p-5";

  return (
    <div className="min-h-screen bg-[#111612] text-[#f2f3ee] md:flex">
      <aside className="border-b border-white/10 bg-[#171d19] p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        <button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-3 text-left"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#286b43]">
            <Coffee size={23} />
          </span>
          <span>
            <span className="block text-lg font-semibold">slowbrew.</span>
            <span className="text-xs text-white/45">Admin workspace</span>
          </span>
        </button>

        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/35">
          Workspace
        </p>

        <nav className="flex gap-2 overflow-x-auto md:flex-col">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm transition ${
                active === label
                  ? "bg-[#286b43] text-white"
                  : "text-white/55 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-8 border-t border-white/10 pt-5">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/55 hover:bg-white/5 hover:text-white"
          >
            <LogOut size={18} />
            Back to website
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[#91b49a]">SlowBrew / {active}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight">
              {active === "Overview" ? "Good evening, Admin." : active}
            </h1>
            <p className="mt-2 text-sm text-white/45">
              Manage your cafe from one place.
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="rounded-xl border border-white/10 px-4 py-3 text-sm hover:bg-white/5"
          >
            View website ↗
          </button>
        </header>

        {active === "Overview" && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Total bookings", value: bookings.length, icon: CalendarCheck },
                { label: "Pending requests", value: pending, icon: Clock },
                { label: "Confirmed", value: confirmed, icon: Check },
                { label: "Menu items", value: 12, icon: Coffee },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className={card}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">{label}</span>
                    <Icon size={20} className="text-[#91b49a]" />
                  </div>
                  <p className="mt-5 text-3xl font-semibold">{value}</p>
                </div>
              ))}
            </div>

            <div className={`${card} mt-6`}>
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold">Recent bookings</h2>
                  <p className="mt-1 text-sm text-white/40">
                    Review and manage reservation requests.
                  </p>
                </div>
                <button
                  onClick={() => setActive("Bookings")}
                  className="text-sm text-[#a6d6b2] hover:underline"
                >
                  View all →
                </button>
              </div>
              <BookingTable
                bookings={bookings.slice(0, 3)}
                updateStatus={updateStatus}
              />
            </div>
          </>
        )}

        {active === "Bookings" && (
          <section className={card}>
            <h2 className="text-lg font-semibold">All reservations</h2>
            <div className="relative my-5 max-w-sm">
              <Search className="absolute left-3 top-3 text-white/35" size={18} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, phone or event..."
                className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#91b49a]"
              />
            </div>
            <BookingTable bookings={filtered} updateStatus={updateStatus} />
          </section>
        )}

        {active === "Customers" && (
          <section className={card}>
            <h2 className="mb-5 text-lg font-semibold">Customers</h2>
            <div className="space-y-3">
              {[...new Map(bookings.map((b) => [b.name, b])).values()].map((b) => (
                <div key={b.id} className="flex flex-wrap justify-between gap-3 rounded-xl bg-white/[0.03] p-4">
                  <div>
                    <p className="font-medium">{b.name}</p>
                    <p className="mt-1 text-sm text-white/45">{b.phone}</p>
                  </div>
                  <p className="text-sm text-white/55">{b.event}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {active === "Menu Items" && (
          <section className={card}>
            <h2 className="text-lg font-semibold">Menu management</h2>
            <p className="mt-3 text-sm leading-6 text-white/50">
              This section is ready for your coffee, food, prices, availability,
              and add/edit/delete controls. Connect it to your menu data or
              backend to manage real items.
            </p>
          </section>
        )}

        {active === "Events" && (
          <section className={card}>
            <h2 className="text-lg font-semibold">Event bookings</h2>
            <div className="mt-5 space-y-3">
              {bookings.filter((b) => b.event !== "Regular Visit").map((b) => (
                <div key={b.id} className="rounded-xl bg-white/[0.03] p-4">
                  <p className="font-medium">{b.event}</p>
                  <p className="mt-1 text-sm text-white/50">
                    {b.name} · {b.date} · {b.time} · {b.guests} guests
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-8 text-xs text-white/30">
          SlowBrew Admin · Demo dashboard
        </footer>
      </main>
    </div>
  );
}

function BookingTable({ bookings, updateStatus }) {
  if (!bookings.length) {
    return <p className="py-8 text-center text-sm text-white/45">No bookings found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-white/35">
            <th className="px-3 py-4 font-medium">Customer</th>
            <th className="px-3 py-4 font-medium">Date & time</th>
            <th className="px-3 py-4 font-medium">Guests / Event</th>
            <th className="px-3 py-4 font-medium">Status</th>
            <th className="px-3 py-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-b border-white/[0.06] last:border-0">
              <td className="px-3 py-4">
                <p className="font-medium">{b.name}</p>
                <p className="mt-1 text-xs text-white/40">{b.phone}</p>
              </td>
              <td className="px-3 py-4">
                <p>{b.date}</p>
                <p className="mt-1 text-xs text-white/40">{b.time}</p>
              </td>
              <td className="px-3 py-4">
                <p>{b.guests} guests</p>
                <p className="mt-1 text-xs text-white/40">{b.event}</p>
              </td>
              <td className="px-3 py-4">
                <span className={`rounded-full px-3 py-1 text-xs ${
                  b.status === "Confirmed"
                    ? "bg-emerald-400/10 text-emerald-300"
                    : "bg-amber-400/10 text-amber-300"
                }`}>
                  {b.status}
                </span>
              </td>
              <td className="px-3 py-4">
                {b.status === "Pending" ? (
                  <div className="flex gap-2">
                    <button
                      title="Confirm booking"
                      onClick={() => updateStatus(b.id, "Confirmed")}
                      className="rounded-lg bg-emerald-500/15 p-2 text-emerald-300 hover:bg-emerald-500/25"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      title="Decline booking"
                      onClick={() => updateStatus(b.id, "Declined")}
                      className="rounded-lg bg-red-500/15 p-2 text-red-300 hover:bg-red-500/25"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <span className="text-xs text-white/40">{b.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
