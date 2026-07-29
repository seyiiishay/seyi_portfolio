import { useState } from "react";
import "@/App.css";
import { Toaster } from "sonner";
import LenisProvider from "@/components/LenisProvider";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function App() {
  const [ready, setReady] = useState(false);

  return (
    <div className="App grain">
      <Preloader onComplete={() => setReady(true)} />
      <CustomCursor />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#121212",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#ffffff",
            fontFamily: "JetBrains Mono, monospace",
            borderRadius: 0,
          },
        }}
      />
      <LenisProvider>
        <Navbar />
        <main>
          <Hero ready={ready} />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </LenisProvider>
    </div>
  );
}

export default App;
