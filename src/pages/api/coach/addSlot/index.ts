// src/api/coach/addSlot

import { pool } from '@/db';


export default async function handler(req: any, res: any) {
    console.log('api/coach/addSlot HIT', req.method);
    if (req.method === 'POST') {
        const userId = req.body.userId;
        const startTimeString = new Date(req.body.startTime).toISOString();
        const endTimeString = new Date(req.body.endTime).toISOString();

        try {
            const result = await pool.query(
                'INSERT INTO slots(coach_id, start_time, end_time) VALUES($1, $2, $3) RETURNING *',
                [userId, startTimeString, endTimeString]
            );
            res.json(result.rows[0]);
        } catch (error: any) {
            return res.status(500).json({ error: error?.message ?? '' });
        }
    } else {
        res.status(405).end();  // Method Not Allowed
    }
};
