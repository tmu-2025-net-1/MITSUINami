export function saveCameraState(camera, controls) {
  localStorage.setItem('camera', JSON.stringify({
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z,
    rx: camera.rotation.x,
    ry: camera.rotation.y,
    rz: camera.rotation.z,
    tx: controls.target.x,
    ty: controls.target.y,
    tz: controls.target.z
  }));
}

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function createCamera(width, height, canvas) {
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.fov = 120;
  camera.updateProjectionMatrix();

  // localStorageからカメラ位置・回転を復元
  const savedCamera = localStorage.getItem('camera');
  let controls;
  if (savedCamera) {
    const cam = JSON.parse(savedCamera);
    camera.position.set(cam.x, cam.y, cam.z);
    camera.rotation.set(cam.rx, cam.ry, cam.rz);
    controls = new OrbitControls(camera, canvas);
    controls.target.set(cam.tx ?? 0, cam.ty ?? 1.7, cam.tz ?? 0);
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.zoomSpeed = 2.0;
    controls.update();
  } else {
    camera.position.set(0, 1.7, 5);
    controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 1.7, 0);
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.zoomSpeed = 2.0;
    controls.update();
  }
  return { camera, controls };
}

export function addDebugGrids(scene) {
  const grid = new THREE.GridHelper(2000, 2000, 0xffff00, 0x0000ff);
  grid.position.y = 0.1;
  scene.add(grid);
  const grid2 = new THREE.GridHelper(2000, 400, 0xffffff, 0xFF69B4);
  grid2.position.y = 0.1;
  scene.add(grid2);
  const grid3 = new THREE.GridHelper(2000, 2000, 0x000000, 0x000000);
  grid3.rotation.x = Math.PI / 2;
  scene.add(grid3);
}
