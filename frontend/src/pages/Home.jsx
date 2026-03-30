import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import ServiceCard from "../components/ServiceCard";
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


const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ─── Animated Counter ────────────────────────────────────────────────
function AnimatedCounter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const num = parseFloat(end);
    const duration = 1600;
    const step = (num / duration) * 16;
    const timer = setInterval(() => {
      start += step;
      if (start >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Hero ────────────────────────────────────────────────────────────
function Hero({ setPage }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fbf7f2] via-[#f7f1e8] to-[#ece3d4] z-0" />

      {/* Animated blobs */}
      <motion.div
        className="absolute top-[-80px] left-[-80px] w-[420px] h-[420px] rounded-full bg-[#2f6b6a]/20 blur-[80px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-60px] right-[-60px] w-[340px] h-[340px] rounded-full bg-[#ece3d4]/60 blur-[70px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: "linear-gradient(#2f6b6a 1px,transparent 1px),linear-gradient(90deg,#2f6b6a 1px,transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-28 pb-20">
        {/* Badge */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="inline-flex items-center gap-2 bg-[#2f6b6a]/10 border border-[#2f6b6a]/25 text-[#2f6b6a] px-5 py-2 rounded-full text-sm font-semibold mb-8">
          <span className="w-2 h-2 bg-[#2f6b6a] rounded-full animate-pulse" />
         Premium Digital Marketing Agency
        </motion.div>

        {/* Main Heading */}
        <motion.h1 variants={fadeUp} initial="hidden" animate="show" custom={1}
          className="text-5xl md:text-7xl font-black text-[#243746] leading-[1.05] tracking-tight mb-6">
          We Build Brands<br />
          <span className="bg-gradient-to-r from-[#2f6b6a] via-[#c9a46a] to-[#243746] bg-clip-text text-transparent">
            That Convert.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2}
          className="text-[#6b7280] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          From content to automation, we grow your business digitally — with strategy, creativity, and data-driven execution.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
          className="flex flex-wrap gap-4 justify-center mb-16">
          <motion.button
            onClick={() => setPage("contact")}
            className="group bg-[#2f6b6a] text-white px-8 py-4 rounded-2xl font-bold text-base shadow-2xl shadow-[#2f6b6a]/30 hover:bg-[#255756] transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            Get Free Strategy Call
            <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </motion.button>
          <motion.button
            onClick={() => setPage("works")}
            className="bg-white text-[#243746] px-8 py-4 rounded-2xl font-bold text-base border border-[#ece3d4] hover:border-[#2f6b6a] hover:bg-white transition-all duration-300 shadow-sm"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            View Our Work
          </motion.button>
        </motion.div>

        {/* Social proof bar */}
        <motion.div variants={stagger} initial="hidden" animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          {[
            { num: "30", suffix: "+", label: "Projects Done" },
            { num: "10", suffix: "+", label: "Brands Served" },
            { num: "1", suffix: "M+", label: "Views Generated" },
            { num: "5", suffix: "×", label: "Avg. ROI" },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}
              className="bg-white/80 backdrop-blur-sm border border-[#ece3d4] rounded-2xl p-4 shadow-sm">
              <div className="text-2xl font-black text-[#243746]">
                <AnimatedCounter end={stat.num} suffix={stat.suffix} />
              </div>
              <div className="text-[#6b7280] text-xs mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
          className="mt-16 flex flex-col items-center gap-2">
          <span className="text-[#9ca3af] text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-7 bg-gradient-to-b from-[#2f6b6a] to-transparent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
// ─── Ticker / Trust Bar ──────────────────────────────────────────────
function TrustBar() {
  const logos = [
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

  return (
    <div className="bg-white border-y border-[#ece3d4] py-8 overflow-hidden">
      {/* Fade edges */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex">
          {[0, 1, 2].map((setIndex) => (
            <div
              key={setIndex}
              className="flex items-center flex-shrink-0 animate-marquee"
              style={{ gap: "56px" }}
            >
              {logos.map((logo, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center justify-center px-3"
                  title={logo.name}
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-14 w-auto max-w-[160px] object-contain opacity-100"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}

// ─── Services ────────────────────────────────────────────────────────
const services = [
  {
    icon: "🎬", title: "Content & Social Media",
    pitch: "We handle end-to-end content creation from shoot to post.",
    items: ["Reels / Shorts Creation", "Long-form Videos", "Posters & Creatives", "Capturing Video + Editing", "Caption + Hashtags", "Posting & Scheduling", "Monthly Content Calendar"],
    dark: false,
  },
  {
    icon: "💻", title: "Website & Funnel Development",
    pitch: "We build websites that convert visitors into leads.",
    items: ["Business Websites", "Landing Pages", "Sales Funnels", "Portfolio Sites", "Basic SEO Setup"],
    dark: false,
  },
  {
    icon: "📈", title: "Performance Marketing",
    pitch: "We run data-driven ads to bring leads and sales.",
    items: ["Meta Ads (FB + IG)", "Lead Campaigns", "Retargeting Ads", "Analytics + Optimization"],
    dark: false,
  },
];

function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section className="bg-white py-24 px-6" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}
          className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-[#2f6b6a] text-sm font-bold tracking-widest uppercase mb-3">
            What We Do
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1}
            className="text-4xl md:text-5xl font-black text-[#243746] mb-4">
            Services Built for Real Business Growth
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-[#6b7280] max-w-xl mx-auto">
            Every service we offer is tailored for measurable results — not vanity metrics.
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}
          className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}
              className="group bg-[#f7f1e8] border border-[#ece3d4] rounded-3xl p-7 hover:border-[#2f6b6a]/40 hover:shadow-lg hover:shadow-[#2f6b6a]/8 transition-all duration-400"
              whileHover={{ y: -4 }}>
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-lg font-bold text-[#243746] mb-2">{s.title}</h3>
              <p className="text-[#6b7280] text-sm mb-5">{s.pitch}</p>
              <ul className="space-y-2">
                {s.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-[#374151]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2f6b6a] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── How It Works ────────────────────────────────────────────────────
function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const steps = [
    { icon: "📞", title: "Free Strategy Call", desc: "We learn your business, goals, and challenges in a 30-min call — no pressure, no sales pitch." },
    { icon: "🗺️", title: "Custom Growth Plan", desc: "We build a tailored strategy with clear milestones and expected outcomes specific to you." },
    { icon: "⚡", title: "Execution Begins", desc: "Our team starts creating, publishing, and optimizing. You see real work within 72 hours." },
    { icon: "📊", title: "Results & Scaling", desc: "We track KPIs weekly, refine what works, and scale the winning campaigns." },
  ];
  return (
    <section ref={ref} className="bg-[#f7f1e8] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-[#2f6b6a] text-sm font-bold tracking-widest uppercase mb-3">Our Process</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black text-[#243746] mb-4">How We Work</motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-[#6b7280] max-w-md mx-auto">A simple, proven process to get you from zero to consistent growth.</motion.p>
        </motion.div>

        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}
          className="grid md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#ece3d4] to-transparent" />
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeUp} custom={i} className="text-center relative">
              <div className="relative mx-auto w-20 h-20 rounded-2xl bg-white border border-[#ece3d4] shadow-sm flex items-center justify-center text-3xl mb-4">
                {step.icon}
                <div className="absolute -top-2 -right-2 bg-[#2f6b6a] text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center shadow">
                  {i + 1}
                </div>
              </div>
              <h3 className="text-[#243746] font-bold mb-2 text-sm">{step.title}</h3>
              <p className="text-[#6b7280] text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── AI Automation ───────────────────────────────────────────────────
function AISection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const items = ["WhatsApp Automation", "CRM Setup", "Auto Reply Bots", "Lead Tracking Systems", "AI Tools for Business", "Custom Automations"];
  return (
    <section ref={ref} className="bg-[#243746] py-24 px-6 relative overflow-hidden">
      <div className="absolute top-[-80px] right-[-80px] w-[340px] h-[340px] rounded-full bg-[#2f6b6a]/15 blur-[90px]" />
      <div className="absolute bottom-[-60px] left-[-60px] w-[260px] h-[260px] rounded-full bg-[#ece3d4]/10 blur-[80px]" />
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "50px 50px" }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}
          className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p variants={fadeUp} className="text-[#2f6b6a] text-sm font-bold tracking-widest uppercase mb-3">Premium Service</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              AI Automation<br />& CRM Solutions
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-[#9ca3af] mb-8 leading-relaxed">
              We automate your business so you save time and never miss a lead. Our AI-powered systems work 24/7 while you focus on what matters.
            </motion.p>
            <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
              className="grid grid-cols-2 gap-3">
              {items.map((item, i) => (
                <motion.div key={i} variants={fadeUp} custom={i}
                  className="flex items-center gap-2 text-sm text-[#d1d5db]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2f6b6a] flex-shrink-0" />
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} custom={3} className="relative flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-56 h-56 rounded-full border border-dashed border-[#2f6b6a]/20" />

            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl p-8 text-center max-w-xs w-full">
              <div className="text-5xl mb-4">🤖</div>
              <p className="text-white font-bold text-base mb-2">AI-First Approach</p>
              <p className="text-[#9ca3af] text-sm leading-relaxed">
                From WhatsApp bots to full CRM automation — we build intelligent systems that grow with your business.
              </p>
            </div>

            <div className="absolute left-0 top-4 space-y-2">
              {[
                { label: "Response Rate", val: "99%", color: "bg-[#243746]" },
                { label: "Lead Capture", val: "24/7", color: "bg-[#2f6b6a]" },
                { label: "Time Saved", val: "4h/day", color: "bg-[#c9a46a]" },
              ].map((m, i) => (
                <motion.div key={i} initial={{ x: -30, opacity: 0 }} animate={inView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
                  className={`${m.color} backdrop-blur-sm rounded-xl px-3 py-2 text-xs font-bold text-white`}>
                  {m.val} <span className="font-normal opacity-80">{m.label}</span>
                </motion.div>
              ))}
            </div>

            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
              className="absolute right-0 top-6 bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl px-3 py-2 text-xs text-white font-semibold">
              🔔 New Lead
            </motion.div>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              className="absolute right-0 bottom-6 bg-[#2f6b6a]/20 border border-[#2f6b6a]/30 backdrop-blur-sm rounded-2xl px-3 py-2 text-xs text-white font-semibold">
              ✅ Auto-replied
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Results ─────────────────────────────────────────────────────────
function ResultsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const cases = [
    { client: "School", metric: "340", suffix: "%", label: "Revenue Growth in 60 Days", tag: "Meta Ads + Content" },
    { client: "Bridal", metric: "120", suffix: "+", label: "Qualified Leads / Month", tag: "Lead Gen + Automation" },
    { client: "Coaching Business", metric: "28", suffix: "L+", label: "Views in 60 Days", tag: "Short-Form Content" },
  ];
  return (
    <section ref={ref} className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-[#2f6b6a] text-sm font-bold tracking-widest uppercase mb-3">Real Results</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black text-[#243746] mb-4">Numbers That Speak</motion.h2>
          <motion.p variants={fadeUp} custom={2} className="text-[#6b7280] max-w-md mx-auto">Not claims — actual results from real clients across industries.</motion.p>
        </motion.div>
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}
          className="grid md:grid-cols-3 gap-6">
          {cases.map((c, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}
              className="group bg-[#f7f1e8] border border-[#ece3d4] rounded-3xl p-8 hover:border-[#2f6b6a]/40 hover:shadow-lg hover:shadow-[#2f6b6a]/8 transition-all duration-400"
              whileHover={{ y: -5 }}>
              <div className="inline-flex items-center bg-white border border-[#ece3d4] rounded-full px-3 py-1 text-xs text-[#6b7280] mb-6 shadow-sm">
                {c.tag}
              </div>
              <div className="text-4xl font-black text-[#2f6b6a] mb-1">
                <AnimatedCounter end={c.metric} suffix={c.suffix} />
              </div>
              <p className="text-[#6b7280] text-sm mb-4">{c.label}</p>
              <p className="text-[#243746] font-semibold text-sm">{c.client}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Why Us ──────────────────────────────────────────────────────────
function WhyUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reasons = [
    { icon: "🎯", title: "Strategy First", desc: "We don't just post content — we build growth systems with clear KPIs and monthly reviews." },
    { icon: "🤝", title: "Dedicated Team", desc: "You get a team of specialists, not a single freelancer juggling 20 clients at once." },
    { icon: "📊", title: "Full Transparency", desc: "Weekly reports and honest communication. No vanity metrics, no fluff." },
    { icon: "⚡", title: "Fast Execution", desc: "Most clients see first deliverables within 72 hours of onboarding. We move fast." },
    { icon: "🔒", title: "No Lock-in Contracts", desc: "Month-to-month plans with no long-term commitment. We earn your trust every month." },
    { icon: "🌐", title: "Multi-Channel Expertise", desc: "From Instagram to Google Ads — we manage your entire digital presence." },
  ];
  return (
    <section ref={ref} className="bg-[#f7f1e8] py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-[#2f6b6a] text-sm font-bold tracking-widest uppercase mb-3">Why Us</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black text-[#243746] mb-4">What Makes Us Different</motion.h2>
        </motion.div>
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}
          className="grid md:grid-cols-3 gap-5">
          {reasons.map((r, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}
              className="group bg-white border border-[#ece3d4] rounded-2xl p-6 hover:border-[#2f6b6a]/40 hover:shadow-md transition-all duration-300"
              whileHover={{ y: -3 }}>
              <div className="text-3xl mb-3">{r.icon}</div>
              <h3 className="text-[#243746] font-bold mb-2">{r.title}</h3>
              <p className="text-[#6b7280] text-sm leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────
function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reviews = [
    { name: "Ahkila", role: "Founder, Krin Brin School", text: "Within 3 months we went from 0 to 4 lakh in monthly revenue. The team just gets it — strategy, execution, everything." },
    { name: "Saranya", role: "Founder, saranyaelitebridalstudio", text: "I was getting 45 leads a month. Now I get 10+ qualified leads monthly. The WhatsApp automation alone saved me hours." },
    { name: "Prem Charlesr", role: "Founder , Allinov", text: "I've hired agencies before — these guys are a completely different level." },
  ];
  return (
    <section ref={ref} className="bg-white py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-[#2f6b6a] text-sm font-bold tracking-widest uppercase mb-3">Testimonials</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black text-[#243746] mb-4">What Clients Say</motion.h2>
        </motion.div>
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}
          className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}
              className="bg-[#f7f1e8] border border-[#ece3d4] rounded-3xl p-7 hover:border-[#2f6b6a]/40 hover:shadow-md transition-all duration-300"
              whileHover={{ y: -4 }}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <span key={j} className="text-yellow-400 text-sm">★</span>)}
              </div>
              <p className="text-[#374151] text-sm leading-relaxed mb-6">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2f6b6a] to-[#ece3d4] flex items-center justify-center text-white font-bold text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-[#243746] font-semibold text-sm">{r.name}</p>
                  <p className="text-[#9ca3af] text-xs">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────
function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "How quickly will I see results?", a: "Most clients see measurable traction within 30–45 days. For paid ads, results can be visible within the first week of running campaigns." },
    { q: "Do you work with All businesses?", a: "Absolutely. We work with businesses of all sizes — from solo founders to Large-sized companies. Our process adapts to any budget." },
    { q: "What industries do you work with?", a: "E-commerce, real estate, coaching, SaaS, fashion, food & beverage, and more. Our strategy adapts to any industry." },
    { q: "Can I cancel anytime?", a: "Yes. All plans are month-to-month with no long-term contracts. We believe in earning your business every single month." },
    { q: "What do you need from me to get started?", a: "Very little. We do a 30-min onboarding call, collect your brand assets, and handle the rest. We're built to minimize effort on your end." },
  ];
  return (
    <section ref={ref} className="bg-[#f7f1e8] py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="text-center mb-16">
          <motion.p variants={fadeUp} className="text-[#2f6b6a] text-sm font-bold tracking-widest uppercase mb-3">FAQ</motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl md:text-5xl font-black text-[#243746] mb-4">Common Questions</motion.h2>
        </motion.div>
        <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger} className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}
              className="border border-[#ece3d4] rounded-2xl overflow-hidden bg-white">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 flex items-center justify-between text-[#243746] font-semibold hover:bg-[#f7f1e8] transition-colors">
                {faq.q}
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.25 }}
                  className="text-[#2f6b6a] text-xl flex-shrink-0 ml-4">+</motion.span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                    <p className="px-6 pb-5 text-[#6b7280] text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA Strip ───────────────────────────────────────────────────────
function CTAStrip({ setPage }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} className="bg-[#243746] py-24 px-6 relative overflow-hidden">
      <div className="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[500px] h-[260px] bg-[#2f6b6a]/10 rounded-full blur-[100px]" />
      <motion.div initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}
        className="max-w-3xl mx-auto text-center relative z-10">
        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black text-white mb-4">
          Ready to Scale Your Brand?
        </motion.h2>
        <motion.p variants={fadeUp} custom={1} className="text-[#9ca3af] mb-10 max-w-md mx-auto">
          Book a free strategy call and get a custom growth plan for your business.
        </motion.p>
        <motion.button variants={fadeUp} custom={2}
          onClick={() => setPage("contact")}
          className="bg-white text-[#2f6b6a] px-10 py-4 rounded-2xl font-black text-base shadow-xl hover:shadow-2xl transition-all duration-300"
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          Book Free Strategy Call →
        </motion.button>
        <motion.div variants={fadeUp} custom={3} className="flex flex-wrap items-center justify-center gap-6 mt-8">
          {["30-min call", "Custom plan", "No commitment"].map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 text-[#9ca3af] text-sm">
              <span className="text-[#2f6b6a]">✓</span> {item}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Export ──────────────────────────────────────────────────────────
export default function Home({ setPage }) {
  return (
    <main className="overflow-x-hidden">
      <Hero setPage={setPage} />
      <TrustBar />
      <ServicesSection />
      <HowItWorks />
      <AISection />
      <ResultsSection />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <CTAStrip setPage={setPage} />
    </main>
  );
}