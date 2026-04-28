from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "EDU-JOB Backend"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "YOUR_SUPER_SECRET_KEY_HERE"  # In production, use env variable
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    DATABASE_URL: str = "postgresql://user:password@localhost/elife_db"
    GEMINI_API_KEY: str | None = None
    SMTP_EMAIL: str | None = None
    SMTP_APP_PASSWORD: str | None = None
    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
