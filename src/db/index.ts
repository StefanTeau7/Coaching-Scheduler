// db/index.ts

import { Pool } from "pg";

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'coaching_scheduler',
    password: 'test',
    port: 5432,
});

export { pool };
