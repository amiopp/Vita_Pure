import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import categories, orders, products
from app.seed import seed_database

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    seed_database()
    yield


app = FastAPI(
    title="PUREVITA Store API",
    description="FastAPI backend for a WhatsApp-only supplement storefront.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(categories.router)
app.include_router(orders.router)


@app.get("/")
def read_root():
    return {"name": "PUREVITA Store API", "status": "ok"}
