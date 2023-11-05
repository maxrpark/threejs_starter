import * as THREE from "three";
import fragmentShader from "../shaders/plane/fragment.glsl";
import vertexShader from "../shaders/plane/vertex.glsl";
import Debug from "../../Debug";

const debugObj = {
  color: new THREE.Color(1, 0, 0),
};

export class BasicPlane {
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  geometry: THREE.PlaneGeometry;
  debug: Debug;
  constructor() {
    const debug = new Debug();

    const planeDebug = debug.ui?.addFolder("shader");
    planeDebug?.addColor(debugObj, "color");
    this.createObject();
  }

  createObject() {
    this.geometry = new THREE.PlaneGeometry(3, 3, 32, 32);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uColor: { value: debugObj.color },
      },
      side: THREE.DoubleSide,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  update(time: number) {
    console.log(time);
  }
}
