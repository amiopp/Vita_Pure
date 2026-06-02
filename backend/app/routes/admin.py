import hmac
import os
import re
import unicodedata

from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Product
from app.schemas import ProductCreate, ProductOut, ProductUpdate

router = APIRouter(prefix="/api/admin", tags=["admin"])


def require_admin_key(x_admin_key: str | None = Header(default=None, alias="X-Admin-Key")) -> None:
    expected_key = os.getenv("ADMIN_API_KEY")
    if not expected_key:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="ADMIN_API_KEY is not configured",
        )
    if not x_admin_key or not hmac.compare_digest(x_admin_key, expected_key):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid admin key")


def slugify(value: str) -> str:
    normalized = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode("ascii")
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", normalized).strip("-").lower()
    return slug or "produit"


def unique_slug(db: Session, base_slug: str, product_id: int | None = None) -> str:
    slug = base_slug
    suffix = 2
    while True:
        query = db.query(Product).filter(Product.slug == slug)
        if product_id is not None:
            query = query.filter(Product.id != product_id)
        if not query.first():
            return slug
        slug = f"{base_slug}-{suffix}"
        suffix += 1


@router.get("/products", response_model=list[ProductOut], dependencies=[Depends(require_admin_key)])
def list_admin_products(db: Session = Depends(get_db)):
    return db.query(Product).order_by(Product.id.desc()).all()


@router.post("/products", response_model=ProductOut, status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin_key)])
def create_product(payload: ProductCreate, db: Session = Depends(get_db)):
    base_slug = slugify(payload.slug or payload.name)
    product = Product(
        name=payload.name.strip(),
        slug=unique_slug(db, base_slug),
        category=payload.category.strip(),
        description=payload.description.strip(),
        price=payload.price,
        image_url=payload.image_url.strip(),
        in_stock=payload.in_stock,
        featured=payload.featured,
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product


@router.put("/products/{product_id}", response_model=ProductOut, dependencies=[Depends(require_admin_key)])
def update_product(product_id: int, payload: ProductUpdate, db: Session = Depends(get_db)):
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    update_data = payload.model_dump(exclude_unset=True)
    if "slug" in update_data or "name" in update_data:
        slug_source = update_data.get("slug") or update_data.get("name") or product.slug
        update_data["slug"] = unique_slug(db, slugify(slug_source), product_id)

    for key, value in update_data.items():
        if isinstance(value, str):
            value = value.strip()
        setattr(product, key, value)

    db.commit()
    db.refresh(product)
    return product


@router.delete("/products/{product_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(require_admin_key)])
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    db.delete(product)
    db.commit()
