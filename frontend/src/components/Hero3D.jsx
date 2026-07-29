/* eslint-disable react/no-unknown-property */
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Environment,
  Lightformer,
  MeshDistortMaterial,
} from "@react-three/drei";

function LiquidMetal() {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.08 + state.pointer.y * 0.25;
      ref.current.rotation.y = t * 0.12 + state.pointer.x * 0.4;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.4}>
      <mesh ref={ref} scale={2.15}>
        <icosahedronGeometry args={[1, 3]} />
        <MeshDistortMaterial
          color="#101014"
          metalness={1}
          roughness={0.12}
          distort={0.4}
          speed={1.6}
          envMapIntensity={1.4}
        />
      </mesh>
    </Float>
  );
}

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
          color="#8ab4ff"
        />
        <Lightformer
          intensity={2}
          rotation-y={-Math.PI / 2}
          position={[5, -1, -1]}
          scale={[10, 2, 1]}
          color="#ffffff"
        />
        <Lightformer
          intensity={1.5}
          rotation-y={Math.PI / 2}
          position={[-3, -3, 1]}
          scale={[8, 2, 1]}
          color="#ff6a3d"
        />
      </group>
    </Environment>
  );
}

export default function Hero3D({ active = true }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <Suspense fallback={null}>
        <LiquidMetal />
        <Rig />
      </Suspense>
    </Canvas>
  );
}
