from pydantic import BaseModel, ConfigDict, Field


class ProductOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
    category: str
    description: str
    price: float
    image_url: str
    in_stock: bool
    featured: bool


class WhatsAppLinkRequest(BaseModel):
    product_id: int
    quantity: int = Field(default=1, ge=1, le=99)
    customer_name: str | None = None
    address: str | None = None


class WhatsAppLinkResponse(BaseModel):
    whatsapp_url: str
    message: str

