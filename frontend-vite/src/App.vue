<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="text-2xl font-bold text-blue-600">📚 Book Sales</div>
          <div class="flex gap-4">
            <router-link 
              v-if="!isAuthenticated" 
              to="/login"
              class="px-4 py-2 text-blue-600 hover:text-blue-800"
            >
              Login
            </router-link>
            <router-link 
              v-if="!isAuthenticated" 
              to="/signup"
              class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Sign Up
            </router-link>
            <router-link 
              v-if="isAuthenticated" 
              to="/products"
              class="px-4 py-2 text-blue-600 hover:text-blue-800"
            >
              Products
            </router-link>
            <button 
              v-if="isAuthenticated" 
              @click="logout"
              class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isAuthenticated = computed(() => authStore.isAuthenticated)

const logout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
</style>
