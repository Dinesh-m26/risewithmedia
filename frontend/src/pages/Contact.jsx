import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_s15r115";
const EMAILJS_TEMPLATE_ID = "template_hpylv7f";
const EMAILJS_PUBLIC_KEY = "srGKTSrmIkawAjpyy";

const services = [
  "Content & Social Media",
  "Website & Funnel Development",
  "Performance Marketing",
  "AI Automation & CRM",
  "Full Digital Package",
];

const budgets = [
  "Under ₹10K/mo",
  "₹10K – ₹25K/mo",
  "₹25K – ₹50K/mo",
  "₹50K – ₹1L/mo",
  "₹1L+/mo",
];

const contactInfo = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.16 6.16l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
      </svg>
    ),
    label: "Phone",
    value: "+91 9345254648",
    href: "tel:+919345254648",
    color: "from-[#588ef4]/15 to-[#dadcf4]/30",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email",
    value: "hello@risewithmedia.com",
    href: "mailto:hello@risewithmedia.com",
    color: "from-[#beb9df]/30 to-[#dadcf4]/20",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Location",
    value: "Krishnagiri, Tamil Nadu, India",
    href: null,
    color: "from-[#749985]/20 to-[#dadcf4]/20",
  },
];

const trustPoints = [
  { icon: "⚡", text: "Reply within 24h" },
  { icon: "🎯", text: "Custom strategy" },
  { icon: "🔒", text: "No lock-in" },
];

