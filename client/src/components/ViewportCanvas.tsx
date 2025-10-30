import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface ViewportCanvasProps {
  wireframeData?: any;
  lineThickness?: number;
  showGrid?: boolean;
  showAxis?: boolean;
  onReady?: (scene: THREE.Scene, camera: THREE.Camera) => void;
}

export default function ViewportCanvas({
  wireframeData,
  lineThickness = 1,
  showGrid = true,
  showAxis = true,
  onReady,
}: ViewportCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

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
    camera.position.set(15, 12, 15);
    camera.lookAt(0, 0, 0);
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
    controls.minDistance = 5;
    controls.maxDistance = 100;
    controlsRef.current = controls;

    if (showGrid) {
      const gridHelper = new THREE.GridHelper(30, 30, 0x444444, 0x222222);
      scene.add(gridHelper);
    }

    if (showAxis) {
      const axesHelper = new THREE.AxesHelper(15);
      scene.add(axesHelper);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
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

  useEffect(() => {
    if (!sceneRef.current) return;

    const gridHelper = sceneRef.current.children.find(
      child => child instanceof THREE.GridHelper
    );
    if (gridHelper) {
      gridHelper.visible = showGrid;
    }

    const axesHelper = sceneRef.current.children.find(
      child => child instanceof THREE.AxesHelper
    );
    if (axesHelper) {
      axesHelper.visible = showAxis;
    }
  }, [showGrid, showAxis]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      data-testid="viewport-canvas"
    />
  );
}
