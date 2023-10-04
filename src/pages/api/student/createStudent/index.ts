// student/createStudent
import { pool } from "@/db";

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const { userId, name } = req.body;

        try {
            // First, check if the user with the given name already exists
            const userExistsResult = await pool.query('SELECT id FROM students WHERE id=$1', [userId]);
            if (userExistsResult.rows.length > 0) {
                // If the user exists, return their ID
                return res.status(200).json({ id: userExistsResult.rows[0].id });
            }

            // If the user doesn't exist, insert them
            const insertResult = await pool.query('INSERT INTO students(id, name) VALUES($1, $2) RETURNING id', [userId, name]);
            return res.status(200).json({ id: insertResult.rows[0].id });

        } catch (err: any) {
            return res.status(500).json({ error: err?.message ?? '' });
        }
    }
}
