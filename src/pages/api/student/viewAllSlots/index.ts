// pages/api/student/viewAllSlots

import { pool } from "@/db";

export default async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        try {
            const result = await pool.query('SELECT * FROM slots WHERE is_booked=false');
            return res.status(200).json(result.rows);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }
};
