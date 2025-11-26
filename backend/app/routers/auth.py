from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import SessionLocal
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.core.security import hash_password, verify_password, create_access_token

router = APIRouter(prefix="/auth")

async def get_db():
    async with SessionLocal() as session:
        yield session

@router.post("/register")
async def register_user(payload: UserCreate, db: AsyncSession = Depends(get_db)):
    user = User(
        name=payload.name,
        email=payload.email,
        password=hash_password(payload.password)
    )
    db.add(user)
    try:
        await db.commit()
    except IntegrityError:
        # likely unique constraint on email
        await db.rollback()
        raise HTTPException(status_code=400, detail="Email already registered")

    return {"message": "User registered successfully"}

@router.post("/login")
async def login(payload: UserLogin, db: AsyncSession = Depends(get_db)):
    # use an ORM select so scalars() yields User instances (not raw column values)
    result = await db.execute(
        select(User).where(User.email == payload.email)
    )
    user = result.scalars().first()

    if not user or not verify_password(payload.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": payload.email})
    return {"access_token": token}
