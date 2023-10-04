// pages/api/student/bookCoach

import { pool } from "@/db";

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const { slot_id, student_name } = req.body;

        try {
            await pool.query('BEGIN');
            await pool.query('UPDATE slots SET is_booked=true WHERE id=$1', [slot_id]);
            await pool.query('INSERT INTO appointments(slot_id, student_name) VALUES($1, $2)', [slot_id, student_name]);
            await pool.query('COMMIT');
            return res.status(200).json({ message: 'Slot booked successfully.' });
        } catch (err: any) {
            await pool.query('ROLLBACK');
            return res.status(500).json({ error: err?.message ?? '' });
        }
    }
};
