<template>
  <div class="map-container">
    <l-map :useGlobalLeaflet="false" ref="map" v-model:zoom="zoom" :center="[37.8, -96]">
      <l-tile-layer url="https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'"
                    layer-type="base"
                    name="World Light Grey Base">
      </l-tile-layer>
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    layer-type="base"
                    name="Open Street Map Base">
      </l-tile-layer>
      <l-tile-layer url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'"
                    layer-type="base"
                    name="World Imagery Base">
      </l-tile-layer>
      <l-layer-group ref="geoJsonLayer" layer-type="overlay" name="State Layer">
        <l-geo-json :geojson="geojsonstate" :options-style="geoStateStyler" :options="geojsonStateOptions" />
      </l-layer-group>
      <l-layer-group ref="geoJsonLayer2" layer-type="overlay" name="County Layer">
        <l-geo-json :geojson="geojsoncounty" :options-style="geoCountyStyler" :options="geojsonCountyOptions"></l-geo-json>
      </l-layer-group>
      <l-layer-group ref="geoJsonLayer3" layer-type="overlay" name="Fire Points Layer">
        <l-geo-json :geojson="geojsonfire" :options="geojsonFireOptions"></l-geo-json>
      </l-layer-group>
      <l-control class="leaflet-control" position="bottomleft">
        <div class="leaflet-control leaflet-title">
          <b>State Declarations</b>
        </div>
        <div class="leaflet-control leaflet-bar">
          <div class="bg-green-1">1 - 9</div>
        </div>
        <div class="leaflet-control leaflet-bar">
          <div class="bg-green-2">9 - 19</div>
        </div>
        <div class="leaflet-control leaflet-bar">
          <div class="bg-green-3">20 - 29</div>
        </div>
        <div class="leaflet-control leaflet-bar">
          <div class="bg-green-4">30+</div>
        </div>
        <div class="leaflet-control leaflet-title">
          <b>County Declarations</b>
        </div>
        <div class="leaflet-control leaflet-bar">
          <div class="bg-red">Crop Data</div>
        </div>
        <div class="leaflet-control leaflet-bar">
          <div class="bg-blue">No Crop Data</div>
        </div>
        <div class="leaflet-title leaflet-control fire-point">
          <div>
            <div class="circle">
              <span style="margin-left:20px;">USFS</span>
              <span style="margin-left:5px;">Fire</span>
              <span style="margin-left:5px;">Origins</span>
            </div>
          </div>
        </div>
      </l-control>
      <l-control-layers />
    </l-map>
  </div>
</template>

<script>

  import "leaflet/dist/leaflet.css"
  import { LGeoJson, LMap, LTileLayer, LPopup, LControlLayers, LLayerGroup, LControl } from "@vue-leaflet/vue-leaflet";
  const { circleMarker } = await import("leaflet/dist/leaflet-src.esm");

  export default {
    components: {
      LMap,
      LTileLayer,
      LGeoJson,
      LPopup,
      LControlLayers,
      LLayerGroup,
      LControl
    },
    props: {
      typeProp: {
        type: String,
        required: true
      },
      yearProp: {
        type: String,
        required: true
      }
    },
    methods: {
      onEachStateFeature(feature, layer) {
        if (feature.properties) {
          var props = feature.properties;
          layer.bindPopup(`
        <div>
          <h3>${props.name}</h3>
          <div><b>Total Emergency Declarations: </b>${props.TotalPresDecs}</div>
          <div><b>Declared Disasters: </b>${props.ListOfDisasters}</div>
        </div>`);
        }
        else {
          layer.bindPopup('No Feature Properties yet')
        }
      },
      onEachCountyeature(feature, layer) {
        if (feature.properties) {
          var props = feature.properties;
          layer.bindPopup(`
        <div>
          <h3>${props.name}</h3>
          <div><b>Total Emergency Declarations: </b>${props.TotalPresDecs}</div>
          <div><b>Declared Disasters: </b>${props.ListOfDisasters}</div>
          <div><b>Total crop production types: </b>${props.DecsWithCrops}</div>
          <div><b>Crop Details: </b>${props.CropDetailList}</div>
        </div>`);
        }
        else {
          layer.bindPopup('No Feature Properties yet')
        }
      }
    },
    data() {
      return {
        zoom: 4,
        geojsonstate: undefined,
        geojsonfire: undefined,
        geojsoncounty: undefined,
        geoStateStyler: (feature) => ({
          fillColor: getColor(feature.properties.TotalPresDecs),
          weight: 2,
          opacity: 1,
          color: 'white',
          fillOpacity: 0.7
        }),
        geoCountyStyler: (feature) => ({
          fillColor: getColorCounty(feature.properties.TotalPresDecs, feature.properties.DecsWithCrops),
          weight: .6,
          opacity: .5,
          color: "black",
          fillOpacity: 0.7
        }),
        geojsonStateOptions: {
          onEachFeature: this.onEachStateFeature,
        },
        geojsonCountyOptions: {
          onEachFeature: this.onEachCountyeature,
        },
        geojsonFireOptions: {
          pointToLayer: (feature, latlng) => {
            return circleMarker(latlng, {
              radius: 7,
              fillColor: feature.properties ? "#FDA50F" : "red",
              color: "#000",
              weight: 1,
              opacity: 1,
              fillOpacity: 0.8
            });
          },
          onEachFeature(feature, layer) {
            if (feature.properties) {
              var props = feature.properties;
              layer.bindPopup(`
            <div>
              <h3>${props.FIRENAME}</h3>
              <div><b>Fire Year: </b>${props.FIREYEAR}</div>
              <div><b>Fire Discovery Date/Time: </b>${props.DISCOVERYDATETIME}</div>
              <div><b>Date Fire Was Out: </b>${props.FIREOUTDATETIME}</div>
              <div><b>Total Fire Acres: </b>${props.TOTALACRES}</div>
              <div><b>Fire Cause: </b>${props.STATCAUSE}</div>
            </div>`);
            }
            else {
              layer.bindPopup('No Feature Properties yet')
            }
          }
        }
      };
    },
    async beforeMount() {
      const year = this.yearProp;
      const type = this.typeProp;
      const fireYear = year === "2025" ? "2024" : year;

      if (type === "ussec") {
        this.geojsonstate = await GetGeoJson("assets/" + year + "StateUsSecLayer.json");
        this.geojsoncounty = await GetGeoJson("assets/" + year + "CountyUsSecLayer.json");
      }
      else {
        this.geojsonstate = await GetGeoJson("assets/" + year + "StatePresLayer.json");
        this.geojsoncounty = await GetGeoJson("assets/" + year + "CountyPresLayer.json");
      }
      this.geojsonfire = await GetGeoJson("assets/" + fireYear + "NationalUSFSFireOccurrencePoint.json");

      this.mapIsReady = true;
    },

  };

  const currentInterval = 5;
  function getColor(d) {
    return d >= (4 * currentInterval) ? '#011a08' :
      d > (3 * currentInterval) ? '#3d9137' :
        d > (2 * currentInterval) ? '#88d669' :
          (d > (1 * currentInterval) || d > 0) ? '#b2ed9a' :
            '#FFFFFF00';
  }

  function getColorCounty(totalDecs, totalDecsWithCrops) {
    return totalDecs > 0 && totalDecsWithCrops > 0 ? 'red' :
      totalDecs > 0 ? '#5E87E8' :
        '#FFFFFF00';
  }

  async function GetGeoJson(path) {
    const response = await fetch(path);
    const data = await response.json();
    return data;
  }


</script>
