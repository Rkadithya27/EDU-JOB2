from fastapi import APIRouter
from app.api.endpoints import users, learning_paths, voice

api_router = APIRouter()
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(learning_paths.router, prefix="/learning-paths", tags=["learning paths"])
api_router.include_router(voice.router, prefix="/voice", tags=["voice assistant"])
