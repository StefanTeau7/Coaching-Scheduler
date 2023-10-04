// student/bookCoach.ts
import { pool } from "@/db";

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const { slot_id, student_id, coach_id } = req.body;
        try {
            await pool.query('BEGIN');

            const updateResult = await pool.query('UPDATE slots SET is_booked=true, coach_id=$1, student_id=$3 WHERE id=$2', [coach_id, slot_id, student_id]);

            // Check if the slot with provided slot_id exists
            if (updateResult.rowCount === 0) {
                throw new Error('No slot found with the provided slot_id.');
            }

            const insertResult = await pool.query('INSERT INTO appointments(coach_id, slot_id, student_id) VALUES($1, $2, $3)', [coach_id, slot_id, student_id]);

            // Check if the insert operation was successful
            if (insertResult.rowCount === 0) {
                throw new Error('Failed to create an appointment.');
            }

            await pool.query('COMMIT');
            return res.status(200).json({ message: 'Slot booked successfully.' });

        } catch (err: any) {
            await pool.query('ROLLBACK');
            return res.status(500).json({ error: `Operation failed: ${err?.message ?? ''}` });
        }
    }
};
