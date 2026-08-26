import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Book {
  id: number
  title: string
  description: string
  price: number
  isbn: string
  stock: number
  author: {
    id: number
    name: string
  }
}

export const useProductStore = defineStore('product', () => {
  const products = ref<Book[]>([
    {
      id: 1,
      title: 'The Great Gatsby',
      description: 'A classic novel of wealth and love',
      price: 12.99,
      isbn: '9780743273565',
      stock: 15,
      author: { id: 1, name: 'F. Scott Fitzgerald' },
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      description: 'A gripping tale of racial injustice',
      price: 14.99,
      isbn: '9780061120084',
      stock: 8,
      author: { id: 2, name: 'Harper Lee' },
    },
    {
      id: 3,
      title: '1984',
      description: 'A dystopian novel of totalitarianism',
      price: 13.99,
      isbn: '9780451524935',
      stock: 12,
      author: { id: 3, name: 'George Orwell' },
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      description: 'A romantic tale of love and society',
      price: 11.99,
      isbn: '9780141439518',
      stock: 20,
      author: { id: 4, name: 'Jane Austen' },
    },
  ])

  const getProducts = () => products.value

  const getProductById = (id: number) => {
    return products.value.find(p => p.id === id)
  }

  const addProduct = (product: Book) => {
    product.id = Math.max(...products.value.map(p => p.id), 0) + 1
    products.value.push(product)
  }

  return { products, getProducts, getProductById, addProduct }
})
