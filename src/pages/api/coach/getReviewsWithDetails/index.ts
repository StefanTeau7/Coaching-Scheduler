import { pool } from "@/db";

export default async function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const { coach_id } = req.query;

        try {
            const query = `
                SELECT 
                    a.*,
                    s.start_time as slot_start_time,
                    st.name as student_name
                FROM 
                    appointments a
                JOIN 
                    slots s ON a.slot_id = s.id
                JOIN 
                    students st ON a.student_id = st.id
                WHERE 
                    a.coach_id = $1
            `;

            const result = await pool.query(query, [coach_id]);

            return res.status(200).json(result.rows);
        } catch (err: any) {
            return res.status(500).json({ error: err.message });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed.' });
    }
}
