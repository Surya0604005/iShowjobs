from pydantic import BaseModel


class JobBase(BaseModel):
    company: str
    title: str
    location: str
    experience: str
    thumbnail: str
    youtube: str
    apply: str
    description: str
    eligibility: str
    skills: str
    process: str


class JobCreate(JobBase):
    pass


class JobResponse(JobBase):
    id: int

    class Config:
        from_attributes = True


class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str


class ContactMessageResponse(ContactMessageCreate):
    id: int

    class Config:
        from_attributes = True
