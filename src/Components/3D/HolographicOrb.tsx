import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const HolographicOrb: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let animationFrameId: number;

    try {
      scene = new THREE.Scene();

      const width = container.clientWidth || 320;
      const height = container.clientHeight || 320;

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 5.5);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      container.innerHTML = "";
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL initialization failed for Orb", e);
      setHasError(true);
      return;
    }

    // Lights (Pure Titanium White & Silver)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0xffffff, 4, 15);
    light1.position.set(3, 3, 3);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x94a3b8, 3.5, 15);
    light2.position.set(-3, -3, 3);
    scene.add(light2);

    const light3 = new THREE.PointLight(0xffffff, 3, 15);
    light3.position.set(0, 4, -2);
    scene.add(light3);

    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    // Inner Glowing Core (Obsidian Noir)
    const coreGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x050508,
      roughness: 0.1,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    orbGroup.add(coreMesh);

    // Outer Wireframe Cage (Titanium White)
    const wireGeo = new THREE.IcosahedronGeometry(1.22, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    orbGroup.add(wireMesh);

    // Outer Torus Ring (Silver Platinum)
    const torusGeo = new THREE.TorusGeometry(1.8, 0.02, 16, 80);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.7,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    torus.rotation.x = Math.PI / 3;
    orbGroup.add(torus);

    // Swarm Particles (Monochrome White)
    const pCount = 90;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      const i3 = i * 3;
      pPos[i3] = (Math.random() - 0.5) * 5;
      pPos[i3 + 1] = (Math.random() - 0.5) * 5;
      pPos[i3 + 2] = (Math.random() - 0.5) * 5;
    }
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    });
    const points = new THREE.Points(pGeo, pMat);
    orbGroup.add(points);

    // Cursor tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = (x / rect.width) * 2 - 1;
      mouseY = -(y / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        orbGroup.rotation.y = elapsed * 0.3 + mouseX * 0.5;
        orbGroup.rotation.x = Math.sin(elapsed * 0.25) * 0.2 - mouseY * 0.3;
        torus.rotation.z = elapsed * 0.5;
        points.rotation.y = -elapsed * 0.2;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (hasError) {
    return (
      <div className="flex h-64 w-64 items-center justify-center rounded-full bg-white/5 border border-white/10 p-4 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        <div className="flex h-full w-full items-center justify-center rounded-full border border-white/20 bg-[#050508]">
          <span className="text-4xl">🔮</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-64 w-64 md:h-72 md:w-72">
      <div ref={containerRef} className="h-full w-full" />
    </div>
  );
};

export default HolographicOrb;
