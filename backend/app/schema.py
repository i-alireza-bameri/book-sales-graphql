import strawberry
from typing import List, Optional
from datetime import datetime

@strawberry.type
class User:
    id: int
    email: str
    full_name: str
    is_active: bool
    created_at: datetime

@strawberry.type
class Author:
    id: int
    name: str
    bio: Optional[str]
    created_at: datetime

@strawberry.type
class Book:
    id: int
    title: str
    description: Optional[str]
    price: float
    isbn: str
    stock: int
    author: Author
    created_at: datetime
    updated_at: datetime

@strawberry.type
class Customer:
    id: int
    phone: Optional[str]
    address: Optional[str]
    city: Optional[str]
    country: Optional[str]
    created_at: datetime

@strawberry.type
class OrderItem:
    id: int
    book: Book
    quantity: int
    price: float

@strawberry.type
class Order:
    id: int
    customer: Customer
    items: List[OrderItem]
    total_amount: float
    status: str
    created_at: datetime
    updated_at: datetime

@strawberry.type
class AuthToken:
    access_token: str
    token_type: str
    user: User

@strawberry.input
class LoginInput:
    email: str
    password: str

@strawberry.input
class SignupInput:
    email: str
    full_name: str
    password: str

@strawberry.type
class Query:
    @strawberry.field
    def hello(self) -> str:
        return "Welcome to Book Sales GraphQL API"
    
    @strawberry.field
    def health(self) -> str:
        return "OK"

schema = strawberry.Schema(query=Query)
