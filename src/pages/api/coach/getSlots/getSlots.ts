// pages/api/coach/getSlots.js
import { pool } from "@/db";

export default async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const { coach_id } = req.query;

        try {
            const result = await pool.query('SELECT * FROM slots WHERE coach_id=$1 AND start_time > NOW()', [coach_id]);
            return res.status(200).json(result.rows);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }
};
