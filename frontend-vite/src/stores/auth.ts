import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface UserData {
  email: string
  full_name: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserData | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const users = ref<Map<string, { full_name: string; password: string }>>(new Map())

  const isAuthenticated = computed(() => !!token.value)

  const login = async (email: string, password: string) => {
    // Mock login - check against stored users
    const storedUser = users.value.get(email)
    
    if (email === 'demo@example.com' && password === 'password123') {
      token.value = `token_${Date.now()}`
      user.value = { email, full_name: 'Demo User' }
      localStorage.setItem('auth_token', token.value)
      return true
    }
    
    if (storedUser && storedUser.password === password) {
      token.value = `token_${Date.now()}`
      user.value = { email, full_name: storedUser.full_name }
      localStorage.setItem('auth_token', token.value)
      return true
    }
    
    return false
  }

  const signup = async (email: string, full_name: string, password: string) => {
    // Check if email already exists
    if (users.value.has(email) || email === 'demo@example.com') {
      return false
    }

    // Mock signup - store user in memory
    users.value.set(email, { full_name, password })
    
    // Automatically log in after signup
    token.value = `token_${Date.now()}`
    user.value = { email, full_name }
    localStorage.setItem('auth_token', token.value)
    
    return true
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

  return { user, token, isAuthenticated, login, signup, logout, initializeAuth }
})
