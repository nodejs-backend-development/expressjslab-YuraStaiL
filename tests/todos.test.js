const request = require('supertest');
const app = require('../app');
const { REST_API_URL, TOKEN } = require('../global_keys/keys');
const { makeRequest } = require('../clients/httpClient');
require('dotenv').config();

jest.mock('../clients/httpClient');

const todo1 = {
    id: 1,
    user_id: 2,
    title: 'wash plate',
    due_on: null,
    status: 'pending',
};

const todo2 = {
    title: 'wash plate',
    status: 'pending',
};

afterEach(() => {
    jest.clearAllMocks();
});

describe('GET /todo/:userId', () => {
    it('should get todos by user id', async () => {
        makeRequest.mockResolvedValueOnce(todo1);

        const res = await request(app)
            .get(`/todo/888`)
            .set('Authorization', `Bearer ${TOKEN}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(todo1);
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${REST_API_URL}/users/888/todos`, 'GET',`Bearer ${TOKEN}`);
    });

    it('should handle errors getting users by id', async () => {
        makeRequest.mockRejectedValueOnce(new Error('Todos not found'));

        const res = await request(app)
            .get('/todo/2')
            .set('Authorization', `Bearer ${TOKEN}`);

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error getting todos');
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${REST_API_URL}/users/2/todos`, 'GET', `Bearer ${TOKEN}`);
    });
});

describe('POST /todo', () => {
    it('should create a new todo', async () => {
        const createdTodo = {
            id: 1,
            ...todo2
        };
        makeRequest.mockResolvedValueOnce(createdTodo);

        const res = await request(app)
            .post(`/todo/1`)
            .send(todo2)
            .set('Authorization', `Bearer ${TOKEN}`);

        expect(res.statusCode).toBe(201);
        expect(res.body).toStrictEqual(createdTodo);
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${REST_API_URL}/users/1/todos`, 'POST', `Bearer ${TOKEN}`, todo2);
    });

    it('should handle errors create new todo', async () => {
        makeRequest.mockRejectedValueOnce(new Error('Todos create failed'));

        const res = await request(app)
            .post(`/todo/1`)
            .send(todo2)
            .set('Authorization', `Bearer ${TOKEN}`);

        expect(res.statusCode).toBe(500);
        expect(res.text).toBe('Error creating todo');
        expect(makeRequest).toHaveBeenCalledTimes(1);
        expect(makeRequest).toHaveBeenCalledWith(`${REST_API_URL}/users/1/todos`, 'POST', `Bearer ${TOKEN}`, todo2);
    });
});