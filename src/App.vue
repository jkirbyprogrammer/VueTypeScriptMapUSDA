<script lang="ts">
  import { ref } from 'vue';
  import Dashboard from './components/Dashboard.vue'

  export default {
    components: {
      Dashboard,
    },
    setup() {
      const componentKey = ref(0); // Initialize a key for the child component
      const type = ref('ussec'); // Type prop for Dashboard
      const year = ref('2024'); // Year prop for Dashboard

      const reloadData = () => {
        // Update the prop value
        type.value = 'pres';
        year.value = '2025';
        // Increment the key to force re-render of ChildComponent
        componentKey.value++;
      };

      return {
        componentKey,
        type,
        year,
        reloadData,
      };
    },
  };
</script>

<template>
  <header>
    <div>
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
          <button @click="reloadData">Change Data Test</button>
        </div>
      </div>
      <div class="centered-container">
        <div>
          <p>TO DO: Add year options here to toggle map data here...</p>
        </div>
      </div>
      <div>
        <Dashboard :typeProp="type" :yearProp="year" :key="componentKey" />
      </div>
      <div>
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
    </div>
  </header>
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

