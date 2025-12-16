from fastapi import FastAPI
from app.routers import auth, expenses
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:3000"],   # or ["*"] for dev
  allow_methods=["*"],
  allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend running successfully!"}

app.include_router(auth.router)
app.include_router(expenses.router)
