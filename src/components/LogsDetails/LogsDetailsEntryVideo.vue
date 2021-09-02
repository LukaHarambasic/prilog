<template>
  <LogsDetailsEntryWrapper :title="title" :location="location" :chronological="chronological">
    <div class="video">
      <video width="320" height="240" controls>
        <source src="movie.mp4" type="video/mp4">
        <source src="movie.ogg" type="video/ogg">
        Your browser does not support the video tag.
      </video>
    </div>
  </LogsDetailsEntryWrapper>
</template>

<script setup>
import { ref, defineProps, toRefs } from 'vue'
import LogsDetailsEntryWrapper from '@/components/LogsDetails/LogsDetailsEntryWrapper.vue'

// make the props reusable
// Props
const props = defineProps({
  entry: {
    type: Object,
    required: true
  }
})
const { entry: {value} } = toRefs(props)
const title = ref(value.title)
const location = ref(value.location)
const chronological = ref(value.chronological)
</script>

<style lang="sass" scoped>

</style>