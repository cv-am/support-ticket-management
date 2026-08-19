export const QUERIES = {
    FIND_BY_ID: `SELECT id, name, email, password, role, created_at, updated_at FROM users WHERE id = ? LIMIT 1`,
    FIND_ALL: `SELECT id, name, email, role, created_at, updated_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    COUNT_ALL: `SELECT COUNT(*) AS total FROM users`,
    UPDATE: `UPDATE users SET name = ?, updated_at = NOW() WHERE id = ?`,
    UPDATE_PASSWORD: `UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?`,
    DELETE: `DELETE FROM users WHERE id = ?`,
};

export default QUERIES;
