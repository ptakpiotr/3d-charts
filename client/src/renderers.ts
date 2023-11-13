import * as THREE from "three";
import { _scaleFloat, heatMapColorforValue } from "./globals";
import { IChartSetup, IValues } from "./Types";

export let valueMaterial: THREE.LineBasicMaterial | THREE.MeshPhongMaterial =
  new THREE.LineBasicMaterial({
    color: 0x00ffff,
  });

export const setValueMaterial = (
  material: THREE.LineBasicMaterial | THREE.MeshPhongMaterial
) => {
  valueMaterial = material;
};

export const renderBarChart = (values: IValues[], chartSetup: IChartSetup) => {
  const chartValues: THREE.Mesh[] = [];

  for (let v of values) {
    const scaledX = _scaleFloat(
      v.x,
      [chartSetup.xAxis.min, chartSetup.xAxis.max],
      [-3, 7]
    );

    const scaledY = _scaleFloat(
      v.y,
      [chartSetup.yAxis.min, chartSetup.yAxis.max],
      [0, 10]
    );

    const box = new THREE.BoxGeometry(0.5, scaledY, 1, 1, 1, 1);

    valueMaterial.color = new THREE.Color(heatMapColorforValue(scaledY));

    const mesh = new THREE.Mesh(box, valueMaterial);

    mesh.position.x = scaledX;
    mesh.position.y = -1 + scaledY / 2;

    chartValues.push(mesh);
  }

  return chartValues;
};

export const renderPointChart = (
  values: IValues[],
  chartSetup: IChartSetup
) => {
  const chartValues: THREE.Mesh[] = [];

  for (let v of values) {
    const scaledX = _scaleFloat(
      v.x,
      [chartSetup.xAxis.min, chartSetup.xAxis.max],
      [-3, 7]
    );

    const scaledY = _scaleFloat(
      v.y,
      [chartSetup.yAxis.min, chartSetup.yAxis.max],
      [0, 10]
    );

    const sphere = new THREE.SphereGeometry(0.1, 64, 64);

    valueMaterial.color = new THREE.Color(heatMapColorforValue(scaledY));

    const mesh = new THREE.Mesh(sphere, valueMaterial);

    mesh.position.x = scaledX;
    mesh.position.y = scaledY - 1;

    chartValues.push(mesh);
  }

  return chartValues;
};

export const renderCylinderChart = (
  values: IValues[],
  chartSetup: IChartSetup
) => {
  const chartValues: THREE.Mesh[] = [];

  for (let v of values) {
    const scaledX = _scaleFloat(
      v.x,
      [chartSetup.xAxis.min, chartSetup.xAxis.max],
      [-3, 7]
    );

    const scaledY = _scaleFloat(
      v.y,
      [chartSetup.yAxis.min, chartSetup.yAxis.max],
      [0, 10]
    );

    const cylinder = new THREE.CylinderGeometry(0.1, 0.1, scaledY);

    valueMaterial.color = new THREE.Color(heatMapColorforValue(scaledY));

    const mesh = new THREE.Mesh(cylinder, valueMaterial);

    mesh.position.x = scaledX;
    mesh.position.y = scaledY / 2 - 1;

    chartValues.push(mesh);
  }

  return chartValues;
};

export const renderConeChart = (values: IValues[], chartSetup: IChartSetup) => {
  const chartValues: THREE.Mesh[] = [];

  for (let v of values) {
    const scaledX = _scaleFloat(
      v.x,
      [chartSetup.xAxis.min, chartSetup.xAxis.max],
      [-3, 7]
    );

    const scaledY = _scaleFloat(
      v.y,
      [chartSetup.yAxis.min, chartSetup.yAxis.max],
      [0, 10]
    );

    const cone = new THREE.ConeGeometry(0.1, scaledY, 64, 64);

    valueMaterial.color = new THREE.Color(heatMapColorforValue(scaledY));

    const mesh = new THREE.Mesh(cone, valueMaterial);

    mesh.position.x = scaledX;
    mesh.position.y = scaledY / 2 - 1;

    chartValues.push(mesh);
  }
  return chartValues;
};

export const renderLineChart = (values: IValues[], chartSetup: IChartSetup) => {
  const chartValues: THREE.Line[] = [];
  const valuesCount = values.length;

  for (let i = 1; i < valuesCount; i++) {
    const scaledX1 = _scaleFloat(
      values[i - 1].x,
      [chartSetup.xAxis.min, chartSetup.xAxis.max],
      [-3, 7]
    );
    const scaledY1 = _scaleFloat(
      values[i - 1].y,
      [chartSetup.yAxis.min, chartSetup.yAxis.max],
      [0, 10]
    );

    const scaledX2 = _scaleFloat(
      values[i].x,
      [chartSetup.xAxis.min, chartSetup.xAxis.max],
      [-3, 7]
    );
    const scaledY2 = _scaleFloat(
      values[i].y,
      [chartSetup.yAxis.min, chartSetup.yAxis.max],
      [0, 10]
    );

    const points = [
      new THREE.Vector3(scaledX1, scaledY1 - 1, 0),
      new THREE.Vector3(scaledX2, scaledY2 - 1, 0),
    ];

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, valueMaterial);

    chartValues.push(line);
  }

  return chartValues;
};
