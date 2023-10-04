// pages/api/coaches/createCoach

import { pool } from "@/db";

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        const { name } = req.body;

        try {
            const result = await pool.query('INSERT INTO coaches(name) VALUES($1) RETURNING id', [name]);
            return res.status(200).json({ id: result.rows[0].id });
        } catch (err: any) {
            return res.status(500).json({ error: err?.message ?? '' });
        }
    }
};
