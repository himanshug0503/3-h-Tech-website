import { useEffect, useMemo, useState } from "react";

export function IntroPage() {
  const text = useMemo(() => "3-H Tech.", []);
  const [typed, setTyped] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let index = 0;
      const timer = setInterval(() => {
        index += 1;
        setTyped(text.slice(0, index));
        if (index >= text.length) {
          clearInterval(timer);
          setTimeout(() => setReady(true), 700);
        }
      }, 200);
      return () => clearInterval(timer);
    }, 800);

    return () => clearTimeout(timeout);
  }, [text]);

  const proceed = () => {
    if (ready) {
      window.location.href = "/home";
    }
  };

  return (
    <div className="intro-overlay" onClick={proceed} onKeyDown={(e) => e.key === "Enter" && proceed()} role="button" tabIndex={0}>
      <div className="typewriter">{typed}<span className="cursor" /></div>
      <div className={`continue-text ${ready ? "show" : ""}`}>Click to continue</div>
    </div>
  );
}
