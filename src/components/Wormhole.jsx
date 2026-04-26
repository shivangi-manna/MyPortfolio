import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Tunnel = () => {
  const tunnelRef = useRef();
  const scrollRef = useRef(0);

  // Create a spline for the tunnel path
  const curve = useMemo(() => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      points.push(new THREE.Vector3(0, 0, -i * 10));
    }
    return new THREE.CatmullRomCurve3(points);
  }, []);

  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(curve, 100, 2, 32, false);
  }, [curve]);

  const material = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.8,
      wireframe: false,
      metalness: 0.9,
      roughness: 0.1,
    });
  }, []);

  // Update scroll position
  useEffect(() => {
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state, delta) => {
    const scroll = scrollRef.current;
    
    // Constant slow movement
    const baseSpeed = 0.05;
    // Boosted speed on scroll
    const scrollSpeed = scroll * 0.001;
    
    tunnelRef.current.material.map.offset.y += (baseSpeed + scrollSpeed) * delta;
    
    // Subtle rotation
    tunnelRef.current.rotation.z += delta * 0.1;
  });

  return (
    <mesh ref={tunnelRef} geometry={tubeGeometry}>
      <meshStandardMaterial 
        side={THREE.BackSide} 
        emissive={new THREE.Color('#1a0033')}
        emissiveIntensity={2}
      >
        <videoTexture attach="map" args={[/* We'll use a procedural nebula later */]} />
      </meshStandardMaterial>
    </mesh>
  );
};

// Shader based Wormhole for more 'tagda' look
const WormholeShader = () => {
  const meshRef = useRef();
  const scrollPos = useRef(0);

  useEffect(() => {
    const onScroll = () => { scrollPos.current = window.scrollY; };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uColor1: { value: new THREE.Color('#00d2ff') },
    uColor2: { value: new THREE.Color('#9d4edd') },
    uColor3: { value: new THREE.Color('#ff0055') }
  }), []);

  useFrame((state) => {
    const { clock } = state;
    meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
    // Smooth interpolation for scroll
    meshRef.current.material.uniforms.uScroll.value += (scrollPos.current - meshRef.current.material.uniforms.uScroll.value) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <cylinderGeometry args={[5, 5, 100, 64, 100, true]} />
      <shaderMaterial
        side={THREE.BackSide}
        transparent={true}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          varying float vZ;
          void main() {
            vUv = uv;
            vZ = position.z;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform float uScroll;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          varying vec2 vUv;
          varying float vZ;

          // Simple noise function
          float noise(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
          }

          void main() {
            // Coordinate transformation for tunnel
            float time = uTime * 0.15 + uScroll * 0.005;
            vec2 uv = vUv;
            uv.y += time; // Move forward/backward based on scroll
            
            // Nebula Cloud logic (multiple layers)
            float pattern = sin(uv.x * 6.28 + sin(uv.y * 3.0 + time)) * 0.5 + 0.5;
            float pattern2 = cos(uv.x * 3.14 - cos(uv.y * 2.0 - time * 0.5)) * 0.5 + 0.5;
            
            // High-end Nebula colors
            vec3 color = mix(uColor1, uColor2, pattern);
            color = mix(color, uColor3, pattern2 * 0.6);
            
            // Atmospheric glow & edge darkness for tunnel depth
            float glow = pow(0.8 - abs(vUv.x - 0.5) * 2.0, 3.0);
            color *= glow + 0.2;
            
            // Warp speed light streaks
            float streaks = step(0.98, fract(uv.x * 10.0 + uv.y * 2.0 + time * 2.0)) * 0.3;
            color += streaks * uColor1;

            // Deep space stars
            float stars = pow(fract(sin(dot(uv * 50.0, vec2(12.9898, 78.233))) * 43758.5453), 20.0) * 1.5;
            color += stars;

            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
};

const Wormhole = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <WormholeShader />
        
        <Stars 
          radius={100} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
      </Canvas>
    </div>
  );
};

export default Wormhole;
