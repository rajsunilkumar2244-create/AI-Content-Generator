import asyncio
import logging
import os
from dotenv import load_dotenv
from groq import Groq
from app.models.schemas import ContentRequest, ContentResponse
from app.services.prompt_service import (
    build_system_prompt,
    build_user_prompt,
    get_generation_params,
)

load_dotenv()
logger = logging.getLogger(__name__)

api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise RuntimeError("GROQ_API_KEY is not set. Check your .env file.")

client = Groq(api_key=api_key)


async def generate_content(req: ContentRequest) -> ContentResponse:
    system_prompt = build_system_prompt()
    user_prompt = build_user_prompt(req)
    generation_params = get_generation_params(req.content_type)

    try:
        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(
            None,
            lambda: client.chat.completions.create(
                model="llama-3.3-70b-versatile",  # Free & fast
                max_tokens=1024,
                temperature=generation_params.get("temperature", 0.7),
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
            ),
        )

        content_text = response.choices[0].message.content
        word_count = len(content_text.split())

        return ContentResponse(
            content=content_text,
            content_type=req.content_type,
            tone=req.tone,
            topic=req.topic,
            word_count=word_count,
            model_used=response.model,
        )

    except Exception as e:
        logger.error(f"Groq API error: {e}")
        raise Exception(f"AI service error: {e}")