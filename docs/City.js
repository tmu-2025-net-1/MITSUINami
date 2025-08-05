import { createBuilding, createEngSign, createSign, createHyousatsu, createTatemaru, createNumber, createPop, createNumberPlate, createNumberPlate2, Tategaki} from "./Text.js";

export async function initCity(scene) {
  window.Citymodel = await loadCityModel(scene);
  window.StopModel = await loadStopModel(scene);
}

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const loader = new GLTFLoader();
// const materialWhite = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
const materialWhite = new THREE.MeshBasicMaterial({color: 0xFFFFFF});

export async function loadCityModel(scene) {
  const City = await loader.loadAsync('./models/City.gltf');
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
  StopModel.position.set(0, 0, 0);
  StopModel.scale.set(1, 1, 1);
  scene.add(StopModel);
  return StopModel;
}