import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Coffee } from "lucide-react";
import { ShieldCheck } from "lucide-react";
export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#17110e]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-5 md:px-12">

        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="flex shrink-0 items-center gap-2 text-xl font-semibold tracking-tight"
        >
          <Coffee size={23} className="text-[#d2a47f]" />
          slowbrew<span className="text-[#d2a47f]">.</span>
        </button>

        {/* Navigation */}
        <div className="hidden items-center gap-7 text-sm text-white/65 lg:flex">
          <button
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                document.getElementById("about")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            }}
            className="transition hover:text-white"
          >
            About
          </button>

          <button
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                document.getElementById("location")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            }}
            className="transition hover:text-white"
          >
            Contact
          </button>

          {/* Separate Menu page */}
          <button
            onClick={() => navigate("/menu")}
            className="transition hover:text-[#d2a47f]"
          >
            Menu
          </button>
        </div>

        {/* Booking */}
        <div className="flex gap-10 ">
        <button
          onClick={() => {
            navigate("/book-seat");
            setTimeout(() => {
              document.getElementById("location")?.scrollIntoView({
                behavior: "smooth",
              });
            }, 100);
          }}
          className="flex shrink-0 items-center gap-2 rounded-full bg-[#dba35e] px-4 py-3 text-xs font-semibold text-[#21150f] transition hover:bg-[#c7712a] sm:px-5 sm:text-sm"
        >
          Book a seat <ArrowUpRight size={16} />
        </button>
       <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 rounded-full border border-[#b85c38] px-5 py-2 text-sm text-[#f5efe5] transition hover:bg-[#b85c38]"
        >
        <ShieldCheck size={16} />
        Admin
      </button>
      </div>
        </div>
    </nav>
  );
}