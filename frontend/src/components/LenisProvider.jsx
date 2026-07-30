/**
 * LenisProvider — wraps the app in Lenis smooth (momentum) scrolling.
 *
 * `root` attaches Lenis to the window scroller. The options tune the "feel":
 *  - lerp: how quickly the scroll catches up (lower = smoother/heavier).
 *  - duration: base duration for programmatic scrollTo() calls.
 *  - smoothWheel: apply easing to mouse-wheel input.
 *  - wheel/touchMultiplier: scroll speed for wheel vs. touch.
 * Navbar and Footer read this instance via the useLenis() hook to animate
 * jumps to sections instead of using the browser's native (instant) scroll.
 */
import { ReactLenis } from "lenis/react";

export default function LenisProvider({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