// ─── Input Field ─────────────────────────────────────────────────────
function InputField({ label, name, type = "text", value, onChange, placeholder, required }) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="relative">
      <label className="text-xs font-bold text-[#1e1e1e]/45 uppercase tracking-wider mb-1.5 block">
        {label} {required && <span className="text-[#588ef4]">*</span>}
      </label>
      <div className={`relative transition-all duration-300 ${focused ? "drop-shadow-sm" : ""}`}>
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          required={required}
          className="w-full px-4 py-3.5 rounded-xl bg-[#fdfcfd] border border-[#dadcf4] focus:border-[#588ef4] focus:ring-2 focus:ring-[#588ef4]/15 outline-none text-sm text-[#1e1e1e] transition-all placeholder:text-[#1e1e1e]/25 font-medium"
        />
        <motion.div
          className="absolute right-3.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#588ef4]"
          animate={{ opacity: focused ? 1 : 0, scale: focused ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}

// ─── Service Pill Selector ────────────────────────────────────────────
function PillSelector({ label, name, options, value, onChange, required }) {
  return (
    <div>
      <label className="text-xs font-bold text-[#1e1e1e]/45 uppercase tracking-wider mb-2 block">
        {label} {required && <span className="text-[#588ef4]">*</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((s) => (
          <motion.button
            key={s}
            type="button"
            onClick={() => onChange({ target: { name, value: s } })}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
              value === s
                ? "bg-[#588ef4] text-white border-[#588ef4] shadow-md shadow-[#588ef4]/20"
                : "bg-[#fdfcfd] text-[#1e1e1e]/55 border-[#dadcf4] hover:border-[#588ef4]/40 hover:text-[#588ef4]"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}>
            {s}
          </motion.button>
        ))}
      </div>
      <input type="text" name={name} value={value} required={required} readOnly className="opacity-0 h-0 absolute" />
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business_name: "",
    service: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          business_name: form.business_name,
          service: form.service,
          budget: form.budget,
          message: form.message,
          to_name: "RiseWithMedia Team",
          time: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", phone: "", business_name: "", service: "", budget: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white relative overflow-hidden">

      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#dadcf4]/25 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#588ef4]/8 rounded-full blur-[100px] translate-x-1/3 translate-y-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ─── LEFT PANEL ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

            <div className="inline-flex items-center gap-2 bg-[#dadcf4]/60 text-[#588ef4] text-xs font-bold px-4 py-2 rounded-full mb-6">
              ✦ Get in Touch
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-[#1e1e1e] leading-tight mb-5">
              Let's Grow Your<br />
              <span className="bg-gradient-to-r from-[#588ef4] to-[#749985] bg-clip-text text-transparent">
                Business.
              </span>
            </h1>
            <p className="text-[#1e1e1e]/50 text-lg leading-relaxed max-w-md mb-10">
              Ready to transform your digital presence? Tell us about your business and we'll craft a custom strategy to accelerate your growth.
            </p>

            <div className="flex gap-4 mb-10 flex-wrap">
              {trustPoints.map((t, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2 bg-[#f8f9ff] border border-[#dadcf4] rounded-full px-4 py-2">
                  <span className="text-sm">{t.icon}</span>
                  <span className="text-xs font-bold text-[#1e1e1e]/60">{t.text}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col gap-3 mb-10">
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  className={`flex items-center gap-4 bg-gradient-to-r ${info.color} border border-[#dadcf4]/60 rounded-2xl p-4`}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  whileHover={{ x: 5 }}>
                  <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#588ef4] shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1e1e1e]/40 uppercase tracking-wider mb-0.5">{info.label}</p>
                    {info.href ? (
                      <a href={info.href} className="font-semibold text-[#1e1e1e] text-sm hover:text-[#588ef4] transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-[#1e1e1e] text-sm">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="https://wa.me/919345254648?text=Hi%20RiseWithMedia!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-[#25D366]/25 hover:bg-[#1fba59] transition-all duration-300"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Chat on WhatsApp
            </motion.a>
          </motion.div>

          {/* ─── RIGHT: FORM ─────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}>

            <div className="bg-white rounded-3xl border border-[#dadcf4]/60 shadow-2xl shadow-[#beb9df]/20 p-8 md:p-10">
              <AnimatePresence mode="wait">

                {/* ── Success State ── */}
                {status === "success" ? (
                  <motion.div key="success"
                    className="flex flex-col items-center text-center gap-6 py-12"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}>
                    <motion.div
                      className="w-24 h-24 rounded-full bg-gradient-to-br from-[#749985] to-[#588ef4] flex items-center justify-center shadow-xl shadow-[#749985]/30"
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}>
                      <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </motion.div>
                    <div>
                      <h3 className="font-black text-2xl text-[#1e1e1e] mb-3">Message Sent! 🎉</h3>
                      <p className="text-[#1e1e1e]/50 leading-relaxed text-sm">
                        Thank you for reaching out! Our team will get back to you within 24 hours with a custom growth strategy.
                      </p>
                    </div>
                    <motion.button onClick={() => setStatus("idle")}
                      className="bg-[#588ef4] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#3d6fd4] transition-colors"
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                      Send Another Message
                    </motion.button>
                  </motion.div>

                ) : (
                  <motion.form key="form" onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

                    <div className="mb-1">
                      <h2 className="font-black text-2xl text-[#1e1e1e] mb-1">Start Your Journey</h2>
                      <p className="text-sm text-[#1e1e1e]/40">We respond within 24 hours. Fields marked * are required.</p>
                    </div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
                      <InputField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@company.com" required />
                    </div>

                    {/* Phone + Business Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <InputField label="Phone Number" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required />
                      <InputField label="Business Name" name="business_name" value={form.business_name} onChange={handleChange} placeholder="Your Company Ltd." required />
                    </div>

                    {/* Service pills */}
                    <PillSelector
                      label="Service Interested"
                      name="service"
                      options={services}
                      value={form.service}
                      onChange={handleChange}
                      required
                    />

                    {/* Budget pills */}
                    <PillSelector
                      label="Monthly Budget"
                      name="budget"
                      options={budgets}
                      value={form.budget}
                      onChange={handleChange}
                      required
                    />

                    {/* Message */}
                    <div className="relative">
                      <label className="text-xs font-bold text-[#1e1e1e]/45 uppercase tracking-wider mb-1.5 block">
                        Your Message <span className="text-[#588ef4]">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your business and goals..."
                        required
                        rows={4}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#fdfcfd] border border-[#dadcf4] focus:border-[#588ef4] focus:ring-2 focus:ring-[#588ef4]/15 outline-none text-sm text-[#1e1e1e] transition-all placeholder:text-[#1e1e1e]/25 font-medium resize-none"
                      />
                      <div className="absolute bottom-3.5 right-3.5 text-[10px] text-[#1e1e1e]/25 font-medium">
                        {form.message.length}/500
                      </div>
                    </div>

                    {/* Error */}
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="text-red-500 text-xs text-center bg-red-50 border border-red-100 rounded-xl p-3">
                          Something went wrong. Please try again or contact us via WhatsApp.
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-[#588ef4] text-white py-4 rounded-xl font-black text-base shadow-xl shadow-[#588ef4]/25 hover:bg-[#3d6fd4] transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      {status === "loading" ? (
                        <>
                          <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3"/>
                            <path d="M12 3a9 9 0 019 9"/>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-xs text-[#1e1e1e]/30">
                      By submitting, you agree to receive communication from RiseWithMedia.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ─── Bottom CTA ───────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 mt-10">
        <motion.div
          className="bg-gradient-to-br from-[#dadcf4]/40 to-[#beb9df]/20 rounded-3xl p-10 text-center border border-[#dadcf4]/60"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          <h3 className="font-black text-2xl text-[#1e1e1e] mb-3">Prefer a Call?</h3>
          <p className="text-[#1e1e1e]/50 mb-6 text-sm leading-relaxed">
            Book a free 30-minute strategy session. We'll analyze your business and share a growth plan — no strings attached.
          </p>
          <motion.a
            href="https://wa.me/919345254648?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20strategy%20call."
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#1e1e1e] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#588ef4] transition-colors duration-300"
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            Book Free Strategy Call
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}