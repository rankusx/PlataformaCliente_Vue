import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as string | null,
    token: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    login(username: string, token: string) {
      this.user = username
      this.token = token
    },
    logout() {
      this.user = null
      this.token = null
    },
  },
})