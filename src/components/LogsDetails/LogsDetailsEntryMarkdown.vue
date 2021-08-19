<template>
  <LogsDetailsEntryVideo :title="title" :location="location" :chronological="chronological">
    <div class="markdown">
<!--      TODO security issue-->
      <div v-html="html" />
    </div>
  </LogsDetailsEntryVideo>
</template>

<script setup>
import { ref, defineProps, toRefs } from 'vue'
import { markdownToHTML } from '@/assets/js/markdown'
import LogsDetailsEntryWrapper from '@/components/LogsDetails/LogsDetailsEntryWrapper.vue'

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
const html = ref(markdownToHTML(value.markdown))

</script>

<style lang="sass" scoped>

</style>