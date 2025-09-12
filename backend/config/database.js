const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

class Database {
    constructor() {
        this.dbPath = path.join(__dirname, '../database/agreemint.db');
        this.schemaPath = path.join(__dirname, '../database/schema.sql');
        this.db = null;
    }

    // Initialize database connection and create tables
    async initialize() {
        return new Promise((resolve, reject) => {
            this.db = new sqlite3.Database(this.dbPath, (err) => {
                if (err) {
                    console.error('Error opening database:', err.message);
                    reject(err);
                } else {
                    console.log('Connected to SQLite database');
                    this.createTables()
                        .then(() => resolve())
                        .catch(reject);
                }
            });
        });
    }

    // Create tables from schema file
    async createTables() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.schemaPath, 'utf8', (err, sql) => {
                if (err) {
                    reject(err);
                    return;
                }

                this.db.exec(sql, (err) => {
                    if (err) {
                        console.error('Error creating tables:', err.message);
                        reject(err);
                    } else {
                        console.log('Database tables created successfully');
                        resolve();
                    }
                });
            });
        });
    }

    // Get database instance
    getDB() {
        return this.db;
    }

    // Close database connection
    close() {
        if (this.db) {
            this.db.close((err) => {
                if (err) {
                    console.error('Error closing database:', err.message);
                }
                // Don't log success message to avoid Jest warnings
            });
        }
    }
}

module.exports = new Database();