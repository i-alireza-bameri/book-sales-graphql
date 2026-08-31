import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface UserData {
  email: string
  full_name: string
}

const STORAGE_KEY = 'app_users_db'
const DEMO_USER = {
  email: 'demo@example.com',
  full_name: 'Demo User',
  password: 'password123'
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserData | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))

  // Initialize users from localStorage
  const getStoredUsers = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const data = JSON.parse(stored)
        return new Map(Object.entries(data))
      }
    } catch (e) {
      console.error('Error loading users from storage:', e)
    }
    // Initialize with demo user
    return new Map([[DEMO_USER.email, { full_name: DEMO_USER.full_name, password: DEMO_USER.password }]])
  }

  const users = ref<Map<string, { full_name: string; password: string }>>(getStoredUsers())

  const isAuthenticated = computed(() => !!token.value)

  // Persist users to localStorage
  const saveUsersToStorage = () => {
    try {
      const usersObj = Object.fromEntries(users.value)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(usersObj))
    } catch (e) {
      console.error('Error saving users to storage:', e)
    }
  }

  const login = async (email: string, password: string) => {
    // Check against stored users
    const storedUser = users.value.get(email)
    
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
    if (users.value.has(email)) {
      return false
    }

    // Store user in memory and persist to localStorage
    users.value.set(email, { full_name, password })
    saveUsersToStorage()
    
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
    // Reload users from storage in case they were updated elsewhere
    users.value = getStoredUsers()
  }

  return { user, token, isAuthenticated, login, signup, logout, initializeAuth }
})
