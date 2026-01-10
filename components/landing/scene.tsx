"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Spread particles wider
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const color = new THREE.Color();
      // Cyberpunk colors: Cyan, Purple, Blue with some variations
      if (Math.random() > 0.6) {
        color.setRGB(0, 0, Math.random() * 0.5 + 0.5); // Blue
      } else if (Math.random() > 0.3) {
        color.setHex(0x9d4edd); // Purple
      } else {
        color.setHex(0x00b4d8); // Cyan
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    return [positions, colors];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 30;
      ref.current.rotation.y -= delta / 40;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function MovingRays() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      // Rotate the group slowly
      group.current.rotation.z += 0.001;
      group.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={group}>
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 50,
            (Math.random() - 0.5) * 20,
          ]}
          rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
        >
          <cylinderGeometry args={[0.02, 0.02, 20]} />
          <meshBasicMaterial
            color={new THREE.Color().setHSL(Math.random(), 0.8, 0.5)}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();

  useFrame((state) => {
    camera.position.x += (state.pointer.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (state.pointer.y * 0.5 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function Scene() {
  return (
    <div className="fixed inset-0 -z-10 h-screen w-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <fog attach="fog" args={["#000000", 5, 40]} />

        {/* Deep space stars */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Floating dust/sparkles */}
        <Sparkles
          count={500}
          scale={20}
          size={2}
          speed={0.4}
          opacity={0.5}
          color="#8b5cf6"
        />
        <Sparkles
          count={300}
          scale={25}
          size={3}
          speed={0.3}
          opacity={0.4}
          color="#00b4d8"
        />

        <Particles />
        <MovingRays />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          {/* Add some floating geometry here if needed */}
        </Float>
        <CameraRig />
      </Canvas>
    </div>
  );
}
