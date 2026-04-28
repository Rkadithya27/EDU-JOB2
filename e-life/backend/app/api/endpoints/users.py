from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.user import UserCreate, UserResponse, UserLogin
from app.crud import crud_user
from app.core.exceptions import UserAlreadyExistsException, UserNotFoundException
from app.core.config import settings

from pydantic import BaseModel
import smtplib
from email.mime.text import MIMEText
import random
import os
from app.crud.crud_user import db

class OTPRequest(BaseModel):
    email: str

class OTPVerify(BaseModel):
    email: str
    token: str

router = APIRouter()

@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = crud_user.get_user_by_email(db, email=user.email)
        if db_user:
            raise UserAlreadyExistsException()
        return crud_user.create_user(db=db, user=user)
    except UserAlreadyExistsException:
        raise
    except Exception as e:
        import logging
        import traceback
        logger = logging.getLogger(__name__)
        logger.error(f"Error creating user: {str(e)}")
        raise HTTPException(status_code=500, detail=traceback.format_exc())

@router.post("/send-otp")
def send_otp(request: OTPRequest):
    email = request.email
    otp_code = str(random.randint(100000, 999999))
    
    import logging
    logger = logging.getLogger(__name__)
    
    # Store OTP in DB
    db["otps"].update_one({"email": email}, {"$set": {"otp": otp_code}}, upsert=True)
    
    sender_email = settings.SMTP_EMAIL
    sender_password = settings.SMTP_APP_PASSWORD
    
    if sender_email and sender_password:
        try:
            msg = MIMEText(f"Hello,\n\nYour EDU-JOB 2-Step Verification code is: {otp_code}\n\nThis code will expire shortly.")
            msg['Subject'] = 'Your EDU-JOB Login Verification Code'
            msg['From'] = f"EDU-JOB <{sender_email}>"
            msg['To'] = email

            with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
                server.login(sender_email, sender_password)
                server.send_message(msg)
            logger.info(f"OTP successfully sent to {email}")
            return {"status": "sent", "email": email}
        except Exception as e:
            logger.error(f"SMTP Error sending OTP to {email}: {e}")
            raise HTTPException(status_code=500, detail="Failed to send email. Ensure your Google App Password is correct.")
    else:
        raise HTTPException(status_code=500, detail="SYSTEM ERROR: SMTP credentials missing. To send real emails, you must add SMTP_EMAIL and SMTP_APP_PASSWORD to your backend/.env file.")

@router.post("/verify-otp")
def verify_otp(data: OTPVerify):
    email = data.email
    otp_code = data.token
    
    record = db["otps"].find_one({"email": email, "otp": otp_code})
    if record:
        db["otps"].delete_one({"_id": record["_id"]})
        return {"status": "verified"}
    else:
        raise HTTPException(status_code=400, detail="Invalid OTP")

@router.post("/login", response_model=UserResponse)
def login_user(login_data: UserLogin, db: Session = Depends(get_db)):
    user = crud_user.get_user_by_email(db, email=login_data.email)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if not crud_user.verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
        
    return user

@router.get("/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud_user.get_user(db, user_id=user_id)
    if db_user is None:
        raise UserNotFoundException()
    return db_user
