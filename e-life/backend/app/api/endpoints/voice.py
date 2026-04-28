from fastapi import APIRouter, HTTPException
from app.schemas.voice import VoiceRequest, VoiceResponse
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/ask", response_model=VoiceResponse)
async def process_voice_query(query: VoiceRequest):
    """
    Receives TEXT from the frontend (converted from Speech locally via Web Speech API).
    Processes it and returns TEXT to be spoken back locally (TTS).
    Zero Latency Rule applied.
    """
    try:
        user_text = query.text
        
        # Reverting to Gemini to ensure a working state since OpenAI/Sarvam keys had quota/auth issues
        import google.generativeai as genai
        import os
        from dotenv import load_dotenv
        
        env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), '.env')
        load_dotenv(dotenv_path=env_path, override=True)
        api_key = os.getenv("GEMINI_API_KEY")
        if api_key:
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-2.5-flash')
            prompt = f"""You are an intelligent, highly engaging AI voice assistant for the EDU-JOB learning platform.
The user has the following personalized career guidance profile: {query.user_guidance or 'Not provided'}.
Please factor their personalized career guidance heavily into your response if relevant.

Your task is to comprehensively and accurately answer the user's question in detail.
Provide a clear, detailed explanation of the topic they asked about.
Crucially, you MUST ALWAYS end your response by asking an engaging follow-up question to keep the conversation interactive and educational.

User Question: {user_text}

Answer:"""
            llm_response = model.generate_content(prompt)
            reply = llm_response.text.strip()
        else:
            # Fallback if no API key is provided
            reply = f"I heard you say: '{user_text}'. To get dynamic AI answers to any question, please add your GEMINI_API_KEY to the backend environment variables."
            
        return VoiceResponse(response_text=reply)
        
    except Exception as e:
        logger.error(f"Error processing voice query: {str(e)}")
        # Return the actual error message to the frontend for debugging
        return VoiceResponse(response_text=f"AI Error: {str(e)}")
