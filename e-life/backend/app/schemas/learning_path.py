from pydantic import BaseModel
from typing import Any, Dict, Optional

class LearningPathBase(BaseModel):
    title: str
    description: Optional[str] = None
    roadmap: Dict[str, Any]

class LearningPathCreate(LearningPathBase):
    pass

class LearningPathResponse(LearningPathBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
