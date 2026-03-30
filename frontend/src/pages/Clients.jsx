import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import TestimonialSlider from "../components/TestimonialSlider";
import Richilogo from "../assets/clientlogo/richi-logo.png";
import KrinBrinlogo from "../assets/clientlogo/krinbrinlogo.png";
import Savlologo from "../assets/clientlogo/savlologo.png";
import kertamlogo from "../assets/clientlogo/kertamlogo.png";
import neoweblogo from "../assets/clientlogo/neoweblogo.png";
import zoylogo from "../assets/clientlogo/zoylogo.png";
import femi9logo from "../assets/clientlogo/femi9logo.png";
import tryologo from "../assets/clientlogo/tryologo.png";
import pentacadtech from "../assets/clientlogo/pentacadtech.png";
import srijaitechlogo from "../assets/clientlogo/srijaitechlogo.png";
import malartraderslogo from "../assets/clientlogo/malartraderslogo.png";
import kandhancarslogo from "../assets/clientlogo/kandhancarslogo.png";
import dakshinelogo from "../assets/clientlogo/dakshinelogo.png";

const allClients = [
  { name: "Richi", src: Richilogo },
  { name: "Krin Brin", src: KrinBrinlogo },
  { name: "Savlo", src: Savlologo },
  { name: "Kertam", src: kertamlogo },
  { name: "Neoweb", src: neoweblogo },
  { name: "Zoy", src: zoylogo },
  { name: "Femi9", src: femi9logo },
  { name: "Tryo", src: tryologo },
  { name: "Pentacad Tech", src: pentacadtech },
  { name: "Srijai Tech", src: srijaitechlogo },
  { name: "Malar Traders", src: malartraderslogo },
  { name: "Kandhan Cars", src: kandhancarslogo },
  { name: "Dakshine", src: dakshinelogo },
];

// Split into two rows
const clientsRow1 = allClients.slice(0, 7);
const clientsRow2 = allClients.slice(7);

const stats = [
  { num: "30+", label: "Projects Completed", icon: "📁" },
  { num: "20+", label: "Brands Served", icon: "🏆" },
  { num: "1M+", label: "Views Generated", icon: "👁️" },
  { num: "5+", label: "Industries Served", icon: "🌐" },
];

const industries = [
  "Real Estate", "Fashion & Retail", "Healthcare", "Education",
  "Food & Beverage", "Technology", "Fitness", "Hospitality",
];

// ─── Marquee Row with Logo Images ────────────────────────────────────
function MarqueeRow({ clients, direction = 1, speed = 28 }) {
  const duplicated = [...clients, ...clients, ...clients];
  return (
    <div className="relative overflow-hidden py-2">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-8 w-max"
        animate={{ x: direction === 1 ? ["0%", "-33.33%"] : ["-33.33%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}>
        {duplicated.map((client, i) => (
          <div
            key={`${client.name}-${i}`}
            className="flex items-center justify-center px-6 py-4 rounded-2xl border border-[#ece3d4] bg-white flex-shrink-0 hover:border-[#2f6b6a]/40 hover:shadow-md transition-all duration-300"
            style={{ minWidth: "140px" }}
            title={client.name}
          >
            <img
              src={client.src}
              alt={client.name}
              className="h-12 w-auto max-w-[120px] object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Clients() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">

      {/* ─── Page Header ──────────────────────────────────────────── */}
      <div className="text-center max-w-3xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 bg-[#ece3d4]/60 text-[#2f6b6a] text-xs font-bold px-4 py-2 rounded-full mb-5">
            ✦ Our Happy Clients
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-[#243746] mb-5">
            Trusted by <span className="text-[#2f6b6a]">Growing Brands</span>
          </h1>
          <p className="text-[#243746]/50 text-lg">
            We've partnered with businesses across industries to help them scale digitally with confidence.
          </p>
        </motion.div>
      </div>

      {/* ─── MARQUEE CLIENT LOGOS ─────────────────────────────────── */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}>
        <MarqueeRow clients={clientsRow1} direction={1} speed={30} />
      </motion.div>
      <motion.div
        className="mb-20"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}>
        <MarqueeRow clients={clientsRow2} direction={-1} speed={26} />
      </motion.div>

      {/* ─── Divider ──────────────────────────────────────────────── */}
      <div className="max-w-xl mx-auto px-6 mb-20">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#ece3d4]" />
          <span className="text-[#2f6b6a] text-xs font-bold tracking-widest uppercase px-2">
            20+ Brands & Counting
          </span>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#ece3d4]" />
        </div>
      </div>

      {/* ─── STATS SECTION ────────────────────────────────────────── */}
      <div className="bg-[#243746] relative overflow-hidden py-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#2f6b6a]/10 blur-[100px] pointer-events-none" />

        <div ref={statsRef} className="relative max-w-6xl mx-auto px-6 lg:px-10">
          <motion.div className="text-center mb-14"
            initial={{ opacity: 0, y: 30 }} animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/60 text-xs font-bold px-4 py-2 rounded-full mb-4">
              By the Numbers
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Results That{" "}
              <span className="bg-gradient-to-r from-[#2f6b6a] to-[#c9a46a] bg-clip-text text-transparent">
                Speak
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div key={stat.label}
                className="text-center p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-[#2f6b6a]/40 hover:bg-white/10 transition-all duration-300"
                initial={{ opacity: 0, y: 40 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4 }}>
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-black bg-gradient-to-br from-[#2f6b6a] to-[#c9a46a] bg-clip-text text-transparent mb-2">
                  {stat.num}
                </div>
                <p className="text-white/50 text-sm font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 bg-[#ece3d4]/60 text-[#2f6b6a] text-xs font-bold px-4 py-2 rounded-full mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#243746] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-[#243746]/50 max-w-md mx-auto">
            Real words from real brands who trusted us with their digital growth.
          </p>
        </motion.div>

        <TestimonialSlider />
      </div>

      {/* ─── INDUSTRIES STRIP ─────────────────────────────────────── */}
      <div className="bg-[#f7f1e8] border-t border-b border-[#ece3d4]/60 py-14">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-[#243746]/35 uppercase tracking-widest mb-8">
            Industries We Serve
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind, i) => (
              <motion.span key={ind}
                className="bg-white border border-[#ece3d4] text-[#243746]/60 text-sm font-semibold px-5 py-2.5 rounded-full hover:border-[#2f6b6a] hover:text-[#2f6b6a] hover:bg-white transition-all duration-300 cursor-default"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}>
                {ind}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}