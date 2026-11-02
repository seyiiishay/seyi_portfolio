import asyncio
import html
from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import requests
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactMessageCreate(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    message: str = Field(min_length=1, max_length=5000)

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/contact", status_code=201)
async def create_contact_message(input: ContactMessageCreate):
    resend_api_key = os.environ.get("RESEND_API_KEY")
    recipient = os.environ.get("CONTACT_TO_EMAIL")
    sender = os.environ.get(
        "RESEND_FROM_EMAIL", "Portfolio <contact@notify.elorasuite.ca>"
    )
    if not resend_api_key or not recipient:
        logger.error("RESEND_API_KEY and CONTACT_TO_EMAIL must be configured")
        raise HTTPException(status_code=503, detail="Email delivery is not configured")

    message = input.model_dump()
    message["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.contact_messages.insert_one(message)

    safe_name = html.escape(input.name)
    safe_email = html.escape(str(input.email))
    safe_message = html.escape(input.message).replace("\n", "<br>")
    resend_payload = {
        "from": sender,
        "to": [recipient],
        "reply_to": [str(input.email)],
        "subject": f"New portfolio inquiry from {input.name}",
        "text": f"Name: {input.name}\nEmail: {input.email}\n\n{input.message}",
        "html": (
            f"<p><strong>Name:</strong> {safe_name}</p>"
            f"<p><strong>Email:</strong> {safe_email}</p>"
            f"<p>{safe_message}</p>"
        ),
    }
    try:
        response = await asyncio.to_thread(
            requests.post,
            "https://api.resend.com/emails",
            headers={
                "Authorization": f"Bearer {resend_api_key}",
                "Content-Type": "application/json",
            },
            json=resend_payload,
            timeout=10,
        )
        response.raise_for_status()
    except requests.RequestException:
        logger.exception("Resend failed to deliver contact message")
        raise HTTPException(status_code=502, detail="Email delivery failed")

    return {"message": "Your message has been received."}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

# Include the router in the main app
app.include_router(api_router)

@app.get("/")
async def health_check():
    return {"message": "Portfolio API is running", "docs": "/docs"}

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()