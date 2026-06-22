import { motion } from "framer-motion";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: "var(--bg-1)" }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative h-24 w-24">
        <span className="absolute inset-0 rounded-full border-2 border-cyanx-400/30" />
        <motion.span
          className="absolute inset-0 rounded-full border-t-2 border-cyanx-400"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <motion.span
          className="absolute inset-2 rounded-full border-b-2 border-electric-400"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
        />
        <span className="absolute inset-0 grid place-items-center font-display text-2xl font-extrabold text-gradient">
          PFE
        </span>
      </div>
      <motion.p
        className="mt-6 text-sm uppercase tracking-[0.35em] muted"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      >
        Préparation de l'invitation
      </motion.p>
    </motion.div>
  );
}
