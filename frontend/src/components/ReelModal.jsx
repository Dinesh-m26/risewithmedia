import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// Replace with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export default function ReelModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    setStatus("loading");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          phone: form.phone,
          subject: "Reel Access Request - RiseWithMedia",
          message: `${form.name} wants to view more reels.\nEmail: ${form.email}\nPhone: ${form.phone}`,
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const handleClose = () => {
    setForm({ name: "", email: "", phone: "" });
    setStatus("idle");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#243746]/70 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 z-10"
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#ece3d4]/50 hover:bg-[#c9a46a]/70 flex items-center justify-center transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {status === "success" ? (
              <motion.div
                className="flex flex-col items-center text-center gap-5 py-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring" }}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#243746] to-[#ece3d4] flex items-center justify-center shadow-lg">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-black text-2xl text-[#243746] mb-2">You're All Set!</h3>
                  <p className="text-[#243746]/60 text-sm leading-relaxed">
                    Thank you. Our team will contact you shortly with access to our reels.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="bg-[#2f6b6a] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#255756] transition-colors"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <>
                <div className="mb-7">
                  <div className="inline-flex items-center gap-2 bg-[#2f6b6a]/10 text-[#2f6b6a] text-xs font-bold px-3 py-1.5 rounded-full mb-4">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                    </svg>
                    Unlock Our Reels
                  </div>
                  <h3 className="font-black text-2xl text-[#243746] mb-2">View More Reels</h3>
                  <p className="text-[#243746]/55 text-sm">Fill in your details and we'll share our complete reel portfolio with you.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#243746]/50 uppercase tracking-wider mb-1.5 block">Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#fbf7f2] border border-[#ece3d4] focus:border-[#2f6b6a] focus:ring-2 focus:ring-[#2f6b6a]/20 outline-none text-sm text-[#243746] transition-all placeholder:text-[#243746]/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#243746]/50 uppercase tracking-wider mb-1.5 block">Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#fbf7f2] border border-[#ece3d4] focus:border-[#2f6b6a] focus:ring-2 focus:ring-[#2f6b6a]/20 outline-none text-sm text-[#243746] transition-all placeholder:text-[#243746]/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#243746]/50 uppercase tracking-wider mb-1.5 block">Phone Number *</label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-[#fbf7f2] border border-[#ece3d4] focus:border-[#2f6b6a] focus:ring-2 focus:ring-[#2f6b6a]/20 outline-none text-sm text-[#243746] transition-all placeholder:text-[#243746]/30"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-xs text-center">Something went wrong. Please try again.</p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-[#2f6b6a] text-white py-3.5 rounded-xl font-bold text-sm mt-2 hover:bg-[#255756] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeOpacity="0.3"/>
                          <path d="M12 3a9 9 0 019 9"/>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Get Access to Reels →"
                    )}
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}