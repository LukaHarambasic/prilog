<template>
  <LogsDetailsEntryVideo :title="title" :location="location" :chronological="chronological">
    <div class="image">
      <img :alt="alt" :src="src" />
    </div>
  </LogsDetailsEntryVideo>
</template>

<script setup>
import { ref, defineProps, toRefs } from 'vue'
import LogsDetailsEntryWrapper from '@/components/LogsDetails/LogsDetailsEntryWrapper.vue'

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
const src = ref(entry.value.file_path)
const alt = ref(entry.value.file_alt)
</script>

<style lang="sass" scoped>

</style>