import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Background from "./components/Background";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EventInfo from "./components/EventInfo";
import Countdown from "./components/Countdown";
import LocationSection from "./components/LocationSection";
import AttendanceSection from "./components/AttendanceSection";
import Guestbook from "./components/Guestbook";
import SocialShare from "./components/SocialShare";
import Footer from "./components/Footer";
import RSVPProvider from "./components/RSVPProvider";
import { useTheme } from "./hooks/useTheme";

export default function App() {
  const { theme, toggle } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <RSVPProvider>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      <Background />
      <Navbar theme={theme} onToggleTheme={toggle} />

      <main>
        <Hero />
        <EventInfo />
        <Countdown />
        <LocationSection />
        <AttendanceSection />
        <Guestbook />
        <SocialShare />
      </main>

      <Footer />
    </RSVPProvider>
  );
}
