const request = require('supertest');
const app = require('../server');
const database = require('../config/database');

describe('AgreeMint Backend API', () => {
    beforeAll(async () => {
        await database.initialize();
    });

    afterAll(async () => {
        database.close();
    });

    describe('Health Check', () => {
        test('GET /api/health should return healthy status', async () => {
            const response = await request(app)
                .get('/api/health')
                .expect(200);
            
            expect(response.body.status).toBe('healthy');
            expect(response.body.version).toBe('1.0.0');
        });
    });

    describe('Root Endpoint', () => {
        test('GET / should return API information', async () => {
            const response = await request(app)
                .get('/')
                .expect(200);
            
            expect(response.body.message).toBe('AgreeMint Backend API');
            expect(response.body.endpoints).toBeDefined();
        });
    });

    describe('Contracts API', () => {
        test('GET /api/contracts should return empty array initially', async () => {
            const response = await request(app)
                .get('/api/contracts')
                .expect(200);
            
            expect(response.body.contracts).toBeInstanceOf(Array);
            expect(response.body.pagination).toBeDefined();
        });

        test('GET /api/contracts/999 should return 404 for non-existent contract', async () => {
            const response = await request(app)
                .get('/api/contracts/999')
                .expect(404);
            
            expect(response.body.error).toBe('Contract not found');
        });
    });

    describe('Analysis API', () => {
        test('GET /api/analysis/999 should return 404 for non-existent analysis', async () => {
            const response = await request(app)
                .get('/api/analysis/999')
                .expect(404);
            
            expect(response.body.error).toBe('Analysis not found');
        });

        test('POST /api/analysis should require contractId and analysisText', async () => {
            const response = await request(app)
                .post('/api/analysis')
                .send({})
                .expect(400);
            
            expect(response.body.error).toContain('Contract ID and analysis text are required');
        });
    });

    describe('Error Handling', () => {
        test('GET /invalid-endpoint should return 404', async () => {
            const response = await request(app)
                .get('/invalid-endpoint')
                .expect(404);
            
            expect(response.body.error).toBe('Endpoint not found');
        });
    });
});