<template>
  <LineChart class="chart" :chartData="testData" />
</template>

<script>
import { defineComponent } from "vue";
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default defineComponent({
  name: "Home",
  components: { LineChart },
  props: ["label", "name", "daos"],
  setup(prop) {
    const dataResult = [];
    const labelResult = [];
    prop.daos.forEach((dao) => {
      labelResult.push(dao.updateTime);
      dao.pages.forEach((page) => {
        if (page.name === prop.name) {
          page.results.forEach((result) => {
            if (result.title.includes(prop.label)) {
              dataResult.push(
                Number(
                  result.value
                    .replace("$", "")
                    .replace("%", "")
                    .replace(/,/g, "")
                )
              );
            }
          });
        }
      });
    });

    const testData = {
      labels: labelResult.map((res) => {
        const date = new Date(res);
        return date.toISOString().replace("T", " ");
      }),
      datasets: [
        {
          label: prop.label,
          data: dataResult,
          showLine: false,
          fill: true,
          tension: 0.3,
        },
      ],
      options: {
        scales: {
          y: {
            ticks: {
              callback: function (value) {
                console.log(value);
                return "$" + value;
              },
              color: "white",
            },
          },
        },
      },
    };

    return { testData };
  },
});
</script>

<style>
.chart {
  width: 100%;
  height: 250px;
}
</style>
