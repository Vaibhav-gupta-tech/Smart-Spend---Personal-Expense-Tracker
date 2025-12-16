# from fastapi import APIRouter, Depends
# from app.core.deps import get_current_user

# router = APIRouter(prefix="/expenses")

# @router.get("/my-expenses")
# async def get_expenses(current_user: str = Depends(get_current_user)):
#     return {"message": f"Hello {current_user}, here are your expenses"}
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update as sqlalchemy_update, delete as sqlalchemy_delete
from app.database import SessionLocal
from app.models.expense import Expense
from app.models.user import User
from app.schemas.expense import ExpenseCreate, ExpenseUpdate, ExpenseOut
from app.core.deps import get_current_user, get_db
from typing import List

router = APIRouter(prefix="/expenses", tags=["expenses"])

# get_db provided earlier; if not, import from core.deps
# get_current_user returns user email

@router.post("/add", response_model=ExpenseOut, status_code=status.HTTP_201_CREATED)
async def add_expense(payload: ExpenseCreate, current_user: str = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    # get user id from email
    result = await db.execute(select(User).where(User.email == current_user))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    expense = Expense(
        user_id=user.id,
        amount=payload.amount,
        category=payload.category,
        description=payload.description
    )
    db.add(expense)
    await db.commit()
    await db.refresh(expense)
    return expense

@router.get("/my", response_model=List[ExpenseOut])
async def get_my_expenses(current_user: str = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == current_user))
    user = result.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    res = await db.execute(select(Expense).where(Expense.user_id == user.id).order_by(Expense.created_at.desc()))
    expenses = res.scalars().all()
    return expenses

@router.put("/{expense_id}", response_model=ExpenseOut)
async def update_expense(expense_id: int, payload: ExpenseUpdate, current_user: str = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    # ensure owner
    res = await db.execute(select(User).where(User.email == current_user))
    user = res.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    res = await db.execute(select(Expense).where(Expense.id == expense_id, Expense.user_id == user.id))
    expense = res.scalars().first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    # apply updates
    if payload.amount is not None:
        expense.amount = payload.amount
    if payload.category is not None:
        expense.category = payload.category
    if payload.description is not None:
        expense.description = payload.description

    db.add(expense)
    await db.commit()
    await db.refresh(expense)
    return expense

@router.delete("/{expense_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_expense(expense_id: int, current_user: str = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    res = await db.execute(select(User).where(User.email == current_user))
    user = res.scalars().first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    res = await db.execute(select(Expense).where(Expense.id == expense_id, Expense.user_id == user.id))
    expense = res.scalars().first()
    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    await db.execute(sqlalchemy_delete(Expense).where(Expense.id == expense_id))
    await db.commit()
    return
