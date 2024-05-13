<script setup lang="ts">

import * as THREE from 'three';
import { ref, onMounted } from 'vue'; // ref creates reactive reference to a value, onMounted executes a function when the component it belongs to is mounted to the DOM.
import {useWindowSize} from '@vueuse/core' // It allows you to track the size of the browser window and reactively update your component based on changes to its dimensions.
import { GLTFLoader } from 'three/examples/jsm/Addons.js'; // 3D model file loader
import { OrbitControls } from 'three/examples/jsm/Addons.js'; // To control the orbits of the 3D model

// Let is used because its limited to the scope of a block statement

// setting WebGLRenderer in variable of renderer
let renderer: THREE.WebGLRenderer; //  WebGLRenderer is used for rendering with help of scene,camera,object,light,controls

// setting OrbitControls in variable of controls
let controls: OrbitControls; // OrbitaControls give access to handle the movement of the 3D model

const experience: Ref<HTMLCanvasElement | null> = ref(null); // constant variable named experience, which is a reactive reference capable of holding either an HTMLCanvasElement or null. Initially, it's set to null.

    
    const scene = new THREE.Scene(); // scene is containing all 3d elements we want to render and to render those elements we need WebGLRenderer to render on HTMLCanvasElement


// The syntax { width, height } is called object destructuring
const {width,height} = useWindowSize() // useWindowSize function returning width and height of window and setting it in const variable width and height

// You can extract or assign the width and height returned by the useWindowSize() function without using object destructuring syntax.

// const windowSize = useWindowSize();
// const width = windowSize.width;
// const height = windowSize.height;

//in this way you can achive it without using object destructing syntax!


const aspectRatio = computed(()=> width.value / height.value) //  aspectRatio is a computed property that holds the aspect ratio of the browser window's dimensions. It updates reactively as the window size changes.
// computed(): This is a function provided by Vue's Composition API. It creates a reactive computed property. Computed properties are derived from one or more reactive data sources and update automatically whenever those sources change.
// width and height are reactive references holding value of width and height, as we cannot use directly width and height because width and height are not simply numbers they are reactive references that holds value of width and height returning from useWindowSize func.

const bgColor = new THREE.Color('E1F0C2'); // bgColor will hold given color 
scene.fog = new THREE.Fog(bgColor,0.1,75) // this will give fog effect in scene, it contains three parameters THREE.Color, near distance where fog begins, far distance where fog ends

scene.background = bgColor // here the initialized color in bgColor will be used as a background color

const camera = new THREE.PerspectiveCamera(75, aspectRatio.value, 0.1, 1000);
camera.position.set(0,2,4)
scene.add(camera);

const light = new THREE.DirectionalLight(0xffffff, 5)
scene.add(light)

// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(1, 32, 32),
//     new THREE.MeshBasicMaterial({ color: 0x008080 })
// );
// scene.add(sphere);

const gltfLoader = new GLTFLoader()

gltfLoader.load('/carr/scene.gltf',(gltf)=>{
    scene.add(gltf.scene)
})

function updateCamera(){
    camera.aspect = aspectRatio.value
    camera.updateProjectionMatrix()
}

function updateRenderer(){
    renderer.setSize(width.value, height.value);
    renderer.render(scene, camera);
}

function setRenderer() {
    if (experience.value) {
        renderer = new THREE.WebGLRenderer({ canvas: experience.value, alpha:true});
        renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
        controls = new OrbitControls(camera,renderer.domElement);
        controls.enableDamping = true
        renderer.setSize(width.value, height.value);
        renderer.render(scene, camera);
    }
}

watch(aspectRatio,()=>{
    updateCamera()
    updateRenderer()
})


onMounted(() => {
    setRenderer();
    loop();
});

const loop=()=>{

    // sphere.position.x += 0.01
    controls.update();
    renderer.render(scene,camera)
    requestAnimationFrame(loop) 

}



</script>

<template>
    <div>
        <canvas ref="experience" width="800" height="600"></canvas>
    </div>
</template>
