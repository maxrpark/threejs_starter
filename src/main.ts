import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import Debug from "./Debug";
import { BasicPlane } from "./objects";

const canvas = document.createElement("canvas");

document.querySelector("#app")?.appendChild(canvas);

// Debug

const gui = new Debug();

const debugObj = {
  ambientColor: "#ffffff",
  ambientIntensity: 1,
  directionalColor: "#ff0000",
  directionalIntensity: 1,
};

// sizes

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();

// CAMERA

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.01,
  100
);

// LIGHTS

const ambientLight = new THREE.AmbientLight(
  debugObj.ambientColor,
  debugObj.ambientIntensity
);

const directionLight = new THREE.DirectionalLight(
  debugObj.directionalColor,
  debugObj.directionalIntensity
);
directionLight.position.set(0, 1, 4);

scene.add(ambientLight, directionLight);

camera.position.set(0, 1, 4);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

scene.add(camera);

const ambientUI = gui.ui?.addFolder("Ambient Light");

ambientUI?.addColor(ambientLight, "color");
ambientUI?.add(ambientLight, "intensity", 0, 1, 0.001);
const directionalUI = gui.ui?.addFolder("Directional Light");

directionalUI?.addColor(directionLight, "color");
directionalUI?.add(directionLight, "intensity", 0, 1, 0.001);

// Object

const plane = new BasicPlane();
scene.add(plane.mesh);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#211d20");

// events

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
});

const clock = new THREE.Clock();
const tick = () => {
  const elapse = clock.getElapsedTime();
  renderer.render(scene, camera);

  plane.update(elapse);

  controls.update();
  window.requestAnimationFrame(tick);
};

tick();
