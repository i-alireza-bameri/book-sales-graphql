<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900">📚 Book Store</h1>
        <p class="text-gray-600 mt-2">Welcome, {{ authStore.user?.email || 'User' }}!</p>
      </div>

      <div class="mb-6 flex items-center gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search books..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        />
      </div>

      <div v-if="filteredProducts.length === 0" class="text-center py-12">
        <p class="text-gray-500 text-lg">No books found</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
        >
          <div class="p-6">
            <div class="mb-2">
              <span class="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                {{ product.author.name }}
              </span>
            </div>
            
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ product.title }}</h3>
            
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">
              {{ product.description }}
            </p>

            <div class="space-y-2 mb-4">
              <p class="text-sm text-gray-500">
                <span class="font-semibold">ISBN:</span> {{ product.isbn }}
              </p>
              <p class="text-sm text-gray-500">
                <span class="font-semibold">Stock:</span>
                <span :class="{
                  'text-green-600': product.stock > 5,
                  'text-yellow-600': product.stock <= 5 && product.stock > 0,
                  'text-red-600': product.stock === 0
                }">
                  {{ product.stock }} available
                </span>
              </p>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-2xl font-bold text-blue-600">${{ product.price.toFixed(2) }}</span>
              <button
                @click="addToCart(product)"
                :disabled="product.stock === 0"
                :class="{
                  'bg-blue-600 hover:bg-blue-700': product.stock > 0,
                  'bg-gray-400 cursor-not-allowed': product.stock === 0
                }"
                class="px-4 py-2 text-white font-medium rounded-lg transition"
              >
                {{ product.stock > 0 ? 'Add to Cart' : 'Out of Stock' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="cartMessage" class="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
        {{ cartMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useProductStore } from '@/stores/products'
import type { Book } from '@/stores/products'

const authStore = useAuthStore()
const productStore = useProductStore()

const searchQuery = ref('')
const cartMessage = ref('')

const products = computed(() => productStore.getProducts())

const filteredProducts = computed(() => {
  if (!searchQuery.value) {
    return products.value
  }

  const query = searchQuery.value.toLowerCase()
  return products.value.filter(
    p => p.title.toLowerCase().includes(query) ||
         p.author.name.toLowerCase().includes(query) ||
         p.description.toLowerCase().includes(query)
  )
})

const addToCart = (product: Book) => {
  cartMessage.value = `${product.title} added to cart!`
  setTimeout(() => {
    cartMessage.value = ''
  }, 2000)
}

onMounted(() => {
  authStore.initializeAuth()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
