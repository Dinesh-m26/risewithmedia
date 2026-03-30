import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
 {
    name: "Ahkila",
    role: "Founder, Krin Brin School",
    avatar: "A",
    avatarBg: "from-[#2f6b6a] to-[#c9a46a]",
    rating: 5,
    text: "Within 3 months we went from 0 to 4 lakh in monthly revenue. The team just gets it — strategy, execution, everything.",
  },
  {
    name: "Saranya",
    role: "Founder, Saranya Elite Bridal Studio",
    avatar: "S",
    avatarBg: "from-[#243746] to-[#ece3d4]",
    rating: 5,
    text: "I was getting 45 leads a month. Now I get 10+ qualified leads monthly. The WhatsApp automation alone saved me hours.",
  },
  {
    name: "Prem Charlesr",
    role: "Founder, Allinov",
    avatar: "P",
    avatarBg: "from-[#c9a46a] to-[#2f6b6a]",
    rating: 5,
    text: "I've hired agencies before — these guys are a completely different level.",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#2f6b6a">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index, dir) => {
    setDirection(dir);
    setCurrent(index);
  };

  const prev = () => {
    goTo((current - 1 + testimonials.length) % testimonials.length, -1);
  };

  const next = () => {
    goTo((current + 1) % testimonials.length, 1);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const variants = {
    enter: (dir) => ({ x: dir * 80, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: (dir) => ({ x: dir * -80, opacity: 0, transition: { duration: 0.3 } }),
  };

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="overflow-hidden rounded-3xl">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="bg-white border border-[#ece3d4]/60 rounded-3xl p-10 shadow-xl shadow-[#c9a46a]/20"
          >
            {/* Quote mark */}
            <div className="text-7xl leading-none font-black text-[#2f6b6a]/15 mb-4 select-none">"</div>

            <StarRating count={testimonials[current].rating} />

            <p className="text-[#243746]/70 text-lg leading-relaxed mt-4 mb-8 italic">
              "{testimonials[current].text}"
            </p>

            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[current].avatarBg} flex items-center justify-center text-white font-black text-sm`}>
                {testimonials[current].avatar}
              </div>
              <div>
                <p className="font-bold text-[#243746]">{testimonials[current].name}</p>
                <p className="text-sm text-[#243746]/50">{testimonials[current].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-8">
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className={`transition-all duration-300 rounded-full ${
                i === current ? "w-8 h-2 bg-[#2f6b6a]" : "w-2 h-2 bg-[#ece3d4]"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <motion.button
            onClick={prev}
            className="w-11 h-11 rounded-full bg-white border border-[#ece3d4] hover:border-[#2f6b6a] hover:bg-[#2f6b6a] hover:text-white text-[#243746] flex items-center justify-center transition-colors duration-300 shadow-sm"
            whileTap={{ scale: 0.9 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </motion.button>
          <motion.button
            onClick={next}
            className="w-11 h-11 rounded-full bg-[#2f6b6a] text-white hover:bg-[#255756] flex items-center justify-center transition-colors duration-300 shadow-lg shadow-[#2f6b6a]/30"
            whileTap={{ scale: 0.9 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}