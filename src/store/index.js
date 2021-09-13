import { defineStore } from 'pinia'
import { ENTRY_TYPES, MESSAGE_TYPES } from '@/assets/js/consts/types'
import { sb } from '@/assets/js/supabase'

export const useMainStore = defineStore('main', {
  state: () => ({
    logs: [],
    entryTypes: ENTRY_TYPES,
    messageTypes: MESSAGE_TYPES,
    messages: [],
    user: null
  }),
  getters: {
    logById (state) {
      if (state.logs === []) return {}
      return state.logs.find(log => log.id === '19a226b2-4754-4d4c-bf8c-a7d867e82245')
    }
  },
  actions: {
    async fetchLogs () {
      const { data, error } = await sb
        .from('logs')
        .select(`
          *,
          log_entries (
            *
          )
        `)
      if (error) {
        console.error('ERROR', error)
      } else {
        this.logs = data
      }
    },
    sendMessage (title, description, type) {
      const id = Date.now().toString() + (Math.floor(Math.random() * 100)).toString()
      this.messages.push({
        id,
        title,
        description,
        type
      })
      setTimeout(() => {
        const index = this.messages.findIndex(message => message.id === id)
        this.messages.splice(index, 1)
      }, 5000)
    },
    removeMessage (id) {
      const index = this.messages.findIndex(message => message.id === id)
      this.messages.splice(index, 1)
    },
    setUser () {
      if (this.user === null) this.user = null
      this.user = sb.auth.user()
    }
  }
})
