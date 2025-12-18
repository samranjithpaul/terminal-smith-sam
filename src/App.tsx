import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TerminalProvider } from "@/contexts/TerminalContext";
import { TerminalWindow } from "@/components/TerminalWindow";
import { TerminalHeader } from "@/components/TerminalHeader";
import { Navigation } from "@/components/Navigation";
import { CommandInput } from "@/components/CommandInput";
import { BootSequence } from "@/components/BootSequence";
import { AmbientGlitch } from "@/components/AmbientGlitch";
import { SignalGlitch } from "@/components/SignalGlitch";
import { terminalSounds } from "@/utils/sounds";
import { useEffect, useState, useCallback } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Check if boot sequence has been shown this session
const BOOT_SHOWN_KEY = 'terminal_boot_shown';

const AppContent = () => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showBoot, setShowBoot] = useState(() => {
    // Only show boot on first visit per session
    return !sessionStorage.getItem(BOOT_SHOWN_KEY);
  });

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem(BOOT_SHOWN_KEY, 'true');
    setShowBoot(false);
  }, []);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        // Play boot sound on first user interaction (after boot sequence)
        if (!showBoot) {
          setTimeout(() => terminalSounds.playBootSound(), 100);
        }
      }
    };

    // Listen for any user interaction
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasInteracted, showBoot]);

  return (
    <BrowserRouter>
      {showBoot && <BootSequence onComplete={handleBootComplete} duration={2000} />}
      <AmbientGlitch interval={22000} />
      <SignalGlitch interval={20000} duration={1500} />
      <TerminalWindow>
        <TerminalHeader />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CommandInput />
      </TerminalWindow>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TerminalProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TerminalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
