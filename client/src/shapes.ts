import * as THREE from "three";
import type { IChartSetup } from "./Types";
import Enumerable from "linq";
import { renderText } from "./text";
import { _scale, _scaleFloat, material } from "./globals";

const renderLine = (
  scene: THREE.Scene,
  vectors: [THREE.Vector3, THREE.Vector3]
) => {
  const axis = new THREE.BufferGeometry().setFromPoints(vectors);
  const line = new THREE.Line(axis, material);

  scene.add(line);
};

const renderArrow = (
  scene: THREE.Scene,
  vectors: [THREE.Vector3, THREE.Vector3][]
) => {
  const arrow1Line = new THREE.BufferGeometry().setFromPoints(vectors[0]);
  const arrow2Line = new THREE.BufferGeometry().setFromPoints(vectors[1]);

  const arrowLines = [
    new THREE.Line(arrow1Line, material),
    new THREE.Line(arrow2Line, material),
  ];

  scene.add(...arrowLines);
};

export const renderLines = (scene: THREE.Scene, chartSetup: IChartSetup) => {
  renderLine(scene, [
    new THREE.Vector3(-4, -1, 0),
    new THREE.Vector3(10, -1, 0),
  ]);
  renderLine(scene, [
    new THREE.Vector3(-3, -2, 0),
    new THREE.Vector3(-3, 10, 0),
  ]);

  const xArrow1Points = [
    new THREE.Vector3(9.6, -0.5, 0),
    new THREE.Vector3(10, -1, 0),
  ];

  const xArrow2Points = [
    new THREE.Vector3(10, -1, 0),
    new THREE.Vector3(9.6, -1.5, 0),
  ];

  renderArrow(scene, [xArrow1Points, xArrow2Points] as [
    THREE.Vector3,
    THREE.Vector3
  ][]);

  const yArrow1Points = [
    new THREE.Vector3(-2.5, 9.6, 0),
    new THREE.Vector3(-3, 10, 0),
  ];

  const yArrow2Points = [
    new THREE.Vector3(-3, 10, 0),
    new THREE.Vector3(-3.5, 9.6, 0),
  ];

  renderArrow(scene, [yArrow1Points, yArrow2Points] as [
    THREE.Vector3,
    THREE.Vector3
  ][]);

  renderXScale(scene, chartSetup);
  renderYScale(scene, chartSetup);
};

export const renderXScale = (scene: THREE.Scene, chartSetup: IChartSetup) => {
  const minScaled = _scale(
    chartSetup.xAxis.min,
    [chartSetup.xAxis.min, chartSetup.xAxis.max],
    [-3, 9.5]
  );

  const maxScaled = _scale(
    chartSetup.xAxis.max,
    [chartSetup.xAxis.min, chartSetup.xAxis.max],
    [1, 12.5]
  );

  const stepScaled = _scale(
    chartSetup.xStep,
    [chartSetup.xAxis.min, chartSetup.xAxis.max],
    [1, 12.5]
  );

  const scale = Enumerable.range(minScaled, maxScaled, stepScaled).select(
    (elem: number, index: number) => {
      const linePoints = [
        new THREE.Vector3(elem, -0.8, 0),
        new THREE.Vector3(elem, -1.2, 0),
      ];

      const line = new THREE.BufferGeometry().setFromPoints(linePoints);

      if (index) {
        renderLineLabel(scene, `${index * chartSetup.xStep}`, {
          x: elem - 0.05,
          y: -0.75,
        });
      }

      return new THREE.Line(line, material);
    }
  );

  scene.add(...scale);
};

export const renderYScale = (scene: THREE.Scene, chartSetup: IChartSetup) => {
  let minScaled = _scaleFloat(
    chartSetup.yAxis.min,
    [chartSetup.yAxis.min, chartSetup.yAxis.max],
    [0, 100]
  );

  const maxScaled = _scaleFloat(
    chartSetup.yAxis.max,
    [chartSetup.yAxis.min, chartSetup.yAxis.max],
    [0, 100]
  );

  const stepScaled = _scaleFloat(
    chartSetup.yStep,
    [chartSetup.yAxis.min, chartSetup.yAxis.max],
    [0, 10]
  );

  const numberOfScales = chartSetup.yStep / stepScaled;

  const scale: THREE.Line[] = [];

  let index = 0;

  while (minScaled < maxScaled && index < numberOfScales) {
    const linePoints = [
      new THREE.Vector3(-3.5, minScaled, 0),
      new THREE.Vector3(10, minScaled, 0),
    ];

    const line = new THREE.BufferGeometry().setFromPoints(linePoints);

    renderLineLabel(scene, `${(index + 1) * chartSetup.yStep}`, {
      x: -3,
      y: minScaled - 0.25,
    });

    scale.push(new THREE.Line(line, material));
    index++;
    minScaled += stepScaled;
  }

  scene.add(...scale);
};

const renderLineLabel = async (
  scene: THREE.Scene,
  value: string,
  position: {
    x: number;
    y: number;
  }
) => {
  const testTextMesh = await renderText(value, material);

  testTextMesh.position.x = position.x;
  testTextMesh.position.y = position.y;

  scene.add(testTextMesh);
};
