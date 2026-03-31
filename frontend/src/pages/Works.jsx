import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";

// ─── Import your videos here ─────────────────────────────────────────
import reel1 from "../assets/clientvideos/1.mp4";
import reel2 from "../assets/clientvideos/2.mp4";
import reel3 from "../assets/clientvideos/3.mp4";
import reel4 from "../assets/clientvideos/4.mp4";
import reel5 from "../assets/clientvideos/5.mp4";

// ─── Import your website screenshots here ────────────────────────────
import screenshot1 from "../assets/clientweb/1.png";
import screenshot2 from "../assets/clientweb/2.png";
// import screenshot3 from "../assets/clientweb/3.png";

// campaign
import campaign1 from "../assets/clientcampaign/1.png";
import campaign2 from "../assets/clientcampaign/2.png";
import campaign3 from "../assets/clientcampaign/3.png";

// ─── EmailJS Config — replace with your actual IDs ───────────────────
const EMAILJS_SERVICE_ID  = "service_s15r115";
const EMAILJS_TEMPLATE_ID = "template_86s1df6";
const EMAILJS_PUBLIC_KEY  = "srGKTSrmIkawAjpyy";

const reelVideos = [
  { id: 1, title: "Beauty & Lifestyle Reels", category: "Beauty", src: reel1 },
  { id: 2, title: "Ed Tech Training Reels",   category: "Ed Tech",    src: reel2 },
  { id: 3, title: "School Brand Reels",    category: "School",       src: reel3 },
  { id: 4, title: "Organic Brand Reels",   category: "Organic",    src: reel4 },
  { id: 5, title: "Health Brand Reels",    category: "Health & Wellness",     src: reel5 },
];

const websites = [
  {
    id: 1,
    title: "Hsieh & Hsu India",
    type: "Manufacturer & Retail",
    url: "https://www.hsiehhsuindia.com/",
    thumbnail: screenshot1,
    color: "from-[#dff6ff] to-[#67e8f9]",
    emoji: "🛍️",
    tags: ["Next.js", "Shopify", "SEO"],
    metric: "+240% Revenue",
  },
  {
    id: 2,
    title: "Mogi E-commerce",
    type: "E-commerce",
    url: "https://www.mogi.co.in",
    thumbnail: screenshot2,
    color: "from-[#0f172a]/40 to-[#dff6ff]",
    emoji: "🏥",
    tags: ["React", "Funnel", "CRM"],
    metric: "3× More Leads",
  },
  {
    id: 3,
    title: "Richi Food Products Landing Page",
    type: "Bevarage",
    url: "https://richifoodproducts.com",
    thumbnail: null,
    color: "from-[#06b6d4]/30 to-[#dff6ff]",
    emoji: "🏗️",
    tags: ["Landing Page", "Leads", "WhatsApp"],
    metric: "₹18 CPL",
  },
];

const adCreatives = [
  {
    id: 1,
    title: "Festive Sale Ads",
    brand: "RetailBrand",
    platform: "Meta Ads",
    emoji: "🎉",
    color: "from-[#06b6d4] to-[#67e8f9]",
    metric: "3.2× ROAS",
    image: campaign1,
  },
  {
    id: 2,
    title: "Lead Gen Campaign",
    brand: "EduTechBrand",
    platform: "Meta Ads",
    emoji: "📚",
    color: "from-[#06b6d4] to-[#0f172a]",
    metric: "₹42 CPL",
    image: campaign2,
  },
  {
    id: 3,
    title: "Product Launch Creatives",
    brand: "E-commerce",
    platform: "Meta Ads",
    emoji: "🚀",
    color: "from-[#0f172a] to-[#06b6d4]",
    metric: "5× ROI",
    image: campaign3,
  },
];

const stats = [
  { num: "1M+", label: "Total Views Generated" },
  { num: "50+", label: "Projects Delivered"     },
  { num: "20+", label: "Brands Worked With"     },
  { num: "5×",  label: "Average ROI"            },
];

const categories = ["All", "Reels", "Websites", "Ad Campaigns"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] },
  }),
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

