import './style.css';
import * as SOCIALS from './socials.js'
import * as SCENE from './scene.js';
import * as THREE from 'three';
import $ from 'jquery';

let camera, scene, renderer;
let canvas = document.getElementById('renderCanvas');
let canvasDiv = $('#canvas-div');

let viewSize = 25;
let aspectRatio = window.innerWidth / window.innerHeight;

$(document).ready(function () {
    init();
    SCENE.construct(scene);
    SOCIALS.init();
    update();
});

function init() {
    scene = new THREE.Scene();
    //scene.background = new THREE.Color('#defcff');

    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, 0.1, 1000);
    scene.add(camera);

    camera.position.z = 10;
    camera.position.y = 8;
    camera.rotation.x = Math.PI / -6;

    onResize();
    setupLighting();
}

function setupLighting() {
    let hemiLight = new THREE.HemisphereLight("#defcff", '#636b6b', 0.9);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
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
    console.log(canvasDiv.width());
    camera.left = (-aspectRatio * viewSize) / 2;
    camera.right = (aspectRatio * viewSize) / 2;
    camera.top = viewSize / 2;
    camera.bottom = -viewSize / 2;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
}