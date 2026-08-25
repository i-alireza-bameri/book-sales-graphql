# Book Sales GraphQL Platform

A full-stack book sales application built with GraphQL, featuring a Python backend and Next.js frontend.

## Tech Stack

### Backend
- **Framework**: FastAPI
- **GraphQL**: Strawberry GraphQL
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Migrations**: Alembic
- **Language**: Python 3.9+

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **GraphQL Client**: Apollo Client
- **Styling**: Tailwind CSS
- **Package Manager**: npm

## Project Structure

```
book-sales-graphql/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models.py          # SQLAlchemy models
│   │   └── schema.py           # Strawberry GraphQL schema
│   ├── main.py                # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example           # Environment variables template
│   └── alembic.ini            # Database migrations config
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── _app.tsx       # Apollo Client setup
│   │   │   └── index.tsx      # Home page
│   │   └── styles/
│   │       └── globals.css    # Global styles
│   ├── package.json
│   ├── next.config.js
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.local.example     # Environment variables template
├── .gitignore
└── README.md
```

## Features

- **Authors Management**: Create and manage book authors
- **Books Catalog**: Browse and manage books with pricing and inventory
- **Customer Management**: Handle customer information and profiles
- **Orders System**: Process and track book orders
- **GraphQL API**: Full-featured GraphQL endpoint for all operations

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. Run the server:
   ```bash
   python main.py
   ```

The GraphQL API will be available at `http://localhost:8000/graphql`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## Database Schema

### Tables

- **authors**: Author information
- **books**: Book catalog with pricing and inventory
- **customers**: Customer details
- **orders**: Order information
- **order_items**: Items in each order

## API Endpoints

- `GET /health` - Health check
- `POST /graphql` - GraphQL queries and mutations
- `WS /graphql` - GraphQL subscriptions (WebSocket)

## Next Steps

1. Set up PostgreSQL database
2. Run database migrations with Alembic
3. Implement additional GraphQL queries and mutations
4. Create frontend pages for:
   - Book catalog
   - Shopping cart
   - Order management
   - Author profiles
5. Add authentication and authorization
6. Implement payment processing

## License

MIT
