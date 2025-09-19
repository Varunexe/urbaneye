from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI Traffic Violation Detection API",
    description="Advanced AI system for detecting traffic violations",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {
        "message": "AI Traffic Violation Detection API",
        "status": "running",
        "version": "1.0.0"
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "ai_models": "loaded"
    }

@app.get("/api/violations")
async def get_violations():
    return {
        "violations": [
            {
                "id": 1,
                "type": "no_helmet",
                "plate": "MH12AB1234",
                "timestamp": "2024-01-15T10:30:00",
                "fine": 1000,
                "status": "detected"
            }
        ],
        "total": 1
    }