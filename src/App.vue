<template>
  <header>
    <h1>prilog</h1>
    <nav>
      <ul>
        <li>
          <router-link to="/admin/create/log">
            Create Log
          </router-link>
        </li>
        <li>
          <router-link to="/admin/create/entry">
            Create Entry
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script setup>
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
// import { useMainStore } from '@/store'
//
// const store = useMainStore()
//
// const counter = store.counter
//
// console.log(counter)
</script>

<style lang="sass">
#app
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
</style>
