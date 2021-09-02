<template>
  <Teleport to="#teleport">
    <ul class="messages">
      <li
        v-for="message in store.messages"
        :key="message.id"
        class="message"
      >
        <button
          class="remove"
          @click.prevent="store.removeMessage(message.id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          ><path
            d="M0 0h24v24H0V0z"
            fill="none"
            opacity=".87"
          /><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z" /></svg>
        </button>
        <div class="title">
          {{ message.title }}
        </div>
        <div class="description">
          {{ message.description }}
        </div>
      </li>
    </ul>
  </Teleport>
</template>

<script setup>
import { useMainStore } from '@/store'

const store = useMainStore()

</script>

<style lang="sass" scoped>
.messages
  margin: 0 1rem 1rem 0
  list-style: none
  padding: 0
  .message
    display: flex
    flex-direction: column
    flex-wrap: nowrap
    justify-content: flex-start
    align-items: flex-start
    padding: .5rem .5rem 1rem 1rem
    margin: 0 0 1rem 0
    background: #250856
    border-radius: .25rem
    color: #ffffff
    .remove
      align-self: flex-end
      margin: 0 0 .5rem 0
      border: none
      background: none
      transition: all 150ms ease-in-out
      &:hover
        transform: scale(1.1)
        cursor: pointer
      svg
        width: 2rem
        height: 2rem
        fill: #ffffff
    .title
      font-weight: bold
      margin: 0 0 .5rem 0
</style>
