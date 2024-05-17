<script setup lang="ts">
import * as THREE from 'three'; // Import everything as THREE from three.js
import { ref, onMounted, watch, computed } from 'vue'; // Import ref, onMounted, Ref, watch, and computed from Vue
import { useWindowSize } from '@vueuse/core'; // Import useWindowSize from @vueuse/core
import { GLTFLoader } from 'three/examples/jsm/Addons.js'; // Import GLTFLoader from three.js
import { OrbitControls } from 'three/examples/jsm/Addons.js'; // Import OrbitControls from three.js
import { BufferGeometryUtils } from 'three/examples/jsm/Addons.js';

// Define variables
let renderer: THREE.WebGLRenderer; // WebGLRenderer for rendering 3D scene
let controls: OrbitControls; // OrbitControls for controlling 3D model
let model: THREE.Group | null = null; // Car model
let garageModel: THREE.Group | null = null; // Garage model

const experience: Ref<HTMLCanvasElement | null> = ref(null); // Canvas element for rendering the scene
const scene = new THREE.Scene(); // Three.js scene
const { width, height } = useWindowSize(); // Get window size using useWindowSize hook
const aspectRatio = computed(() => width.value / height.value); // Compute aspect ratio

// Set up camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio.value, 0.1, 1000);
camera.position.set(0, 2, 4);
scene.add(camera);

// Add directional light
const light = new THREE.DirectionalLight(0xffffff, 5);
scene.add(light);

// Load 3D models
const gltfLoader = new GLTFLoader();

// Load garage model
gltfLoader.load('/garage/scene.gltf', (gltf) => {
    garageModel = gltf.scene;
    garageModel.position.set(0, 0, 2);
    scene.add(garageModel);
});

// Load car model
gltfLoader.load('/carr/scene.gltf', (gltf) => {
    model = gltf.scene;
    model.position.set(0, 0, 0);
    if (garageModel) {
        garageModel.add(model); // Add car model as a child of the garage model
    } else {
        scene.add(model); // If garageModel is not available, add the car model directly to the scene
    }
});

// Update camera aspect ratio
function updateCamera() {
    camera.aspect = aspectRatio.value;
    camera.updateProjectionMatrix();
}

// Update renderer size
function updateRenderer() {
    renderer.setSize(width.value, height.value);
    renderer.render(scene, camera);
}

// Set up renderer
function setRenderer() {
    if (experience.value) {
        renderer = new THREE.WebGLRenderer({ canvas: experience.value, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enableZoom = false;
        // controls.enableRotate = false;
        updateRenderer();
    }
}

// Watch for changes in aspect ratio
watch(aspectRatio, () => {
    updateCamera();
    updateRenderer();
});

// Set up onMounted hook
onMounted(() => {
    setRenderer();
    loop();
});

// Main render loop
const loop = () => {
    // if (model) {
    //     model.rotation.y -= 0.009;
    // }
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
};
</script>

<template>
    <div>
        <div class="canvas-container">
            <canvas ref="experience" :width="width" :height="height"></canvas>
        </div>
       <Sidebar />
        <BRButton />
    </div>
</template>

<style scoped>
.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1; /* Ensure the navbar is in front of the 3D scene */
}



.canvas-container {
  position: relative;
  width: 100%;
  height: calc(100% - 50px); /* Subtract the navbar height from the viewport height */
}

</style>
