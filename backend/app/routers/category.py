from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.database import get_db
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate, CategoryOut
from app.core.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/categories", tags=["Categories"])

@router.post("/", response_model=CategoryOut)
async def create_category(
    payload: CategoryCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    category = Category(
        name=payload.name,
        user_id=current_user.id
    )
    db.add(category)
    try:
        await db.commit()
        await db.refresh(category)
    except Exception:
        await db.rollback()
        raise HTTPException(status_code=500, detail="Failed to create category")
    return category


@router.get("/", response_model=list[CategoryOut])
async def get_categories(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Category).where(Category.user_id == current_user.id))
    return result.scalars().all()

@router.put("/{category_id}", response_model=CategoryOut)
async def update_category(
    category_id: int,
    payload: CategoryUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Category).where(
            Category.id == category_id,
            Category.user_id == current_user.id
        )
    )
    category = result.scalars().first()

    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    category.name = payload.name
    try:
        await db.commit()
        await db.refresh(category)
    except Exception:
        await db.rollback()
        raise HTTPException(status_code=500, detail="Failed to update category")
    return category


@router.delete("/{category_id}")
async def delete_category(
    category_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Category).where(
            Category.id == category_id,
            Category.user_id == current_user.id
        )
    )
    category = result.scalars().first()

    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    db.delete(category)
    try:
        await db.commit()
    except Exception:
        await db.rollback()
        raise HTTPException(status_code=500, detail="Failed to delete category")
    return {"message": "Category deleted"}
