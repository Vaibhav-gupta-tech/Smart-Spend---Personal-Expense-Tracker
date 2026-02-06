from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models import user, expense, category
from app.routers import auth, expenses, category as category_router

# When using an AsyncEngine we must run DDL (create_all) using an async connection.
# Calling Base.metadata.create_all(bind=engine) directly against an AsyncEngine
# raises: "'AsyncEngine' object has no attribute '_run_ddl_visitor'".
async def _create_db_tables() -> None:
    """Create database tables using an async engine at startup."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend running successfully!"}


@app.on_event("startup")
async def on_startup():
    # Ensure DB tables are created before serving requests
    await _create_db_tables()

app.include_router(auth.router)
app.include_router(expenses.router)
app.include_router(category_router.router)
