import './style.css';
import * as ROOM from './roomBuilder.js';
import * as THREE from 'three';

let camera, scene, renderer;
let canvas = document.getElementById('renderCanvas');

let viewSize = 40;
let aspectRatio = window.innerWidth / window.innerHeight;

initializeEnvironment();
ROOM.construct(scene);
update();

function initializeEnvironment() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf2f7f4);

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    //renderer.physicallyCorrectLights = true;
    camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 1000);
    camera.position.z = 10;
    camera.position.y = 10;
    camera.rotation.x = Math.PI / -4;
    scene.add(camera);
    onResize();

    setupHemiLight();
    setupDirLight();

    const testSphere = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshStandardMaterial()
    )
    scene.add(testSphere);
}

function setupHemiLight() {
    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);
}

function setupDirLight() {
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
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