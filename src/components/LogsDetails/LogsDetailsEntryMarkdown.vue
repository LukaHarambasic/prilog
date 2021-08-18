<template>
  <h3>{{ title }}</h3>
  <div class="markdown">
    <div v-html="html" />
  </div>
</template>

<script setup>
import { ref, defineProps, toRefs } from 'vue'
import { markdownToHTML } from '@/assets/js/remark'

// Props
const props = defineProps({
  entry: {
    type: Object,
    required: true
  }
})
const { entry } = toRefs(props)

const title = ref(entry.value.title)
const html = ref(markdownToHTML(entry.value.markdown))

</script>

<style lang="sass" scoped>

</style>