import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader.js';

const loader = new GLTFLoader();
const fontLoader = new THREE.FontLoader();

export function construct(scene) {
    loader.load('models/osuka bedroom.glb', (gltf) => {
        console.log(gltf)
        gltf.scene.castShadow = true;
        gltf.scene.scale.multiplyScalar(2.5);
        scene.add(gltf.scene)
    });

    createTitle(scene);
}

function createTitle(scene) {
    let position = { x: 7, y: 7 };

    fontLoader.load('fonts/KGCorner.json', (font) => {
        const textGeometry = new THREE.TextGeometry(
            'Osuka Creative',
            {
                font: font,
                size: 1.1,
                height: 0.02
            }
        )
        textGeometry.center();
        const textMaterial = new THREE.MeshBasicMaterial({ color: '#3b3b3b' });
        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.rotation.z = Math.PI / 4;
        text.position.x = position.x;
        text.position.z = position.y;
        scene.add(text)
    });

    const material = new LineMaterial({
        color: '#3b3b3b',
        linewidth: 0.005,
        dashed: false,
        alphaToCoverage: true,
    });

    let height = 5;
    let width = 15;
    const points = [];
    points.push(height / 2, 0, width / 2);
    points.push(height / -2, 0, width / 2);
    points.push(height / -2, 0, width / -2);
    points.push(height / 2, 0, width / -2);
    points.push(height / 2, 0, width / 2);

    let geometry = new LineGeometry();
    geometry.setPositions(points);
    let line = new Line2(geometry, material);
    line.computeLineDistances();
    line.scale.set(1, 1, 1);
    line.rotation.y = Math.PI / -4;
    line.position.x = position.x;
    line.position.z = position.y;
    scene.add(line);
}