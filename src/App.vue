<template>
  <div class="container">
    <header>
      <h1>
        <router-link to="/">
          prilog.
        </router-link>
      </h1>
      <LayoutNavigation />
    </header>
    <main>
      <router-view />
    </main>
    <LayoutFooter />
  </div>
  <LayoutMessages />
</template>

<script setup>
import LayoutMessages from '@/components/Layout/LayoutMessages.vue'
import LayoutNavigation from '@/components/Layout/LayoutNavigation.vue'
import LayoutFooter from '@/components/Layout/LayoutFooter.vue'
import { useMainStore } from '@/store'
import { onMounted } from 'vue'
import { sb } from '@/assets/js/supabase'

const store = useMainStore()

onMounted(async () => {
  store.setUser()
})

sb.auth.onAuthStateChange((event, session) => {
  store.setUser()
})
</script>

<style lang="sass">
*, html
  padding: 0
  margin: 0
body
  font-family: Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
form
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  justify-content: flex-start
  align-content: stretch
  align-items: stretch
  .field
    display: flex
    flex-direction: column
    flex-wrap: nowrap
    justify-content: flex-start
    align-content: stretch
    align-items: stretch
    margin: 0 0 1rem 0
    label
      margin: 0 0 .05rem 0
      font-weight: bold
    input, textarea, select, input[type=submit]
      // TODO border radius
      border-radius: 4px
      // TODO color
      border: 1px #ccc solid
      padding: .5rem 1rem
      font-size: 1rem
      // TODO font
      font-family: Helvetica, Arial, sans-serif
      background: none
    textarea
      min-height: 5rem
    input[type=submit]
      // TODO color
      color: #fff
      background: #250856 //#E54838
      font-weight: bold
      &:disabled
        // TODO color
        color: #000
        background: #ccc
a
  color: #000000
  text-decoration: none
  border-bottom: 2px solid transparent
  transition: all 150ms ease-in-out
  &:hover
    border-color: #250856
img
  max-width: 100%
.container
  margin: 2rem
header
  text-align: center
  margin: 0 0 2rem 0
  h1
    font-size: 1.25rem
    margin: 0 0 .5rem 0
main
  margin: 0 0 2rem 0
#teleport
  position: fixed
  bottom: 0
  right: 0
  z-index: 1000
</style>
