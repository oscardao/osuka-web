import './style.css';
import * as THREE from 'three';

let camera, scene, renderer;
let canvas = document.getElementById('renderCanvas');

let viewSize = 20;
let aspectRatio = window.innerWidth / window.innerHeight;

initializeEnvironment();
update();

function initializeEnvironment() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf7fff9);

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialiasing: true });
    camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 1000);
    camera.position.z = 10;
    camera.position.y = 10;
    camera.rotation.x = Math.PI / -4;
    scene.add(camera);
    onResize();

    setupHemiLight();
    setupDirLight();

    const geometry = new THREE.TorusGeometry(3, 1, 16, 100);
    const material = new THREE.MeshBasicMaterial({ color: 0x5291f7 });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
}

function setupHemiLight() {
    let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const hemiLightHelper = new THREE.HemisphereLightHelper(hemiLight, 10);
    scene.add(hemiLightHelper);

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

    const dirLightHelper = new THREE.DirectionalLightHelper(dirLight, 10);
    scene.add(dirLightHelper);
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