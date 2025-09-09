require('dotenv').config();
const cors = require('cors')
const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes.js')
const clientRoutes = require('./routes/clientRoutes.js')

app.use(cors());
app.use(express.json());

app.use('/products', productRoutes);
app.use('/clients', clientRoutes);

const port = process.env.APP_PORT || 3000;
const server = app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

module.exports = server;