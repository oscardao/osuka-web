import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';

export function construct(scene) {
    const loader = new GLTFLoader();

    loader.load('models/scene.glb', (gltf) => {
        console.log(gltf)
        gltf.scene.castShadow = true;
        gltf.scene.scale.multiplyScalar(5);
        scene.add(gltf.scene)

    });

    createTitle(scene);
}

function createTitle(scene) {
    let position = { x: 7, y: 7 };
    const fontLoader = new THREE.FontLoader();

    fontLoader.load('fonts/KGCorner.json', (font) => {
        const textGeometry = new THREE.TextGeometry(
            'Osuka Creative',
            {
                font: font,
                size: 0.8,
                height: 0.01
            }
        )
        textGeometry.center();
        const textMaterial = new THREE.MeshBasicMaterial({ color: '#0a0a0a' });
        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.rotation.x = Math.PI / -2;
        text.rotation.z = Math.PI / 4;
        text.position.x = position.x;
        text.position.z = position.y;

        scene.add(text)
    });

    let box = createBox(12, 4, '#0a0a0a', 0.005, false);
    box.position.x = position.x;
    box.position.z = position.y;
    box.rotation.y = Math.PI / 4;

    scene.add(box);
}

function createBox(height, width, color, linewidth, dashed) {
    const material = new LineMaterial({
        color: color,
        linewidth: linewidth,
        dashed: dashed,
        alphaToCoverage: true,
    });

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

    return line;
}