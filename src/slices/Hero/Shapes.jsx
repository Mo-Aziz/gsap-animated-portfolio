"use client";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />

          <Environment preset="studio" />
        </Suspense>
      </Canvas>
      {/* </a> */}
    </div>
  );
}

function Geometries() {
  const geometries = [
    {
      position: [0, 0, 0],
      r: 0.3,
      geometry: new THREE.IcosahedronGeometry(3), //Gem-1
    },
    {
      position: [1, -0.75, 4],
      r: 0.4,
      geometry: new THREE.CapsuleGeometry(0.5, 1.6, 2, 16), //Capsule-2
    },
    {
      position: [-1, 1, 4],
      r: 0.6,
      geometry: new THREE.DodecahedronGeometry(1), //soccer ball-3
    },
    {
      position: [-0.8, -0.75, 5],
      r: 0.5,
      geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32), //Donut-4
    },
    {
      position: [1.2, 1.6, 4],
      r: 0.7,
      geometry: new THREE.OctahedronGeometry(1), //Octa-shape diamond-5
    },
  ];
  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({ color: 0x2ecc71, roughness: 0 }),
    new THREE.MeshStandardMaterial({ color: 0xf1c40f, roughness: 0.4 }),
    new THREE.MeshStandardMaterial({ color: 0xe74c3c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x8e44ad, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x1abc9c, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.5,
      color: 0x2980b9,
    }),
    new THREE.MeshStandardMaterial({ color: 0x2c3e50, roughness: 0.5 }),
  ];
  //pass to Geometry component

  return (
    <>
      {geometries.map(({ r, position, geometry }) => (
        <Geometry
          key={JSON.stringify(position)}
          position={position.map((p) => p * 2)}
          geometry={geometry}
          materials={materials}
          r={r}
        />
      ))}
    </>
  );
}

function Geometry({ geometry, materials, position, r }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);
  const startingMaterial = getRandomMaterial();
  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }
  function handleClick(e) {
    const mesh = e.object;
    gsap.to(mesh.rotation, {
      x: `+=${gsap.utils.random(0, 2)}`,
      y: `+=${gsap.utils.random(0, 2)}`,
      z: `+=${gsap.utils.random(0, 2)}`,
      duration: 1.3,
      ease: "elastic.out(1, 0.3)",
      yoyo: true,
    });
    mesh.material = getRandomMaterial();
  }
  const handlePointerOver = (e) => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerout = (e) => {
    document.body.style.cursor = "default";
  };

  // object appearance motion
  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.3,
        ease: "elastic.out(1, 0.4)",
        delay: 3.2,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerout}
          visible={visible}
          material={startingMaterial}
        />
      </Float>
    </group>
  );
}
