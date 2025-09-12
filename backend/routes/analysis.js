const express = require('express');
const Analysis = require('../models/Analysis');
const Contract = require('../models/Contract');
const router = express.Router();

// POST /analysis - Create new analysis result
router.post('/', async (req, res) => {
    try {
        const {
            contractId,
            analysisText,
            confidenceScore,
            maestroResponse,
            riskLevel,
            keyFindings
        } = req.body;

        // Validate required fields
        if (!contractId || !analysisText) {
            return res.status(400).json({ 
                error: 'Contract ID and analysis text are required' 
            });
        }

        // Verify contract exists
        const contract = await Contract.findById(contractId);
        if (!contract) {
            return res.status(404).json({ error: 'Contract not found' });
        }

        const analysisData = {
            contractId,
            analysisText,
            confidenceScore: confidenceScore || null,
            maestroResponse: maestroResponse || {},
            riskLevel: riskLevel || 'unknown',
            keyFindings: keyFindings || []
        };

        const analysis = await Analysis.create(analysisData);
        
        // Update contract status to 'analyzed'
        await Contract.updateStatus(contractId, 'analyzed');

        res.status(201).json({
            message: 'Analysis created successfully',
            analysis: analysis
        });
    } catch (error) {
        console.error('Error creating analysis:', error);
        res.status(500).json({ error: 'Failed to create analysis' });
    }
});

// GET /analysis/:id - Get specific analysis
router.get('/:id', async (req, res) => {
    try {
        const analysisId = parseInt(req.params.id);
        
        if (isNaN(analysisId)) {
            return res.status(400).json({ error: 'Invalid analysis ID' });
        }
        
        const analysis = await Analysis.findById(analysisId);
        
        if (!analysis) {
            return res.status(404).json({ error: 'Analysis not found' });
        }
        
        res.json({ analysis: analysis });
    } catch (error) {
        console.error('Error fetching analysis:', error);
        res.status(500).json({ error: 'Failed to fetch analysis' });
    }
});

// GET /analysis/contract/:contractId - Get all analyses for a contract
router.get('/contract/:contractId', async (req, res) => {
    try {
        const contractId = parseInt(req.params.contractId);
        
        if (isNaN(contractId)) {
            return res.status(400).json({ error: 'Invalid contract ID' });
        }
        
        const analyses = await Analysis.findByContractId(contractId);
        
        res.json({
            contractId: contractId,
            analyses: analyses,
            count: analyses.length
        });
    } catch (error) {
        console.error('Error fetching analyses:', error);
        res.status(500).json({ error: 'Failed to fetch analyses' });
    }
});

// GET /analysis/contract/:contractId/latest - Get contract with latest analysis
router.get('/contract/:contractId/latest', async (req, res) => {
    try {
        const contractId = parseInt(req.params.contractId);
        
        if (isNaN(contractId)) {
            return res.status(400).json({ error: 'Invalid contract ID' });
        }
        
        const contractWithAnalysis = await Analysis.getContractWithAnalysis(contractId);
        
        if (!contractWithAnalysis) {
            return res.status(404).json({ error: 'Contract not found' });
        }
        
        res.json({
            contract: contractWithAnalysis
        });
    } catch (error) {
        console.error('Error fetching contract with analysis:', error);
        res.status(500).json({ error: 'Failed to fetch contract with analysis' });
    }
});

module.exports = router;