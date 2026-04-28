from app.schemas.user import UserCreate
from pymongo import MongoClient
import random
import os
import certifi
import google.generativeai as genai
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env')
load_dotenv(dotenv_path=env_path, override=True)

# MongoDB connection
MONGO_URI = "mongodb+srv://Admin69:root69@cluster0.0u2vw.mongodb.net/?appName=Cluster0"
mongo_client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
db = mongo_client["elife_platform"]
users_collection = db["users"]

class MongoUser:
    def __init__(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)

import hashlib
import bcrypt

def get_password_hash(password: str) -> str:
    # Use bcrypt directly to bypass passlib compatibility issues with bcrypt 4.x
    sha256_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(sha256_password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def verify_password(plain_password: str, hashed_password: str) -> bool:
    sha256_password = hashlib.sha256(plain_password.encode('utf-8')).hexdigest()
    return bcrypt.checkpw(sha256_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_user(db, user_id: int):
    user_data = users_collection.find_one({"id": user_id})
    if user_data:
        return MongoUser(**user_data)
    return None

def get_user_by_email(db, email: str):
    user_data = users_collection.find_one({"email": email})
    if user_data:
        return MongoUser(**user_data)
    return None

def create_user(db, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    user_dict = user.dict()
    user_dict.pop("password", None)
    user_dict["hashed_password"] = hashed_password
    user_dict["id"] = random.randint(1000, 9999999)
    user_dict["is_active"] = True
    user_dict["is_2fa_enabled"] = False
    
    # Generate Personalized Career Guidance using AI
    career_guidance = "We are preparing your personalized career guidance based on your profile."
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key and (user.domain or user.learning_goals):
        try:
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-2.5-flash')
            
            exp = user.experience_level.value if hasattr(user.experience_level, 'value') else "enthusiast"
            domain = user.domain if user.domain else "technology"
            goals = user.learning_goals if user.learning_goals else "advancing my career"
            
            prompt = f"You are an expert career mentor. Generate a short, personalized career guidance and tailored recommendations for a user named {user.name}. They are a {exp} in {domain} and their aspirations are: {goals}. Keep it highly inspiring, actionable, and under 100 words."
            response = model.generate_content(prompt)
            career_guidance = response.text.strip()
        except Exception as e:
            pass
            
    user_dict["career_guidance"] = career_guidance
    
    if hasattr(user.role, 'value'):
        user_dict["role"] = user.role.value
    if hasattr(user.experience_level, 'value') and user.experience_level:
        user_dict["experience_level"] = user.experience_level.value

    users_collection.insert_one(user_dict.copy())
    return MongoUser(**user_dict)
