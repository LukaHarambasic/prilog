<template>
  <section>
    <h2>image</h2>
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
        <label for="location">Where did this happen?</label>
        <input
            id="location"
            v-model="location"
            type="text"
            name="location"
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
        <label for="alt">Alternative text for the image?</label>
        <input
            id="alt"
            v-model="alt"
            type="text"
            name="alt"
        >
      </div>
      <div class="field" v-show="!uploading">
        <label for="image">What image do you want to share?</label>
        <input
            id="image"
            name="image"
            type="file"
            @change="onUpload($event)"
            accept="image/*"
        >
      </div>
      <!-- TODO should be an overlay to avoid jumping -->
      <div class="field" v-show="uploading">Uploading...</div>
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
import { ref, defineProps, toRefs, computed } from 'vue'
import { useMainStore } from '@/store'
import { sb } from '@/assets/js/supabase'

const store = useMainStore()

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
const location = ref('')
const chronological = ref('')
const alt = ref('')

const uploading = ref(false)
const path = ref(null)

// Form: Upload image
async function onUpload (evt) {
  // TODO action in store
  // TODO make reusable for video
  try {
    uploading.value = true
    const file = evt.target.files[0]
    if (!file) {
      throw new Error("You must select an image to upload.")
    }
    const fileName = file.name.split(".")[0].replace(' ', '').toLowerCase()
    const fileExt = file.name.split(".")[1]
    const filePath = `${fileName}-${Date.now()}.${fileExt}`
    let { data, error: uploadError } = await sb.storage
        .from('media')
        .upload(filePath, file)
    if (uploadError) throw uploadError
    const key = data.Key
    const { publicURL, error: publicUrlError } = sb
        .storage
        .from('public-bucket')
        .getPublicUrl(key)
    path.value = publicURL
  } catch (error) {
    // TODO show error message
    console.error(error.message)
  } finally {
    uploading.value = false
  }
}

async function onCreate () {
  // todo store
  const { data, error } = await sb
      .from('log_entries')
      .insert([
        {
          type: store.types.IMAGE.id,
          title: title.value,
          location: location.value,
          chronological: chronological.value,
          file_path: path.value,
          file_alt: alt.value,
          logs_id: logId.value
        }
      ])
  if (error) {
    console.log('ERROR')
    console.log(error)
  } else {
    console.log(data)
  }
}

// Form: Validation
const isValid = computed(() => !!logId.value && !!title.value && !!location.value && !!chronological.value && !!path.value)

</script>

<style lang="sass" scoped>
</style>