function useUnlockCount(base = 47) {
  const [count, setCount] = useState(base);
  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() > 0.7) setCount((c) => c + 1);
    }, 8000);
    return () => clearInterval(t);
  }, []);
  return count;
}

function SectionHeader({ badge, title, subtitle }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}
      className="text-center mb-10 md:mb-14">
      <motion.div variants={fadeUp}
        className="inline-flex items-center gap-2 bg-[#dff6ff]/60 text-[#06b6d4] text-xs font-bold px-4 py-2 rounded-full mb-4">
        {badge}
      </motion.div>
      <motion.h2 variants={fadeUp} custom={1} className="text-2xl md:text-3xl lg:text-4xl font-black text-[#0f172a] mb-3">{title}</motion.h2>
      {subtitle && <motion.p variants={fadeUp} custom={2} className="text-[#0f172a]/50 max-w-lg mx-auto text-sm px-4">{subtitle}</motion.p>}
    </motion.div>
  );
}

// ─── Screenshot-based Laptop Mockup Card ──────────────────────────────
function LaptopCard({ site, i }) {
  const [hovering, setHovering] = useState(false);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: i * 0.12 }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onTouchStart={() => setHovering(true)}
      onTouchEnd={() => setTimeout(() => setHovering(false), 1500)}
    >
      <div className={`absolute -inset-4 bg-gradient-to-br ${site.color} opacity-0 group-hover:opacity-40 blur-2xl rounded-3xl transition-all duration-700`} />

      <div className="relative bg-white border border-[#dff6ff]/70 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:shadow-[#06b6d4]/10 transition-all duration-500">
        <div className="bg-[#164e63] px-3 sm:px-5 pt-3 sm:pt-5 pb-0">
          <div className="bg-[#082f49] rounded-t-xl overflow-hidden border border-white/5">
            <div className="flex items-center gap-1.5 px-2 sm:px-3 py-2 bg-[#334155] border-b border-white/5">
              <div className="w-2 h-2 rounded-full bg-red-500/80" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <div className="w-2 h-2 rounded-full bg-green-500/80" />
              <div className="flex-1 mx-2 sm:mx-3 flex items-center gap-2 bg-white/5 rounded-full px-2 sm:px-3 py-0.5">
                <svg className="w-2.5 h-2.5 text-[#06b6d4] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="5" y="11" width="14" height="11" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/>
                </svg>
                <span className="text-white/30 text-[8px] sm:text-[9px] font-mono truncate">
                  {site.url ? site.url.replace("https://", "") : "yourwebsite.com"}
                </span>
              </div>
              <div className="flex gap-1 opacity-40 shrink-0">
                {[...Array(3)].map((_, k) => <div key={k} className="w-1 h-1 rounded-full bg-white" />)}
              </div>
            </div>

            <div className="relative w-full" style={{ aspectRatio: "16/10" }}>
              {site.thumbnail ? (
                <img src={site.thumbnail} alt={site.title} className="w-full h-full object-cover object-top" loading="lazy" />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${site.color} flex flex-col items-center justify-center gap-3`}>
                  <div className="w-full h-full p-3 flex flex-col gap-2 opacity-70">
                    <div className="flex items-center justify-between">
                      <div className="w-16 h-2 bg-white/50 rounded-full" />
                      <div className="flex gap-1.5">
                        {[1,2,3,4].map(k => <div key={k} className="w-6 h-1.5 bg-white/40 rounded-full" />)}
                      </div>
                    </div>
                    <div className="flex-1 flex gap-2 mt-1">
                      <div className="flex-1 flex flex-col gap-1.5 justify-center">
                        <motion.div className="w-3/4 h-2.5 bg-white/70 rounded-full"
                          animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                        <motion.div className="w-1/2 h-2 bg-white/50 rounded-full"
                          animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, delay: 0.3, repeat: Infinity }} />
                        <motion.div className="w-20 h-4 bg-white/60 rounded-lg mt-2"
                          animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, delay: 0.6, repeat: Infinity }} />
                      </div>
                      <div className="w-1/3 bg-white/20 rounded-lg flex items-center justify-center">
                        <motion.span className="text-2xl"
                          animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
                          {site.emoji}
                        </motion.span>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {[...Array(3)].map((_, k) => (
                        <motion.div key={k} className="flex-1 h-6 bg-white/25 rounded-lg"
                          animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2, delay: k * 0.2, repeat: Infinity }} />
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-sm text-white/60 text-[8px] px-2 py-0.5 rounded-full font-mono">
                    Add screenshot →
                  </div>
                </div>
              )}

              <AnimatePresence>
                {hovering && (
                  <motion.div
                    className="absolute inset-0 bg-[#06b6d4]/80 backdrop-blur-sm flex items-center justify-center"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    <motion.a
                      href={site.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-[#06b6d4] font-black text-xs px-5 py-2.5 rounded-xl shadow-xl flex items-center gap-2"
                      initial={{ scale: 0.85, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.85, opacity: 0 }}
                      transition={{ duration: 0.2 }}>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      Visit Live Site →
                    </motion.a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="h-2.5 sm:h-3 bg-gradient-to-r from-[#2a2a3e] via-[#3a3a50] to-[#2a2a3e] rounded-b-sm mx-1" />
        </div>

        <div className="bg-gradient-to-b from-[#e8e9f0] to-[#d8d9e4] px-5 py-2.5 sm:py-3 flex items-center justify-center">
          <div className="w-14 sm:w-16 h-1 bg-[#c0c2d0] rounded-full" />
        </div>

        <div className="px-4 sm:px-5 py-4 border-t border-[#dff6ff]/50">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[10px] font-bold text-[#0f172a] uppercase tracking-wider">{site.type}</span>
              <h3 className="font-black text-sm sm:text-base text-[#0f172a] mt-0.5 leading-tight">{site.title}</h3>
            </div>
            <span className="bg-[#06b6d4]/10 text-[#06b6d4] text-xs font-black px-2 sm:px-2.5 py-1 rounded-lg shrink-0 whitespace-nowrap">{site.metric}</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {site.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-semibold bg-[#dff6ff]/60 text-[#06b6d4] px-2 sm:px-2.5 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Reel Card ────────────────────────────────────────────────────────
function ReelCard({ reel, i, onUnlockClick }) {
  const videoRef = useRef(null);
  const cardRef  = useRef(null);
  const inView   = useInView(cardRef, { once: false, margin: "-40px" });

  useEffect(() => {
    if (!videoRef.current) return;
    if (inView) videoRef.current.play().catch(() => {});
    else         videoRef.current.pause();
  }, [inView]);

  return (
    <motion.div
      ref={cardRef}
      onClick={onUnlockClick}
      className="group relative rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{ aspectRatio: "9/16" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      whileHover={{ scale: 1.025, zIndex: 10 }}
    >
      <div className="absolute -inset-1 rounded-2xl bg-[#06b6d4]/0 group-hover:bg-[#06b6d4]/25 blur-lg transition-all duration-500 -z-10" />

      <video
        ref={videoRef}
        src={reel.src}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        autoPlay muted loop playsInline disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
      />

      <div className="absolute inset-0 z-10" onContextMenu={(e) => e.preventDefault()} draggable={false} />

      <div className="absolute top-2.5 left-2.5 z-20 bg-black/50 backdrop-blur-sm text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
        {reel.category}
      </div>

      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}>
        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
          <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 3l14 9-14 9V3z"/>
          </svg>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-20 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 z-30 p-3 text-center">
        <p className="text-white font-bold text-[11px] leading-tight drop-shadow-lg">{reel.title}</p>
      </div>
    </motion.div>
  );
}

// ─── Reels CTA ────────────────────────────────────────────────────────
function ReelsCTA({ onUnlockClick }) {
  const count = useUnlockCount(47);
  const ref   = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="relative mb-16 sm:mb-24"
    >
      <div className="absolute inset-x-0 -top-20 h-40 bg-gradient-to-t from-white via-white/90 to-transparent z-20 pointer-events-none" />

      <div className="relative z-30 mx-auto max-w-xl px-4">
        <div className="relative bg-[#0f172a] rounded-3xl p-6 sm:p-8 overflow-hidden text-center shadow-2xl">
          <motion.div
            className="absolute -top-10 -left-10 w-48 h-48 bg-[#06b6d4]/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }} />
          <motion.div
            className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#0f172a]/20 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 4, repeat: Infinity }} />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-5">
              <motion.span
                className="w-2 h-2 rounded-full bg-[#06b6d4] shrink-0"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }} />
              <span className="text-white/70 text-xs font-medium">
                <motion.span
                  key={count}
                  className="text-white font-black"
                  initial={{ scale: 1.3, color: "#06b6d4" }}
                  animate={{ scale: 1, color: "#ffffff" }}
                  transition={{ duration: 0.4 }}>
                  {count}
                </motion.span>
                {" "}brands unlocked our portfolio every month
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
              See <span className="text-[#06b6d4]">All {reelVideos.length * 50}+ Reels</span> We've Made
            </h3>
            <p className="text-white/40 text-sm mb-6">
              Our complete reel library is one form away. Takes 30 seconds.
            </p>

            <motion.button
              onClick={onUnlockClick}
              className="relative group/btn w-full bg-[#06b6d4] text-white py-4 rounded-2xl font-black text-sm overflow-hidden"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }} />
              <span className="relative flex items-center justify-center gap-2">
                🔓 Unlock Full Library
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </span>
            </motion.button>

            <p className="text-white/25 text-xs mt-3">No spam · We respond in &lt; 24h</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Floating Sticky CTA ──────────────────────────────────────────────
function FloatingReelsCTA({ onUnlockClick, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          <motion.button
            onClick={onUnlockClick}
            className="relative flex items-center justify-center gap-3 bg-[#0f172a] text-white w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-sm shadow-2xl border border-white/10 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#06b6d4]"
              animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.03, 1] }}
              transition={{ duration: 2, repeat: Infinity }} />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }} />
            <motion.span
              className="w-2 h-2 rounded-full bg-[#06b6d4] shrink-0"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }} />
            <span className="relative">🎬 Unlock Full Library</span>
            <span className="relative bg-[#06b6d4] text-white text-[10px] font-black px-2 py-0.5 rounded-full">FREE</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Lead Capture Modal ───────────────────────────────────────────────
function LeadModal({ isOpen, onClose }) {
  const [form, setForm]           = useState({ name: "", phone: "", email: "", business: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // EmailJS template params — must match your EmailJS template variables
    const templateParams = {
      from_name:     form.name,
      phone:         form.phone,
      reply_to:      form.email,
      business_name: form.business || "Not provided",
      message:       `New portfolio request from ${form.name} (${form.business || "No business name"})`,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center sm:px-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

        <motion.div
          className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-md p-6 sm:p-8 z-10 overflow-hidden max-h-[95vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>

          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#06b6d4] via-[#0f172a] to-[#06b6d4]" />
          <div className="flex justify-center mb-4 sm:hidden">
            <div className="w-10 h-1 bg-[#dff6ff] rounded-full" />
          </div>

          <button onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f7fcff] border border-[#dff6ff] flex items-center justify-center text-[#9ca3af] hover:text-[#0f172a] transition-colors text-xs">
            ✕
          </button>

          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#06b6d4]/10 flex items-center justify-center text-2xl mx-auto mb-4">🎬</div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] mb-2">Unlock Full Portfolio</h2>
                <p className="text-[#6b7280] text-sm">Fill your details — we'll share our complete reel library and reach out to discuss your project.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: "Your Name *",       key: "name",     type: "text",  placeholder: "Rahul Kumar",              required: true  },
                  { label: "Phone Number *",     key: "phone",    type: "tel",   placeholder: "+91 98765 43210",          required: true  },
                  { label: "Email Address *",    key: "email",    type: "email", placeholder: "you@example.com",          required: true  },
                  { label: "Business Name",      key: "business", type: "text",  placeholder: "Your Business (optional)", required: false },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-xs font-bold text-[#374151] mb-1.5 block">{f.label}</label>
                    <input
                      required={f.required} type={f.type} placeholder={f.placeholder}
                      value={form[f.key]}
                      onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      className="w-full border border-[#dff6ff] rounded-xl px-4 py-3 text-sm text-[#0f172a] placeholder-[#9ca3af] focus:outline-none focus:border-[#06b6d4] focus:ring-2 focus:ring-[#06b6d4]/20 transition-all"
                    />
                  </div>
                ))}

                {error && (
                  <p className="text-red-500 text-xs text-center font-medium">{error}</p>
                )}

                <motion.button type="submit" disabled={loading}
                  className="relative w-full bg-[#06b6d4] text-white py-4 rounded-xl font-black text-sm shadow-xl shadow-[#06b6d4]/30 hover:bg-[#0891b2] transition-all duration-300 disabled:opacity-70 mt-2 overflow-hidden"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }} />
                  <span className="relative">{loading ? "Sending..." : "Get Full Portfolio Access →"}</span>
                </motion.button>

                <p className="text-[#9ca3af] text-xs text-center">We'll contact you within 24 hours. No spam, ever.</p>
              </form>
            </>
          ) : (
            <motion.div className="text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}>
              <div className="w-16 h-16 rounded-full bg-[#dff6ff] flex items-center justify-center text-3xl mx-auto mb-5">✅</div>
              <h2 className="text-2xl font-black text-[#0f172a] mb-3">You're In!</h2>
              <p className="text-[#6b7280] text-sm mb-2">
                Thanks <span className="font-bold text-[#0f172a]">{form.name}</span>! We've received your request.
              </p>
              <p className="text-[#6b7280] text-sm mb-6">
                Our team will reach out to <span className="font-bold text-[#06b6d4]">{form.phone}</span> within 24 hours.
              </p>
              <motion.button onClick={onClose}
                className="bg-[#06b6d4] text-white px-8 py-3 rounded-xl font-bold text-sm"
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                Close
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Stats Strip ──────────────────────────────────────────────────────
function StatsStrip() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial="hidden" animate={inView ? "show" : "hidden"} variants={stagger}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16 sm:mb-20">
      {stats.map((s, i) => (
        <motion.div key={i} variants={fadeUp} custom={i}
          className="bg-white border border-[#dff6ff] rounded-2xl p-4 sm:p-5 text-center shadow-sm hover:shadow-md hover:border-[#06b6d4]/30 transition-all duration-300"
          whileHover={{ y: -3 }}>
          <div className="text-2xl sm:text-3xl font-black text-[#06b6d4] mb-1">{s.num}</div>
          <div className="text-[#0f172a]/50 text-[11px] sm:text-xs font-medium">{s.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────
export default function Works() {
  const [modalOpen, setModalOpen]       = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowFloating(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showReels = activeFilter === "All" || activeFilter === "Reels";
  const showWebs  = activeFilter === "All" || activeFilter === "Websites";
  const showAds   = activeFilter === "All" || activeFilter === "Ad Campaigns";

  return (
    <div className="pt-28 sm:pt-32 pb-20 min-h-screen bg-white">

      <FloatingReelsCTA visible={showFloating && !modalOpen} onUnlockClick={() => setModalOpen(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

        {/* ── Page Header ────────────────────────────────────────── */}
        <motion.div className="text-center py-10 sm:py-16"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#dff6ff]/60 text-[#06b6d4] text-xs font-bold px-4 py-2 rounded-full mb-5">
            ✦ Portfolio
          </motion.div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f172a] mb-4 sm:mb-5 px-2">
            Our Creative <span className="text-[#06b6d4]">Work</span>
          </h1>
          <p className="text-[#0f172a]/50 text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 px-4">
            Real results for real brands. Browse our portfolio of reels, websites, and ad campaigns.
          </p>

          <div className="flex flex-wrap gap-2 justify-center px-4">
            {categories.map((cat) => (
              <motion.button key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-[#06b6d4] text-white shadow-lg shadow-[#06b6d4]/25"
                    : "bg-[#f7fcff] border border-[#dff6ff] text-[#0f172a]/60 hover:border-[#06b6d4]/40"
                }`}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                {cat}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ── Stats Strip ─────────────────────────────────────────── */}
        <StatsStrip />

        {/* ── REELS ─────────────────────────────────────────────── */}
        <AnimatePresence>
          {showReels && (
            <motion.div key="reels" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SectionHeader
                badge="🎬 Video Content"
                title="Reel Portfolio"
                subtitle="Short-form videos that captured millions of views across platforms."
              />

              {reelVideos.length === 0 ? (
                <div className="text-center py-16 text-[#9ca3af] border-2 border-dashed border-[#dff6ff] rounded-3xl mb-10 mx-4">
                  <div className="text-4xl mb-3">🎬</div>
                  <p className="font-bold text-[#6b7280] mb-1">Add your videos to get started</p>
                  <p className="text-sm px-4">Import your .mp4 files and add them to the <code className="bg-[#f7fcff] px-1 rounded">reelVideos</code> array</p>
                </div>
              ) : (
                <>
                  <div className="relative mb-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4">
                      {reelVideos.map((reel, i) => (
                        <ReelCard key={reel.id} reel={reel} i={i} onUnlockClick={() => setModalOpen(true)} />
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/70 to-transparent pointer-events-none z-20 rounded-b-2xl" />
                  </div>
                  <ReelsCTA onUnlockClick={() => setModalOpen(true)} />
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── WEBSITES ──────────────────────────────────────────── */}
        <AnimatePresence>
          {showWebs && (
            <motion.div key="websites" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SectionHeader
                badge="💻 Web Development"
                title="Website Projects"
                subtitle="High-converting websites and funnels built with precision."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-16 sm:mb-24">
                {websites.map((site, i) => (
                  <LaptopCard key={site.id} site={site} i={i} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── AD CREATIVES ─────────────────────────────────────── */}
        <AnimatePresence>
          {showAds && (
            <motion.div key="ads" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <SectionHeader
                badge="📣 Performance Marketing"
                title="Ad Creative Designs"
                subtitle="Scroll-stopping creatives that drive real conversions."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16 sm:mb-24">
                {adCreatives.map((ad, i) => (
                  <motion.div key={ad.id}
                    className="rounded-2xl overflow-hidden border border-[#dff6ff]/60 bg-white shadow-lg shadow-[#67e8f9]/10 hover:shadow-xl hover:shadow-[#06b6d4]/15 transition-all duration-500 group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -6 }}>
                    <div className={`h-40 sm:h-52 relative overflow-hidden`}>
                      {ad.image ? (
                        <img src={ad.image} alt={ad.title} className="w-full h-full object-cover object-top" loading="lazy" />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${ad.color} flex items-center justify-center`}>
                          <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10" />
                          <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full bg-white/10" />
                          <motion.span className="text-5xl sm:text-6xl relative z-10"
                            whileHover={{ scale: 1.15, rotate: [-2, 2, -2, 0] }}
                            transition={{ duration: 0.4 }}>
                            {ad.emoji}
                          </motion.span>
                        </div>
                      )}
                      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 backdrop-blur-sm text-[#0f172a] font-black text-xs sm:text-sm px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl shadow-md">
                        {ad.metric}
                      </div>
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-[#0f172a]/55 backdrop-blur-sm text-white text-xs font-semibold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full">
                        {ad.platform}
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <span className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">{ad.brand}</span>
                      <h3 className="font-black text-base sm:text-lg text-[#0f172a] mt-1">{ad.title}</h3>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom CTA Strip ─────────────────────────────────── */}
        {activeFilter === "All" && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0f172a] rounded-3xl p-8 sm:p-10 md:p-14 text-center relative overflow-hidden mb-6">
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#06b6d4]/20 rounded-full blur-[80px]"
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }} />
            <div className="relative z-10">
              <p className="text-[#06b6d4] text-xs font-bold tracking-widest uppercase mb-4">Ready to be our next case study?</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">
                Let's Build Something <span className="text-[#06b6d4]">That Converts.</span>
              </h2>
              <p className="text-white/50 max-w-md mx-auto mb-8 text-sm px-4">
                Every project in this portfolio started with one conversation. Let's have yours.
              </p>
              <motion.button
                onClick={() => setModalOpen(true)}
                className="relative bg-white text-[#06b6d4] px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-black text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#06b6d4]/10 to-transparent -skew-x-12"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }} />
                <span className="relative">Book Free Strategy Call →</span>
              </motion.button>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6">
                {["No commitment", "30-min call", "Custom plan"].map((item, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-white/40 text-xs">
                    <span className="text-[#06b6d4]">✓</span> {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <LeadModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}