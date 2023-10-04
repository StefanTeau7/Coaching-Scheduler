import { pool } from "@/db";

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const { slot_id, satisfaction_score, notes, coach_id, student_id } = req.body;

        try {
            await pool.query(`
                INSERT INTO appointments(slot_id, student_id, coach_id, satisfaction_score, notes) 
                VALUES($1, $2, $3, $4, $5)
                ON CONFLICT(slot_id, student_id, coach_id) 
                DO UPDATE SET satisfaction_score = $4, notes = $5
            `, [slot_id, student_id, coach_id, satisfaction_score, notes]);

            return res.status(200).json({ message: 'Record upserted successfully.' });
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    }
};
