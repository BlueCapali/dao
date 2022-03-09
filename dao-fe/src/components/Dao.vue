<template>
  <div id="dao-container">
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else>
      <div class="pages" v-for="dao in lastDao" :key="dao.updateTime">
        <div class="page" v-for="(page, index) in dao.pages" :key="index">
          {{ page.name.toUpperCase() }}
          <div class="data">
            <template v-for="(result, index) in page.results">
              <Chart
                class="chart"
                v-if="result.title.includes('APY')"
                :key="index + '-apy'"
                :daos="daos"
                :name="page.name"
                label="APY"
              />
              <Chart
                class="chart"
                v-if="result.title.includes('Price')"
                :key="index + '-price'"
                :daos="daos"
                :name="page.name"
                label="Price"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import Chart from "./Chart.vue";

export default {
  name: "Dao",
  components: {
    Chart,
  },
  apollo: {
    daos: gql`
      query {
        daos {
          updateTime
          pages {
            name
            results {
              title
              value
            }
          }
        }
      }
    `,
    lastDao: gql`
      query {
        lastDao {
          updateTime
          pages {
            name
            results {
              title
              value
            }
          }
        }
      }
    `,
  },
};
</script>

<style>
body,
html {
  height: auto;
  margin: 0;
  padding: 0;
  background-image: linear-gradient(
    to bottom right,
    rgb(181, 211, 240),
    rgb(255, 255, 255)
  );
  font-family: "Ubuntu", sans-serif;
}

#dao-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.pages {
  display: flex;
  flex-direction: column;
  height: max-content;
  width: 80vw;
  align-items: center;
}

.page {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin: 10px;
  align-items: center;
  justify-content: center;
}

.data {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px;
  align-items: center;
  border-radius: 20px;
  background-color: rgba(64, 100, 134, 0.062);
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  font-weight: 300;
}

.chart {
  width: 80%;
  margin: 40px;
}
</style>
