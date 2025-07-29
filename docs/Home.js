import { createBuilding, createEngSign, createSign, createHyousatsu, createTatemaru, createNumber, createPop, createNumberPlate, createNumberPlate2, createDot, Tategaki} from "./Text.js";
import { getHuman, getArchi, getPlace, getHiragana, getCar, smallNumber, bigNumber, Number4, Koukou1, Koukou2, Koukou3 } from "./Words.js";

const name = window.name;

export async function initHome(scene) {
  await loadHomeModel(scene);
  await loadHomeWordModel(scene);

  if(name !== null)
  {
    createHyousatsu(name, new THREE.Vector3(0.4, 1.5, -37.3), scene, 0.1, 0);
  }else
  {
    createHyousatsu(名字名字名, new THREE.Vector3(0, 1.3, -37.3), scene, 0.1, 0);
  }
}

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const loader = new GLTFLoader();
// const materialWhite = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
const materialWhite = new THREE.MeshBasicMaterial({color: 0xFFFFFF});

export async function loadHomeModel(scene) {
  const Home = await loader.loadAsync('./models/Home.gltf');
  Home.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = materialWhite;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  const HomeModel = Home.scene;
  HomeModel.position.set(0, 0, 0);
  HomeModel.scale.set(1, 1, 1);
  scene.add(HomeModel);
  return HomeModel;
}

export async function loadHomeWordModel(scene) {
  const HomeWord = await loader.loadAsync('./models/HomeWord.gltf');
  const materialBlack = new THREE.MeshBasicMaterial({color: 0x000000});
  HomeWord.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = materialBlack;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  const HomeWordModel = HomeWord.scene;
  HomeWordModel.position.set(0, 0, 0);
  HomeWordModel.scale.set(1, 1, 1);
  scene.add(HomeWordModel);
  return HomeWordModel;
}