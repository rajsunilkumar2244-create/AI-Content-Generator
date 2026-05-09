from fastapi import APIRouter, Request, HTTPException
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.models.schemas import ContentRequest, ContentResponse, ErrorResponse
from app.services.ai_service import generate_content
from app.config import get_settings
import logging
 
logger = logging.getLogger(__name__)
settings = get_settings()
 
limiter = Limiter(key_func=get_remote_address)
router = APIRouter(prefix="/api/v1", tags=["content"])
 
 
@router.post(
    "/generate",
    response_model=ContentResponse,
    responses={
        400: {"model": ErrorResponse},
        429: {"description": "Rate limit exceeded"},
        500: {"model": ErrorResponse},
    },
    summary="Generate AI content",
    description="Submit a topic and content preferences to receive AI-generated content via Gemini.",
)
@limiter.limit("10/minute")
async def generate(request: Request, body: ContentRequest):
    """
    Generate AI content using Google Gemini.
 
    - **topic**: What the content should be about (required)
    - **content_type**: blog | caption | email | tweet | product_description | ad_copy
    - **tone**: formal | casual | persuasive | humorous | empathetic | professional
    - **target_audience**: Optional description of your target audience
    - **additional_context**: Optional extra context for the AI
    """
    try:
        # FIX 6: generate_content returns a ContentResponse directly — just return it
        return await generate_content(body)
 
    except HTTPException:
        # Re-raise HTTP exceptions from the service layer as-is
        raise
 
    except ValueError as e:
        logger.warning(f"Content generation failed (user error): {e}")
        raise HTTPException(status_code=400, detail=str(e))
 
    except Exception as e:
        logger.exception(f"Unexpected error during content generation: {e}")
        raise HTTPException(status_code=500, detail="Internal server error. Please try again.")