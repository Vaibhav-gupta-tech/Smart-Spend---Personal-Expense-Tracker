from pydantic import BaseModel # type: ignore
from typing import Optional
from datetime import datetime

class ExpenseCreate(BaseModel):
    amount: float
    category: str
    description: Optional[str] = None

class ExpenseUpdate(BaseModel):
    amount: Optional[float] = None
    category: Optional[str] = None
    description: Optional[str] = None

class ExpenseOut(BaseModel):
    id: int
    user_id: int
    amount: float
    category: str
    description: Optional[str] = None
    created_at: datetime

    class Config:
        orm_mode = True
