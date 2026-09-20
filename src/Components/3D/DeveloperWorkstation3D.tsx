import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

const DeveloperWorkstation3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE SETUP
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 420;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 3.6, 7.6);
    camera.lookAt(0, 0.7, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isLight ? 1.35 : 1.15;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // ROOT GROUP
    const workstationGroup = new THREE.Group();
    scene.add(workstationGroup);

    // ==========================================
    // 1. PROCEDURAL LIVE CODE CANVAS TEXTURE
    // ==========================================
    const codeCanvas = document.createElement("canvas");
    codeCanvas.width = 512;
    codeCanvas.height = 256;
    const codeCtx = codeCanvas.getContext("2d");
    const codeTexture = new THREE.CanvasTexture(codeCanvas);

    const codeLines = [
      "const agent = new AgenticAI({ model: 'gpt-4o' });",
      "const ragPipeline = await initVectorStore(embeddings);",
      "export async function executeInference(prompt: string) {",
      "  const ctx = await ragPipeline.query(prompt, { topK: 5 });",
      "  const plan = await agent.orchestrate(ctx);",
      "  return plan.synthesize();",
      "}",
      "// COMPILER: 0 ERRORS • LIVE STREAM ACTIVE",
      "model.train(epochs=100, optimizer='adamW')",
      "precision: 99.4% • loss: 0.012 • latency: 14ms",
    ];

    let codeScrollY = 0;
    const updateCodeCanvas = (time: number) => {
      if (!codeCtx) return;
      codeCtx.fillStyle = isLight ? "#f8fafc" : "#06070a";
      codeCtx.fillRect(0, 0, 512, 256);

      // Terminal Header Bar
      codeCtx.fillStyle = isLight ? "#e2e8f0" : "#11141c";
      codeCtx.fillRect(0, 0, 512, 32);
      codeCtx.fillStyle = "#ef4444";
      codeCtx.beginPath();
      codeCtx.arc(20, 16, 5, 0, Math.PI * 2);
      codeCtx.fill();
      codeCtx.fillStyle = "#eab308";
      codeCtx.beginPath();
      codeCtx.arc(36, 16, 5, 0, Math.PI * 2);
      codeCtx.fill();
      codeCtx.fillStyle = "#22c55e";
      codeCtx.beginPath();
      codeCtx.arc(52, 16, 5, 0, Math.PI * 2);
      codeCtx.fill();

      codeCtx.font = "bold 13px monospace";
      codeCtx.fillStyle = isLight ? "#0f172a" : "#94a3b8";
      codeCtx.fillText("shivansh@workstation: ~/ai-core/orchestrator.ts", 75, 20);

      // Scrolling syntax lines
      codeCtx.font = "12px monospace";
      codeScrollY = (time * 28) % 260;

      codeLines.forEach((line, idx) => {
        const y = 54 + idx * 22 - (codeScrollY % 100);
        if (y > 35 && y < 245) {
          if (line.includes("const") || line.includes("export") || line.includes("function")) {
            codeCtx.fillStyle = isLight ? "#0284c7" : "#38bdf8";
          } else if (line.includes("//") || line.includes("precision")) {
            codeCtx.fillStyle = isLight ? "#16a34a" : "#4ade80";
          } else {
            codeCtx.fillStyle = isLight ? "#1e293b" : "#f1f5f9";
          }
          codeCtx.fillText(line, 18, y);
        }
      });

      codeTexture.needsUpdate = true;
    };

    // ==========================================
    // 2. ERGONOMIC CYBER DESK PLATFORM
    // ==========================================
    const deskGroup = new THREE.Group();
    workstationGroup.add(deskGroup);

    // Curved Beveled Desk Top
    const deskGeo = new THREE.BoxGeometry(4.4, 0.12, 2.3);
    const deskMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0xffffff : 0x090a0f,
      roughness: isLight ? 0.3 : 0.2,
      metalness: isLight ? 0.2 : 0.85,
    });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.receiveShadow = true;
    deskGroup.add(desk);

    // Glowing Desk Edge Lighting Rim
    const rimGeo = new THREE.BoxGeometry(4.44, 0.04, 0.04);
    const rimMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0f172a : 0xffffff,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.position.set(0, 0.06, 1.15);
    deskGroup.add(rim);

    // Desk Legs (Metallic Pillars with Hex Base)
    const legGeo = new THREE.CylinderGeometry(0.06, 0.08, 2.2, 16);
    const legMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x64748b : 0x27272a,
      metalness: 0.9,
      roughness: 0.2,
    });

    [
      [-1.9, -1.1, -0.9],
      [1.9, -1.1, -0.9],
      [-1.9, -1.1, 0.9],
      [1.9, -1.1, 0.9],
    ].forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z);
      leg.castShadow = true;
      deskGroup.add(leg);
    });

    // Desk Glass Mousepad / Tech Mat
    const matGeo = new THREE.BoxGeometry(2.6, 0.015, 1.3);
    const matMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0xf1f5f9 : 0x14161f,
      roughness: 0.4,
      metalness: 0.6,
    });
    const techMat = new THREE.Mesh(matGeo, matMat);
    techMat.position.set(0, 0.065, 0.2);
    deskGroup.add(techMat);

    // ==========================================
    // 3. CURVED DUAL-MONITOR RIG & LIVE SCREENS
    // ==========================================
    // Main Ultra-Wide Curved Monitor
    const mainMonitorGroup = new THREE.Group();
    mainMonitorGroup.position.set(-0.2, 0.8, -0.45);
    workstationGroup.add(mainMonitorGroup);

    const mainScreenBezelGeo = new THREE.BoxGeometry(2.5, 1.25, 0.06);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x1e293b : 0x050508,
      metalness: 0.9,
      roughness: 0.3,
    });
    const mainBezel = new THREE.Mesh(mainScreenBezelGeo, bezelMat);
    mainMonitorGroup.add(mainBezel);

    const mainScreenDisplayGeo = new THREE.PlaneGeometry(2.42, 1.17);
    const mainDisplayMat = new THREE.MeshBasicMaterial({
      map: codeTexture,
    });
    const mainDisplay = new THREE.Mesh(mainScreenDisplayGeo, mainDisplayMat);
    mainDisplay.position.set(0, 0, 0.035);
    mainMonitorGroup.add(mainDisplay);

    const screenLight = new THREE.PointLight(isLight ? 0xffffff : 0xffffff, isLight ? 1.4 : 2.2, 3.8);
    screenLight.position.set(0, 0, 0.5);
    mainMonitorGroup.add(screenLight);

    // Main Monitor Stand
    const standGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.8, 16);
    const standMesh = new THREE.Mesh(standGeo, legMat);
    standMesh.position.set(0, -0.55, -0.1);
    mainMonitorGroup.add(standMesh);

    // Secondary Auxiliary Monitor (Vertical / Tilted toward Developer)
    const auxMonitorGroup = new THREE.Group();
    auxMonitorGroup.position.set(1.45, 0.85, -0.3);
    auxMonitorGroup.rotation.y = -0.45;
    workstationGroup.add(auxMonitorGroup);

    const auxBezelGeo = new THREE.BoxGeometry(0.9, 1.35, 0.05);
    const auxBezel = new THREE.Mesh(auxBezelGeo, bezelMat);
    auxMonitorGroup.add(auxBezel);

    const auxDisplayGeo = new THREE.PlaneGeometry(0.82, 1.27);
    const auxDisplayMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0f172a : 0xe2e8f0,
      wireframe: true,
    });
    const auxDisplay = new THREE.Mesh(auxDisplayGeo, auxDisplayMat);
    auxDisplay.position.set(0, 0, 0.03);
    auxMonitorGroup.add(auxDisplay);

    const auxStand = new THREE.Mesh(standGeo, legMat);
    auxStand.position.set(0, -0.6, -0.08);
    auxMonitorGroup.add(auxStand);

    // ==========================================
    // 4. FLOATING HOLOGRAPHIC AI NEURAL PROJECTOR
    // ==========================================
    const holoProjectorGroup = new THREE.Group();
    holoProjectorGroup.position.set(-1.35, 0.45, -0.15);
    workstationGroup.add(holoProjectorGroup);

    // Projector Base Emitter
    const emitterGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.08, 24);
    const emitterMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x94a3b8 : 0x1e293b,
      metalness: 0.9,
      roughness: 0.2,
    });
    const emitter = new THREE.Mesh(emitterGeo, emitterMat);
    holoProjectorGroup.add(emitter);

    // Glowing Emitter Ring
    const emitRingGeo = new THREE.TorusGeometry(0.22, 0.02, 16, 32);
    const emitRingMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0f172a : 0xffffff,
    });
    const emitRing = new THREE.Mesh(emitRingGeo, emitRingMat);
    emitRing.rotation.x = Math.PI / 2;
    emitRing.position.y = 0.045;
    holoProjectorGroup.add(emitRing);

    // Floating Holographic Core Orb
    const holoOrbGeo = new THREE.IcosahedronGeometry(0.24, 1);
    const holoOrbMat = new THREE.MeshPhysicalMaterial({
      color: isLight ? 0x0f172a : 0xffffff,
      roughness: 0.1,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const holoOrb = new THREE.Mesh(holoOrbGeo, holoOrbMat);
    holoOrb.position.set(0, 0.45, 0);
    holoProjectorGroup.add(holoOrb);

    // Orbiting Hologram Rings
    const holoRingGeo = new THREE.TorusGeometry(0.38, 0.01, 16, 40);
    const holoRing1 = new THREE.Mesh(holoRingGeo, emitRingMat);
    holoRing1.position.set(0, 0.45, 0);
    holoRing1.rotation.x = Math.PI / 3;
    holoProjectorGroup.add(holoRing1);

    const holoRing2 = new THREE.Mesh(holoRingGeo, emitRingMat);
    holoRing2.position.set(0, 0.45, 0);
    holoRing2.rotation.y = Math.PI / 3;
    holoProjectorGroup.add(holoRing2);

    // ==========================================
    // 5. MECHANICAL KEYBOARD & PRECISION MOUSE
    // ==========================================
    const kbGroup = new THREE.Group();
    kbGroup.position.set(-0.15, 0.08, 0.35);
    workstationGroup.add(kbGroup);

    const kbBaseGeo = new THREE.BoxGeometry(1.2, 0.03, 0.48);
    const kbMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x334155 : 0x0c0e14,
      roughness: 0.5,
      metalness: 0.8,
    });
    const kbBase = new THREE.Mesh(kbBaseGeo, kbMat);
    kbGroup.add(kbBase);

    // Keycaps Grid Representation
    const keyGeo = new THREE.BoxGeometry(1.12, 0.02, 0.42);
    const keyMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0xe2e8f0 : 0x181824,
      roughness: 0.6,
    });
    const keys = new THREE.Mesh(keyGeo, keyMat);
    keys.position.y = 0.02;
    kbGroup.add(keys);

    // Precision Mouse
    const mouseGeo = new THREE.BoxGeometry(0.16, 0.04, 0.28);
    const mouseMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x475569 : 0x1f2937,
      roughness: 0.3,
      metalness: 0.7,
    });
    const mouseMesh = new THREE.Mesh(mouseGeo, mouseMat);
    mouseMesh.position.set(0.72, 0.09, 0.35);
    workstationGroup.add(mouseMesh);

    // ==========================================
    // 6. ANIMATED DEVELOPER AVATAR
    // ==========================================
    const devGroup = new THREE.Group();
    devGroup.position.set(0, 0, 1.35);
    workstationGroup.add(devGroup);

    // Chair
    const seatGeo = new THREE.BoxGeometry(1.1, 0.12, 1.0);
    const chairMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x64748b : 0x11131a,
      roughness: 0.6,
    });
    const seat = new THREE.Mesh(seatGeo, chairMat);
    seat.position.set(0, -0.32, 0);
    devGroup.add(seat);

    const backGeo = new THREE.BoxGeometry(1.0, 1.45, 0.12);
    const backrest = new THREE.Mesh(backGeo, chairMat);
    backrest.position.set(0, 0.45, 0.45);
    backrest.rotation.x = -0.06;
    devGroup.add(backrest);

    // Developer Torso (Minimalist Tech Hoodie)
    const torsoGeo = new THREE.BoxGeometry(0.96, 1.15, 0.52);
    const torsoMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x334155 : 0x090b10,
      roughness: 0.65,
    });
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.set(0, 0.45, 0);
    devGroup.add(torso);

    // Developer Head & Visor
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.25, 0);
    devGroup.add(headGroup);

    const headGeo = new THREE.SphereGeometry(0.27, 24, 24);
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xf3d2b3,
      roughness: 0.75,
    });
    const head = new THREE.Mesh(headGeo, skinMat);
    headGroup.add(head);

    // Sleek Hair Cut
    const hairGeo = new THREE.SphereGeometry(0.28, 20, 20, 0, Math.PI * 2, 0, Math.PI / 2.1);
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x171513,
      roughness: 0.85,
    });
    const hair = new THREE.Mesh(hairGeo, hairMat);
    hair.position.y = 0.05;
    headGroup.add(hair);

    // Smart Glass Visor (Glow Beam)
    const visorGeo = new THREE.BoxGeometry(0.36, 0.09, 0.12);
    const visorMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0f172a : 0xffffff,
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 0.02, -0.23);
    headGroup.add(visor);

    // Developer Headphones
    const phoneGeo = new THREE.TorusGeometry(0.29, 0.025, 12, 32, Math.PI);
    const phoneMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x64748b : 0xe2e8f0,
      metalness: 0.85,
      roughness: 0.2,
    });
    const phoneBand = new THREE.Mesh(phoneGeo, phoneMat);
    phoneBand.rotation.x = -Math.PI / 2;
    phoneBand.position.set(0, 0.08, 0);
    headGroup.add(phoneBand);

    // Arms & Hands
    const armGeo = new THREE.CylinderGeometry(0.075, 0.075, 0.75, 16);
    const armMat = torsoMat;

    // Left Arm (Keyboard Typing)
    const leftArm = new THREE.Mesh(armGeo, armMat);
    leftArm.position.set(-0.52, 0.35, -0.38);
    leftArm.rotation.set(0.95, -0.25, -0.25);
    devGroup.add(leftArm);

    const handGeo = new THREE.SphereGeometry(0.085, 12, 12);
    const leftHand = new THREE.Mesh(handGeo, skinMat);
    leftHand.position.set(-0.35, 0.06, -0.8);
    devGroup.add(leftHand);

    // Right Arm (Mouse & Keyboard Coordination)
    const rightArm = new THREE.Mesh(armGeo, armMat);
    rightArm.position.set(0.52, 0.35, -0.38);
    rightArm.rotation.set(0.95, 0.25, 0.25);
    devGroup.add(rightArm);

    const rightHand = new THREE.Mesh(handGeo, skinMat);
    rightHand.position.set(0.48, 0.06, -0.8);
    devGroup.add(rightHand);

    // ==========================================
    // 7. COFFEE MUG & PROCEDURAL VAPOR PARTICLES
    // ==========================================
    const mugGeo = new THREE.CylinderGeometry(0.08, 0.07, 0.2, 16);
    const mugMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x1e293b : 0xffffff,
      roughness: 0.3,
    });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.position.set(1.4, 0.16, 0.4);
    workstationGroup.add(mug);

    // Rising Steam Vapor
    const steamCount = 12;
    const steamGeo = new THREE.BufferGeometry();
    const steamPos = new Float32Array(steamCount * 3);
    for (let i = 0; i < steamCount; i++) {
      steamPos[i * 3] = 1.4 + (Math.random() - 0.5) * 0.08;
      steamPos[i * 3 + 1] = 0.28 + Math.random() * 0.4;
      steamPos[i * 3 + 2] = 0.4 + (Math.random() - 0.5) * 0.08;
    }
    steamGeo.setAttribute("position", new THREE.BufferAttribute(steamPos, 3));
    const steamMat = new THREE.PointsMaterial({
      color: isLight ? 0x94a3b8 : 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
    });
    const steam = new THREE.Points(steamGeo, steamMat);
    workstationGroup.add(steam);

    // Orbiting Data Crystals
    const crystalCount = 8;
    const crystalGroup = new THREE.Group();
    workstationGroup.add(crystalGroup);

    const crystalGeo = new THREE.OctahedronGeometry(0.08);
    const crystalMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x475569 : 0xffffff,
      wireframe: true,
    });

    for (let i = 0; i < crystalCount; i++) {
      const c = new THREE.Mesh(crystalGeo, crystalMat);
      const angle = (i / crystalCount) * Math.PI * 2;
      const radius = 2.4 + Math.random() * 0.4;
      c.position.set(
        Math.cos(angle) * radius,
        0.8 + (Math.random() - 0.5) * 1.2,
        Math.sin(angle) * radius
      );
      crystalGroup.add(c);
    }

    // ==========================================
    // 8. LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      isLight ? 1.6 : 1.1
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, isLight ? 1.8 : 1.4);
    keyLight.position.set(5, 7, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(isLight ? 0x94a3b8 : 0xffffff, 2.5, 9);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // ==========================================
    // 9. ANIMATION & INTERACTIVE CONTROLS
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x * 0.45;
      mouseY = y * 0.25;
    };

    container.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Dynamic Code Canvas Update
      updateCodeCanvas(elapsed);

      // Smooth Parallax
      targetRotY += (mouseX - targetRotY) * 0.05;
      targetRotX += (mouseY - targetRotX) * 0.05;

      workstationGroup.rotation.y = targetRotY + Math.sin(elapsed * 0.4) * 0.03;
      workstationGroup.rotation.x = targetRotX;

      // Realistic Developer Motion:
      // Left Hand typing
      leftHand.position.y = 0.06 + Math.sin(elapsed * 18) * 0.015;
      leftHand.position.z = -0.8 + Math.cos(elapsed * 18) * 0.012;

      // Right Hand moves between typing and mouse
      const isMousing = Math.sin(elapsed * 0.8) > 0.2;
      if (isMousing) {
        rightHand.position.x = 0.7 + Math.sin(elapsed * 4) * 0.03;
        rightHand.position.z = -0.75 + Math.cos(elapsed * 4) * 0.03;
      } else {
        rightHand.position.x = 0.48;
        rightHand.position.y = 0.06 + Math.cos(elapsed * 20) * 0.015;
        rightHand.position.z = -0.8 + Math.sin(elapsed * 20) * 0.012;
      }

      // Breathing Torso
      torso.position.y = 0.45 + Math.sin(elapsed * 2.4) * 0.012;

      // Head scanning between main display, vertical display, and holographic projector
      headGroup.position.y = 1.25 + Math.sin(elapsed * 2.4) * 0.012;
      headGroup.rotation.x = 0.12 + Math.sin(elapsed * 1.8) * 0.025;
      headGroup.rotation.y = Math.sin(elapsed * 0.6) * 0.22;

      // Holographic Projector Animations
      holoOrb.rotation.y = elapsed * 1.2;
      holoOrb.rotation.x = elapsed * 0.8;
      holoRing1.rotation.z = elapsed * 1.5;
      holoRing2.rotation.z = -elapsed * 1.5;

      // Rising Coffee Steam
      const positions = steamGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < steamCount; i++) {
        positions[i * 3 + 1] += 0.003;
        if (positions[i * 3 + 1] > 0.7) {
          positions[i * 3 + 1] = 0.28;
        }
      }
      steamGeo.attributes.position.needsUpdate = true;

      // Orbiting crystals
      crystalGroup.rotation.y = elapsed * 0.15;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      deskGeo.dispose();
      deskMat.dispose();
      codeTexture.dispose();
      mainDisplayMat.dispose();
      auxDisplayMat.dispose();
      holoOrbGeo.dispose();
      holoOrbMat.dispose();
      steamGeo.dispose();
      steamMat.dispose();
      crystalGeo.dispose();
      crystalMat.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme, isLight]);

  return (
    <div className="relative w-full h-[430px] rounded-[32px] overflow-hidden flex items-center justify-center">
      {/* 3D Canvas Mount */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Futuristic HUD overlay badge */}
      <div className={`absolute top-4 left-4 flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-mono backdrop-blur-md shadow-md ${
        isLight
          ? "border-slate-300/80 bg-white/95 text-slate-900 shadow-slate-200"
          : "border-white/20 bg-black/80 text-zinc-300 shadow-[0_0_15px_rgba(255,255,255,0.08)]"
      }`}>
        <span className={`h-2 w-2 rounded-full animate-pulse ${
          isLight ? "bg-slate-900 shadow-[0_0_8px_#0f172a]" : "bg-white shadow-[0_0_8px_#ffffff]"
        }`} />
        <span>HOLO-WORKSTATION // LIVE AI INFERENCE</span>
      </div>

      {/* Floating Status Bar at Bottom */}
      <div className={`absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border px-4 py-2 text-xs font-mono backdrop-blur-md ${
        isLight
          ? "border-slate-200/90 bg-white/95 text-slate-900 shadow-sm"
          : "border-white/10 bg-black/85 text-zinc-300"
      }`}>
        <span className={isLight ? "text-slate-950 font-bold" : "text-white font-semibold"}>Shivansh Saxena</span>
        <span className={isLight ? "text-slate-600 font-semibold" : "text-zinc-400"}>Architecting AI & Full Stack</span>
      </div>
    </div>
  );
};

export default DeveloperWorkstation3D;
