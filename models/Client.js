const db = require('../database/database.js')


class Client {
    static findAll({ name = null, email = null, page = null, per_page = 10 } = {}) {
        let query = `SELECT * FROM clients WHERE 1 = 1`;
        let params = [];

        if (name) {
            query += ` AND name LIKE ?`;
            params.push(`%${name}%`);
        }
        if (email) {
            query += ` AND email LIKE ?`;
            params.push(`%${email}%`);
        }

        if (page !== null) {
            page = parseInt(page);
            per_page = parseInt(per_page) || 10;
            const offset = (page - 1) * per_page;
            query += ` LIMIT ? OFFSET ?`;
            params.push(per_page, offset);
        }

        return db.prepare(query).all(...params);
    }

    static findById(id) {
        
        return db.prepare(`SELECT * FROM clients WHERE id = ?`).get(id);
    }

    static create({ name, email }) {
        const query = `INSERT INTO clients (name, email) VALUES (?, ?)`;
        const result = db.prepare(query).run(name, email);

        return { id: result.lastInsertRowid, name, email };
    }

    static existByEmail(email) {
        const query = `SELECT 1 FROM clients WHERE email = ? LIMIT 1`;
        return db.prepare(query).get(email);
    }
}

module.exports = Client;