from sqlalchemy import Column, Integer, String, Text, DateTime, func, LargeBinary
from database import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    company = Column(String(100), nullable=False)
    title = Column(String(200), nullable=False)
    location = Column(String(100), nullable=False)
    experience = Column(String(100), nullable=False)

    thumbnail = Column(String(255), nullable=False)

    youtube = Column(String(255), nullable=False)
    apply = Column(String(255), nullable=False)

    description = Column(Text, nullable=False)
    eligibility = Column(Text, nullable=False)
    skills = Column(Text, nullable=False)
    process = Column(Text, nullable=False)


class Admin(Base):
    __tablename__ = "admin"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    subject = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, server_default=func.now())


class JobImage(Base):
    __tablename__ = "job_images"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=False)
    content_type = Column(String(100), nullable=False)
    image_data = Column(LargeBinary, nullable=False)
