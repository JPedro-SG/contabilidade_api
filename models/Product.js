const db = require('../database/database.js')


class Product {
    static findAll({ name = null, price = null, stock = null, page = null, per_page = 10 } = {}) {

        let query = `SELECT * FROM products WHERE 1 = 1`;
        let params = [];

        if (name) {
            query += ` AND name LIKE ?`;
            params.push(`%${name}%`);
        }
        if (price !== null) {
            query += ` AND price = ?`;
            params.push(price);
        }
        if (stock !== null) {
            query += ` AND stock = ?`;
            params.push(stock);
        }

        if (page !== null) {
            page = parseInt(page);
            per_page = parseInt(per_page);
            const offset = (page - 1) * per_page;

            query += ` LIMIT ? OFFSET ?`;
            params.push(per_page, offset);
        }


        return db.prepare(query).all(...params);
    }

    static findById(id) {
        const product = db.prepare(`SELECT * FROM products WHERE id = ?`).get(id);
        return product;
    }


    static create(data) {
        const { name, price, stock } = data;

        const query = `INSERT INTO products (name, price, stock) VALUES(?, ?, ?);`;
        const result = db.prepare(query).run(name, price, stock);

        return { id: result.lastInsertRowid, name, price, stock };
    }

}

module.exports = Product;