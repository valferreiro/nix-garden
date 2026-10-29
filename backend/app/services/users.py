from sqlalchemy import or_, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.models import User
from app.schemas.user import UserCreate
from app.services.security import hash_password
from app.services.security import verify_password


def create_user(db: Session, user_data: UserCreate) -> User:
    """Registra un usuario nuevo en la base de datos."""

    # Comprobar si el correo o nombre de usuario ya existen.
    existing_user = db.scalar(
        select(User).where(
            or_(
                User.email == user_data.email,
                User.username == user_data.username,
            )
        )
    )

    if existing_user:
        raise ValueError("El correo o nombre de usuario ya está registrado.")

    # Crear el objeto de usuario.
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hash_password(user_data.password),
    )

    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

    except IntegrityError:
        db.rollback()
        raise ValueError("El correo o nombre de usuario ya está registrado.")

    return new_user

def authenticate_user(
    db: Session,
    email: str,
    password: str,
) -> User | None:
    """Verifica las credenciales de un usuario."""

    user = db.scalar(
        select(User).where(User.email == email)
    )

    if not user:
        return None

    if not verify_password(password, user.hashed_password):
        return None

    if not user.is_active:
        return None

    return user