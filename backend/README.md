# AgreeMint Backend

Backend API for the AgreeMint AI Contract Checker application.

## Features

- **File Upload**: Upload contract documents (PDF, DOC, DOCX, TXT)
- **Database Storage**: SQLite database for storing contracts and analysis results
- **REST API**: RESTful endpoints for contract and analysis management
- **File Management**: Automatic file storage and retrieval

## Quick Start

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`

## API Endpoints

### Health Check
- `GET /api/health` - Check server status

### Contracts
- `POST /api/contracts` - Upload a new contract file
- `GET /api/contracts` - Get all contracts (with pagination)
- `GET /api/contracts/:id` - Get specific contract by ID
- `PUT /api/contracts/:id/status` - Update contract status
- `DELETE /api/contracts/:id` - Delete contract

### Analysis
- `POST /api/analysis` - Create new analysis result
- `GET /api/analysis/:id` - Get specific analysis by ID
- `GET /api/analysis/contract/:contractId` - Get all analyses for a contract
- `GET /api/analysis/contract/:contractId/latest` - Get contract with latest analysis

## Database Schema

### Contracts Table
- `id` - Primary key
- `filename` - Generated unique filename
- `original_name` - Original uploaded filename
- `file_path` - Full path to stored file
- `upload_date` - Timestamp of upload
- `file_size` - File size in bytes
- `mime_type` - MIME type of the file
- `status` - Current status (uploaded, processing, analyzed, error)

### Analysis Results Table
- `id` - Primary key
- `contract_id` - Foreign key to contracts table
- `analysis_text` - Main analysis text
- `confidence_score` - Confidence score (0-1)
- `analysis_date` - Timestamp of analysis
- `maestro_response` - Raw JSON response from Maestro API
- `risk_level` - Risk assessment (low, medium, high)
- `key_findings` - JSON array of key findings

## Example Usage

### Upload a Contract
```bash
curl -X POST -F "contract=@contract.pdf" http://localhost:3000/api/contracts
```

### Create Analysis
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{
    "contractId": 1,
    "analysisText": "Analysis results...",
    "confidenceScore": 0.85,
    "riskLevel": "low",
    "keyFindings": ["Finding 1", "Finding 2"]
  }' \
  http://localhost:3000/api/analysis
```

### Get Contract with Analysis
```bash
curl http://localhost:3000/api/analysis/contract/1/latest
```

## Security Features

- Helmet.js for security headers
- File type validation
- File size limits (10MB)
- CORS enabled for cross-origin requests

## Development

For development with auto-restart:
```bash
npm run dev
```

## File Storage

Uploaded files are stored in the `uploads/` directory with automatically generated unique filenames to prevent conflicts.