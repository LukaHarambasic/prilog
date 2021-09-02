<template>
  <section>
    <h1>Create new log</h1>
    <form>
      <div class="field">
        <label for="title">We need a fancy title!</label>
        <input
          id="title"
          v-model="title"
          type="text"
          name="title"
        >
      </div>
      <div class="field">
        <label for="description">What is the log about?</label>
        <input
          id="description"
          v-model="description"
          type="text"
          name="description"
        >
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
// Form: Create new log entry
import { sb } from '@/assets/js/supabase'
import { computed, ref } from 'vue'
import { useMainStore } from '@/store'

const store = useMainStore()

// Form: Fields
const title = ref('')
const description = ref('')

function getRandomColor() {
  // https://dev.to/akhil_001/generating-random-color-with-single-line-of-js-code-fhj
  return '#' + Math.floor(Math.random()*16777215).toString(16)
}

async function onCreate () {
  // store
  const { data, error } = await sb
    .from('logs')
    .insert([
      {
        title: title.value,
        description: description.value,
        color: getRandomColor()
      }
    ])
  if (error) {
    console.log('ERROR')
    console.log(error)
  } else {
    store.sendMessage(
        'New Log created!',
        `Congratulations you created the log "${title.value}". Have fun!`,
        store.messageTypes.SUCCESS.id
    )
    title.value = ''
    description.value = ''
  }
}

const isValid = computed(() => !!title.value && !!description.value)

</script>

<style lang="sass" scoped>

</style>
