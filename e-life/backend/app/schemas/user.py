from pydantic import BaseModel, EmailStr
from typing import Optional
from app.models.user import UserRole, ExperienceLevel

class UserBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    role: UserRole = UserRole.learner
    domain: Optional[str] = None
    experience_level: Optional[ExperienceLevel] = None
    learning_goals: Optional[str] = None
    career_guidance: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(UserBase):
    id: int
    is_active: bool
    is_2fa_enabled: bool

    class Config:
        from_attributes = True
