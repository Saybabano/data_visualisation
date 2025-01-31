const pool = require('./db.js');

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
`;


 async function initializeDatabase() {
    try {
        const client = await pool.connect();
        await client.query(createUsersTable);
        console.log('Tables created successfully.');
        client.release(); // Ensure this line is not commented.
    } catch (err) {
        console.error('Error creating tables:', err);
    }
}
module.exports = initializeDatabase;
