from fastapi import FastAPI, File, UploadFile, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional
import uuid
import json
import os
from datetime import datetime
import aiofiles

app = FastAPI(
    title="AgreeMint Maestro API",
    description="Backend API for AI Contract Checker - handles contract upload and analysis",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data models
class AnalysisResult(BaseModel):
    id: str
    filename: str
    status: str  # "pending", "completed", "failed"
    upload_time: datetime
    analysis_time: Optional[datetime] = None
    results: Optional[Dict] = None
    error_message: Optional[str] = None

class AnalysisResponse(BaseModel):
    analysis_id: str
    message: str

# In-memory storage for demo purposes
# In production, this would be replaced with a database
analysis_storage: Dict[str, AnalysisResult] = {}

# Create uploads directory if it doesn't exist
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information"""
    return {
        "message": "AgreeMint Maestro API",
        "description": "AI Contract Checker Backend",
        "version": "1.0.0",
        "endpoints": {
            "/health": "Health check",
            "/upload": "Upload contract file",
            "/analyze/{analysis_id}": "Get analysis results",
            "/analyses": "List all analyses"
        }
    }

@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.now(),
        "service": "maestro-api"
    }

@app.post("/upload", response_model=AnalysisResponse, tags=["Contract Analysis"])
async def upload_contract(file: UploadFile = File(...)):
    """
    Upload a contract file for analysis
    
    Accepts PDF, DOCX, and TXT files for contract analysis
    """
    # Validate file type
    allowed_types = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type {file.content_type} not supported. Allowed types: PDF, DOCX, TXT"
        )
    
    # Validate file size (max 10MB)
    if file.size and file.size > 10 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File size too large. Maximum size is 10MB"
        )
    
    # Generate unique analysis ID
    analysis_id = str(uuid.uuid4())
    
    # Save file to uploads directory
    file_path = os.path.join(UPLOAD_DIR, f"{analysis_id}_{file.filename}")
    
    try:
        async with aiofiles.open(file_path, 'wb') as f:
            content = await file.read()
            await f.write(content)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to save file: {str(e)}"
        )
    
    # Create analysis record
    analysis_result = AnalysisResult(
        id=analysis_id,
        filename=file.filename,
        status="pending",
        upload_time=datetime.now()
    )
    
    analysis_storage[analysis_id] = analysis_result
    
    # Start background analysis (placeholder - in production this would queue a task)
    await _perform_contract_analysis(analysis_id)
    
    return AnalysisResponse(
        analysis_id=analysis_id,
        message="Contract uploaded successfully. Analysis in progress."
    )

@app.get("/analyze/{analysis_id}", response_model=AnalysisResult, tags=["Contract Analysis"])
async def get_analysis_result(analysis_id: str):
    """
    Retrieve analysis results for a specific contract
    """
    if analysis_id not in analysis_storage:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found"
        )
    
    return analysis_storage[analysis_id]

@app.get("/analyses", response_model=List[AnalysisResult], tags=["Contract Analysis"])
async def list_analyses():
    """
    List all contract analyses
    """
    return list(analysis_storage.values())

@app.delete("/analyze/{analysis_id}", tags=["Contract Analysis"])
async def delete_analysis(analysis_id: str):
    """
    Delete an analysis and its associated file
    """
    if analysis_id not in analysis_storage:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Analysis not found"
        )
    
    # Remove file
    analysis = analysis_storage[analysis_id]
    file_path = os.path.join(UPLOAD_DIR, f"{analysis_id}_{analysis.filename}")
    if os.path.exists(file_path):
        os.remove(file_path)
    
    # Remove from storage
    del analysis_storage[analysis_id]
    
    return {"message": "Analysis deleted successfully"}

async def _perform_contract_analysis(analysis_id: str):
    """
    Placeholder function for contract analysis
    In production, this would integrate with AI/ML models
    """
    try:
        analysis = analysis_storage[analysis_id]
        
        # Simulate analysis processing
        # In production, this would:
        # 1. Extract text from the contract file
        # 2. Run AI analysis on contract terms
        # 3. Identify risks, obligations, key dates, etc.
        
        # Mock analysis results
        mock_results = {
            "contract_type": "Service Agreement",
            "key_terms": [
                {
                    "term": "Payment Terms",
                    "details": "Net 30 days",
                    "risk_level": "low"
                },
                {
                    "term": "Termination Clause",
                    "details": "Either party may terminate with 30 days notice",
                    "risk_level": "medium"
                },
                {
                    "term": "Liability Limitation",
                    "details": "Limited to contract value",
                    "risk_level": "high"
                }
            ],
            "risks_identified": [
                {
                    "risk": "Broad liability limitation clause",
                    "severity": "high",
                    "recommendation": "Consider negotiating more specific liability terms"
                }
            ],
            "compliance_score": 78,
            "overall_risk": "medium"
        }
        
        # Update analysis with results
        analysis.status = "completed"
        analysis.analysis_time = datetime.now()
        analysis.results = mock_results
        
        analysis_storage[analysis_id] = analysis
        
    except Exception as e:
        # Handle analysis failure
        analysis = analysis_storage[analysis_id]
        analysis.status = "failed"
        analysis.error_message = str(e)
        analysis_storage[analysis_id] = analysis

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)