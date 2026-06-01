import os
from urllib.parse import quote

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Product
from app.schemas import WhatsAppLinkRequest, WhatsAppLinkResponse

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

