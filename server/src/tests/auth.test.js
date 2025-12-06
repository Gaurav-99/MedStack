const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');

beforeAll(async () => {
    // Connect to a test database or use a mock
    // For this environment, we might not have a separate test DB easily available without Docker.
    // We will try to connect to the local mongo but use a different DB name 'medstack_test'
    const url = process.env.MONGO_URI || 'mongodb://localhost:27017/medstack_test';
    await mongoose.connect(url);
});

afterAll(async () => {
    await User.deleteMany();
    await mongoose.connection.close();
});

describe('Auth API', () => {
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123',
                school: 'Test Med',
                year: 'MS1'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('token');
    });

    it('should not register user with existing email', async () => {
        // First create the user (already done in previous test, but let's ensure order or re-create)
        // Jest runs sequentially by default for 'it' blocks within a describe.
        // The previous test created 'test@example.com'.

        const res = await request(app)
            .post('/api/v1/auth/register')
            .send({
                name: 'Test User 2',
                email: 'test@example.com', // Duplicate email
                password: 'password123'
            });

        expect(res.statusCode).toEqual(400); // Or 500 depending on error handling, ideally 400
        expect(res.body).toHaveProperty('success', false);
    });

    it('should login with valid credentials', async () => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
