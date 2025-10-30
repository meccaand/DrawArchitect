import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ViewportCanvasProps {
  wireframeData?: any;
  lineThickness?: number;
  showGrid?: boolean;
  showAxis?: boolean;
  roomWidth?: number;
  roomLength?: number;
  roomHeight?: number;
  onReady?: (scene: THREE.Scene, camera: THREE.Camera) => void;
}

export default function ViewportCanvas({
  wireframeData,
  lineThickness = 1,
  showGrid = true,
  showAxis = false,
  roomWidth = 15,
  roomLength = 15,
  roomHeight = 9,
  onReady,
}: ViewportCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const roomLinesRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    // Position camera near the front edge, looking toward back wall
    camera.position.set(roomWidth / 2, roomHeight * 0.6, roomLength - 2);
    camera.lookAt(roomWidth / 2, roomHeight / 2, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 3;
    controls.maxDistance = 50;
    controls.target.set(roomWidth / 2, roomHeight / 2, roomLength / 2);
    controlsRef.current = controls;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    if (onReady) {
      onReady(scene, camera);
    }

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      controls.dispose();
      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;

    if (roomLinesRef.current) {
      sceneRef.current.remove(roomLinesRef.current);
      roomLinesRef.current.traverse((child) => {
        if (child instanceof THREE.LineSegments || child instanceof THREE.Line) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach(m => m.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    }

    if (showGrid) {
      const group = new THREE.Group();

      // Major grid lines (feet) - thicker and brighter
      const majorGeometry = new THREE.BufferGeometry();
      const majorVertices: number[] = [];

      // Room outline (walls) - major lines
      majorVertices.push(0, 0, 0, roomWidth, 0, 0);
      majorVertices.push(roomWidth, 0, 0, roomWidth, roomHeight, 0);
      majorVertices.push(roomWidth, roomHeight, 0, 0, roomHeight, 0);
      majorVertices.push(0, roomHeight, 0, 0, 0, 0);

      majorVertices.push(0, 0, roomLength, roomWidth, 0, roomLength);
      majorVertices.push(roomWidth, 0, roomLength, roomWidth, roomHeight, roomLength);
      majorVertices.push(roomWidth, roomHeight, roomLength, 0, roomHeight, roomLength);
      majorVertices.push(0, roomHeight, roomLength, 0, 0, roomLength);

      majorVertices.push(0, 0, 0, 0, 0, roomLength);
      majorVertices.push(roomWidth, 0, 0, roomWidth, 0, roomLength);
      majorVertices.push(roomWidth, roomHeight, 0, roomWidth, roomHeight, roomLength);
      majorVertices.push(0, roomHeight, 0, 0, roomHeight, roomLength);

      // Major floor grid (every foot)
      for (let i = 0; i <= roomWidth; i += 1) {
        majorVertices.push(i, 0, 0, i, 0, roomLength);
      }
      for (let i = 0; i <= roomLength; i += 1) {
        majorVertices.push(0, 0, i, roomWidth, 0, i);
      }

      // Major wall grids (every foot vertically)
      for (let i = 0; i <= roomHeight; i += 1) {
        majorVertices.push(0, i, 0, roomWidth, i, 0);
        majorVertices.push(0, i, 0, 0, i, roomLength);
        majorVertices.push(roomWidth, i, 0, roomWidth, i, roomLength);
      }

      majorGeometry.setAttribute('position', new THREE.Float32BufferAttribute(majorVertices, 3));
      const majorMaterial = new THREE.LineBasicMaterial({
        color: 0x555555,
        transparent: true,
        opacity: 0.8,
        linewidth: 2,
      });
      const majorLines = new THREE.LineSegments(majorGeometry, majorMaterial);
      group.add(majorLines);

      // Minor grid lines (inches) - thinner and dimmer
      const minorGeometry = new THREE.BufferGeometry();
      const minorVertices: number[] = [];
      const inchStep = 1 / 12; // 1 inch in feet

      // Floor minor grid
      for (let i = 0; i <= roomWidth; i += inchStep) {
        // Skip major lines
        if (Math.abs(i - Math.round(i)) > 0.001) {
          minorVertices.push(i, 0, 0, i, 0, roomLength);
        }
      }
      for (let i = 0; i <= roomLength; i += inchStep) {
        if (Math.abs(i - Math.round(i)) > 0.001) {
          minorVertices.push(0, 0, i, roomWidth, 0, i);
        }
      }

      minorGeometry.setAttribute('position', new THREE.Float32BufferAttribute(minorVertices, 3));
      const minorMaterial = new THREE.LineBasicMaterial({
        color: 0x333333,
        transparent: true,
        opacity: 0.2,
        linewidth: 1,
      });
      const minorLines = new THREE.LineSegments(minorGeometry, minorMaterial);
      group.add(minorLines);

      roomLinesRef.current = group;
      sceneRef.current.add(group);
    }
  }, [showGrid, roomWidth, roomLength, roomHeight]);

  useEffect(() => {
    if (!sceneRef.current || !wireframeData) return;

    sceneRef.current.children
      .filter(child => child.userData.isWireframe)
      .forEach(child => sceneRef.current!.remove(child));

    const material = new THREE.LineBasicMaterial({
      color: 0x00aaff,
      linewidth: lineThickness,
    });

    wireframeData.lines?.forEach((line: number[][]) => {
      const points = line.map(p => new THREE.Vector3(p[0], p[1], p[2]));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const lineMesh = new THREE.Line(geometry, material);
      lineMesh.userData.isWireframe = true;
      sceneRef.current!.add(lineMesh);
    });
  }, [wireframeData, lineThickness]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      data-testid="viewport-canvas"
    />
  );
}
