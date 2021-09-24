import * as THREE from 'https://cdn.skypack.dev/three';

const loader = new THREE.LoadingManager();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfffefc);
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
onResize();

window.addEventListener("resize", onResize);
window.addEventListener("orientationchange", onResize);

camera.position.z = 8;
camera.position.y = 7;
camera.rotation.x = -0.7;

function update() {
    requestAnimationFrame(update);
    renderer.render(scene, camera);
}
update();

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

setupRoom();

function setupRoom() {
    loader.load('3DModels/island.fbx', function (gltf) {
        scene.add(gltf.scene);
    });
}