/* eslint-disable react/no-unknown-property */
/**
 * Hero3D — the WebGL "liquid chrome" centerpiece (react-three-fiber).
 *
 * <Canvas> creates the WebGL scene. Inside:
 *   LiquidMetal — a distorted, highly-metallic icosahedron that slowly spins and
 *                 subtly follows the pointer.
 *   Rig         — an <Environment> built from <Lightformer> panels. Metals need
 *                 something to reflect; these coloured panels ARE the reflection
 *                 (no external HDR download required).
 *
 * `active` toggles the render loop: "always" while the hero is on screen,
 * "never" once scrolled away — this stops the GPU working when it's not visible.
 * The eslint-disable at the top silences false "unknown property" warnings for
 * three.js JSX props (args, position, rotation-x, intensity, …).
 */
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  Lightformer,
  MeshDistortMaterial,
} from "@react-three/drei";

// The animated metallic blob.
function LiquidMetal() {
  const ref = useRef();

  // Runs every frame: rotate over time + nudge toward the pointer position.
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.08 + state.pointer.y * 0.25;
      ref.current.rotation.y = t * 0.12 + state.pointer.x * 0.4;
    }
  });

  return (
    // <Float> gives a gentle hovering drift on top of our rotation.
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.4}>
      <mesh ref={ref} scale={2.15}>
        {/* icosahedron, detail 3 = enough vertices for smooth distortion
            without the huge cost of very high subdivisions */}
        <icosahedronGeometry args={[1, 3]} />
        <MeshDistortMaterial
          color="#101014" // near-black base
          metalness={1} // fully metallic → reflects the environment
          roughness={0.12} // low roughness → sharp, glossy reflections
          distort={0.4} // wobble amount (the "liquid" look)
          speed={1.6} // wobble speed
          envMapIntensity={1.4} // reflection strength
        />
      </mesh>
    </Float>
  );
}

// Coloured light panels that the metal reflects (acts as the environment map).
function Rig() {
  return (
    <Environment resolution={64}>
      <group rotation={[-Math.PI / 3, 0, 0]}>
        <Lightformer
          intensity={4}
          rotation-x={Math.PI / 2}
          position={[0, 5, -9]}
          scale={[10, 10, 1]}
        />
        <Lightformer
          intensity={2}
          rotation-y={Math.PI / 2}
          position={[-5, 1, -1]}
          scale={[10, 2, 1]}
          color="#8ab4ff" /* cool blue rim */
        />
        <Lightformer
          intensity={2}
          rotation-y={-Math.PI / 2}
          position={[5, -1, -1]}
          scale={[10, 2, 1]}
          color="#ffffff" /* white highlight */
        />
        <Lightformer
          intensity={1.5}
          rotation-y={Math.PI / 2}
          position={[-3, -3, 1]}
          scale={[8, 2, 1]}
          color="#ff6a3d" /* warm accent */
        />
      </group>
    </Environment>
  );
}

export default function Hero3D({ active = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.5]} // cap pixel ratio for performance
      frameloop={active ? "always" : "never"} // pause when hero is offscreen
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true" // decorative → hidden from screen readers
    >
      {/* Base fill + a key light; most of the "look" comes from the Rig */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <Suspense fallback={null}>
        <LiquidMetal />
        <Rig />
      </Suspense>
    </Canvas>
  );
}
