import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
 {
    name: "Ahkila",
    role: "Founder, Krin Brin School",
    avatar: "A",
    avatarBg: "from-[#588ef4] to-[#beb9df]",
    rating: 5,
    text: "Within 3 months we went from 0 to 4 lakh in monthly revenue. The team just gets it — strategy, execution, everything.",
  },
  {
    name: "Saranya",
    role: "Founder, Saranya Elite Bridal Studio",
    avatar: "S",
    avatarBg: "from-[#749985] to-[#dadcf4]",
    rating: 5,
    text: "I was getting 45 leads a month. Now I get 10+ qualified leads monthly. The WhatsApp automation alone saved me hours.",
  },
  {
    name: "Prem Charlesr",
    role: "Founder, Allinov",
    avatar: "P",
    avatarBg: "from-[#beb9df] to-[#588ef4]",
    rating: 5,
    text: "I've hired agencies before — these guys are a completely different level.",
  },
];

function StarRating({ count }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#588ef4">
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
            className="bg-white border border-[#dadcf4]/60 rounded-3xl p-10 shadow-xl shadow-[#beb9df]/20"
          >
            {/* Quote mark */}
            <div className="text-7xl leading-none font-black text-[#588ef4]/15 mb-4 select-none">"</div>

            <StarRating count={testimonials[current].rating} />

            <p className="text-[#1e1e1e]/70 text-lg leading-relaxed mt-4 mb-8 italic">
              "{testimonials[current].text}"
            </p>

            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[current].avatarBg} flex items-center justify-center text-white font-black text-sm`}>
                {testimonials[current].avatar}
              </div>
              <div>
                <p className="font-bold text-[#1e1e1e]">{testimonials[current].name}</p>
                <p className="text-sm text-[#1e1e1e]/50">{testimonials[current].role}</p>
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
                i === current ? "w-8 h-2 bg-[#588ef4]" : "w-2 h-2 bg-[#dadcf4]"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-3">
          <motion.button
            onClick={prev}
            className="w-11 h-11 rounded-full bg-white border border-[#dadcf4] hover:border-[#588ef4] hover:bg-[#588ef4] hover:text-white text-[#1e1e1e] flex items-center justify-center transition-colors duration-300 shadow-sm"
            whileTap={{ scale: 0.9 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </motion.button>
          <motion.button
            onClick={next}
            className="w-11 h-11 rounded-full bg-[#588ef4] text-white hover:bg-[#3d6fd4] flex items-center justify-center transition-colors duration-300 shadow-lg shadow-[#588ef4]/30"
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