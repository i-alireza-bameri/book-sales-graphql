import strawberry
from fastapi import FastAPI
from strawberry.asgi import GraphQL
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from app.database import engine
from app.models import Base
from app.init_db import init_db

load_dotenv()

# Import schema
from app.schema import schema

# Initialize database
Base.metadata.create_all(bind=engine)
init_db()

app = FastAPI(title="Book Sales GraphQL API")

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# GraphQL endpoint
graphql_app = GraphQL(schema)
app.add_route("/graphql", graphql_app)
app.add_api_websocket_route("/graphql", graphql_app)

# Health check endpoint
@app.get("/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        app,
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
    )
