// Detect whether the device has real hardware GPU acceleration.
// Headless/CI browsers and very low-end devices fall back to software
// renderers (SwiftShader / llvmpipe / ANGLE Software) where full-screen
// WebGL is extremely slow. In those cases we render a lightweight fallback.
export function hasHardwareGPU() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!gl) return false;

    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = dbg
      ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)
      : gl.getParameter(gl.RENDERER);

    const r = String(renderer || "").toLowerCase();
    const isSoftware =
      r.includes("swiftshader") ||
      r.includes("llvmpipe") ||
      r.includes("software") ||
      r.includes("microsoft basic render") ||
      r === "";

    if (isSoftware) return false;

    // Also bail on devices that explicitly ask for reduced motion.
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return false;

    return true;
  } catch (e) {
    return false;
  }
}
