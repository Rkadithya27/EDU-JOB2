from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.learning_path import LearningPathCreate, LearningPathResponse
from app.crud import crud_learning_path
from app.api.deps import get_current_user_id

router = APIRouter()

@router.post("/", response_model=LearningPathResponse)
def create_path(
    path: LearningPathCreate,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    return crud_learning_path.create_learning_path(db=db, path=path, user_id=user_id)

@router.get("/", response_model=List[LearningPathResponse])
def read_user_paths(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    user_id: int = Depends(get_current_user_id)
):
    return crud_learning_path.get_learning_paths_by_user(db=db, user_id=user_id, skip=skip, limit=limit)

@router.get("/{path_id}", response_model=LearningPathResponse)
def read_path(
    path_id: int,
    db: Session = Depends(get_db)
):
    path = crud_learning_path.get_learning_path(db=db, path_id=path_id)
    if path is None:
        raise HTTPException(status_code=404, detail="Learning path not found")
    return path
