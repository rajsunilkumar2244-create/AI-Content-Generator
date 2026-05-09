from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.config import get_settings
from app.routes.content import router as content_router
from app.models.schemas import HealthResponse
import logging
import traceback
 
logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
)
logger = logging.getLogger(__name__)
 
limiter = Limiter(key_func=get_remote_address)
settings = get_settings()
 
app = FastAPI(
    title="Quill AI — Content Generator API",
    description="Production-ready API for generating structured AI content using Anthropic Claude",
    version="1.0.0",
    docs_url="/docs" if settings.environment == "development" else None,
    redoc_url=None,
)
 
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
 
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
app.include_router(content_router)
 
 
@app.get("/health", response_model=HealthResponse, tags=["system"])
async def health() -> HealthResponse:
    return HealthResponse(status="ok", environment=settings.environment)
 
 
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    tb = traceback.format_exc()
    logger.exception(f"Unhandled error on {request.url}: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc), "traceback": tb},
    )
 