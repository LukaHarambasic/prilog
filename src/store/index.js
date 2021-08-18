import { defineStore } from 'pinia'
import { TYPES as RAW_TYPES } from '@/assets/js/consts/types'
import { sb } from '@/assets/js/supabase'

export const useMainStore = defineStore('main', {
  state: () => ({
    logs: [],
    types: RAW_TYPES,
  }),
  getters: {
    logById(state) {
      if(state.logs === []) return {}
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
    }
  }
})
