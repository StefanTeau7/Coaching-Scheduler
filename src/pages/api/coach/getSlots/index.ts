// pages/api/coach/getSlots.js
import { pool } from "@/db";

export default async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const { coach_id } = req.query;
        try {
            // could add 'AND start_time > NOW()' to only include future slots
            const result = await pool.query('SELECT id, coach_id, is_booked, start_time, end_time, student_id FROM slots WHERE coach_id=$1', [coach_id]);
            return res.status(200).json(result.rows);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }
};
