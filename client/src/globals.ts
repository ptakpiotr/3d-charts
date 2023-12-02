import * as THREE from "three";
import { ChartType, IChartSetup, IValues } from "./Types";
import {
  renderBarChart,
  renderConeChart,
  renderCylinderChart,
  renderLineChart,
  renderPointChart,
} from "./renderers";

export const material = new THREE.LineBasicMaterial({
  color: 0xffffff,
});

export const _scale = (
  number: number,
  [inMin, inMax]: number[],
  [outMin, outMax]: number[]
) => {
  return (
    Math.floor((number - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
  );
};

export const _scaleFloat = (
  number: number,
  [inMin, inMax]: number[],
  [outMin, outMax]: number[]
) => {
  return ((number - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
};

export const renderValues = (
  scene: THREE.Scene,
  values: IValues[],
  chartSetup: IChartSetup
) => {
  let chartValues: THREE.Mesh[] | THREE.Line[] = [];

  switch (chartSetup.type) {
    case ChartType.BAR:
    default:
      chartValues = renderBarChart(values, chartSetup);
      break;
    case ChartType.CYLINDER:
      chartValues = renderCylinderChart(values, chartSetup);
      break;
    case ChartType.POINT:
      chartValues = renderPointChart(values, chartSetup);
      break;
    case ChartType.CONE:
      chartValues = renderConeChart(values, chartSetup);
      break;
    case ChartType.LINE:
      chartValues = renderLineChart(values, chartSetup);
      break;
  }

  scene.add(...chartValues);
};
