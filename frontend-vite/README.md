# Book Sales Frontend - Vite Version

A modern Vue 3 frontend for the Book Sales GraphQL platform built with Vite.

## Features

- ⚡ **Vite** - Lightning-fast build tool
- 🖖 **Vue 3** - Composition API
- 🛣️ **Vue Router** - Client-side routing
- 📦 **Pinia** - State management
- 🎨 **Tailwind CSS** - Utility-first styling
- 🔐 **Authentication** - Login page with token storage
- 📚 **Products Page** - Browse and search books
- 📱 **Responsive Design** - Mobile-friendly UI

## Project Structure

```
frontend-vite/
├── src/
│   ├── pages/
│   │   ├── Login.vue          # Login page
│   │   └── Products.vue       # Products listing page
│   ├── router/
│   │   └── index.ts           # Route definitions
│   ├── stores/
│   │   ├── auth.ts            # Authentication store
│   │   └── products.ts        # Products store
│   ├── App.vue                # Root component
│   ├── main.ts                # Application entry point
│   └── style.css              # Global styles
├── index.html                 # HTML entry point
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
├── .env.example               # Environment variables template
└── README.md                  # This file
```

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next-generation frontend build tool
- **Vue Router** - Official router for Vue.js
- **Pinia** - Intuitive state management
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - JavaScript with types
- **Apollo Client** - GraphQL client

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Backend server running on `http://localhost:8000`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend-vite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Available Scripts

### Development
```bash
npm run dev
```
Starts the Vite development server with HMR.

### Production Build
```bash
npm run build
```
Builds the application for production.

### Preview Build
```bash
npm run preview
```
Preview the production build locally.

### Lint
```bash
npm run lint
```
Fix linting issues.

## Pages

### Login Page (`/login`)
- Email and password input fields
- Form validation
- Error handling
- Demo credentials: `demo@example.com` / `password123`
- Token-based authentication
- Auto-redirect to products on login

### Products Page (`/products`)
- Browse all books in the store
- Search functionality (by title, author, or description)
- Book details (price, stock, ISBN, author)
- Stock availability indicators
- Add to cart functionality
- Responsive grid layout (1, 2, or 3 columns)
- Protected route (requires authentication)

## State Management

### Auth Store (`stores/auth.ts`)
- Manages user authentication state
- Handles login/logout
- Persists token to localStorage
- Provides `isAuthenticated` computed property

### Product Store (`stores/products.ts`)
- Manages product catalog
- Mock product data
- Provides product queries and mutations

## Routing

- `/` → Redirects to `/products`
- `/login` → Login page (public)
- `/products` → Products listing (protected)

Route guards ensure:
- Unauthenticated users are redirected to login
- Authenticated users bypass login page

## Environment Variables

```env
VITE_APP_GRAPHQL_URL=http://localhost:8000/graphql
VITE_APP_API_URL=http://localhost:8000
```

## Next Steps

1. **Integrate GraphQL**: Replace mock data with actual GraphQL queries
2. **Shopping Cart**: Implement cart management store
3. **Checkout**: Create checkout page and order flow
4. **User Profile**: Add user profile management
5. **Book Details**: Create detailed book view page
6. **Reviews**: Add book review and rating system
7. **Admin Panel**: Create admin interface for book management
8. **Payment Integration**: Add payment processing

## License

MIT
