from fastapi import FastAPI
from database import engine, Base
import models


from routers.jobs import router as jobs_router
from fastapi.middleware.cors import CORSMiddleware
from routers.admin import router as admin_router
from fastapi.staticfiles import StaticFiles
import os
from fastapi import UploadFile, File
import shutil
from uuid import uuid4
from routers.contact import router as contact_router

app = FastAPI(
    title="iShowJobs API",
    version="1.0.0",
    redirect_slashes=False,
)
if not os.path.exists("uploads"):
    os.makedirs("uploads")

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
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

Base.metadata.create_all(bind=engine)

app.include_router(jobs_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to iShowJobs API 🚀"
    }


app.include_router(admin_router)


@app.post("/upload")
async def upload_image(file: UploadFile = File(...)):
    # Generate unique filename
    filename = f"{uuid4()}_{file.filename}"

    # Save inside uploads folder
    filepath = f"uploads/{filename}"

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {
        "filename": filename,
        "image_url": f"/uploads/{filename}"
    }
app.include_router(contact_router)
