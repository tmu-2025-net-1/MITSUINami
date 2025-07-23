import { createBuilding, createEngSign, createSign, createHyousatsu, createTatemaru } from "./Text.js";

export async function initCity(scene) {
  await loadCityModel(scene);
  await loadStopModel(scene);

  // City専用テキスト生成
  createHyousatsu("表札", new THREE.Vector3(-4.2, 1.3, -5.5), Math.PI/2, scene);
  createHyousatsu("表札", new THREE.Vector3(6.1, 1.7, -5.0), -Math.PI/2, scene);
  createHyousatsu("表札", new THREE.Vector3(-4.8, 1.0, -34.5), Math.PI/2, scene);
  createHyousatsu("表札", new THREE.Vector3(-9.5, 1.7, -55), Math.PI/2, scene);
  createBuilding("ビルA", new THREE.Vector3(8, 18, -23.5), scene);
  createTatemaru("広告欄", new THREE.Vector3(3.8, 2.5, -0.7), scene);
}

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const loader = new GLTFLoader();

export async function loadCityModel(scene) {
  const City = await loader.loadAsync('./models/City.gltf');
  const materialWhite = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
  City.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = materialWhite;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  const Citymodel = City.scene;
  Citymodel.position.set(0, 0, 0);
  Citymodel.scale.set(1, 1, 1);
  scene.add(Citymodel);
  return Citymodel;
}

export async function loadStopModel(scene) {
  const Stop = await loader.loadAsync('./models/Stop.gltf');
  const materialBlack = new THREE.MeshBasicMaterial({color: 0x000000});
  Stop.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = materialBlack;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  const StopModel = Stop.scene;
  StopModel.position.set(0, 0, 2);
  StopModel.scale.set(1, 1, 1);
  scene.add(StopModel);
  return StopModel;
}
