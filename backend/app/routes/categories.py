from fastapi import APIRouter

from app.seed import CATEGORIES

router = APIRouter(prefix="/api/categories", tags=["categories"])


@router.get("", response_model=list[str])
def list_categories():
    return CATEGORIES

