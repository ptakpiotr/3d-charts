import type { OrbitControls } from "three/examples/jsm/Addons.js";

export interface IGlobalProperties {
  scene: THREE.Scene;
  light: THREE.PointLight;
  camera: THREE.PerspectiveCamera;
  sizes: {
    width: number;
    height: number;
  };
  controls: OrbitControls;
}

export interface IChartSetup {
  xAxis: {
    min: number;
    max: number;
  };
  yAxis: { min: number; max: number };
  xStep: number;
  yStep: number;
  showLabels?: boolean;
  labels?: {
    xLabel: string;
    yLabel: string;
  };
  type?: ChartType;
}

export enum ChartType {
  BAR,
  POINT,
  CYLINDER,
  CONE,
  LINE,
}

export interface IValues {
  x: number;
  y: number;
}
