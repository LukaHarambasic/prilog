<template>
  <section>
    <h2>Location</h2>
    <form>
      <div class="field">
        <label for="title">Title</label>
        <input
          id="title"
          v-model="title"
          type="text"
          name="title"
        >
      </div>
      <div class="field">
        <label for="chronological">When did this happen?</label>
        <input
          id="chronological"
          v-model="chronological"
          type="datetime-local"
          name="chronological"
        >
      </div>
      <div class="field">
        <label for="location">Give me a location!</label>
        <input
          id="location"
          v-model.lazy="locationSearch"
          type="text"
          name="location"
        >
      </div>
      <div class="field">
        {{ locationResult.display_name }}
      </div>
      <div class="field">
        <input
          :disabled="!isValid"
          type="submit"
          value="Submit"
          @click.prevent="onCreate()"
        >
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, defineProps, toRefs, computed, watch } from 'vue'
import { sb } from '@/assets/js/supabase'
import axios from 'axios'

// Props
const props = defineProps({
  logId: {
    type: String,
    required: true
  }
})
const { logId } = toRefs(props)

// Form: Fields
const title = ref('')
const chronological = ref('')
const locationSearch = ref('')
const locationResult = ref('')
const coordinates = ref({ lng: 0, lat: 0 })

watch(locationSearch, async (location, _) => {
  if (locationSearch.value.length < 2) return
  const { data } = await axios.get(`https://nominatim.openstreetmap.org/search?q=${locationSearch.value}&format=json`)
  locationResult.value = data.reduce((prev, current) => (prev.importance > current.importance) ? prev : current)
  coordinates.value = { longitude: locationResult.value.lon, latitude: locationResult.value.lat }
})

// Form: Create new log entry
async function onCreate () {
  // store
  const { data, error } = await sb
    .from('log_entries')
    .insert([
      {
        type: 3,
        title: title.value,
        chronological: chronological.value,
        coordinates: coordinates.value,
        logs_id: logId.value
      }
    ])
  // TODO messages
  if (error) {
    console.log('ERROR')
    console.log(error)
  } else {
    console.log(data)
  }
}

// Form: Validation
const isValid = computed(() => !!logId.value && !!title.value && !!chronological.value && !!coordinates.value.latitude && !!coordinates.value.longitude)

</script>

<style lang="sass" scoped>
</style>
