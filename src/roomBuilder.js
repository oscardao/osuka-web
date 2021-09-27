import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export function construct(scene) {
    loader.load('static/models/chinese.glb', (gltf) => {
        console.log(gltf)
    });
}