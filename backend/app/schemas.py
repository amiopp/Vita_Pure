from pydantic import BaseModel, ConfigDict, Field


class ProductBase(BaseModel):
    name: str = Field(min_length=2, max_length=160)
    slug: str | None = Field(default=None, max_length=180)
    category: str = Field(min_length=2, max_length=80)
    description: str = Field(min_length=5, max_length=500)
    price: float = Field(ge=0)
    image_url: str = Field(min_length=1, max_length=2_000_000)
    in_stock: bool = True
    featured: bool = False


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=160)
    slug: str | None = Field(default=None, max_length=180)
    category: str | None = Field(default=None, min_length=2, max_length=80)
    description: str | None = Field(default=None, min_length=5, max_length=500)
    price: float | None = Field(default=None, ge=0)
    image_url: str | None = Field(default=None, min_length=1, max_length=2_000_000)
    in_stock: bool | None = None
    featured: bool | None = None


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


class CartItemIn(BaseModel):
    product_id: int
    quantity: int = Field(default=1, ge=1, le=99)


class WhatsAppCartLinkRequest(BaseModel):
    items: list[CartItemIn] = Field(min_length=1, max_length=50)
    customer_name: str | None = None
    address: str | None = None


class WhatsAppLinkResponse(BaseModel):
    whatsapp_url: str
    message: str
