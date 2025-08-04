import { createBuilding, createEngSign, createSign, createHyousatsu, createTatemaru, createNumber, createPop, createNumberPlate, createNumberPlate2, createDot, Tategaki, createGothic} from "./Text.js";

const station = window.station || "匹重";

export async function initStation(scene) {
  window.Stationmodel = await loadStationModel(scene);
  window.StationWordModel = await loadStationWordModel(scene);

  let now = new Date();
  let plusDate1 = 1 * 60 * 1000; // 1分（ミリ秒）
  let plusDate3 = 3 * 60 * 1000; // 3分
  let plusDate10 = 10 * 60 * 1000; // 10分
  let plusDate15 = 15 * 60 * 1000; // 15分
  let date1 = new Date(now.getTime() + plusDate1); // 現在時刻に1分を加算
  let date3 = new Date(now.getTime() + plusDate3); // 現在時刻に3分を加算
  let date10 = new Date(now.getTime() + plusDate10); // 現在時刻に10分を加算
  let date15 = new Date(now.getTime() + plusDate15); // 現在時刻に15分を加算

  const Time1_1 = date1.getHours().toString();
  const Time1_2 = date1.getMinutes().toString().padStart(2, '0');
  const Time1 = Time1_1 + ':' + Time1_2;

  const Time3_1 = date3.getHours().toString();
  const Time3_2 = date3.getMinutes().toString().padStart(2, '0');
  const Time3 = Time3_1 + ':' + Time3_2;

  const Time10_1 = date10.getHours().toString();
  const Time10_2 = date10.getMinutes().toString().padStart(2, '0');
  const Time10 = Time10_1 + ':' + Time10_2;

  const Time15_1 = date15.getHours().toString();
  const Time15_2 = date15.getMinutes().toString().padStart(2, '0');
  const Time15 = Time15_1 + ':' + Time15_2;

  // Station専用テキスト生成
  window.stationDotMeshes = [];
  window.stationDotMeshes.push(
    createDot(Time1, new THREE.Vector3(-1.03, 2.8, -7.5), scene, 0.06),
    createDot(Time10, new THREE.Vector3(-1.03, 2.7, -7.5), scene, 0.06),
    createDot(Time3, new THREE.Vector3(1.25, 2.8, -7.5), scene, 0.06),
    createDot(Time15, new THREE.Vector3(1.25, 2.7, -7.5), scene, 0.06),
    createDot(Time3, new THREE.Vector3(0.5, 6.68, -29.92), scene, 0.06),
    createDot(Time15, new THREE.Vector3(0.5, 6.58, -29.92), scene, 0.06),
    createGothic(station + "方面", new THREE.Vector3(1.11, 2.93, -7.5), scene, 0.04, 0),
    createGothic(station + "方面", new THREE.Vector3(0.1, 3.3, -18.2), scene, 0.07, 0),
    createGothic(station + "方面", new THREE.Vector3(0.09, 6.68, -25.76), scene, 0.07, 0),
    createGothic(station + "方面", new THREE.Vector3(0.35, 6.81, -29.94), scene, 0.04, 0),
    createDot(station, new THREE.Vector3(1.5, 2.8, -7.5), scene, 0.05),
    createDot(station, new THREE.Vector3(1.5, 2.7, -7.5), scene, 0.05),
    createDot(station, new THREE.Vector3(0.75, 6.68, -29.92), scene, 0.05),
    createDot(station, new THREE.Vector3(0.75, 6.58, -29.92), scene, 0.05),
    createDot("各駅停車 " + station, new THREE.Vector3(-2.5, 6.7, -30.8), scene, 0.15, Math.PI / 2),
    createDot("各駅停車 " + station, new THREE.Vector3(-2.5, 6.7, -37.8), scene, 0.15, Math.PI / 2)
  );
}

export async function StationRemove(scene) {
  // シーンからStationモデルを削除
  // loadStationModelで追加したStationmodelを削除する
  // Stationmodelの参照を保持するため、グローバル変数として管理
  if (window.Stationmodel) {
    scene.remove(window.Stationmodel);
    window.Stationmodel = null;
  }
  // StationWordモデル削除
  if (window.StationWordModel) {
    scene.remove(window.StationWordModel);
    window.StationWordModel = null;
  }
  if (window.stationDotMeshes && Array.isArray(window.stationDotMeshes)) {
    window.stationDotMeshes.forEach(mesh => {
      if (mesh && mesh.isMesh) {
        scene.remove(mesh);
      }
    });
    window.stationDotMeshes = [];
  }
}


import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export const loader = new GLTFLoader();
// const materialWhite = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
const materialWhite = new THREE.MeshBasicMaterial({color: 0xFFFFFF});

export async function loadStationModel(scene) {
  const Station = await loader.loadAsync('./models/Station.gltf');
  Station.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = materialWhite;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  const StationModel = Station.scene;
  StationModel.position.set(0, 0, 0);
  StationModel.scale.set(1, 1, 1);
  scene.add(StationModel);
  return StationModel;
}

export async function loadStationWordModel(scene) {
  const StationWord = await loader.loadAsync('./models/StationWord.gltf');
  const materialBlack = new THREE.MeshBasicMaterial({color: 0x000000});
  StationWord.scene.traverse((child) => {
    if (child.isMesh) {
      child.material = materialBlack;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  const StationWordModel = StationWord.scene;
  StationWordModel.position.set(0, 0, 0);
  StationWordModel.scale.set(1, 1, 1);
  scene.add(StationWordModel);
  return StationWordModel;
}