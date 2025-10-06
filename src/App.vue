<script lang="ts">
  import { ref } from 'vue';
  import Dashboard from './components/Dashboard.vue'

  export default {
    components: {
      Dashboard,
    },
    setup() {
      const componentKey = ref(0); // Initialize a key for the child component
      var type = ref('ussec'); // Default to 'ussec'
      var year = ref('2025'); // Default to '2025'

      const reloadData = (typeSelected: string) => {
        type.value = typeSelected;
        componentKey.value++;
      };
      const reloadYear = (yearSelected: string) => {
        year.value = yearSelected;
        componentKey.value++;
      };

      return {
        componentKey,
        type,
        year,
        reloadData,
        reloadYear
      };
    },
  };
</script>

<template>
    <div class="mainDiv">
      <div class="centered-container">
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="50" height="50" />
      </div>
      <div class="centered-container">
        <div>
          <h3>Interactive map using crop, disaster designation, and USFS fire occurance data from USDA at the state/county level.</h3>
        </div>
      </div>
      <div class="centered-container">
        <div>
          <button :class="{'btn-selected': type === 'ussec', 'btn-notselected': type === 'pres'}" @click="reloadData('ussec')">US Secretary of Ag</button>
          <button :class="{'btn-selected': type === 'pres', 'btn-notselected': type === 'ussec'}" @click="reloadData('pres')">Presidential Declarations</button>
        </div>
      </div>
      <div class="centered-container">
        <div>
          <a :class="{'year-link-selected': year === '2021', 'year-link': year != '2021'}" @click="reloadYear('2021')">2021</a>
          <a :class="{'year-link-selected': year === '2022', 'year-link': year != '2022'}" @click="reloadYear('2022')">2022</a>
          <a :class="{'year-link-selected': year === '2023', 'year-link': year != '2023'}" @click="reloadYear('2023')">2023</a>
          <a :class="{'year-link-selected': year === '2024', 'year-link': year != '2024'}" @click="reloadYear('2024')">2024</a>
          <a :class="{'year-link-selected': year === '2025', 'year-link': year != '2025'}" @click="reloadYear('2025')">2025</a>
        </div>
      </div>
      <div>
        <Dashboard :typeProp="type" :yearProp="year" :key="componentKey" />
      </div>

      <div class="left-list">
        <ul>
          <li>Use the layer option to toggle between state/county level details or change the base layer.</li>
          <li>Use Presidential Emergency Declarations/US Secretary of Ag buttons to toggle data in map.</li>
          <li>Click on the states/counties to see details. <b>Note:</b> Defaults to county as the primary layer, use layer option to toggle.</li>
          <li>Use the year links to update the map year data set.</li>
          <li>Points represent ignition or origin from which the individual USFS wildland fires started by year. <b>Note:</b> Until full dataset is out for year 2025, the 2024 data will show when 2025 year is selected. </li>
          <li>
            Data sources used to create GeoJson for map:
            <ul>
              <li>
                <a target="_blank" href="https://www.fsa.usda.gov/resources/disaster-assistance-program/disaster-designation-information">
                  USDA Disaster Designation Information
                </a>
              </li>
              <li>
                <a target="_blank" href="https://quickstats.nass.usda.gov/">
                  USDA Quick Stats Census
                </a>
              </li>
              <li>
                <a target="_blank" href="https://catalog.data.gov/dataset/national-usfs-fire-occurrence-point-feature-layer-d3233">
                  National USFS Fire Occurrence Point
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

  
</template>

<style scoped>
  header {
    line-height: 1.5;
  }

  .logo {
    display: block;
    margin: 0 auto 2rem;
  }

  @media (min-width: 1024px) {
    header {
      display: flex;
      place-items: center;
      padding-right: 0;
    }

    .logo {
      margin: 0 2rem 0 0;
    }

    header .wrapper {
      display: flex;
      place-items: center;
      flex-wrap: wrap;
    }
  }
</style>

