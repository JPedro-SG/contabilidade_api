const { Router } = require("express");
const router = Router();
const Product = require('../models/Product.js')

// - **POST /produtos** → cadastrar um produto
router.post('/', (req, res) => {
    try {
        const { name, price, stock } = req.body;
        const errors = validateProduct(name, price, stock);

        if (errors.length > 0) return res.status(400).json({ success: false, messages: errors, data: null });

        const product = Product.create({ name, price, stock });
        res.json({ success: true, messages: null, data: product });
    } catch (error) {
        return res.status(500).json({ success: false, messages: ['Algo inesperado aconteceu. Por favor, tente novamente.'], data: null })
    }
})

// - **GET /produtos** → listar produtos (com possibilidade de consulta por parâmetros simples, ex.: busca ou paginação)
router.get('/', (req, res) => {
    try {

        const { name, price, stock, page, per_page } = req.query;

        const products = Product.findAll({ name, price, stock, page, per_page });

        res.json({ success: true, messages: null, data: products });
    } catch (error) {
        console.log('Erro ao listar produtos. Descrição do erro: ', error)
        return res.status(500).json({ success: false, messages: ['Algo inesperado aconteceu. Por favor, tente novamente.'], data: null })
    }
})

// - **GET /produtos/:id** → buscar produto pelo ID
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params

        const product = Product.findById(id);

        if (!product) {
            return res.status(400).json({ success: false, messages: ['Produto não encontrado'], data: null })
        }

        res.json({ success: true, messages: null, data: product });
    } catch (error) {
        console.log('Erro ao listar produto. Descrição do erro: ', error)
        return res.status(500).json({ success: false, messages: ['Algo inesperado aconteceu. Por favor, tente novamente.'], data: null })
    }
})


function validateProduct(name, price, stock) {
    const errors = [];

    // Validate name
    if (!name || name.trim().length === 0) {
        errors.push("O nome não pode ser vázio.");
    } else if (name.trim().length < 3) {
        errors.push("O nome deve ter pelo menos três caracteres.");
    }

    // Validate price
    if (isNaN(price)) {
        errors.push("O preço tem que ser um numero");
    } else if (Number(price) < 0) {
        errors.push("O preço não pode ser negativo.");
    }

    // Validate stock
    if (!Number.isInteger(Number(stock))) {
        errors.push("O estoque precisa ser um número inteiro.");
    } else if (Number(stock) < 0) {
        errors.push("O estoque não pode ser negativo.");
    }

    return errors; // empty = valid
}

module.exports = router;