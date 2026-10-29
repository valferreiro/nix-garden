
from fastapi import FastAPI
from sqlalchemy import text

from app.db.session import engine
from app.routers import auth

app = FastAPI(
    title="Nix Garden API",
    description="API para gestionar hábitos y jardines personalizados.",
    version="0.1.0",
)

app.include_router(
        auth.router,
        prefix="/auth",
        tags=["Autenticación"],
    )

@app.get("/")
def root():
    return {
        "message": "¡Bienvenido a Nix Garden! 🌱",
        "status": "online",
    }


@app.get("/health")
def health_check():
    try:
        with engine.connect() as connection:
            result = connection.execute(
                text("SELECT current_database()")
            )
            database = result.scalar_one()

        return {
            "status": "healthy",
            "database": database,
        }

    except Exception:
        return {
            "status": "unhealthy",
            "database": "unavailable",
        }
