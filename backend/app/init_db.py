from app.database import engine
from app.models import Base, User, Author, Book
from sqlalchemy.orm import Session

def init_db():
    """Initialize database with tables and sample data"""
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    # Add sample data
    db = Session(bind=engine)
    
    # Check if data already exists
    if db.query(Author).count() > 0:
        print("Database already initialized with data")
        db.close()
        return
    
    # Create sample authors
    authors = [
        Author(name="F. Scott Fitzgerald", bio="American writer known for The Great Gatsby"),
        Author(name="Harper Lee", bio="Author of To Kill a Mockingbird"),
        Author(name="George Orwell", bio="British author known for 1984"),
        Author(name="Jane Austen", bio="English novelist known for Pride and Prejudice"),
    ]
    
    for author in authors:
        db.add(author)
    
    db.commit()
    
    # Create sample books
    books_data = [
        Book(
            title="The Great Gatsby",
            description="A classic novel of wealth and love",
            price=12.99,
            isbn="9780743273565",
            author_id=1,
            stock=15
        ),
        Book(
            title="To Kill a Mockingbird",
            description="A gripping tale of racial injustice",
            price=14.99,
            isbn="9780061120084",
            author_id=2,
            stock=8
        ),
        Book(
            title="1984",
            description="A dystopian novel of totalitarianism",
            price=13.99,
            isbn="9780451524935",
            author_id=3,
            stock=12
        ),
        Book(
            title="Pride and Prejudice",
            description="A romantic tale of love and society",
            price=11.99,
            isbn="9780141439518",
            author_id=4,
            stock=20
        ),
    ]
    
    for book in books_data:
        db.add(book)
    
    db.commit()
    
    # Create a demo user
    demo_user = User(
        email="demo@example.com",
        full_name="Demo User"
    )
    demo_user.set_password("password123")
    db.add(demo_user)
    db.commit()
    
    print("Database initialized successfully!")
    db.close()

if __name__ == "__main__":
    init_db()
