import os
from urllib.parse import quote

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Product
from app.schemas import WhatsAppCartLinkRequest, WhatsAppLinkRequest, WhatsAppLinkResponse

router = APIRouter(prefix="/api/orders", tags=["orders"])


def normalize_whatsapp_number(number: str) -> str:
    digits = "".join(char for char in number if char.isdigit())
    return digits or "000000000000"


def build_message(product_name: str, quantity: int, customer_name: str | None, address: str | None) -> str:
    name = (customer_name or "").strip()
    delivery_address = (address or "").strip()
    return (
        f"Bonjour PUREVITA, je veux commander: {product_name}. "
        f"Quantité: {quantity}. Nom: {name}. Adresse: {delivery_address}."
    )


def build_cart_message(
    products_by_id: dict[int, Product],
    quantities_by_id: dict[int, int],
    customer_name: str | None,
    address: str | None,
) -> str:
    name = (customer_name or "").strip()
    delivery_address = (address or "").strip()
    lines = []
    total = 0.0

    for product_id, quantity in quantities_by_id.items():
        product = products_by_id[product_id]
        total += product.price * quantity
        lines.append(f"- {product.name} x {quantity}")

    product_lines = "\n".join(lines)
    return (
        "Bonjour PUREVITA, je veux commander:\n"
        f"{product_lines}\n"
        f"Total estimé: {total:.0f} MAD.\n"
        f"Nom: {name}. Adresse: {delivery_address}."
    )


@router.post("/whatsapp-link", response_model=WhatsAppLinkResponse)
def create_whatsapp_link(payload: WhatsAppLinkRequest, db: Session = Depends(get_db)):
    product = db.get(Product, payload.product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    number = normalize_whatsapp_number(os.getenv("WHATSAPP_NUMBER", "+000000000000"))
    message = build_message(product.name, payload.quantity, payload.customer_name, payload.address)
    return {
        "whatsapp_url": f"https://wa.me/{number}?text={quote(message)}",
        "message": message,
    }


@router.post("/whatsapp-cart-link", response_model=WhatsAppLinkResponse)
def create_whatsapp_cart_link(payload: WhatsAppCartLinkRequest, db: Session = Depends(get_db)):
    quantities_by_id: dict[int, int] = {}
    for item in payload.items:
        quantities_by_id[item.product_id] = quantities_by_id.get(item.product_id, 0) + item.quantity

    products = db.query(Product).filter(Product.id.in_(quantities_by_id.keys())).all()
    products_by_id = {product.id: product for product in products}
    missing_ids = [product_id for product_id in quantities_by_id if product_id not in products_by_id]
    if missing_ids:
        raise HTTPException(status_code=404, detail=f"Products not found: {missing_ids}")

    number = normalize_whatsapp_number(os.getenv("WHATSAPP_NUMBER", "+000000000000"))
    message = build_cart_message(products_by_id, quantities_by_id, payload.customer_name, payload.address)
    return {
        "whatsapp_url": f"https://wa.me/{number}?text={quote(message)}",
        "message": message,
    }
