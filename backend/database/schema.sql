-- AgreeMint Database Schema
-- SQLite database for storing contracts and analysis results

-- Contracts table for storing uploaded contract files
CREATE TABLE IF NOT EXISTS contracts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    file_size INTEGER,
    mime_type TEXT,
    status TEXT DEFAULT 'uploaded' -- uploaded, processing, analyzed, error
);

-- Analysis results table for storing AI analysis from Maestro API
CREATE TABLE IF NOT EXISTS analysis_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contract_id INTEGER NOT NULL,
    analysis_text TEXT,
    confidence_score REAL,
    analysis_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    maestro_response TEXT, -- Raw JSON response from Maestro API
    risk_level TEXT, -- low, medium, high
    key_findings TEXT, -- JSON array of key findings
    FOREIGN KEY (contract_id) REFERENCES contracts(id)
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_contracts_upload_date ON contracts(upload_date);
CREATE INDEX IF NOT EXISTS idx_analysis_contract_id ON analysis_results(contract_id);
CREATE INDEX IF NOT EXISTS idx_analysis_date ON analysis_results(analysis_date);