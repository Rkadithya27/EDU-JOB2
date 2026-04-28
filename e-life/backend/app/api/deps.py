from typing import Generator
from fastapi import Depends
from sqlalchemy.orm import Session
from app.database import get_db

# Mock dependency for getting current user since we don't have JWT implemented yet
def get_current_user_id() -> int:
    # In a real app, extract user_id from JWT token
    return 1
