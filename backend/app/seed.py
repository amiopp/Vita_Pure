from app.database import Base, SessionLocal, engine
from app.models import Product

CATEGORIES = [
    "Sport & Fitness",
    "Énergie",
    "Santé quotidienne",
    "Minéraux & Vitamines",
    "Bien-être",
]

PRODUCTS = [
    {
        "name": "Creatine Creapure",
        "slug": "creatine-creapure",
        "category": "Sport & Fitness",
        "description": "Pensée pour compléter votre routine nutritionnelle et accompagner vos séances sportives.",
        "price": 249.0,
        "image_url": "creatine.jpeg",
        "in_stock": True,
        "featured": True,
    },
    {
        "name": "Citrulline Malate",
        "slug": "citrulline-malate",
        "category": "Sport & Fitness",
        "description": "Idéale pour accompagner un mode de vie actif et une routine d'entraînement régulière.",
        "price": 299.0,
        "image_url": "citrulline-malate.jpeg",
        "in_stock": True,
        "featured": True,
    },
    {
        "name": "EAA + Creatine HCL",
        "slug": "eaa-creatine-hcl",
        "category": "Sport & Fitness",
        "description": "Un format pratique pour soutenir votre routine sportive au quotidien.",
        "price": 329.0,
        "image_url": "eaa-red-rex.jpeg",
        "in_stock": True,
        "featured": False,
    },
    {
        "name": "BioActive Complete B-Complex",
        "slug": "bioactive-complete-b-complex",
        "category": "Énergie",
        "description": "Conçu pour accompagner un mode de vie actif et compléter vos apports nutritionnels.",
        "price": 229.0,
        "image_url": "b-complex.jpeg",
        "in_stock": True,
        "featured": True,
    },
    {
        "name": "NAD+ Life Extension",
        "slug": "nad-plus-life-extension",
        "category": "Énergie",
        "description": "Une formule compacte qui s'intègre simplement à votre routine bien-être.",
        "price": 399.0,
        "image_url": "nad-plus.jpeg",
        "in_stock": True,
        "featured": False,
    },
    {
        "name": "Mega Omega 3",
        "slug": "mega-omega-3",
        "category": "Santé quotidienne",
        "description": "Un complément pratique pour contribuer à votre équilibre quotidien.",
        "price": 239.0,
        "image_url": "mega-omega-3.jpeg",
        "in_stock": True,
        "featured": True,
    },
    {
        "name": "LactoBif 5 Probiotics",
        "slug": "lactobif-5-probiotics",
        "category": "Santé quotidienne",
        "description": "Pensé pour compléter une routine alimentaire variée et équilibrée.",
        "price": 219.0,
        "image_url": "lactobif-5.jpeg",
        "in_stock": True,
        "featured": False,
    },
    {
        "name": "NAC 600 mg",
        "slug": "nac-600-mg",
        "category": "Santé quotidienne",
        "description": "Un complément simple à intégrer dans votre routine nutritionnelle.",
        "price": 249.0,
        "image_url": "nac.jpeg",
        "in_stock": True,
        "featured": False,
    },
    {
        "name": "Vitamin D3",
        "slug": "vitamin-d3",
        "category": "Minéraux & Vitamines",
        "description": "Aide à compléter vos apports nutritionnels dans une routine quotidienne équilibrée.",
        "price": 149.0,
        "image_url": "vitamin-d3.jpeg",
        "in_stock": True,
        "featured": False,
    },
    {
        "name": "Vitamin K2 + D3",
        "slug": "vitamin-k2-d3",
        "category": "Minéraux & Vitamines",
        "description": "Un format simple pour organiser vos apports en vitamines au quotidien.",
        "price": 219.0,
        "image_url": "vitamin-k2-d3.jpeg",
        "in_stock": True,
        "featured": False,
    },
    {
        "name": "Magnesium Malate",
        "slug": "magnesium-malate",
        "category": "Minéraux & Vitamines",
        "description": "Un minéral pratique pour compléter votre routine bien-être.",
        "price": 199.0,
        "image_url": "magnesium-malate.jpeg",
        "in_stock": True,
        "featured": True,
    },
    {
        "name": "Multivitamin For Men",
        "slug": "multivitamin-for-men",
        "category": "Minéraux & Vitamines",
        "description": "Un complexe pratique pour mieux organiser vos apports essentiels.",
        "price": 279.0,
        "image_url": "multivitamin-men.jpeg",
        "in_stock": False,
        "featured": False,
    },
    {
        "name": "CollagenUP",
        "slug": "collagen-up",
        "category": "Bien-être",
        "description": "Pensé pour compléter votre routine bien-être avec une formule simple à utiliser.",
        "price": 349.0,
        "image_url": "collagen-up.jpeg",
        "in_stock": True,
        "featured": True,
    },
    {
        "name": "Inositol",
        "slug": "inositol",
        "category": "Bien-être",
        "description": "Un complément pratique pour accompagner votre équilibre quotidien.",
        "price": 249.0,
        "image_url": "inositol.jpeg",
        "in_stock": True,
        "featured": False,
    },
    {
        "name": "Resveratrol",
        "slug": "resveratrol",
        "category": "Bien-être",
        "description": "Une formule végétale qui s'intègre facilement à votre routine bien-être.",
        "price": 259.0,
        "image_url": "resveratrol.jpeg",
        "in_stock": True,
        "featured": False,
    },
    {
        "name": "GABA 500 mg",
        "slug": "gaba-500-mg",
        "category": "Bien-être",
        "description": "Un format simple pour accompagner vos moments de calme dans une routine équilibrée.",
        "price": 199.0,
        "image_url": "gaba.jpeg",
        "in_stock": True,
        "featured": False,
    },
]


def seed_database() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        for item in PRODUCTS:
            product = db.query(Product).filter(Product.slug == item["slug"]).first()
            if not product:
                db.add(Product(**item))
        db.commit()
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
    print("PUREVITA products seeded.")
