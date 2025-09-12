const database = require('../config/database');

class Contract {
    // Create a new contract record
    static async create(contractData) {
        return new Promise((resolve, reject) => {
            const { filename, originalName, filePath, fileSize, mimeType } = contractData;
            const sql = `
                INSERT INTO contracts (filename, original_name, file_path, file_size, mime_type)
                VALUES (?, ?, ?, ?, ?)
            `;
            
            database.getDB().run(sql, [filename, originalName, filePath, fileSize, mimeType], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, ...contractData });
                }
            });
        });
    }

    // Get contract by ID
    static async findById(id) {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM contracts WHERE id = ?`;
            
            database.getDB().get(sql, [id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    // Get all contracts
    static async findAll(limit = 50, offset = 0) {
        return new Promise((resolve, reject) => {
            const sql = `
                SELECT * FROM contracts 
                ORDER BY upload_date DESC 
                LIMIT ? OFFSET ?
            `;
            
            database.getDB().all(sql, [limit, offset], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Update contract status
    static async updateStatus(id, status) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE contracts SET status = ? WHERE id = ?`;
            
            database.getDB().run(sql, [status, id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id, status, changes: this.changes });
                }
            });
        });
    }

    // Delete contract
    static async delete(id) {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM contracts WHERE id = ?`;
            
            database.getDB().run(sql, [id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id, deleted: this.changes > 0 });
                }
            });
        });
    }
}

module.exports = Contract;