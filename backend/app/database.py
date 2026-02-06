# backend/app/database.py
import os
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Read DATABASE_URL from environment if available; fall back to local default.
raw_database_url = os.environ.get("DATABASE_URL", "postgres://postgres:postgres@db:5432/expense_db")

# SQLAlchemy asyncpg expects the URL scheme 'postgresql+asyncpg://'
if raw_database_url.startswith("postgres://"):
    DATABASE_URL = raw_database_url.replace("postgres://", "postgresql+asyncpg://", 1)
elif raw_database_url.startswith("postgresql+asyncpg://"):
    DATABASE_URL = raw_database_url
else:
    # If user provided a full async URL already or something else, use it as-is.
    DATABASE_URL = raw_database_url

# create async engine and session factory
engine = create_async_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

Base = declarative_base()

async def get_db():
    async with SessionLocal() as session:
        yield session
