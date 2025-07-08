---
title: "Building Interactive Web Experiences"
date: "2025-07-08"
excerpt: "Exploring the combination of Three.js, Framer Motion, and React for creating engaging user interfaces"
tags: ["threejs", "framer-motion", "webgl", "animation"]
---

The previous iteration of this website featured an interactive 3D pulsating sphere built using Three.js. For the sake of a cleaner feel, I decided to remove it for this iteration, but found the experience rewarding. The animation I originally had can be found at the botto of this post! The capability for 3D graphics that Three.js provide is rich in potential, especially since modern web development has evolved far beyond static pages. Today's users expect rich, interactive experiences that feel more like native applications than traditional websites.

## The Technology Stack

Combining several powerful technologies can create truly engaging web experiences. The combination I initially went with included:

- **Three.js** for 3D graphics and WebGL rendering
- **Framer Motion** for smooth animations and transitions
- **React** for component-based architecture
- **Next.js** for performance optimization

## Why 3D on the Web?

Three.js has revolutionized how we think about web interfaces. Here's a simple example of creating a rotating cube:

```javascript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
```

## Animation with Framer Motion

Framer Motion makes it incredibly easy to add smooth animations to React components:

```jsx
import { motion } from 'framer-motion';

const AnimatedCard = () => {
  return (
    
      Interactive Card
      This card animates on load and hover!
    
  );
};
```

## My Experience

The combination of Three.js and Framer Motion in a React/Next.js environment provides an incredibly powerful toolkit for creating memorable web experiences. The key is finding the right balance between visual impact and performance. The rest of this post will go through how I set up my initial animation, with the final product at the end!

## Uniform Sampling of Points on A Sphere

The key to creating a convincing sphere lies in proper point distribution. Unlike naive approaches that create clustering at poles, we use **spherical coordinates** with uniform random sampling:

```javascript
const points = [];
for (var i = 0; i < 1500; i++) {
  var vertex = new THREE.Vector3();

  // Uniform random sampling on sphere surface
  var u = THREE.MathUtils.randFloat(0, 1);
  var v = THREE.MathUtils.randFloat(0, 1);
  var theta = 2 * Math.PI * u;           // Azimuthal angle
  var phi = Math.acos(2 * v - 1);        // Polar angle

  // Convert to Cartesian coordinates
  vertex.x = 3.5 * Math.sin(phi) * Math.cos(theta);
  vertex.y = 3.5 * Math.sin(phi) * Math.sin(theta);
  vertex.z = 3.5 * Math.cos(phi);

  points.push(vertex);
}
```

This approach ensures **uniform distribution** across the sphere surface, avoiding the visual artifacts of simpler random placement methods.

## GLSL Shader

The pulsating light effect is achieved through custom **vertex and fragment shaders** that run directly on the GPU:

### Shader Uniforms Setup

```javascript
const shaderPoint = THREE.ShaderLib.points;
const uniforms = THREE.UniformsUtils.clone(shaderPoint.uniforms);
uniforms.time = { value: 0 };
uniforms.color = { type: "v3", value: colorValue };

const pMaterial = new THREE.ShaderMaterial({
  uniforms,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,  // Creates light emission effect
  vertexShader,
  fragmentShader,
});
```

### The Shader Pipeline

This particle system consists of two interconnected shaders:

- **Vertex Shader** ("vert.glsl") - Handles particle positioning, sizing, and movement
- **Fragment Shader** ("frag.glsl") - Controls particle appearance, color, and glow effects

### 3D Simplex Noise Implementation

The vertex shader begins with a complete **Simplex noise** implementation - a sophisticated algorithm for generating natural-looking randomness:

```glsl
float snoise(vec3 v) {
    // 85 lines of math
    // Creates smooth, continuous 3D noise
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
```

**Why Simplex Noise?** Unlike basic random functions, Simplex noise provides:
- **Continuous gradients** - no sudden jumps or artifacts
- **3D coherence** - neighboring points have similar values
- **Performance optimization** - faster than Perlin noise
- **Natural patterns** - mimics organic movement and growth

### Organic Particle Movement

The main vertex shader transforms each particle's position using time-based trigonometric functions:

```glsl
vec3 newPos = position;

newPos.x += sin(time + position.x * position.y) * 0.08;
newPos.y += cos(time + position.x * position.y * 1.1) * 0.08;
newPos.z += cos(time + position.x * position.y * 1.3) * 0.08;
```

**Mathematical Breakdown:**
- **Base oscillation**: "sin(time)" and "cos(time)" create rhythmic movement
- **Position coupling**: "position.x * position.y" makes each particle's movement unique
- **Frequency variation**: Multipliers prevent synchronized motion
- **Amplitude control**: "0.08" keeps movement subtle and elegant

This creates a **Lissajous-like pattern** where each particle follows its own complex orbital path, determined by its starting position.

### Dynamic Particle Sizing

The most sophisticated aspect is the noise-driven size variation:

```glsl
gl_PointSize = 50. + snoise(position * 0.05 + vec3(0, 0, vtime * 0.1)) * 50.;
gl_PointSize *= 0.5;
```

**Size Calculation Explained:**
- **Base size**: "50." pixels provides consistent minimum visibility
- **Noise sampling**: "snoise(position * 0.05 + ...)" creates spatial variation
- **Temporal drift**: "vec3(0, 0, vtime * 0.1)" makes noise evolve over time
- **Amplitude**: "* 50." allows sizes to range from 0 to 100 pixels
- **Final scaling**: "* 0.5" reduces overall scale to 0-50 pixels

The result is particles that **breathe** - growing and shrinking organically as the noise field evolves through time.

### Time-Based Animation

The pulsating effect is driven by a time uniform that updates every frame:

```javascript
const animate = (time) => {
  // Update shader time for pulsating effect
  pMaterial.uniforms.time.value = time * 0.004;
  
  // Continue animation loop
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
```

The **AdditiveBlending** mode creates the characteristic light emission, making particles appear to glow and blend naturally when they overlap.

## Responsive Color System

The particle system adapts to the user's color mode preference through dynamic uniform updates:

```javascript
// Real-time color mode detection and adaptation
if (localStorage.getItem("chakra-ui-color-mode") === "dark") {
  pMaterial.uniforms.color.value = new THREE.Color(0xffffff);  // White particles
} else {
  pMaterial.uniforms.color.value = new THREE.Color(0x000000);  // Black particles
}
```

This creates a seamless experience where the 3D scene automatically adapts to the user's interface preferences without requiring page refreshes.

## Smooth Camera Animations

The initial camera movement uses an **easing function** to create natural motion:

```javascript
function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}

// Camera animation during first 100 frames
if (frame <= 100) {
  const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;
  
  camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
  camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
  camera.lookAt(target);
} else {
  // Switch to user-controlled orbit after animation
  controls.update();
}
```

After the initial animation completes, control transitions to **OrbitControls** for user interaction, with automatic rotation enabled.

## Performance Optimizations

### GPU-Accelerated Rendering
- **ShaderMaterial** for GPU-based calculations

### Efficient Animation Loop
```javascript
let req = null;
const animate = (time) => {
  req = requestAnimationFrame(animate);
  
  // Minimal CPU calculations
  // GPU handles particle transformations
  
  renderer.render(scene, camera);
}

// Proper cleanup
return () => {
  cancelAnimationFrame(req);
  renderer.domElement.remove();
  renderer.dispose();
}
```

## Final Product
Here is the final animation, best viewed in dark mode!
<hr />
<voxel-art />