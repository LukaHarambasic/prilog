<template>
  <LogsDetailsEntryWrapper
    :title="title"
    :location="location"
    :chronological="chronological"
  >
    <div class="video">
      <video
        width="400"
        controls
      >
        <source
          :src="video"
          type="video/mp4"
        >
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
const { entry: { value } } = toRefs(props)
const title = ref(value.title)
const location = ref(value.location)
const chronological = ref(value.chronological)
const video = ref(value.file_path)
</script>

<style lang="sass" scoped>

</style>
