import { ChartType, IValues } from "./Types";
import { initCharts } from "./init";

const values: IValues[] = [
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
