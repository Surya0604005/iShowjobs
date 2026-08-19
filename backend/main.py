from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware

from database import engine, Base
import models

from routers.jobs import router as jobs_router
from routers.admin import router as admin_router
from routers.contact import router as contact_router

from sqlalchemy.orm import Session
from database import SessionLocal

from uuid import uuid4


app = FastAPI(
    title="iShowJobs API",
    version="1.0.0",
    redirect_slashes=False,
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://ishowjobs.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# DATABASE
# =========================================================

Base.metadata.create_all(bind=engine)


# =========================================================
# ROUTERS
# =========================================================

app.include_router(jobs_router)
app.include_router(admin_router)
app.include_router(contact_router)


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():
    return {
        "message": "Welcome to iShowJobs API 🚀"
    }


# =========================================================
# UPLOAD IMAGE TO AIVEN MYSQL
# =========================================================

@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):

    # Check that a file was actually selected
    if not file:
        raise HTTPException(
            status_code=400,
            detail="No image uploaded"
        )

    # Read image bytes
    image_data = await file.read()

    # Check empty file
    if not image_data:
        raise HTTPException(
            status_code=400,
            detail="Uploaded image is empty"
        )

    # Generate unique filename
    filename = f"{uuid4()}_{file.filename}"

    # Create database session
    db: Session = SessionLocal()

    try:

        # Create database record
        new_image = models.JobImage(
            filename=filename,
            content_type=file.content_type or "application/octet-stream",
            image_data=image_data
        )

        # Save image to Aiven MySQL
        db.add(new_image)
        db.commit()
        db.refresh(new_image)

        # URL used by frontend to display image
        image_url = (
            f"https://ishowjobs-backend.onrender.com"
            f"/uploads/{new_image.id}"
        )

        return {
            "id": new_image.id,
            "filename": filename,
            "image_url": image_url
        }

    except Exception as e:

        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Image upload failed: {str(e)}"
        )

    finally:
        db.close()


# =========================================================
# GET IMAGE FROM AIVEN MYSQL
# =========================================================

@app.get("/uploads/{image_id}")
def get_image(image_id: int):

    db: Session = SessionLocal()

    try:

        image = (
            db.query(models.JobImage)
            .filter(models.JobImage.id == image_id)
            .first()
        )

        if not image:
            raise HTTPException(
                status_code=404,
                detail="Image not found"
            )

        return Response(
            content=image.image_data,
            media_type=image.content_type
        )

    finally:
        db.close()
