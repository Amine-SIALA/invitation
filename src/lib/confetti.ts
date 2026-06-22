import confetti from "canvas-confetti";

export function celebrate() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#22d3ee", "#2563eb", "#fde047", "#7cc4ff", "#ffffff"];
  const end = Date.now() + 1100;

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  confetti({
    particleCount: 140,
    spread: 90,
    startVelocity: 42,
    origin: { y: 0.6 },
    colors,
  });
}
