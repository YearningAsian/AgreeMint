# AgreeMint Maestro API

Backend API for the AgreeMint AI Contract Checker application.

## Features

- **Contract Upload**: Upload PDF, DOCX, or TXT contract files
- **AI Analysis**: Automated contract analysis with risk assessment
- **Results Retrieval**: Get detailed analysis results
- **File Management**: Upload, analyze, and delete contract files

## API Endpoints

### Core Endpoints

- `GET /` - API information and available endpoints
- `GET /health` - Health check endpoint
- `POST /upload` - Upload contract file for analysis
- `GET /analyze/{analysis_id}` - Get analysis results
- `GET /analyses` - List all analyses
- `DELETE /analyze/{analysis_id}` - Delete analysis and file

### Interactive Documentation

When running locally, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Quick Start

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Start the API server:
   ```bash
   python main.py
   ```
   Or use the startup script:
   ```bash
   ./start_api.sh
   ```

3. The API will be available at `http://localhost:8000`

## Usage Example

### Upload a contract:
```bash
curl -X POST "http://localhost:8000/upload" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@contract.pdf"
```

### Get analysis results:
```bash
curl -X GET "http://localhost:8000/analyze/{analysis_id}" \
     -H "accept: application/json"
```

## Analysis Results

The API returns detailed analysis including:
- Contract type identification
- Key terms extraction
- Risk assessment
- Compliance scoring
- Specific recommendations

## File Support

Supported file formats:
- PDF (application/pdf)
- DOCX (application/vnd.openxmlformats-officedocument.wordprocessingml.document)
- TXT (text/plain)

Maximum file size: 10MB

## Development

The API is built with:
- **FastAPI** - Modern, fast web framework
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server

## Architecture

```
AgreeMint/
├── main.py              # Main FastAPI application
├── requirements.txt     # Python dependencies
├── start_api.sh        # Startup script
├── uploads/            # Uploaded contract files
└── README_API.md       # This documentation
```