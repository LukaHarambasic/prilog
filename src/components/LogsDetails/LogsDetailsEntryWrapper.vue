<template>
  <div class="wrapper">
    <h3 class="title" v-if="title">{{ title }}</h3>
    <div class="meta">
      <div class="location" v-if="location">{{ location }}</div>
      <time class="chronological" v-if="chronological">{{ chronologicalFormatted }}</time>
    </div>
    <slot />
  </div>
</template>

<script setup>
import { format, formatRelative, differenceInDays } from 'date-fns'
import { computed } from 'vue'
import { defineProps, toRefs } from 'vue'

// Props
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  chronological: {
    type: String,
    default: ''
  }
})
const { title, location, chronological } = toRefs(props)

const chronologicalFormatted = computed(() => {
  const nowDate = new Date()
  const entryDate = new Date(chronological.value)
  // const diff = differenceInDays(nowDate, entryDate)
  // if (diff > 6) {
  //   return format(entryDate, 'dd.MM.yyyy')
  // }
  return formatRelative(
      entryDate,
      nowDate,
  )
})
</script>

<style lang="sass" scoped>
.title
  margin: 0 0 .5rem 0
.meta
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: space-between
  align-content: stretch
  align-items: flex-start
  margin: 0 0 1rem 0
  font-size: .9rem
  font-style: italic
</style>