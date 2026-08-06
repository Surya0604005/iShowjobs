from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import ContactMessage
from schemas import ContactMessageCreate, ContactMessageResponse

router = APIRouter(
    prefix="/contact",
    tags=["Contact"]
)


@router.post("/", response_model=ContactMessageResponse)
def send_message(message: ContactMessageCreate, db: Session = Depends(get_db)):
    new_message = ContactMessage(**message.model_dump())

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return new_message


@router.get("/", response_model=list[ContactMessageResponse])
def get_messages(db: Session = Depends(get_db)):
    return db.query(ContactMessage).order_by(ContactMessage.id.desc()).all()
