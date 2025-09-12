const database = require('../config/database');

class Analysis {
    // Create a new analysis result
    static async create(analysisData) {
        return new Promise((resolve, reject) => {
            const { 
                contractId, 
                analysisText, 
                confidenceScore, 
                maestroResponse, 
                riskLevel, 
                keyFindings 
            } = analysisData;
            
            const sql = `
                INSERT INTO analysis_results 
                (contract_id, analysis_text, confidence_score, maestro_response, risk_level, key_findings)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            
            database.getDB().run(sql, [
                contractId, 
                analysisText, 
                confidenceScore, 
                JSON.stringify(maestroResponse), 
                riskLevel, 
                JSON.stringify(keyFindings)
            ], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, ...analysisData });
                }
            });
        });
    }

    // Get analysis by ID
    static async findById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM analysis_results WHERE id = ?`;
            
            database.getDB().get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    if (row) {
                        // Parse JSON fields
                        row.maestro_response = JSON.parse(row.maestro_response || '{}');
                        row.key_findings = JSON.parse(row.key_findings || '[]');
                    }
                    resolve(row);
                }
            });
        });
    }

    // Get analysis by contract ID
    static async findByContractId(contractId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT * FROM analysis_results 
                WHERE contract_id = ? 
                ORDER BY analysis_date DESC
            `;
            
            database.getDB().all(sql, [contractId], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    // Parse JSON fields for each row
                    const parsedRows = rows.map(row => ({
                        ...row,
                        maestro_response: JSON.parse(row.maestro_response || '{}'),
                        key_findings: JSON.parse(row.key_findings || '[]')
                    }));
                    resolve(parsedRows);
                }
            });
        });
    }

    // Get contract with its latest analysis
    static async getContractWithAnalysis(contractId) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT 
                    c.*,
                    a.id as analysis_id,
                    a.analysis_text,
                    a.confidence_score,
                    a.analysis_date,
                    a.risk_level,
                    a.key_findings
                FROM contracts c
                LEFT JOIN analysis_results a ON c.id = a.contract_id
                WHERE c.id = ?
                ORDER BY a.analysis_date DESC
                LIMIT 1
            `;
            
            database.getDB().get(sql, [contractId], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    if (row && row.key_findings) {
                        row.key_findings = JSON.parse(row.key_findings);
                    }
                    resolve(row);
                }
            });
        });
    }
}

module.exports = Analysis;