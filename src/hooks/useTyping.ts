import { useEffect, useState } from "react";

/** Typewriter effect cycling through phrases. */
export function useTyping(phrases: string[], speed = 65, pause = 1600): string {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx % phrases.length];
    let delay = deleting ? speed / 2 : speed;

    if (!deleting && text === current) {
      delay = pause;
    } else if (deleting && text === "") {
      delay = 350;
    }

    const id = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setPhraseIdx((i) => i + 1);
      } else {
        const next = deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1);
        setText(next);
      }
    }, delay);

    return () => clearTimeout(id);
  }, [text, deleting, phraseIdx, phrases, speed, pause]);

  return text;
}
