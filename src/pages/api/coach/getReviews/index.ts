// pages/api/coach/getReviews.js

import { pool } from "@/db";

export default async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const { coach_id } = req.query;

        try {
            const result = await pool.query(`
                SELECT a.*
                FROM appointments a
                JOIN slots s ON a.slot_id = s.id
                WHERE s.coach_id=$1 AND s.end_time < NOW()`, [coach_id]);

            return res.status(200).json(result.rows);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }
};
