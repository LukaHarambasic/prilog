<template>
  <div class="container">
    <header>
      <h1>
        <router-link to="/">
          prilog.
        </router-link>
      </h1>
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
    <footer>
      <small>
        <router-link to="/">
          prilog.
        </router-link>
      </small>
    </footer>
  </div>
  <LayoutMessages />
</template>

<script setup>
import LayoutMessages from '@/components/Layout/LayoutMessages.vue'

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
  nav
    ul
      list-style: none
      margin: 0
      padding: 0
      li
        margin: 0 0 .25rem 0
main
  margin: 0 0 2rem 0
footer
  text-align: center
#teleport
  position: fixed
  bottom: 0
  right: 0
  z-index: 1000
</style>
