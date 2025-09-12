const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Contract = require('../models/Contract');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        
        // Ensure uploads directory exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, 'contract-' + uniqueSuffix + extension);
    }
});

// File filter for contract documents
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, DOC, DOCX, and TXT files are allowed.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// POST /contracts - Upload a new contract
router.post('/', upload.single('contract'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const contractData = {
            filename: req.file.filename,
            originalName: req.file.originalname,
            filePath: req.file.path,
            fileSize: req.file.size,
            mimeType: req.file.mimetype
        };

        const contract = await Contract.create(contractData);
        
        res.status(201).json({
            message: 'Contract uploaded successfully',
            contract: contract
        });
    } catch (error) {
        console.error('Error uploading contract:', error);
        res.status(500).json({ error: 'Failed to upload contract' });
    }
});

// GET /contracts - Get all contracts
router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 50;
        const offset = parseInt(req.query.offset) || 0;
        
        const contracts = await Contract.findAll(limit, offset);
        
        res.json({
            contracts: contracts,
            pagination: {
                limit: limit,
                offset: offset,
                count: contracts.length
            }
        });
    } catch (error) {
        console.error('Error fetching contracts:', error);
        res.status(500).json({ error: 'Failed to fetch contracts' });
    }
});

// GET /contracts/:id - Get specific contract
router.get('/:id', async (req, res) => {
    try {
        const contractId = parseInt(req.params.id);
        
        if (isNaN(contractId)) {
            return res.status(400).json({ error: 'Invalid contract ID' });
        }
        
        const contract = await Contract.findById(contractId);
        
        if (!contract) {
            return res.status(404).json({ error: 'Contract not found' });
        }
        
        res.json({ contract: contract });
    } catch (error) {
        console.error('Error fetching contract:', error);
        res.status(500).json({ error: 'Failed to fetch contract' });
    }
});

// PUT /contracts/:id/status - Update contract status
router.put('/:id/status', async (req, res) => {
    try {
        const contractId = parseInt(req.params.id);
        const { status } = req.body;
        
        if (isNaN(contractId)) {
            return res.status(400).json({ error: 'Invalid contract ID' });
        }
        
        if (!status) {
            return res.status(400).json({ error: 'Status is required' });
        }
        
        const result = await Contract.updateStatus(contractId, status);
        
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Contract not found' });
        }
        
        res.json({
            message: 'Contract status updated successfully',
            result: result
        });
    } catch (error) {
        console.error('Error updating contract status:', error);
        res.status(500).json({ error: 'Failed to update contract status' });
    }
});

// DELETE /contracts/:id - Delete contract
router.delete('/:id', async (req, res) => {
    try {
        const contractId = parseInt(req.params.id);
        
        if (isNaN(contractId)) {
            return res.status(400).json({ error: 'Invalid contract ID' });
        }
        
        // Get contract to delete file
        const contract = await Contract.findById(contractId);
        
        if (!contract) {
            return res.status(404).json({ error: 'Contract not found' });
        }
        
        // Delete database record
        const result = await Contract.delete(contractId);
        
        // Delete file from filesystem
        if (fs.existsSync(contract.file_path)) {
            fs.unlinkSync(contract.file_path);
        }
        
        res.json({
            message: 'Contract deleted successfully',
            result: result
        });
    } catch (error) {
        console.error('Error deleting contract:', error);
        res.status(500).json({ error: 'Failed to delete contract' });
    }
});

module.exports = router;