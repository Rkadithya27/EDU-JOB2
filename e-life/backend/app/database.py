from pymongo import MongoClient
import certifi
from sqlalchemy.orm import declarative_base

# Keeping Base for schema definitions to prevent import errors
Base = declarative_base()

MONGO_URI = "mongodb+srv://Admin69:root69@cluster0.0u2vw.mongodb.net/?appName=Cluster0"

def get_db():
    client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
    db = client["elife_platform"]
    try:
        yield db
    finally:
        client.close()
