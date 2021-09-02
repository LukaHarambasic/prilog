<template>
  <section>
    <button @click="login()">
      LOGIN
    </button>
    <ul
      v-if="store.logs"
      class="logs"
    >
      <li
        v-for="log in store.logs"
        :key="log.id"
      >
        <router-link
          class="log"
          :to="`/logs/${log.id}`"
        >
          <div class="title">
            {{ log.title }}
          </div>
          <p class="description">
            {{ log.description }}
          </p>
        </router-link>
      </li>
    </ul>
    <div v-else>
      No logs found O.o
    </div>
  </section>
</template>

<script setup>
import { useMainStore } from '@/store'
import { onMounted } from 'vue'
import { sb } from '@/assets/js/supabase'

const store = useMainStore()

onMounted(async () => {
  await store.fetchLogs()
  console.log(sb.auth.user())
})

async function login () {
  const { user, session, error } = await sb.auth.signIn({
    provider: 'google'
  })
  console.log(user)
  console.log(session)
  console.error(error)
}
</script>

<style lang="sass" scoped>
.logs
  list-style: none
  padding: 0
  margin: 0
  .log
    padding: 2rem
    background: #f5f5f5
    border-radius: .25rem
    display: block
    margin: 0 0 2rem 0
    border: none
    &:hover
      transform: scale(1.03)
      color: #ffffff
      background: #250856
    .title
      font-size: 1.2rem
      margin: 0 0 .5rem 0
      font-weight: bold
</style>
