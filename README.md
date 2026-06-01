# PUREVITA Store

Premium French storefront for PUREVITA supplements. Customers browse products and order only through WhatsApp. There is no online payment, Stripe, card payment, cart, or checkout.

## Stack

- Frontend: React, Vite, Tailwind CSS, Lucide React
- Backend: FastAPI, SQLite, SQLAlchemy, Pydantic
- Ordering: WhatsApp pre-filled messages

## Environment

Copy the examples if you want to override defaults:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

## Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m app.seed
uvicorn app.main:app --reload
```

PowerShell activation on Windows:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m app.seed
uvicorn app.main:app --reload
```

API runs at `http://localhost:8000`.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## API Endpoints

- `GET /api/products`
- `GET /api/products/{product_id}`
- `GET /api/categories`
- `POST /api/orders/whatsapp-link`
- `POST /api/orders/whatsapp-cart-link`

## Product Editing

Edit product data in `backend/app/seed.py`. Product image filenames should match files in `frontend/src/assets/products/selected`.
