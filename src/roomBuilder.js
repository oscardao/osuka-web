import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'

const loader = new GLTFLoader();
const fontLoader = new THREE.FontLoader();

export function construct(scene) {
    loader.load('models/osuka bedroom.glb', (gltf) => {
        console.log(gltf)
        gltf.scene.scale.multiplyScalar(2);
        scene.add(gltf.scene);
    });

    createTitle(scene);
}

function createTitle(scene) {
    fontLoader.load('fonts/Berlin_Regular.json', (font) => {
        const textGeometry = new THREE.TextGeometry(
            'Osuka Creative',
            {
                font: font,
                size: 0.5,
                height: 0.02
            }
        )
        textGeometry.center();
        const textMaterial = new THREE.MeshBasicMaterial({ color: '#141414' });
        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.rotation.z = Math.PI / 4;
        text.position.x = 2.5;
        text.position.z = 2.5;
        scene.add(text)
    });


    const material = new LineMaterial({ color: '#141414', linewidth: 2 });
    let height = 2;
    let width = 5;
    const points = [];
    points.push(new THREE.Vector3(height / 2, 0, width / 2));
    points.push(new THREE.Vector3(height / -2, 0, width / 2));
    points.push(new THREE.Vector3(height / -2, 0, width / -2));
    points.push(new THREE.Vector3(height / 2, 0, width / -2));
    points.push(new THREE.Vector3(height / 2, 0, width / 2));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new Line2(geometry, material);
    //line.computeLineDistances();

    line.rotation.y = Math.PI / -4;
    line.position.x = 2.5;
    line.position.z = 2.5;
    scene.add(line);
}