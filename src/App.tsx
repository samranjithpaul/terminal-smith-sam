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
import { terminalSounds } from "@/utils/sounds";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        // Play boot sound on first user interaction
        setTimeout(() => terminalSounds.playBootSound(), 100);
      }
    };

    // Listen for any user interaction
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasInteracted]);

  return (
    <BrowserRouter>
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
