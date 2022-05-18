import { envHandler } from "./lib/env";

import { PoolConfig } from "pg";

export const PORT = 3001;
export const pool_config: PoolConfig = {
    user: envHandler(process.env.PGUSER), // default process.env.PGUSER || process.env.USER
    password: envHandler(process.env.PGPASSWORD), //default process.env.PGPASSWORD
    host: envHandler(process.env.HOST), // default process.env.PGHOST
    database: envHandler(process.env.DATABASE), // default process.env.PGDATABASE || user
    port: parseInt(envHandler(process.env.PGPORT)), // default process.env.PGPORT
}