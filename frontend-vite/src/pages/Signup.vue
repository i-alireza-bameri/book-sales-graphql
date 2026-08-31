<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-2">Create Account</h1>
      <p class="text-center text-gray-600 mb-8">Join our book store community</p>
      
      <form @submit.prevent="handleSignup" class="space-y-6">
        <div>
          <label for="full_name" class="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            v-model="form.full_name"
            id="full_name"
            type="text"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="John Doe"
          />
          <span v-if="errors.full_name" class="text-red-500 text-sm">{{ errors.full_name }}</span>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            v-model="form.email"
            id="email"
            type="email"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="you@example.com"
          />
          <span v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</span>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            v-model="form.password"
            id="password"
            type="password"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="••••••••"
          />
          <span v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</span>
          <p class="text-gray-500 text-xs mt-1">At least 8 characters</p>
        </div>

        <div>
          <label for="confirm_password" class="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            v-model="form.confirm_password"
            id="confirm_password"
            type="password"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="••••••••"
          />
          <span v-if="errors.confirm_password" class="text-red-500 text-sm">{{ errors.confirm_password }}</span>
        </div>

        <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-red-700 text-sm">{{ error }}</p>
        </div>

        <div v-if="success" class="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p class="text-green-700 text-sm">{{ success }}</p>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Creating Account...' : 'Sign Up' }}
        </button>
      </form>

      <p class="text-center text-gray-600 text-sm mt-6">
        Already have an account?
        <router-link to="/login" class="text-blue-600 hover:text-blue-800 font-medium">
          Login here
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  full_name: '',
  email: '',
  password: '',
  confirm_password: '',
})

const errors = ref<Record<string, string>>({})
const error = ref('')
const success = ref('')
const loading = ref(false)

const validateForm = (): boolean => {
  errors.value = {}

  // Full name validation
  if (!form.value.full_name || form.value.full_name.length < 2) {
    errors.value.full_name = 'Full name must be at least 2 characters'
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email || !emailRegex.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }

  // Password validation
  if (!form.value.password || form.value.password.length < 8) {
    errors.value.password = 'Password must be at least 8 characters'
  }

  // Confirm password validation
  if (form.value.password !== form.value.confirm_password) {
    errors.value.confirm_password = 'Passwords do not match'
  }

  return Object.keys(errors.value).length === 0
}

const handleSignup = async () => {
  error.value = ''
  success.value = ''

  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    const result = await authStore.signup(
      form.value.email,
      form.value.full_name,
      form.value.password
    )

    if (result) {
      success.value = 'Account created successfully! Redirecting to products...'
      setTimeout(() => {
        router.push('/products')
      }, 2000)
    } else {
      error.value = 'Email already registered. Please login instead.'
    }
  } catch (err) {
    error.value = 'Signup failed. Please try again.'
    console.error(err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
</style>
