import { Color } from "three";
import { ChartType, IValues } from "./Types";
import { initCharts } from "./init";
import { valueMaterial } from "./renderers";

let values: IValues[] = [
  { x: 1000, y: 20 },
  { x: 3000, y: 50 },
  { x: 5000, y: 10 },
  { x: 7500, y: 10 },
];

const chartSetup = {
  xAxis: {
    min: 0,
    max: 10000,
  },
  yAxis: {
    min: 0,
    max: 100,
  },
  xStep: 1000,
  yStep: 10,
  type: ChartType.LINE,
  color: "0xffffff",
};

initCharts(values, chartSetup)
  .then(() => {
    console.log("Initialization finished");
  })
  .catch((err) => {
    console.error(err);
  });

document
  .querySelector("#chart-type")
  ?.addEventListener("change", async (e: Event) => {
    const target = e.target as HTMLSelectElement;
    chartSetup.type = parseInt(target.value) as ChartType;

    await initCharts(values, chartSetup);
  });

document
  .querySelector("#material-color")
  ?.addEventListener("change", async (e: Event) => {
    const target = e.target as HTMLInputElement;
    chartSetup.color = target.value;

    valueMaterial.color = new Color(chartSetup.color);

    await initCharts(values, chartSetup);
  });

document
  .querySelector("#generate-btn")
  ?.addEventListener("click", async (_) => {
    const maxY = document.querySelector("#y-value")!;
    const maxX = document.querySelector("#x-value")!;

    const maxYValue = parseInt((maxY as HTMLInputElement).value);
    const maxXValue = parseInt((maxX as HTMLInputElement).value);

    const valsNum = Math.floor(Math.random() * 10) + 4;

    let vals: IValues[] = [];

    for (let i = 0; i < valsNum; i++) {
      vals.push({
        x: Math.floor(Math.random() * maxXValue),
        y: Math.floor(Math.random() * maxYValue),
      });
    }

    values = vals;

    await initCharts(values, chartSetup);
  });
