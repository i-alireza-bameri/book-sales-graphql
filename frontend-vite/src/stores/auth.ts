import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<{ email: string } | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))

  const isAuthenticated = computed(() => !!token.value)

  const login = async (email: string, password: string) => {
    // Mock login - replace with GraphQL mutation
    if (email && password) {
      token.value = `token_${Date.now()}`
      user.value = { email }
      localStorage.setItem('auth_token', token.value)
      return true
    }
    return false
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token')
  }

  const initializeAuth = () => {
    const storedToken = localStorage.getItem('auth_token')
    if (storedToken) {
      token.value = storedToken
    }
  }

  return { user, token, isAuthenticated, login, logout, initializeAuth }
})
