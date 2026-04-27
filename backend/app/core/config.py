from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Smart Workforce Exchange"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = "super_secret_key_change_me_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    GROQ_API_KEY: str = ""

    # Database
    DATABASE_URL: str = "sqlite:///./sql_app.db"  # Default to SQLite for easy build

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")

settings = Settings()
