/**
 * App.js — Root application component.
 *
 * Composition order matters here:
 *  - <Preloader/> sits on top (z-100) and, once its counter finishes, flips
 *    `ready` to true. We only mount the heavy 3D hero AFTER that, so the intro
 *    animation never competes with WebGL start-up.
 *  - <CustomCursor/> and <Toaster/> are global overlays (cursor + notifications).
 *  - <LenisProvider/> wraps everything that should smooth-scroll.
 * The "App grain" class adds a fixed film-grain noise overlay (see index.css).
 */
import { useState } from "react";
import "@/App.css";
import { Toaster } from "sonner"; // toast notifications (used by the contact form)
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
  // `ready` becomes true when the preloader has finished its exit animation.
  const [ready, setReady] = useState(false);

  return (
    <div className="App grain">
      {/* Full-screen intro loader; calls setReady(true) when it disappears */}
      <Preloader onComplete={() => setReady(true)} />

      {/* Custom dot + trailing ring cursor (hidden on touch devices) */}
      <CustomCursor />

      {/* Global toast host, themed dark to match the site */}
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

      {/* Everything inside here gets Lenis momentum scrolling */}
      <LenisProvider>
        <Navbar />
        <main>
          {/* `ready` gates the WebGL sphere so it mounts only after the intro */}
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
