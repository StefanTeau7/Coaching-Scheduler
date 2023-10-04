// pages/api/coach/addReview

import { pool } from "@/db";

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const { appointment_id, satisfaction_score, notes } = req.body;

        try {
            await pool.query('UPDATE appointments SET satisfaction_score=$1, notes=$2 WHERE id=$3', [satisfaction_score, notes, appointment_id]);
            return res.status(200).json({ message: 'Record updated successfully.' });
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }
};
