// src/api/coach/addSlot

import { pool } from '@/db';


export default async function handler(req: any, res: any) {
    console.log('api/coach/addSlot', req.method);
    if (req.method === 'POST') {
        const userId = req.body.userId;
        const startTimeString = req.body.startTime;
        const endTimeString = req.body.endTime;

        try {
            const result = await pool.query(
                'INSERT INTO slots(coach_id, start_time, end_time) VALUES($1, $2, $3) RETURNING *',
                [userId, startTimeString, endTimeString]
            );
            return res.status(200).json({ message: 'Slot added successfully.' });
        } catch (error: any) {
            return res.status(500).json({ error: error?.message ?? '' });
        }
    } else {
        res.status(405).end();  // Method Not Allowed
    }
};
