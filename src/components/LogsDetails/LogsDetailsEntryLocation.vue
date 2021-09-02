<template>
  <LogsDetailsEntryWrapper
    :title="title"
    :location="location"
    :chronological="chronological"
  >
    <div
      id="map"
      class="map"
    />
  </LogsDetailsEntryWrapper>
</template>

<script setup>
import { ref, defineProps, toRefs, onMounted } from 'vue'
import LogsDetailsEntryWrapper from '@/components/LogsDetails/LogsDetailsEntryWrapper.vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
import View from 'ol/View'
import { fromLonLat } from 'ol/proj'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
// Props
const props = defineProps({
  entry: {
    type: Object,
    required: true
  }
})
const { entry: { value } } = toRefs(props)

const title = ref(value.title)
const location = ref(value.location)
const chronological = ref(value.chronological)
const coordinates = ref(value.coordinates)

onMounted(() => {
  if (coordinates.value === null) return
  const longitude = parseFloat(coordinates.value.longitude)
  const latitude = parseFloat(coordinates.value.latitude)
  const map = new Map({
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    target: 'map',
    view: new View({
      center: fromLonLat([longitude, latitude]),
      zoom: 15
    })
  })
  const layer = new VectorLayer({
    source: new VectorSource({
      features: [
        new Feature({
          geometry: new Point(fromLonLat([longitude, latitude]))
        })
      ]
    })
  })
  map.addLayer(layer)
})
</script>

<style lang="sass" scoped>
.map
  width: 100%
  height: 400px
</style>
