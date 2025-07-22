import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

export const loader = new GLTFLoader();
export const fontLoader = new FontLoader();

export let building = null, buildingReady = false, buildingQueue = [];
export let engSign = null, engSignReady = false, engSignQueue = [];
export let sign = null, signReady = false, signQueue = [];
export let hyousatsu = null, hyousatsuReady = false, hyousatsuQueue = [];
export let tatemaru = null, tatemaruReady = false, tatemaruQueue = [];
export let number = null, numberReady = false, numberQueue = [];

const materialBlack = new THREE.MeshBasicMaterial({ color: 0x000000 });

fontLoader.load("./fonts/M_PLUS.json", (font) => {
  building = font;
  buildingReady = true;
  buildingQueue.forEach(args => createBuilding(...args));
  buildingQueue.length = 0;
});
fontLoader.load("./fonts/Manrope.json", (font) => {
  engSign = font;
  engSignReady = true;
  engSignQueue.forEach(args => createEngSign(...args));
  engSignQueue.length = 0;
});
fontLoader.load("./fonts/Zen_Maru_Gothic.json", (font) => {
  sign = font;
  signReady = true;
  signQueue.forEach(args => createSign(...args));
  signQueue.length = 0;
});
fontLoader.load("./fonts/Zen_Old_Mincho.json", (font) => {
  hyousatsu = font;
  hyousatsuReady = true;
  hyousatsuQueue.forEach(args => createHyousatsu(...args));
  hyousatsuQueue.length = 0;
});
fontLoader.load("./fonts/Kiwi_Maru.json", (font) => {
  tatemaru = font;
  tatemaruReady = true;
  tatemaruQueue.forEach(args => createTatemaru(...args));
  tatemaruQueue.length = 0;
});
fontLoader.load("./fonts/Sansation.json", (font) => {
  number = font;
  numberReady = true;
  numberQueue.forEach(args => createNumber(...args));
  numberQueue.length = 0;
});

export function Tategaki(str) {
  return str.split('').join('\n');
}

export function createBuilding(text, position, scene) {
  if (!buildingReady) {
    buildingQueue.push([text, position, scene]);
    return;
  }
  const geometry = new TextGeometry(text, {
    font: building,
    size: 1,
    depth: 0,
    height: 0.01,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelSegments: 3
  });
  geometry.center();
  const mesh = new THREE.Mesh(geometry, materialBlack);
  mesh.position.copy(position);
  scene.add(mesh);
}

export function createEngSign(text, position, scene) {
  if (!engSignReady) {
    engSignQueue.push([text, position, scene]);
    return;
  }
  const geometry = new TextGeometry(text, {
    font: engSign,
    size: 0.1,
    depth: 0,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelSegments: 3
  });
  geometry.center();
  const mesh = new THREE.Mesh(geometry, materialBlack);
  mesh.position.copy(position);
  scene.add(mesh);
}

export function createSign(text, position, scene) {
  if (!signReady) {
    signQueue.push([text, position, scene]);
    return;
  }
  const geometry = new TextGeometry(text, {
    font: sign,
    size: 0.1,
    depth: 0,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelSegments: 3
  });
  geometry.center();
  const mesh = new THREE.Mesh(geometry, materialBlack);
  mesh.position.copy(position);
  scene.add(mesh);
}

export function createHyousatsu(text, position, rotationY = 0, scene) {
  if (!hyousatsuReady) {
    hyousatsuQueue.push([text, position, rotationY, scene]);
    return;
  }
  const geometry = new TextGeometry(text, {
    font: hyousatsu,
    size: 0.15,
    depth: 0,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelSegments: 3
  });
  geometry.center();
  const mesh = new THREE.Mesh(geometry, materialBlack);
  mesh.position.copy(position);
  mesh.rotation.y = rotationY;
  scene.add(mesh);
}

export function createTatemaru(text, position, scene) {
  if (!tatemaruReady) {
    tatemaruQueue.push([text, position, scene]);
    return;
  }
  const geometry = new TextGeometry(Tategaki(text), {
    font: tatemaru,
    size: 0.2,
    depth: 0,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelSegments: 3
  });
  geometry.center();
  const mesh = new THREE.Mesh(geometry, materialBlack);
  mesh.position.copy(position);
  scene.add(mesh);
}

export function createNumber(text, position, scene) {
  if (!numberReady) {
    numberQueue.push([text, position, scene]);
    return;
  }
  const geometry = new TextGeometry(text, {
    font: number,
    size: 0.2,
    depth: 0,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelSegments: 3
  });
  geometry.center();
  const mesh = new THREE.Mesh(geometry, materialBlack);
  mesh.position.copy(position);
  scene.add(mesh);
}
