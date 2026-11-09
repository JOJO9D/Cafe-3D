
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Bookseat  from"./components/menupages/Bookseat";
import Admin from "./components/Adminpanel/Admin";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Popular from "./components/Popular";
import About from "./components/About";
import Review from "./components/Review";
import Location from "./components/Location";
import Footer from "./components/Footer";
import { CoffeeScene } from "./components/CoffeeScene";
import Menu from "./components/menupages/Menu";
import { div } from "three/src/nodes/math/OperatorNode.js";

function Home() {
  return (
    <div className="relative">
<CoffeeScene/>
      <Marquee />
      <Hero />
      <Popular />
      <About />
      <Review />
      <Location />
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
const location = useLocation();
   const isMenu=location.pathname==="/menu";
  return (
    
    <AnimatePresence mode="wait" initial={false}>
      
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ x: 0, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -120, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Home />
            </motion.div>
          }
        />

        <Route
          path="/menu"
          element={
            <motion.div
              initial={{ x: "100%", opacity: 0.7 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <Menu />
            </motion.div>
            
          }
        />
        <Route path="/book-seat" element={<Bookseat />} />
        
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const location = useLocation();
   const isMenu=location.pathname==="/menu";
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#11100e] text-[#f5efe5]">


      <div className="pointer-events-none fixed inset-0 z-0 bg-black/35" />

      <div className="relative z-10">
        {location.pathname !=="/admin"&&<Navbar />}
        <AnimatedRoutes />
        <Routes>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </main>
  );
}
