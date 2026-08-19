export const QUERIES = {
    CREATE: `INSERT INTO tickets (title, description, priority, status, created_by, assigned_to)
              VALUES (?, ?, ?, ?, ?, ?)`,

    FIND_BY_ID: `SELECT * FROM tickets WHERE id = ? LIMIT 1`,

    FIND_ALL: (whereClause) => `
        SELECT * FROM tickets
        ${whereClause}
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?`,

    COUNT: (whereClause) => `SELECT COUNT(*) AS total FROM tickets ${whereClause}`,

    UPDATE: `UPDATE tickets
              SET title = ?, description = ?, priority = ?, status = ?, assigned_to = ? , updated_at = NOW()
              WHERE id = ?`,

    DELETE: `DELETE FROM tickets WHERE id = ?`,
};

export default QUERIES;
