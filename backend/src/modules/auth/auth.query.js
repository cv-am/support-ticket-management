export const QUERIES = {
    CREATE_USER: `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
    FIND_BY_EMAIL: `SELECT * FROM users WHERE email = ? LIMIT 1`,
    FIND_BY_ID: `SELECT id, name, email, role, created_at FROM users WHERE id = ? LIMIT 1`,
};

export default QUERIES;