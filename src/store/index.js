import { defineStore } from 'pinia'
import { TYPES as RAW_TYPES } from '@/assets/js/consts/types'
import { sb } from '@/assets/js/supabase'

export const useMainStore = defineStore('main', {
  state: () => ({
    logs: [],
    types: RAW_TYPES
  }),
  getters: {
    logById (id) {
      console.log(this.logs.value)
      return this.logs.find(log => {
        console.log('log.id', log.id)
        console.log('id', id)
        return log.id === id
      })
    },
    logsEntitiesById (id) {
      return this.logs.find(log => log.id === id)
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
