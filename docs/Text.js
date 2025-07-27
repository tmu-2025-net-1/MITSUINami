import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { getHuman, getArchi, getPlace, getHiragana, getCar, smallNumber, bigNumber } from "./Words.js";

export const loader = new GLTFLoader();
export const fontLoader = new FontLoader();

export let building = null, buildingReady = false, buildingQueue = [];
export let engSign = null, engSignReady = false, engSignQueue = [];
export let sign = null, signReady = false, signQueue = [];
export let hyousatsu = null, hyousatsuReady = false, hyousatsuQueue = [];
export let tatemaru = null, tatemaruReady = false, tatemaruQueue = [];
export let number = null, numberReady = false, numberQueue = [];
export let pop = null, popReady = false, popQueue = [];
export let NumberPlace = null, NumberPlaceReady = false, NumberPlaceQueue = [];
export let Dot = null, DotReady = false, DotQueue = [];

const materialBlack = new THREE.MeshBasicMaterial({ color: 0x000000 });

fontLoader.load("./fonts/M_PLUS.json", (font) => {
  building = font;
  buildingReady = true;
  buildingQueue.forEach(args => createBuilding(...args));
  buildingQueue.length = 0;
  NumberPlace = font;
  NumberPlaceReady = true;
  NumberPlaceQueue.forEach(args => createNumberPlace(...args));
  NumberPlaceQueue.length = 0;
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
fontLoader.load("./fonts/Mochiy_Pop.json", (font) => {
  pop = font;
  popReady = true;
  popQueue.forEach(args => createPop(...args));
  popQueue.length = 0;
});
fontLoader.load("./fonts/k8x12L.json", (font) => {
  Dot = font;
  DotReady = true;
  DotQueue.forEach(args => createDot(...args));
  DotQueue.length = 0;
});

export function Tategaki(str) {
  return str.split('').join('\n');
}

export function createBuilding(text, position, scene, size = 1, rotationY = 0) {
  if (!buildingReady) {
    buildingQueue.push([text, position, scene, size, rotationY]);
    return;
  }
  const geometry = new TextGeometry(text, {
    font: building,
    size: size,
    depth: 0,
    height: 0.01,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelSegments: 3
  });

  geometry.computeBoundingBox();
  const boundingBox = geometry.boundingBox;
  const offsetX = -boundingBox.min.x;
  geometry.translate(offsetX, 0, 0);
  const mesh = new THREE.Mesh(geometry, materialBlack);
  mesh.position.copy(position);
  mesh.rotation.y = rotationY;
  scene.add(mesh);
}

export function createNumberPlace(text, position, scene, size = 0.2, rotationY = 0) {
  if (!buildingReady) {
    NumberPlaceQueue.push([text, position, scene, size, rotationY]);
    return;
  }
  const geometry = new TextGeometry(text, {
    font: NumberPlace,
    size: size,
    depth: 0,
    height: 0.1,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0,
    bevelSize: 0,
    bevelSegments: 3
  });
  // 右寄せ: geometryの左端が原点に来るようにオフセット
  geometry.computeBoundingBox();
  const boundingBox = geometry.boundingBox;
  const offsetX = -boundingBox.max.x;
  geometry.translate(offsetX, 0, 0);
  const mesh = new THREE.Mesh(geometry, materialBlack);
  mesh.position.copy(position);
  mesh.rotation.y = rotationY;
  scene.add(mesh);
  return mesh; // Return the mesh for further manipulation if needed
}

export function createEngSign(text, position, scene, size = 0.1, rotationY = 0) {
  if (!engSignReady) {
    engSignQueue.push([text, position, scene, size, rotationY]);
    return;
  }
  const geometry = new TextGeometry(text, {
    font: engSign,
    size: size,
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
  return mesh; // Return the mesh for further manipulation if needed
}

export function createSign(text, position, scene, size = 0.1, rotationY = 0) {
  if (!signReady) {
    signQueue.push([text, position, scene, size, rotationY]);
    return;
  }
  const geometry = new TextGeometry(text, {
    font: sign,
    size: size,
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
  return mesh; // Return the mesh for further manipulation if needed
}

export function createHyousatsu(text, position, scene, size = 0.15, rotationY = 0) {
  if (!hyousatsuReady) {
    hyousatsuQueue.push([text, position, scene, size, rotationY]);
    return;
  }
  const geometry = new TextGeometry(text, {
    font: hyousatsu,
    size: size,
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
  return mesh; // Return the mesh for further manipulation if needed
}

export function createTatemaru(text, position, scene, size = 0.2, rotationY = 0) {
  if (!tatemaruReady) {
    tatemaruQueue.push([text, position, scene, size, rotationY]);
    return;
  }
  const geometry = new TextGeometry(text, {
    font: tatemaru,
    size: size,
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
  return mesh; // Return the mesh for further manipulation if needed
}

export function createNumber(text, position, scene, size = 0.2, rotationY = 0) {
  if (!numberReady) {
    numberQueue.push([text, position, scene, size, rotationY]);
    return;
  }
  const geometry = new TextGeometry(text, {
    font: number,
    size: size,
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
  return mesh; // Return the mesh for further manipulation if needed
}

export function createPop(text, position, scene, size = 0.2, rotationY = 0) {
  if (!popReady) {
    popQueue.push([text, position, scene, size, rotationY]);
    return;
  }
  const geometry = new TextGeometry(text, {
    font: pop,
    size: size,
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
  return mesh; // Return the mesh for further manipulation if needed
}

export function createDot(text, position, scene, size = 0.2, rotationY = 0) {
  if (!DotReady) {
    DotQueue.push([text, position, scene, size, rotationY]);
    return;
  }
  const geometry = new TextGeometry(text, {
    font: Dot,
    size: size,
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
  return mesh; // Return the mesh for further manipulation if needed
}

export function createNumberPlate(x, y, z, scene) {
  createNumberPlace(getPlace(), new THREE.Vector3(-0.03 + x, 0.13 + y, 0 + z), scene, 0.06, 0);
  createNumber(smallNumber(), new THREE.Vector3(0.1 + x, 0.16 + y, 0 + z), scene, 0.07, 0);
  createHyousatsu(getHiragana(), new THREE.Vector3(-0.45 + x, 0 + y, 0 + z), scene, 0.08, 0);
  createNumber(bigNumber(), new THREE.Vector3(0 + x, 0 + y, 0 + z), scene, 0.2, 0);
}

export function createNumberPlate2(x, y, z, i, scene) {
  createNumberPlace(getPlace(), new THREE.Vector3(0 + x, 0.13 + y, 0.05 * i + z), scene, 0.06, i * Math.PI / 2);
  createNumber(smallNumber(), new THREE.Vector3(0 + x, 0.16 + y, -0.1 * i + z), scene, 0.07, i * Math.PI / 2);
  createHyousatsu(getHiragana(), new THREE.Vector3(0 + x, 0 + y, 0.45 * i + z), scene, 0.08, i * Math.PI / 2);
  createNumber(bigNumber(), new THREE.Vector3(0 + x, 0 + y, 0 + z), scene, 0.2, i * Math.PI / 2);
}
