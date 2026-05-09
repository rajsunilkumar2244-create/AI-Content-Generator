from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum
 
 
class ContentType(str, Enum):
    BLOG = "blog"
    CAPTION = "caption"
    EMAIL = "email"
    TWEET = "tweet"
    PRODUCT_DESCRIPTION = "product_description"
    AD_COPY = "ad_copy"
 
 
class Tone(str, Enum):
    FORMAL = "formal"
    CASUAL = "casual"
    PERSUASIVE = "persuasive"
    HUMOROUS = "humorous"
    EMPATHETIC = "empathetic"
    PROFESSIONAL = "professional"
 
 
class ContentRequest(BaseModel):
    topic: str = Field(..., min_length=3, max_length=500)
    content_type: ContentType = Field(default=ContentType.BLOG)
    tone: Tone
    target_audience: Optional[str] = None
    additional_context: Optional[str] = None
 
 
class ContentResponse(BaseModel):
    content: str
    content_type: ContentType
    tone: Tone
    topic: str
    word_count: int
    model_used: str
 
 
class ErrorResponse(BaseModel):
    detail: str
 
 
class HealthResponse(BaseModel):
    status: str
    environment: str  # fixed: was "message" but main.py passes "environment"