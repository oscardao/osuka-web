import './style.css';
import * as SCENE from './scene.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let camera, scene, renderer, controls;
let canvas = document.getElementById('renderCanvas');

let viewSize = 25;
let aspectRatio = window.innerWidth / window.innerHeight;

init();
SCENE.construct(scene);
update();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color('#defcff');

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 1000);
    camera.position.z = 10;
    camera.position.y = 10;
    camera.rotation.x = Math.PI / -4;
    scene.add(camera);
    onResize();

    setupLighting();
    //addOrbitControls();

    //const axesHelper = new THREE.AxesHelper(5);
    //scene.add(axesHelper);
}

function setupLighting() {
    let hemiLight = new THREE.HemisphereLight(0xffffff, '#A2CDCD', 0.7);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight.color.setHSL(0.1, 1, 0.95);
    dirLight.position.set(- 1, 1.75, 1);
    dirLight.position.multiplyScalar(30);
    scene.add(dirLight);

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;

    const d = 50;

    dirLight.shadow.camera.left = - d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = - d;

    dirLight.shadow.camera.far = 3500;
    dirLight.shadow.bias = - 0.0001;
}

function addOrbitControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.listenToKeyEvents(window); // optional

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 100;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;

}

/*------Main Update Loop------*/
function update() {
    requestAnimationFrame(update);
    renderer.render(scene, camera);
}

/*------Resizing------*/
window.addEventListener("resize", onResize);
window.addEventListener("orientationchange", onResize);

function onResize() {
    aspectRatio = window.innerWidth / window.innerHeight;

    camera.left = (-aspectRatio * viewSize) / 2;
    camera.right = (aspectRatio * viewSize) / 2;
    camera.top = viewSize / 2;
    camera.bottom = -viewSize / 2;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}