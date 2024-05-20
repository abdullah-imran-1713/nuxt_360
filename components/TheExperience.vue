<script setup lang="ts">
import * as THREE from 'three'; // Import everything as THREE from three.js
import { ref, onMounted, watch, computed } from 'vue'; // Import ref, onMounted, Ref, watch, and computed from Vue
import { useWindowSize } from '@vueuse/core'; // Import useWindowSize from @vueuse/core
import { GLTFLoader } from 'three/examples/jsm/Addons.js'; // Import GLTFLoader from three.js
import { OrbitControls } from 'three/examples/jsm/Addons.js'; // Import OrbitControls from three.js
import { BufferGeometryUtils } from 'three/examples/jsm/Addons.js';

let renderer: THREE.WebGLRenderer; // WebGLRenderer for rendering 3D scene
let controls: OrbitControls; // OrbitControls for controlling 3D model
let model: THREE.Group | null = null; // Car model
let garageModel: THREE.Group | null = null; // Garage model

// Ref<T> means Ref creates a reactive reference to a type in between HTMLCanvasElement and null
const experience: Ref<HTMLCanvasElement | null> = ref(null); // The line const experience: Ref<HTMLCanvasElement | null> = ref(null); declares a reactive reference to a canvas element in a Vue component, starting with a null value. This reference is later used to initialize and interact with a Three.js renderer for displaying a 3D scene.
const scene = new THREE.Scene(); // creating new scene with THREE.Scene
// const { width, height }: This syntax is object destructuring in JavaScript. It extracts width and height properties from the object returned by useWindowSize() and assigns them to the constants width and height.
const { width, height } = useWindowSize(); // useWindowSize() returns an object containing reactive references for the window’s dimensions, typically { width: Ref<number>, height: Ref<number> }
// Other than destructing syntax we can also use this way: 
// const windowSize = useWindowSize();
// const width = windowSize.width;
// const height = windowSize.height;


const aspectRatio = computed(() => width.value / height.value); // The computed property aspectRatio dynamically calculates the aspect ratio of the window based on the reactive width and height values. This aspect ratio is then used to ensure that the Three.js camera and renderer are correctly configured whenever the window size changes, providing a responsive 3D scene.
// The function passed to computed returns the result of width.value / height.value, which calculates the aspect ratio of the window
//Dependence on useWindowSize: Since width and height are reactive references provided by useWindowSize, any change in the window size triggers a recalculation of the aspect ratio.


const camera = new THREE.PerspectiveCamera(75, aspectRatio.value, 0.1, 1000);
camera.position.set(0, 2, 4); // x,y and z axis
camera.lookAt(0, 0, 0); // This ensures that the camera's view is directed towards the center of the scene, where the car is positioned
scene.add(camera);

// Add directional light
const light = new THREE.DirectionalLight(0xffffff, 5); // color and intensity
scene.add(light);

// Lodaing 3D models
const gltfLoader = new GLTFLoader();

// Garage model
gltfLoader.load('/garage/scene.gltf', (gltf) => { // Once the model is loaded successfully, the provided callback function is executed, passing the loaded gltf object as a parameter.
    garageModel = gltf.scene; // gltf.scene refers to the root of the loaded GLTF scene, which contains all the objects and elements defined in the GLTF file
    garageModel.position.set(0, 0, 0);
    scene.add(garageModel);
});

// Car model
gltfLoader.load('/carr/scene.gltf', (gltf) => {
    model = gltf.scene;
    model.position.set(0, 0, 0);
    if (garageModel) { // This checks if the garageModel variable has been assigned a value, i.e., if the garage model has been successfully loaded and is available.
        garageModel.add(model); // The car model (model) is added as a child of the garage model using garageModel.add(model), This means the car model becomes a part of the garage model's hierarchy and will move, rotate, and scale with the garage model
    } else {
        scene.add(model); // If garageModel is not available, add the car model directly to the scene
    }
});

// Update camera aspect ratio
function updateCamera() {
    // Here, aspectRatio.value represents the latest computed aspect ratio.
    camera.aspect = aspectRatio.value; // The aspectRatio is typically a reactive value derived from the width and height of the window or canvas.
    // The projection matrix is responsible for transforming 3D coordinates into 2D screen coordinates for rendering.
    camera.updateProjectionMatrix(); //Calling updateProjectionMatrix() ensures that the camera's projection matrix is recalculated with the new aspect ratio.
}

// Update renderer size
function updateRenderer() {
    renderer.setSize(width.value, height.value); // By setting the renderer's size to match the dimensions of the viewport or canvas, you ensure that the rendered scene covers the entire visible area.
    renderer.render(scene, camera);
}

// Function Renderer
function setRenderer() {
    if (experience.value) { // This condition ensures that the setup code runs only when the canvas element (experience.value) is available.
        renderer = new THREE.WebGLRenderer({ canvas: experience.value, alpha: true }); // This line creates a new WebGLRenderer instance and attaches it to the canvas element specified by experience.value.
        // The { alpha: true } option enables alpha transparency, allowing the canvas to render with a transparent background if needed.
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // It uses Math.min(window.devicePixelRatio, 2) to limit the pixel ratio to the device's pixel density or a maximum of 2.
        controls = new OrbitControls(camera, renderer.domElement); // camera specifies the camera used for orbiting, and renderer.domElement is the canvas element to which the controls are bound.
        controls.enableDamping = true; // enableDamping enables smooth damping of the controls' movements.
        controls.enableZoom = false;
        // controls.enableRotate = false;
        // This line calls a function (updateRenderer()) to update the renderer's size and render the scene.
        updateRenderer(); // It ensures that the initial rendering of the scene reflects any changes made during the setup process.
    }
}
// watch is a Vue.js function used to monitor changes in a reactive property.
watch(aspectRatio, () => { // In this case, it's watching the aspectRatio computed property, which depends on the width and height of the window or canvas
// This arrow function is the callback that runs whenever the aspectRatio changes.
    updateCamera(); 
    updateRenderer();
});


onMounted(() => { // The onMounted hook is a Vue.js lifecycle hook that runs after the component has been mounted to the DOM.
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
    requestAnimationFrame(loop); // This line schedules the loop function to be called again before the next repaint by the browser
// It effectively creates an animation loop, ensuring that the scene is continuously updated and redrawn at the frame rate of the display.
};
</script>

<template>
    <div>
        <div class="canvas-container">
            <canvas ref="experience" :width="width" :height="height"></canvas>
        </div>
       <!-- <Sidebar /> -->
        <!-- <BRButton /> -->
    </div>
</template>

<style scoped>

.canvas-container {
  position: relative;
  width: 100%;
  height: calc(100% - 50px); /* Subtract the navbar height from the viewport height */
}

</style>
