
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  Users,
  Coffee,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";

const slots = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM",
  "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM",
];

const seatOptions = [1, 2, 3, 4, 5, 6, 8, 10];

export default function BookSeat() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "06:00 PM",
    seats: "2",
    event: "Regular Visit",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const update = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const bookingFee = 200;
  const total = bookingFee * Number(form.seats);

  const today = new Date().toLocaleDateString("en-CA");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-[#f5eee4] outline-none transition focus:border-[#c49a70] focus:bg-white/[0.09]";

  const labelClass =
    "text-sm font-medium text-[#e9d9c8]";

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#11100e] px-5 py-16 text-[#f5eee4]">
        <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-[#1b1815] p-8 text-center sm:p-12">
          <CheckCircle2
            size={56}
            className="mx-auto mb-5 text-[#c49a70]"
          />
          <p className="text-xs uppercase tracking-[0.3em] text-[#c49a70]">
            SlowBrew Reservations
          </p>
          <h1 className="mt-4 text-3xl font-semibold">
            Booking details received!
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/60">
            This is a demo confirmation. Your booking has not been
            saved to a server or paid for yet.
          </p>

          <div className="mt-8 space-y-3 rounded-2xl bg-white/[0.04] p-5 text-left text-sm">
            <p>Guest: <strong>{form.name}</strong></p>
            <p>Phone: <strong>{form.phone}</strong></p>
            <p>Date: <strong>{form.date}</strong></p>
            <p>Time: <strong>{form.time}</strong></p>
            <p>Seats: <strong>{form.seats}</strong></p>
            <p>Event: <strong>{form.event}</strong></p>
            <p>Booking fee: <strong>₹{total}</strong></p>
          </div>

          <button
            onClick={() => {
              setSubmitted(false);
              navigate("/");
            }}
            className="mt-7 w-full rounded-xl bg-[#c49a70] px-5 py-3 font-semibold text-[#17110c] transition hover:bg-[#ddb993]"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#11100e] px-4 py-10 text-[#f5eee4] sm:px-8 lg:py-16">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#a76b3f]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 top-96 h-96 w-96 rounded-full bg-[#d1a16f]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
          <ArrowLeft size={16} /> Back to home
        </button>

        <div className="mb-10 max-w-2xl">
          <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#c49a70]">
            <Coffee size={17} /> SlowBrew Cafe
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            Your seat.
            <span className="block text-[#c49a70]">
              Your moment.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-base">
            Book a table, plan a special event, and enjoy your
            favourite coffee in a space made for slowing down.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[1fr_340px]"
        >
          <div className="space-y-6">
            <section className="rounded-3xl border border-white/10 bg-[#1b1815]/90 p-5 sm:p-8">
              <h2 className="text-xl font-semibold">
                01. Guest information
              </h2>
              <p className="mt-2 text-sm text-white/45">
                Tell us who will be joining us.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  Full name *
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={update}
                    placeholder="Enter your name"
                    autoComplete="name"
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  Phone number *
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={update}
                    placeholder="Enter phone number"
                    autoComplete="tel"
                    pattern="[0-9+() -]{7,20}"
                    className={inputClass}
                  />
                </label>

                <label className={`${labelClass} sm:col-span-2`}>
                  Email address
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={update}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={inputClass}
                  />
                </label>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-[#1b1815]/90 p-5 sm:p-8">
              <h2 className="text-xl font-semibold">
                02. Reservation details
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <CalendarDays size={16} /> Booking date *
                  </span>
                  <input
                    required
                    type="date"
                    name="date"
                    min={today}
                    value={form.date}
                    onChange={update}
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Users size={16} /> Number of guests *
                  </span>
                  <select
                    name="seats"
                    value={form.seats}
                    onChange={update}
                    className={inputClass}
                  >
                    {seatOptions.map((n) => (
                      <option
                        key={n}
                        value={n}
                        className="bg-[#1b1815]"
                      >
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-7">
                <p className={labelClass}>
                  <span className="flex items-center gap-2">
                    <Clock3 size={16} /> Choose a time *
                  </span>
                </p>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {slots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() =>
                        setForm({ ...form, time: slot })
                      }
                      className={`rounded-xl border px-3 py-3 text-sm transition ${
                        form.time === slot
                          ? "border-[#c49a70] bg-[#c49a70] font-semibold text-[#17110c]"
                          : "border-white/10 bg-white/[0.03] text-white/65 hover:border-[#c49a70]/60"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-[#1b1815]/90 p-5 sm:p-8">
              <h2 className="text-xl font-semibold">
                03. Event & special requests
              </h2>

              <label className={`${labelClass} mt-6 block`}>
                What brings you here? *
                <select
                  name="event"
                  value={form.event}
                  onChange={update}
                  className={inputClass}
                >
                  <option className="bg-[#1b1815]">Regular Visit</option>
                  <option className="bg-[#1b1815]">Birthday</option>
                  <option className="bg-[#1b1815]">Anniversary</option>
                  <option className="bg-[#1b1815]">Date Night</option>
                  <option className="bg-[#1b1815]">Friends Meetup</option>
                  <option className="bg-[#1b1815]">Business Meeting</option>
                  <option className="bg-[#1b1815]">Private Event</option>
                  <option className="bg-[#1b1815]">Other</option>
                </select>
              </label>

              <label className={`${labelClass} mt-5 block`}>
                Extra requests
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={update}
                  rows={4}
                  placeholder="Decorations, preferred seating, allergies, or anything we should know..."
                  className={`${inputClass} resize-y`}
                />
              </label>
            </section>
          </div>

          <aside className="h-fit rounded-3xl border border-[#c49a70]/25 bg-[#211b16] p-6 sm:p-8 lg:sticky lg:top-8">
            <p className="text-xs uppercase tracking-[0.25em] text-[#c49a70]">
              Reservation summary
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Almost yours.
            </h2>
            <p className="mt-2 text-sm leading-6 text-white/50">
              Review your details before sending the booking request.
            </p>

            <div className="my-7 space-y-4 border-y border-white/10 py-6 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-white/50">Guests</span>
                <span>{form.seats}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/50">Time</span>
                <span>{form.time}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/50">Event</span>
                <span className="text-right">{form.event}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/50">Booking fee / guest</span>
                <span>₹{bookingFee}</span>
              </div>
            </div>

            <div className="flex items-end justify-between gap-3">
              <span className="text-sm text-white/55">Estimated fee</span>
              <span className="text-3xl font-semibold">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-white/40">
              Demo pricing only. No payment will be collected by this page.
            </p>

            <button
              type="submit"
              className="mt-7 w-full rounded-xl bg-[#c49a70] px-5 py-4 font-semibold text-[#17110c] transition hover:bg-[#ddb993]"
            >
              Request a Booking →
            </button>

            <p className="mt-4 text-center text-xs text-white/35">
              Your details are used for this demo only.
            </p>
          </aside>
        </form>
      </div>
    </main>
  );
}


