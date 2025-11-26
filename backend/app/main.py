from fastapi import FastAPI
from app.routers import auth, expenses

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Backend running successfully!"}

app.include_router(auth.router)
app.include_router(expenses.router)
