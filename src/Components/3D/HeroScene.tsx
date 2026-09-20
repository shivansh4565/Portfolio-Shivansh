import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Three.js Scene Setup
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let animationFrameId: number;

    try {
      scene = new THREE.Scene();

      const width = container.clientWidth || 500;
      const height = container.clientHeight || 500;

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 8.5);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = isLight ? 1.4 : 1.2;

      container.innerHTML = "";
      container.appendChild(renderer.domElement);
    } catch (e) {
      console.warn("WebGL initialization failed, falling back to static 3D UI", e);
      setHasWebGLError(true);
      return;
    }

    // Lights (Pure Titanium White, Metallic Silver, Deep Noir)
    const ambientLight = new THREE.AmbientLight(0xffffff, isLight ? 1.6 : 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, isLight ? 3.5 : 4.5, 20); // Titanium Platinum White
    pointLight1.position.set(5, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(isLight ? 0x64748b : 0x94a3b8, isLight ? 2.5 : 3.5, 20); // Metallic Silver
    pointLight2.position.set(-5, -3, 3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 3, 20); // Top Rim Light
    pointLight3.position.set(0, 5, -2);
    scene.add(pointLight3);

    // Group for all rotating elements
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central AI Neural Core (Inner geometric faceted crystal - Obsidian Onyx)
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: isLight ? 0x0f172a : 0x050508,
      roughness: 0.12,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 2. Outer Glowing Wireframe Cage (Titanium White / Slate)
    const wireGeo = new THREE.IcosahedronGeometry(1.62, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x334155 : 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: isLight ? 0.45 : 0.6,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // 3. Holographic Orbital Tech Rings (Monochrome Titanium)
    const ringGeo1 = new THREE.TorusGeometry(2.5, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0f172a : 0xffffff,
      transparent: true,
      opacity: isLight ? 0.5 : 0.75,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.9, 0.015, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: isLight ? 0x475569 : 0xcbd5e1,
      transparent: true,
      opacity: isLight ? 0.45 : 0.65,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(3.3, 0.012, 16, 100);
    const ringMat3 = new THREE.MeshBasicMaterial({
      color: isLight ? 0x64748b : 0x94a3b8,
      transparent: true,
      opacity: isLight ? 0.4 : 0.5,
    });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.x = Math.PI / 2;
    mainGroup.add(ring3);

    // 4. Floating Neural Nodes & Synapses
    const nodeCount = 28;
    const nodeGroup = new THREE.Group();
    const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0f172a : 0xffffff,
    });
    const nodePositions: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = 2.2 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const pos = new THREE.Vector3(x, y, z);
      nodePositions.push(pos);

      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      nodeGroup.add(nodeMesh);
    }
    mainGroup.add(nodeGroup);

    // 5. Connective Synaptic Lines between close nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: isLight ? 0x64748b : 0x94a3b8,
      transparent: true,
      opacity: isLight ? 0.35 : 0.45,
    });

    const lineGeo = new THREE.BufferGeometry();
    const linePositions: number[] = [];

    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 1.8) {
          linePositions.push(
            nodePositions[i].x,
            nodePositions[i].y,
            nodePositions[i].z,
            nodePositions[j].x,
            nodePositions[j].y,
            nodePositions[j].z
          );
        }
      }
    }

    lineGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    const lineMesh = new THREE.LineSegments(lineGeo, lineMaterial);
    mainGroup.add(lineMesh);

    // 6. Ambient Floating Particle Swarm (Pure Monochrome)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colWhite = new THREE.Color(0xffffff);
    const colSilver = new THREE.Color(0xcbd5e1);
    const colSlate = new THREE.Color(0x94a3b8);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      particlePositions[i3] = (Math.random() - 0.5) * 12;
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 12;
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 10;

      const randomCol =
        Math.random() > 0.6 ? colWhite : Math.random() > 0.3 ? colSilver : colSlate;
      particleColors[i3] = randomCol.r;
      particleColors[i3 + 1] = randomCol.g;
      particleColors[i3 + 2] = randomCol.b;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    particleGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(particleColors, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Cursor Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouseX = (clientX / rect.width) * 2 - 1;
      mouseY = -(clientY / rect.height) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth target lerping for cursor reaction
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        // Rotate main elements
        mainGroup.rotation.y = elapsedTime * 0.25 + targetX * 0.6;
        mainGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.15 - targetY * 0.4;
        mainGroup.rotation.z = Math.cos(elapsedTime * 0.15) * 0.08;

        // Individual orbital ring counter-rotations
        ring1.rotation.z = elapsedTime * 0.4;
        ring2.rotation.y = -elapsedTime * 0.35;
        ring3.rotation.x = elapsedTime * 0.3;

        // Dynamic light movement
        pointLight1.position.x = 5 + Math.sin(elapsedTime * 0.8) * 2 + targetX * 3;
        pointLight1.position.y = 4 + Math.cos(elapsedTime * 0.6) * 2 + targetY * 3;

        pointLight2.position.x = -5 - Math.cos(elapsedTime * 0.7) * 2 - targetX * 3;
        pointLight2.position.y = -3 - Math.sin(elapsedTime * 0.5) * 2 - targetY * 3;

        // Ambient particles slow drift
        particles.rotation.y = elapsedTime * 0.04;
        particles.rotation.x = Math.sin(elapsedTime * 0.03) * 0.05;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      // Clean up Three.js memory
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      lineGeo.dispose();
      lineMaterial.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [theme, isLight]);

  if (hasWebGLError) {
    return (
      <div className={`relative flex h-[360px] w-full items-center justify-center rounded-[32px] border p-8 text-center backdrop-blur-2xl ${
        isLight ? "border-slate-200 bg-white/90" : "border-white/20 bg-black/60"
      }`}>
        <div className="space-y-4">
          <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-tr from-slate-900 to-slate-400 dark:from-white dark:to-zinc-400 p-[2px]">
            <div className={`flex h-full w-full items-center justify-center rounded-full ${
              isLight ? "bg-white" : "bg-[#050508]"
            }`}>
              <span className="text-3xl">🤖</span>
            </div>
          </div>
          <h4 className={`text-xl font-bold ${isLight ? "text-slate-900" : "text-white"}`}>AI Neural Engine</h4>
          <p className={`max-w-xs text-sm ${isLight ? "text-slate-600" : "text-zinc-400"}`}>
            Interactive AI/ML Developer Environment & Intelligent Workstation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[320px] w-full sm:h-[420px] lg:h-[480px] xl:h-[520px]">
      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="h-full w-full cursor-grab active:cursor-grabbing"
      />

      {/* Floating Holographic Telemetry HUD Badges */}
      <div className={`pointer-events-none absolute top-3 left-3 sm:top-4 sm:left-4 rounded-xl border px-3 py-1.5 sm:px-3.5 sm:py-2 backdrop-blur-md shadow-md ${
        isLight
          ? "border-slate-200/90 bg-white/95 text-slate-900 shadow-slate-200"
          : "border-white/20 bg-[#050508]/90 text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]"
      }`}>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full animate-ping ${isLight ? "bg-slate-900" : "bg-white"}`} />
          <span className={`font-mono text-[11px] sm:text-xs font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>
            NEURAL_CORE // ACTIVE
          </span>
        </div>
        <p className={`mt-0.5 font-mono text-[9px] sm:text-[10px] ${isLight ? "text-slate-500" : "text-zinc-400"}`}>
          Latency: 12ms • RAG Engine Online
        </p>
      </div>

      <div className={`pointer-events-none absolute bottom-4 right-4 sm:bottom-6 sm:right-6 hidden sm:block rounded-xl border px-3.5 py-2 backdrop-blur-md shadow-md ${
        isLight
          ? "border-slate-200/90 bg-white/95 text-slate-900 shadow-slate-200"
          : "border-white/20 bg-[#050508]/90 text-white shadow-[0_0_20px_rgba(255,255,255,0.08)]"
      }`}>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${isLight ? "bg-slate-900" : "bg-white"}`} />
          <span className={`font-mono text-xs font-semibold ${isLight ? "text-slate-900" : "text-white"}`}>
            AGENTIC_AI // ORCHESTRATOR
          </span>
        </div>
        <p className={`mt-0.5 font-mono text-[10px] ${isLight ? "text-slate-500" : "text-zinc-400"}`}>
          LangGraph • PyTorch • Full Stack
        </p>
      </div>
    </div>
  );
};

export default HeroScene;
