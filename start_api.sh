#!/bin/bash

# AgreeMint Maestro API Startup Script

echo "Starting AgreeMint Maestro API..."

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "Python 3 is required but not installed."
    exit 1
fi

# Install dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "Installing dependencies..."
    pip3 install -r requirements.txt
fi

# Create uploads directory if it doesn't exist
mkdir -p uploads

# Start the API server
echo "Starting FastAPI server on http://0.0.0.0:8000"
python3 main.py