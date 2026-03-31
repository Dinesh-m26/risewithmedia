import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", key: "home" },
  { label: "Our Work", key: "works" },
  { label: "Clients", key: "clients" },
  { label: "Contact", key: "contact" },
];

function BrandMark() {
  return (
    <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg shadow-[#06b6d4]/15 ring-1 ring-[#dff6ff]">
      <img
        src="/logo.png"
        alt="Rise With Media"
        className="h-8 w-8 object-contain"
      />
    </div>
  );
}

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
      className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8"
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`mx-auto max-w-7xl rounded-[24px] border transition-all duration-500 ${
          scrolled
            ? "bg-white/88 border-[#dff6ff] backdrop-blur-2xl shadow-[0_20px_70px_-30px_rgba(6,182,212,0.22)]"
            : "bg-white/65 border-white/60 backdrop-blur-xl shadow-[0_12px_40px_-30px_rgba(15,23,42,0.35)]"
        }`}
      >
        <div className="flex h-[78px] items-center justify-between gap-4 px-4 sm:px-5 lg:px-6">
          <button
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 text-left"
            aria-label="Go to home"
          >
            <BrandMark />
            <div className="leading-tight">
              <span className="block text-lg font-black tracking-tight text-[#0f172a] sm:text-[1.1rem]">
                Rise<span className="text-[#06b6d4]">WithMedia</span>
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-[#0f172a]/45 min-[440px]:block">
                Digital Growth Studio
              </span>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-1 rounded-full border border-[#dff6ff] bg-[#f7fcff]/90 p-1.5 shadow-inner shadow-white/80">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNav(link.key)}
                className={`rounded-full px-4 lg:px-5 py-2 text-sm font-semibold transition-all duration-300 ${
                  page === link.key
                    ? "bg-white text-[#06b6d4] shadow-sm shadow-[#06b6d4]/15"
                    : "text-[#0f172a]/65 hover:text-[#06b6d4]"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <span className="hidden xl:inline text-xs font-semibold text-[#0f172a]/50">
              Let’s grow your brand
            </span>
            <motion.button
              onClick={() => handleNav("contact")}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#06b6d4] to-[#0891b2] px-5 lg:px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#06b6d4]/25"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Free Strategy Call
              <span className="text-base">→</span>
            </motion.button>
          </div>

          <motion.button
            className="md:hidden inline-flex h-11 w-11 flex-col items-center justify-center gap-1 rounded-2xl border border-[#dff6ff] bg-[#f7fcff] text-[#0f172a] shadow-sm"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="block h-0.5 w-5 rounded-full bg-current"
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-0.5 w-5 rounded-full bg-current"
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-0.5 w-5 rounded-full bg-current"
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            />
          </motion.button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="border-t border-[#dff6ff] px-4 pb-4 pt-3 md:hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.key}
                    onClick={() => handleNav(link.key)}
                    className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition-all duration-300 ${
                      page === link.key
                        ? "bg-[#f0fbff] text-[#06b6d4]"
                        : "text-[#0f172a]/80 hover:bg-[#f7fcff]"
                    }`}
                  >
                    {link.label}
                  </button>
                ))}

                <motion.button
                  onClick={() => handleNav("contact")}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#06b6d4] to-[#0891b2] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#06b6d4]/20"
                  whileTap={{ scale: 0.98 }}
                >
                  Free Strategy Call
                  <span>→</span>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}