import { defineStore } from 'pinia'
// import { logs } from '../../test/mock/logs.mock'

// main is the name of the store. It is unique across your application
// and will appear in devtools
export const useMainStore = defineStore('main', {
  // a function that returns a fresh state
  state: () => ({
    logs: []
  }),
  // optional getters
  getters: {
    logsEntitiesById (id) {
      return this.logs.find(log => log.id === id)
    }
  },
  // optional actions
  actions: {
  }
})
