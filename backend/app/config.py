from pydantic_settings import BaseSettings
from functools import lru_cache
from typing import List


class Settings(BaseSettings):
    groq_api_key: str

    environment: str = "development"
    allowed_origins: str = "http://localhost:5173,http://localhost:3000"

    @property
    def origins_list(self) -> List[str]:
        return [o.strip() for o in self.allowed_origins.split(",")]

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    return Settings()