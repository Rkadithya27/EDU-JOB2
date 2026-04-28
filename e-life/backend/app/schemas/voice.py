from pydantic import BaseModel

from typing import Optional

class VoiceRequest(BaseModel):
    text: str
    user_guidance: Optional[str] = None

class VoiceResponse(BaseModel):
    response_text: str
