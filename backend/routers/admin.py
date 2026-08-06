from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Admin

router = APIRouter(
    prefix="/admin",
    tags=["Admin"]
)


@router.post("/login")
def admin_login(data: dict, db: Session = Depends(get_db)):
    email = data.get("email")
    password = data.get("password")

    admin = (
        db.query(Admin)
        .filter(
            Admin.email == email,
            Admin.password == password
        )
        .first()
    )

    if not admin:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return {
        "message": "Login successful",
        "admin": {
            "id": admin.id,
            "email": admin.email
        }
    }
