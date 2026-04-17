import os
from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from . import models, auth

def seed_db():
    # Create tables if they don't exist
    models.Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    # 1. Create Admin User
    admin_user = os.getenv("ADMIN_USERNAME", "admin")
    admin_password = os.getenv("ADMIN_PASSWORD", "admin123")
    
    existing_user = db.query(models.User).filter(models.User.username == admin_user).first()
    if not existing_user:
        print(f"Creating admin user: {admin_user}")
        hashed_pw = auth.get_password_hash(admin_password)
        db_user = models.User(username=admin_user, hashed_password=hashed_pw)
        db.add(db_user)
        db.commit()
    
    # 2. Seed Projects
    projects_data = [
        {
            "title": "RAG Complaint Chatbot",
            "description": "Retrieval-Augmented Generation system for handling customer complaints with LLMs and LangChain integration.",
            "category": "machine-learning",
            "tags": "rag,llm,langchain,python",
            "code_link": "https://github.com/soltsega/Rag-complaint-chatbot",
            "order": 1
        },
        {
            "title": "Arat Kilo Community Hub",
            "description": "Python-powered pipeline with modern glassmorphism dashboard for Telegram quiz results visualization and community engagement.",
            "category": "web-development",
            "tags": "html,css,dashboard",
            "code_link": "https://github.com/soltsega/Arat-Kilo-Gbi-Gubae-Community-Hub",
            "order": 2
        },
        {
            "title": "Financial Inclusion Forecasting",
            "description": "Advanced time-series analysis to forecast Ethiopia's digital financial transformation using Python and Scikit-Learn.",
            "category": "data-science",
            "tags": "forecasting,time-series,python",
            "code_link": "https://github.com/soltsega/Forecasting-Financial-Inclusion-in-Ethiopia",
            "order": 3
        },
        {
            "title": "Portfolio Management Optimization",
            "description": "Time-series forecasting tool for portfolio management optimization using advanced financial data analysis techniques.",
            "category": "data-science",
            "tags": "time-series,portfolio,python",
            "code_link": "https://github.com/soltsega/Time-Series-Forecasting-for-Portfolio-Management-Optimization",
            "order": 4
        },
        {
            "title": "Change Point Analysis",
            "description": "Detecting changes and associating causes on time series data using advanced statistical modeling techniques.",
            "category": "data-analysis",
            "tags": "change-point,statistics,jupyter",
            "code_link": "https://github.com/soltsega/Change-Point-Analysis-and-Statistical-Modeling-of-Time-Series-Data",
            "order": 5
        },
        {
            "title": "Credit Risk Analysis",
            "description": "Predictive modeling to assess credit risk using advanced machine learning algorithms and financial data analysis.",
            "category": "machine-learning",
            "tags": "python,credit-risk,machine-learning",
            "code_link": "https://github.com/soltsega/Credit_Risk-Analysis",
            "order": 6
        },
        {
            "title": "Resume Screening Using NLP",
            "description": "Automated resume screening system using Natural Language Processing to analyze and rank candidate qualifications efficiently.",
            "category": "machine-learning",
            "tags": "nlp,resume-screening,python",
            "code_link": "https://github.com/soltsega/Resume_Screening_Using_NLP",
            "order": 7
        },
        {
            "title": "Telegram Data Pipeline",
            "description": "End-to-end data pipeline for Telegram data with YOLOv8 enrichment, Dagster orchestration, and analytical API endpoints.",
            "category": "machine-learning",
            "tags": "data-pipeline,yolo,telegram",
            "code_link": "https://github.com/soltsega/An-end-to-end-telegram-data-pipeline",
            "order": 8
        },
        {
            "title": "Universal Chronos Bridge",
            "description": "Unified chronological synchronization engine supporting Gregorian, Ethiopian, Islamic Hijri, and Sidama calendar systems with precise conversion algorithms.",
            "category": "software-engineering",
            "tags": "cpp,calendar,system",
            "code_link": "https://github.com/soltsega/-The-Universal-Chronos-Bridge",
            "order": 9
        },
        {
            "title": "QA with Transformers",
            "description": "Implementation of transformer-based models for high-accuracy question answering tasks using state-of-the-art NLP techniques.",
            "category": "machine-learning",
            "tags": "transformers,nlp,pytorch",
            "code_link": "https://github.com/soltsega/Question-Answering-with-Transformers_NLP",
            "order": 10
        },
        {
            "title": "Bank Review Analysis",
            "description": "Sentiment analysis and topic modeling on Google Play Store reviews for banking applications to extract customer insights.",
            "category": "data-analysis",
            "tags": "sentiment-analysis,nlp,python",
            "code_link": "https://github.com/soltsega/Bank-Review-Analysis---Google-Playstore-Review-Analysis",
            "order": 11
        },
        {
            "title": "Insurance Risk Analysis",
            "description": "Comprehensive analysis of insurance data to identify trends, risks, and optimization opportunities using statistical modeling.",
            "category": "data-analysis",
            "tags": "insurance,data-analysis,python",
            "code_link": "https://github.com/soltsega/Insurance-Analysis",
            "order": 12
        }
    ]
    
    if db.query(models.Project).count() == 0:
        print("Seeding projects...")
        for p in projects_data:
            db_project = models.Project(**p)
            db.add(db_project)
        db.commit()

    # 3. Seed Credentials from credentials.html
    credentials_data = [
        {
            "title": "KAIM Professional AI Specialist",
            "subtitle": "Knowledge AI Model Certification",
            "description": "Mastery of Retrieval-Augmented Generation (RAG) and Large Language Model (LLM) orchestration for complex problem-solving.",
            "category": "work",
            "image_url": "credentials/KAIM_main.jpg",
            "order": 1
        }
    ]

    if db.query(models.Credential).count() == 0:
        print("Seeding credentials...")
        for c in credentials_data:
            db_cred = models.Credential(**c)
            db.add(db_cred)
        db.commit()

    db.close()

if __name__ == "__main__":
    seed_db()
