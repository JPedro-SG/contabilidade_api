require('dotenv').config();
const Database = require('better-sqlite3');
const db = new Database(process.env.DATABASE_NAME);

try {
    console.log('Criando tabelas...');

    // Tabela products
    db.prepare(`DROP TABLE IF EXISTS products`).run();
    db.prepare(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(100) NOT NULL,
            price REAL NOT NULL CHECK(price >= 0),
            stock INTEGER NOT NULL CHECK(stock >= 0),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `).run();

    // Tabela clients
    db.prepare(`DROP TABLE IF EXISTS clients`).run();
    db.prepare(`
        CREATE TABLE IF NOT EXISTS clients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(320) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `).run();

    console.log('Preenchendo tabelas...');

    // Dados para produtos (mantendo nomes em português)
    const products = [
        ['Camiseta Básica', 49.90, 100],
        ['Calça Jeans', 79.90, 50],
        ['Tênis Esportivo', 129.90, 30],
        ['Boné Preto', 29.90, 200]
    ];

    const insertProduct = db.prepare(`INSERT INTO products (name, price, stock) VALUES(?, ?, ?);`);
    const insertProductsTransaction = db.transaction((products) => {
        for (const prod of products) insertProduct.run(prod);
    });
    insertProductsTransaction(products);

    // Dados para clientes
    const clients = [
        ['Aline Oliveira', 'aline.oliveira@email.com'],
        ['Bruno Silva', 'bruno.silva@email.com'],
        ['Carla Santos', 'carla.santos@email.com'],
        ['Marcos Farias', 'marcos.farias@email.com']
    ];

    const insertClient = db.prepare(`INSERT INTO clients (name, email) VALUES (?, ?);`);
    const insertClientsTransaction = db.transaction((clients) => {
        for (const client of clients) insertClient.run(client);
    });
    insertClientsTransaction(clients);

    console.log('Tabelas criadas e preenchidas com sucesso!');
} catch (error) {
    console.error('Erro ao criar ou popular tabelas: ', error);
}
