import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import type { IChartSetup, IGlobalProperties, IValues } from "./Types";
import { renderValues } from "./globals";
import { renderLines } from "./shapes";

const init = async (
  values: IValues[],
  chartSetup: IChartSetup
): Promise<IGlobalProperties> => {
  const scene = new THREE.Scene();

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight - 100,
  };

  const light = new THREE.PointLight(0xffffff, 100, 100);
  light.position.set(0, 1, 0);

  const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100
  );

  camera.position.z = 10;
  scene.add(light, camera);

  const controls = new OrbitControls(
    camera,
    document.getElementById("canvas")!
  );

  controls.enableDamping = true;
  controls.enableZoom = true;
  controls.enablePan = true;
  controls.autoRotate = false;

  renderValues(scene, values, chartSetup);
  renderLines(scene, chartSetup);

  return {
    scene,
    light,
    camera,
    sizes,
    controls,
  };
};

const render = ({
  camera,
  controls,
  scene,
  sizes,
}: Omit<IGlobalProperties, "light">) => {
  const renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas")!,
  });

  renderer.setSize(sizes.width, sizes.height);

  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight - 100;

    camera.updateProjectionMatrix();
    camera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes.height);
  });

  const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
  };

  loop();
};

export const initCharts = async (
  values: IValues[],
  chartSetup: IChartSetup
) => {
  const { camera, controls, scene, sizes } = await init(values, chartSetup);

  render({ camera, controls, scene, sizes });
};
