const { Router } = require("express");
const router = Router();
const Client = require('../models/Client.js')


// - **POST /clientes** → cadastrar um cliente
router.post('/', (req, res) => {
    try {
        const { name, email } = req.body;

        const errors = []
        if (name.trim() === "") errors.push('O nome não pode ser vázio.')
        if (name.length < 3) errors.push('O nome deve ter pelo menos três caracteres.')
        if (email.trim() === "") errors.push('O email não pode ser vázio.')
        if (Client.existByEmail(email)) errors.push('O email já se encontra em uso. Por favor, insira um novo email.')

        if (errors.length > 0) return res.json({ success: false, messages: errors, data: null })

        const client = Client.create({ name, email })

        return res.json({ success: true, messages: null, data: client })
    } catch (error) {
        console.log('Erro ao cadastrar cliente. Descrição do erro: ', error);
        return res.status(500).json({ success: false, messages: 'Algo inesperado aconteceu. Por favor, tente novamente.', data: null })
    }

})

// - **GET /clientes** → listar clientes
router.get('/', (req, res) => {
    try {
        const { name, email, page, per_page } = req.query;
        const clients = Client.findAll({ name, email, page, per_page });
        return res.json({ success: true, messages: null, data: clients });

    } catch (error) {
        console.log('Erro ao listar clientes. Descrição do erro: ', error)
        return res.status(500).json({ success: false, messages: ['Algo inesperado aconteceu. Por favor, tente novamente.'], data: null })
    }
})

// - **GET /clientes/:id** → buscar cliente pelo ID
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params
        const client = Client.findById(id);
        if (!client) {
            return res.status(400).json({ success: false, messages: ['Produto não encontrado'], data: null })
        }
        return res.json({ success: true, messages: null, data: client })
    } catch (error) {
        console.log('Erro ao listar cliente. Descrição do erro: ', error)
        return res.status(500).json({ success: false, messages: ['Algo inesperado aconteceu. Por favor, tente novamente.'], data: null })
    }
})

module.exports = router;