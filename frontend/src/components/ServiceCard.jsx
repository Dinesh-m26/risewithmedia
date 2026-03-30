import { motion } from "framer-motion";

export default function ServiceCard({
  icon,
  title,
  pitch,
  items,
  dark = false,
  accent = false,
  index = 0,
}) {
  return (
    <motion.div
      className={`relative rounded-2xl p-8 flex flex-col gap-5 cursor-default overflow-hidden
        ${dark
          ? "bg-[#243746] border border-white/10"
          : "bg-white border border-[#ece3d4]/60 shadow-xl shadow-[#c9a46a]/20"
        }
        ${accent ? "ring-2 ring-[#2f6b6a]/40" : ""}
      `}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, boxShadow: dark ? "0 24px 64px rgba(88,142,244,0.15)" : "0 24px 64px rgba(88,142,244,0.2)" }}
    >
      {/* Glow for dark accent cards */}
      {dark && accent && (
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#2f6b6a]/20 blur-3xl pointer-events-none" />
      )}

      {/* Icon */}
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl
        ${dark ? "bg-white/10" : "bg-gradient-to-br from-[#ece3d4] to-[#c9a46a]/60"}
      `}>
        {icon}
      </div>

      {/* Title */}
      <div>
        <h3 className={`font-bold text-xl mb-2 ${dark ? "text-white" : "text-[#243746]"}`}>{title}</h3>
        <p className={`text-sm leading-relaxed ${dark ? "text-white/50" : "text-[#243746]/55"}`}>{pitch}</p>
      </div>

      {/* Items */}
      <ul className="flex flex-col gap-2 mt-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2.5">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dark ? "bg-[#2f6b6a]" : "bg-[#243746]"}`} />
            <span className={`text-sm ${dark ? "text-white/60" : "text-[#243746]/65"}`}>{item}</span>
          </li>
        ))}
      </ul>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 h-1 rounded-b-2xl w-full bg-gradient-to-r
        ${dark ? "from-[#2f6b6a] to-[#c9a46a]" : "from-[#243746] to-[#ece3d4]"}
        opacity-60`}
      />
    </motion.div>
  );
}