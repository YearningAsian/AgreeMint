const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const database = require('./config/database');

// Import routes
const contractsRouter = require('./routes/contracts');
const analysisRouter = require('./routes/analysis');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies

// Serve uploaded files statically (for development)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/contracts', contractsRouter);
app.use('/api/analysis', analysisRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'AgreeMint Backend API',
        version: '1.0.0',
        endpoints: {
            contracts: '/api/contracts',
            analysis: '/api/analysis',
            health: '/api/health'
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'File too large. Maximum size is 10MB.' });
    }
    
    if (err.message.includes('Invalid file type')) {
        return res.status(400).json({ error: err.message });
    }
    
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Initialize database and start server
async function startServer() {
    try {
        await database.initialize();
        
        app.listen(PORT, () => {
            console.log(`AgreeMint Backend Server running on port ${PORT}`);
            console.log(`Health check: http://localhost:${PORT}/api/health`);
            console.log(`API Documentation: http://localhost:${PORT}/`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down gracefully...');
    database.close();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\nShutting down gracefully...');
    database.close();
    process.exit(0);
});

if (require.main === module) {
    startServer();
}

module.exports = app;