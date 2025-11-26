from fastapi import APIRouter, Depends
from app.core.deps import get_current_user

router = APIRouter(prefix="/expenses")

@router.get("/my-expenses")
async def get_expenses(current_user: str = Depends(get_current_user)):
    return {"message": f"Hello {current_user}, here are your expenses"}
