from fastapi import HTTPException
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Job
from schemas import JobCreate, JobResponse
from sqlalchemy import or_

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"]
)


@router.get("/search/{keyword}", response_model=list[JobResponse])
def search_jobs(keyword: str, db: Session = Depends(get_db)):
    jobs = db.query(Job).filter(
        or_(
            Job.company.ilike(f"%{keyword}%"),
            Job.title.ilike(f"%{keyword}%"),
            Job.location.ilike(f"%{keyword}%")
        )
    ).all()

    return jobs


@router.get("/", response_model=list[JobResponse])
def get_jobs(db: Session = Depends(get_db)):
    return db.query(Job).all()


@router.post("/", response_model=JobResponse)
def add_job(job: JobCreate, db: Session = Depends(get_db)):
    new_job = Job(
        company=job.company,
        title=job.title,
        location=job.location,
        experience=job.experience,
        thumbnail=job.thumbnail,
        youtube=job.youtube,
        apply=job.apply,
        description=job.description,
        eligibility=job.eligibility,
        skills=job.skills,
        process=job.process,
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return new_job


@router.get("/filter/", response_model=list[JobResponse])
def filter_jobs(
    location: str = "",
    experience: str = "",
    db: Session = Depends(get_db)
):
    query = db.query(Job)

    if location:
        query = query.filter(Job.location.ilike(f"%{location}%"))

    if experience:
        query = query.filter(Job.experience.ilike(f"%{experience}%"))

    return query.all()


@router.get("/{job_id}", response_model=JobResponse)
def get_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    return job


@router.delete("/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    db.delete(job)
    db.commit()

    return {"message": "Job deleted successfully"}


@router.put("/{job_id}", response_model=JobResponse)
def update_job(job_id: int, updated_job: JobCreate, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    job.company = updated_job.company
    job.title = updated_job.title
    job.location = updated_job.location
    job.experience = updated_job.experience
    job.thumbnail = updated_job.thumbnail
    job.youtube = updated_job.youtube
    job.apply = updated_job.apply
    job.description = updated_job.description
    job.eligibility = updated_job.eligibility
    job.skills = updated_job.skills
    job.process = updated_job.process

    db.commit()
    db.refresh(job)

    return job
