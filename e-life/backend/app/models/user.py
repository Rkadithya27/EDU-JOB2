import enum
from sqlalchemy import Column, Integer, String, Enum, Boolean
from sqlalchemy.orm import relationship
from app.database import Base

class UserRole(str, enum.Enum):
    learner = "Learner"
    trainer = "Trainer"
    policymaker = "Policymaker"

class ExperienceLevel(str, enum.Enum):
    beginner = "Beginner"
    intermediate = "Intermediate"
    advanced = "Advanced"
    expert = "Expert"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, unique=True, index=True, nullable=True)
    hashed_password = Column(String, nullable=False)
    
    role = Column(Enum(UserRole), nullable=False, default=UserRole.learner)
    domain = Column(String, nullable=True)
    experience_level = Column(Enum(ExperienceLevel), nullable=True)
    learning_goals = Column(String, nullable=True)

    is_active = Column(Boolean, default=True)
    is_2fa_enabled = Column(Boolean, default=False)
    
    learning_paths = relationship("LearningPath", back_populates="user", cascade="all, delete-orphan")
