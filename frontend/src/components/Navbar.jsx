import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", key: "home" },
  { label: "Our Work", key: "works" },
  { label: "Clients", key: "clients" },
  { label: "Contact", key: "contact" },
];

export default function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (key) => {
    setPage(key);
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 backdrop-blur-xl shadow-sm border-b border-white/40"
          : "bg-transparent"
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <button
          onClick={() => handleNav("home")}
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#588ef4] to-[#beb9df] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <span className="text-white font-black text-sm">R</span>
          </div>
          <span className="font-black text-xl text-[#1e1e1e] tracking-tight">
            Rise<span className="text-[#588ef4]">WithMedia</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => handleNav(link.key)}
              className="relative text-sm font-semibold text-[#1e1e1e]/70 hover:text-[#588ef4] transition-colors duration-300 group py-1"
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#588ef4] rounded-full transition-all duration-300 ${
                  page === link.key ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <motion.button
            onClick={() => handleNav("contact")}
            className="bg-[#588ef4] text-white px-6 py-2.5 rounded-xl font-semibold text-sm shadow-lg shadow-[#588ef4]/25 hover:bg-[#3d6fd4] transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Free Strategy Call
          </motion.button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-6 h-0.5 bg-[#1e1e1e] rounded-full origin-center"
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-[#1e1e1e] rounded-full"
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-[#1e1e1e] rounded-full origin-center"
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-[#dadcf4]/50 px-6 pb-6 pt-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNav(link.key)}
                  className={`text-left font-semibold text-base py-2 border-b border-[#dadcf4]/50 transition-colors ${
                    page === link.key ? "text-[#588ef4]" : "text-[#1e1e1e]/80"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("contact")}
                className="bg-[#588ef4] text-white px-6 py-3 rounded-xl font-semibold text-sm mt-2"
              >
                Free Strategy Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}