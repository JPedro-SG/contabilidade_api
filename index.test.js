const request = require('supertest');
const server = require('./index.js');

describe('INTEGRATION TESTS - API de produtos com better-sqlite3', () => {

    it('GET /products deve retornar todos os produtos', async () => {
        const res = await request(server).get('/products');
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0); // 4 produtos do seed
    });

    it('GET /products/:id deve retornar produto pelo id', async () => {
        const res = await request(server).get('/products/1');
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe('Camiseta Básica');
    });

    it('GET /products/:id com id inexistente deve retornar 400', async () => {
        const res = await request(server).get('/products/999');
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.messages).toContain('Produto não encontrado');
    });

    it('POST /products deve criar novo produto', async () => {
        const res = await request(server).post('/products').send({
            name: 'Jaqueta',
            price: 150,
            stock: 20
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe('Jaqueta');
    });

    it('POST /products com dados inválidos deve retornar 400', async () => {
        const res = await request(server).post('/products').send({
            name: 'a',
            price: -10,
            stock: 5.5
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.messages).toContain('O nome deve ter pelo menos três caracteres.');
        expect(res.body.messages).toContain('O preço não pode ser negativo.');
        expect(res.body.messages).toContain('O estoque precisa ser um número inteiro.');
    });
});


describe('INTEGRATION TESTS - API de clientes', () => {

    it('POST /clients cria cliente corretamente', async () => {
        const res = await request(server).post('/clients').send({
            name: 'Bruno Ferreira',
            email: 'bruno.ferreira@email.com'
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.name).toBe('Bruno Ferreira');
    });

    it('POST /clients com email duplicado retorna erro', async () => {
        await request(server).post('/clients').send({
            name: 'Carla Santos',
            email: 'carla@email.com'
        });

        const res = await request(server).post('/clients').send({
            name: 'Carla Santos',
            email: 'carla@email.com'
        });

        expect(res.body.success).toBe(false);
        expect(res.body.messages).toContain(
            'O email já se encontra em uso. Por favor, insira um novo email.'
        );
    });

    it('GET /clients retorna todos os clientes', async () => {
        const res = await request(server).get('/clients');
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('GET /clients/:id retorna cliente existente', async () => {
        const res = await request(server).get('/clients/1');
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.id).toBe(1);
    });

    it('GET /clients/:id inexistente retorna null', async () => {
        const res = await request(server).get('/clients/999');
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.messages).toContain('Produto não encontrado');
    });
});