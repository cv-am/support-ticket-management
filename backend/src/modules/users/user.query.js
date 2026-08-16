export const QUERIES = {
    FIND_PASSWORD: `SELECT password FROM users WHERE id = ? LIMIT 1`,
    FIND_BY_ID: `SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ? LIMIT 1`,
    FIND_ALL: `SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    COUNT_ALL: `SELECT COUNT(*) AS total FROM users`,
    UPDATE: `UPDATE users SET name = ? WHERE id = ?`,
    UPDATE_PASSWORD: `UPDATE users SET password = ? WHERE id = ?`,
    DELETE: `DELETE FROM users WHERE id = ?`,
};

export default QUERIES;
