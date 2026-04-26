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
    uColor1: { value: new THREE.Color('#0044ff') }, // Deep Blue
    uColor2: { value: new THREE.Color('#ff0044') }, // Red/Pink
    uColor3: { value: new THREE.Color('#7700ff') }  // Purple
  }), []);

  useFrame((state) => {
    const { clock } = state;
    meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
    // Smooth interpolation for scroll
    meshRef.current.material.uniforms.uScroll.value += (scrollPos.current - meshRef.current.material.uniforms.uScroll.value) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[5, 5, 200, 64, 100, true]} />
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

          #define PI 3.14159265359

          // 3D Random Hash
          float hash(vec3 p) {
              return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453123);
          }

          // 3D Value Noise
          float noise3D(vec3 x) {
              vec3 p = floor(x);
              vec3 f = fract(x);
              f = f * f * (3.0 - 2.0 * f); // smoothstep
              
              return mix(
                  mix(mix(hash(p + vec3(0,0,0)), hash(p + vec3(1,0,0)), f.x),
                      mix(hash(p + vec3(0,1,0)), hash(p + vec3(1,1,0)), f.x), f.y),
                  mix(mix(hash(p + vec3(0,0,1)), hash(p + vec3(1,0,1)), f.x),
                      mix(hash(p + vec3(0,1,1)), hash(p + vec3(1,1,1)), f.x), f.y), f.z);
          }

          // Fractional Brownian Motion for smoke texture
          float fbm(vec3 p) {
              float f = 0.0;
              float w = 0.5;
              for(int i = 0; i < 5; i++) {
                  f += w * noise3D(p);
                  p *= 2.0;
                  w *= 0.5;
              }
              return f;
          }

          void main() {
            // Coordinate transformation for tunnel
            float time = uTime * 0.15 + uScroll * 0.005;
            vec2 uv = vUv;
            uv.y += time; // Move forward/backward based on scroll
            
            // Map 2D UV to 3D Cylinder to avoid seams
            vec3 p3 = vec3(cos(uv.x * PI * 2.0), sin(uv.x * PI * 2.0), uv.y);
            
            // Generate Volumetric Smoke
            float smoke1 = fbm(p3 * 2.0 + vec3(0.0, 0.0, time * 0.5));
            float smoke2 = fbm(p3 * 3.5 - vec3(time * 0.2, time * 0.3, 0.0));
            
            // Mix colors based on smoke density
            vec3 color = mix(uColor1, uColor2, smoke1);
            color = mix(color, uColor3, smoke2);
            
            // Add volumetric glow
            float glow = pow(smoke1 * smoke2, 1.5) * 3.0;
            color *= glow + 0.1; // Darker ambient base for deep space
            
            // Warp speed light streaks (seamless around cylinder)
            float streakNoise = sin(uv.x * PI * 8.0) * sin(uv.y * 3.0 + time * 5.0);
            float streaks = smoothstep(0.85, 1.0, streakNoise) * 0.4;
            color += streaks * mix(uColor1, vec3(1.0), 0.7);

            // Dynamic Alpha: Dark regions become transparent to reveal true 3D stars behind the tunnel
            float alpha = smoothstep(0.0, 0.5, glow + streaks + 0.1);

            gl_FragColor = vec4(color, alpha);
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
        <color attach="background" args={['#020205']} />
        <fog attach="fog" args={['#020205', 10, 80]} />
        <PerspectiveCamera makeDefault position={[0, 0, 50]} fov={75} />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 50]} />
        
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
