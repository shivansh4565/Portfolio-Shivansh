import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

const UniverseBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasError, setHasError] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === "light";

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

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.set(0, 0, 32);

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
      console.warn("WebGL initialization failed for UniverseBackground", e);
      setHasError(true);
      return;
    }

    // =============================================================
    // 1. PROCEDURAL TEXTURE GENERATORS (FOR SOFT GLOWING PARTICLES)
    // =============================================================
    const createGlowTexture = (colorStop: string) => {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, colorStop);
      gradient.addColorStop(0.25, "rgba(255, 255, 255, 0.4)");
      gradient.addColorStop(0.6, "rgba(203, 213, 225, 0.15)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);

      const texture = new THREE.CanvasTexture(canvas);
      return texture;
    };

    const particleTexture = createGlowTexture("rgba(255, 255, 255, 1)");

    // Root Group
    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // =============================================================
    // 2. VOLUMETRIC FLOATING NEBULA CLOUD SPRITES (ABYSSAL COSMOS)
    // =============================================================
    const nebulaCount = 40;
    const nebulaGroup = new THREE.Group();
    universeGroup.add(nebulaGroup);

    const nebulaColors = isLight
      ? [0x334155, 0x475569, 0x64748b, 0x94a3b8]
      : [0xffffff, 0xe2e8f0, 0xcbd5e1, 0x94a3b8];

    for (let i = 0; i < nebulaCount; i++) {
      const size = Math.random() * 22 + 14;
      const nebulaMat = new THREE.SpriteMaterial({
        map: particleTexture,
        color: nebulaColors[i % nebulaColors.length],
        transparent: true,
        opacity: isLight ? 0.1 : 0.18,
        blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      });

      const sprite = new THREE.Sprite(nebulaMat);
      sprite.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 60 - 10
      );
      sprite.scale.set(size, size, 1);
      nebulaGroup.add(sprite);
    }

    // =============================================================
    // 3. LOGARITHMIC SPIRAL GALAXY (3,600 ACCRETION PARTICLES)
    // =============================================================
    const galaxyParams = {
      count: 3600,
      radius: 52,
      branches: 5,
      spin: 1.4,
      randomness: 0.45,
      power: 3.8,
    };

    const galaxyGeo = new THREE.BufferGeometry();
    const galaxyPositions = new Float32Array(galaxyParams.count * 3);
    const galaxyColors = new Float32Array(galaxyParams.count * 3);
    const galaxyScales = new Float32Array(galaxyParams.count);

    const colorInside = isLight
      ? new THREE.Color(0x0f172a)
      : new THREE.Color(0xffffff); // Pure white core
    const colorOutside = isLight
      ? new THREE.Color(0x64748b)
      : new THREE.Color(0x94a3b8); // Silver/slate arms
    const colorAccent = isLight
      ? new THREE.Color(0x334155)
      : new THREE.Color(0xe2e8f0);

    for (let i = 0; i < galaxyParams.count; i++) {
      const i3 = i * 3;
      const r = Math.random() * galaxyParams.radius;
      const spinAngle = r * galaxyParams.spin;
      const branchAngle =
        ((i % galaxyParams.branches) * (Math.PI * 2)) / galaxyParams.branches;

      const randomX =
        Math.pow(Math.random(), galaxyParams.power) *
        (Math.random() < 0.5 ? 1 : -1) *
        galaxyParams.randomness *
        r;
      const randomY =
        Math.pow(Math.random(), galaxyParams.power) *
        (Math.random() < 0.5 ? 1 : -1) *
        galaxyParams.randomness *
        r;
      const randomZ =
        Math.pow(Math.random(), galaxyParams.power) *
        (Math.random() < 0.5 ? 1 : -1) *
        galaxyParams.randomness *
        r;

      galaxyPositions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      galaxyPositions[i3 + 1] = randomY;
      galaxyPositions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, r / galaxyParams.radius);
      if (Math.random() > 0.82) mixedColor.lerp(colorAccent, 0.75);

      galaxyColors[i3] = mixedColor.r;
      galaxyColors[i3 + 1] = mixedColor.g;
      galaxyColors[i3 + 2] = mixedColor.b;

      galaxyScales[i] = Math.random() * 0.8 + 0.4;
    }

    galaxyGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(galaxyPositions, 3)
    );
    galaxyGeo.setAttribute("color", new THREE.BufferAttribute(galaxyColors, 3));

    const galaxyMat = new THREE.PointsMaterial({
      size: isLight ? 0.16 : 0.12,
      map: particleTexture || undefined,
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.85 : 0.95,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
    });

    const galaxyPoints = new THREE.Points(galaxyGeo, galaxyMat);
    galaxyPoints.rotation.x = Math.PI / 3.8;
    universeGroup.add(galaxyPoints);

    // =============================================================
    // 4. DEEP COSMOS STARFIELD SWARM (TWINKLE DEPTH)
    // =============================================================
    const starCount = 1600;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPos[i3] = (Math.random() - 0.5) * 160;
      starPos[i3 + 1] = (Math.random() - 0.5) * 160;
      starPos[i3 + 2] = (Math.random() - 0.5) * 180 - 20;

      const c =
        Math.random() > 0.65
          ? new THREE.Color(0xffffff)
          : Math.random() > 0.35
          ? new THREE.Color(0xe2e8f0)
          : new THREE.Color(0x94a3b8);

      starColors[i3] = c.r;
      starColors[i3 + 1] = c.g;
      starColors[i3 + 2] = c.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.1,
      map: particleTexture || undefined,
      vertexColors: true,
      transparent: true,
      opacity: isLight ? 0.7 : 0.9,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // =============================================================
    // 5. ORBITING CELESTIAL ENERGY RINGS
    // =============================================================
    const ringGroup = new THREE.Group();
    const createRing = (
      radius: number,
      color: number,
      tiltX: number,
      tiltY: number
    ) => {
      const ringGeo = new THREE.TorusGeometry(radius, 0.05, 16, 140);
      const ringMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: isLight ? 0.35 : 0.5,
        wireframe: true,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = tiltX;
      ring.rotation.y = tiltY;
      return ring;
    };

    const ring1 = createRing(18, isLight ? 0x0f172a : 0xffffff, Math.PI / 3, Math.PI / 6);
    const ring2 = createRing(28, isLight ? 0x475569 : 0xe2e8f0, -Math.PI / 4, Math.PI / 4);
    const ring3 = createRing(38, isLight ? 0x64748b : 0x94a3b8, Math.PI / 2.5, -Math.PI / 5);

    ringGroup.add(ring1);
    ringGroup.add(ring2);
    ringGroup.add(ring3);
    universeGroup.add(ringGroup);

    // =============================================================
    // 6. PROCEDURAL SHOOTING STARS / COMET TRAILS
    // =============================================================
    const cometCount = 4;
    const comets: Array<{
      mesh: THREE.Line;
      speed: number;
      reset: () => void;
    }> = [];

    for (let i = 0; i < cometCount; i++) {
      const cometGeo = new THREE.BufferGeometry();
      const points = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-4, 2.5, 3),
      ];
      cometGeo.setFromPoints(points);

      const cometMat = new THREE.LineBasicMaterial({
        color: isLight ? 0x0f172a : 0xffffff,
        transparent: true,
        opacity: 0.85,
      });

      const cometMesh = new THREE.Line(cometGeo, cometMat);

      const resetComet = () => {
        cometMesh.position.set(
          (Math.random() - 0.5) * 90 + 30,
          Math.random() * 50 + 20,
          (Math.random() - 0.5) * 50
        );
      };

      resetComet();
      scene.add(cometMesh);

      comets.push({
        mesh: cometMesh,
        speed: Math.random() * 0.4 + 0.35,
        reset: resetComet,
      });
    }

    // =============================================================
    // 7. SCROLL, MOUSE & RESIZE LISTENERS
    // =============================================================
    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      targetScrollProgress = totalHeight > 0 ? currentScroll / totalHeight : 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleScroll();

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // =============================================================
    // 8. ANIMATION LOOP (60FPS FLUID COSMIC DRIFT)
    // =============================================================
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth lerp for scroll and cursor
        scrollProgress += (targetScrollProgress - scrollProgress) * 0.08;
        targetMouseX += (mouseX - targetMouseX) * 0.05;
        targetMouseY += (mouseY - targetMouseY) * 0.05;

        // Dynamic 3D Camera flight along Z-axis as user scrolls
        camera.position.z = 32 - scrollProgress * 26;
        camera.position.y = -scrollProgress * 8 + targetMouseY * 1.5;
        camera.position.x =
          Math.sin(scrollProgress * Math.PI) * 10 + targetMouseX * 1.5;
        camera.lookAt(0, -scrollProgress * 4, 0);

        // Universe 3D Rotation reacts to scroll & time
        universeGroup.rotation.y =
          elapsed * 0.05 + scrollProgress * Math.PI * 1.5;
        universeGroup.rotation.x =
          Math.sin(elapsed * 0.03) * 0.2 + scrollProgress * 0.6;
        universeGroup.rotation.z = scrollProgress * 0.4;

        // Nebula cloud breathing & slow floating
        nebulaGroup.children.forEach((sprite, idx) => {
          sprite.position.y += Math.sin(elapsed * 0.5 + idx) * 0.02;
          sprite.position.x += Math.cos(elapsed * 0.4 + idx) * 0.015;
        });

        // Galaxy & Ring rotations
        galaxyPoints.rotation.z = -elapsed * 0.03 - scrollProgress * 2;
        ring1.rotation.z = elapsed * 0.2 + scrollProgress * 3;
        ring2.rotation.x = -elapsed * 0.15 - scrollProgress * 2;
        ring3.rotation.y = elapsed * 0.18 + scrollProgress * 2.5;

        // Starfield subtle parallax
        starField.rotation.y = elapsed * 0.01 + targetMouseX * 0.05;

        // Animate Comets
        comets.forEach((comet) => {
          comet.mesh.position.x -= comet.speed * 1.8;
          comet.mesh.position.y -= comet.speed * 1.1;
          comet.mesh.position.z -= comet.speed * 0.8;

          if (comet.mesh.position.y < -40 || comet.mesh.position.x < -60) {
            comet.reset();
          }
        });
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      galaxyGeo.dispose();
      galaxyMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      ring1.geometry.dispose();
      (ring1.material as THREE.Material).dispose();
      ring2.geometry.dispose();
      (ring2.material as THREE.Material).dispose();
      ring3.geometry.dispose();
      (ring3.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, [theme, isLight]);

  if (hasError) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10 h-full w-full opacity-90 transition-opacity duration-700"
    />
  );
};

export default UniverseBackground;

