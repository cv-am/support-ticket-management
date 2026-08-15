export const QUERIES = {
    CREATE: `INSERT INTO comments (ticket_id, user_id, content) VALUES (?, ?, ?)`,
    FIND_BY_ID: `SELECT * FROM comments WHERE id = ? LIMIT 1`,
    FIND_BY_TICKET: `SELECT c.*, u.name AS author_name, u.role AS author_role
                      FROM comments c
                      JOIN users u ON u.id = c.user_id
                      WHERE c.ticket_id = ?
                      ORDER BY c.created_at ASC
                      LIMIT ? OFFSET ?`,
    COUNT_BY_TICKET: `SELECT COUNT(*) AS total FROM comments WHERE ticket_id = ?`,
    UPDATE: `UPDATE comments SET content = ? WHERE id = ?`,
    DELETE: `DELETE FROM comments WHERE id = ?`,
    FIND_TICKET: `SELECT id FROM tickets WHERE id = ? LIMIT 1`,
};

export default QUERIES;
