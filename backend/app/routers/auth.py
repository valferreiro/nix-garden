from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.user import UserCreate, UserResponse
from app.services.users import create_user

from app.schemas.auth import LoginRequest, TokenResponse
from app.services.users import authenticate_user
from app.services.security import create_access_token

from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter()

@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
)

def register_user(
    user_data: UserCreate,
    db: Session = Depends(get_db),
):
    """
    Endpoint para registrar un nuevo usuario.   
    """
    try:
        new_user = create_user(db, user_data)
        return new_user

    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error),
        ) from error

@router.post(
    "/login",
    response_model=TokenResponse,
)
def login_user(
    credentials: LoginRequest,
    db: Session = Depends(get_db),
):
    """Autentica un usuario y genera un JWT."""

    user = authenticate_user(
        db,
        credentials.email,
        credentials.password,
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Correo o contraseña incorrectos.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token = create_access_token(
        data={"sub": str(user.id)}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }

@router.get("/me", response_model=UserResponse)
def get_my_profile(
    current_user: User = Depends(get_current_user),
):
    return current_user
