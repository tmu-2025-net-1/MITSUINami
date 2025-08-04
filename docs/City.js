import { createBuilding, createEngSign, createSign, createHyousatsu, createTatemaru, createNumber, createPop, createNumberPlate, createNumberPlate2, Tategaki} from "./Text.js";

export async function initCity(scene) {
  window.Citymodel = await loadCityModel(scene);
  window.StopModel = await loadStopModel(scene);
  // await loadTrackModel(-35, 0, 0, scene);

  // // City専用テキスト生成
  // createHyousatsu(getHuman(), new THREE.Vector3(-4.2, 1.3, -5.5), scene, 0.2, Math.PI/2);
  // createHyousatsu(getHuman(), new THREE.Vector3(6.1, 1.7, -5.0), scene, 0.2, -Math.PI/2);
  // createHyousatsu(getHuman(), new THREE.Vector3(-4.8, 1.0, -34.5), scene, 0.2, Math.PI/2);
  // createHyousatsu(getHuman(), new THREE.Vector3(-10.5, 1.7, -55), scene, 0.2, Math.PI/2);
  // createBuilding(getArchi(), new THREE.Vector3(6, 18, -30.5), scene, 1);
  // createBuilding(getArchi(), new THREE.Vector3(4, 4, -40.5), scene, 0.3, -Math.PI/2);
  // createTatemaru(Tategaki(Koukou2() + Koukou1()), new THREE.Vector3(3.8, 4.5, -0.7), scene, 0.2);
  // createTatemaru("70m先\n右折", new THREE.Vector3(3.8, 3.2, -0.7), scene, 0.2);
  // createTatemaru(Tategaki(Koukou2()), new THREE.Vector3(4, 4.5, -33.15), scene, 0.2);
  // createTatemaru(Tategaki(Koukou3()), new THREE.Vector3(3.7, 3.5, -33.15), scene, 0.2);
  // createTatemaru(Tategaki(Koukou2() + Koukou1()), new THREE.Vector3(3.8, 4.5, -63.9), scene, 0.2);
  // createNumberPlate(1.1, 0.4, -0.3, scene);
  // createNumberPlate(7.5, 0.4, -27, scene);
  // createNumberPlate(13.2, 0.4, -27, scene);
  // createNumberPlate(16.2, 0.4, -27, scene);
  // createNumberPlate2(6.4, 0.4, -9, -1, scene);
  // createNumberPlate2(-12.2, 0.4, -60.5, 1, scene);
  // createNumberPlate2(-12.7, 0.4, -58.1, 1, scene);
  // createEngSign("30", new THREE.Vector3(-4.5, 2.7, -23.5), scene, 0.2, 0);
  // createEngSign("0120-" + Number4() + "-" + Number4(), new THREE.Vector3(7, 1.35, -22.65), scene, 0.1, 0);
  // createBuilding(Koukou2() + "ハウジング", new THREE.Vector3(6.5, 0.9, -22.65), scene, 0.08, 0);
  // createSign("自転車を除く", new THREE.Vector3(-0.8, 2.2, -77), scene, 0.15, 0);
  // createSign("止まれ", new THREE.Vector3(-0.8, 3.5, -77), scene, 0.1, 0);
  // createTatemaru(getPlace() + "町掲示板", new THREE.Vector3(-4.1, 1.85, -0.75), scene, 0.13, Math.PI / 2);
}

export async function CityRemove(scene) {
  // シーンからCityモデルを削除
  // loadCityModelで追加したCitymodelを削除する
  // Citymodelの参照を保持するため、グローバル変数として管理
  if (window.Citymodel) {
    scene.remove(window.Citymodel);
    window.Citymodel = null;
  }
  // stopモデル削除
  if (window.StopModel) {
    scene.remove(window.StopModel);
    window.StopModel = null;
  }
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

let movingObjects = [];

export async function loadTrackModel(x, y, z, scene) {
  const Track = await loader.loadAsync('./models/Track.gltf');
  const materialBlack = new THREE.MeshBasicMaterial({color: 0x000000});
  Track.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = materialWhite;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  const trackModel = Track.scene;
  trackModel.position.set(x, y, z);
  trackModel.scale.set(1, 1, 1);
  scene.add(trackModel);
  movingObjects = [];
  movingObjects.push(trackModel);
  createNumberPlate2(19+x, 1+y, -16+z, -1, scene);
  createNumberPlate2(32.5+x, 1.5+y, -16.7+z, 1, scene);
  createPop(getCar(), new THREE.Vector3(26+x, 2.7+y, -15.1+z), scene, 1, 0);
  return trackModel;
}