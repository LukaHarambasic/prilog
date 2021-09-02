<template>
  <LogsDetailsEntryWrapper
    :title="title"
    :location="location"
    :chronological="chronological"
  >
    <div class="video">
      <video
        controls
      >
        <source
          :src="video"
          :type="type"
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
const { entry } = toRefs(props)
const title = ref(entry.value.title)
const location = ref(entry.value.location)
const chronological = ref(entry.value.chronological)
const video = ref(entry.value.file_path)
const type = ref(entry.value.file_type)

console.log(type.value)
</script>

<style lang="sass" scoped>
video
  width: 100%
  max-height: 100%
</style>
