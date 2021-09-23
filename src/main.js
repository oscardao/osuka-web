import * as THREE from 'https://cdn.skypack.dev/three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
onResize();

window.addEventListener("resize", onResize);
window.addEventListener("orientationchange", onResize);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

function update() {
    requestAnimationFrame(update);
    renderer.render(scene, camera);
}
update();

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
}