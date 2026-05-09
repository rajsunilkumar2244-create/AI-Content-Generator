from app.models.schemas import ContentType, Tone, ContentRequest
 
# LENGTH GUIDE
LENGTH_GUIDE = {
    "blog": "800-1200 words. Use H2/H3 headings, short paragraphs, bullet points.",
    "caption": "Short and engaging, 1-2 lines with emojis.",
    "email": "Professional email format with subject and body.",
    "tweet": "Under 280 characters, catchy and concise.",
    "product_description": "Persuasive and benefit-focused.",
    "ad_copy": "High-converting, persuasive marketing copy."
}
 
# TONE DESCRIPTOR
TONE_DESCRIPTOR = {
    Tone.FORMAL: "authoritative and precise — use complete sentences, avoid contractions",
    Tone.CASUAL: "warm and conversational — use contractions and relatable tone",
    Tone.PERSUASIVE: "compelling and benefit-driven — highlight value and urgency",
    Tone.HUMOROUS: "witty and light — use simple humor",
    Tone.EMPATHETIC: "warm and human — acknowledge emotions",
    Tone.PROFESSIONAL: "polished and credible — clear and structured",
}
 
# FORMAT GUIDE
FORMAT_GUIDE = {
    ContentType.BLOG: """Structure:
- Title
- Hook intro
- 4-6 sections
- Conclusion""",
 
    ContentType.CAPTION: """Structure:
- Hook line
- Short content
- Hashtags""",
 
    ContentType.EMAIL: """Structure:
Subject
Opening
Body
CTA
Sign-off""",
 
    ContentType.TWEET: """Structure:
Hook
Idea
Insight
CTA""",
 
    ContentType.PRODUCT_DESCRIPTION: """Structure:
Intro
Features
Benefits
CTA""",
 
    ContentType.AD_COPY: """Structure:
Headline
Body
CTA""",
}
 
 
# SYSTEM PROMPT
def build_system_prompt() -> str:
    return """You are an expert content writer.
 
Rules:
- Write like a human
- No fluff
- No generic phrases
- No AI-style writing
- Output only content
"""
 
 
# USER PROMPT
def build_user_prompt(req: ContentRequest) -> str:
    length = LENGTH_GUIDE.get(req.content_type.value, "300-500 words")
    tone_desc = TONE_DESCRIPTOR.get(req.tone, "professional tone")
    fmt = FORMAT_GUIDE.get(req.content_type, "")
 
    return f"""Write a {req.content_type.value} on "{req.topic}"
 
Tone: {tone_desc}
Audience: {req.target_audience or "general audience"}
Context: {req.additional_context or ""}
 
Format:
{fmt}
 
Length:
{length}
"""
 
 
# GENERATION PARAMS
def get_generation_params(content_type: ContentType) -> dict:
    base = {"temperature": 0.7}
 
    overrides = {
        ContentType.TWEET: {"temperature": 0.85},
        ContentType.AD_COPY: {"temperature": 0.8},
    }
 
    return {**base, **overrides.get(content_type, {})}