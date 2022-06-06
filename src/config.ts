import  envHandler  from "./lib/env";

import { PoolConfig } from "pg";

export const PORT = 3001;
export const pool_config: PoolConfig = {
    user: envHandler("PGUSER"), // default process.env.PGUSER || process.env.USER
    password: envHandler("PGPASSWORD"), //default process.env.PGPASSWORD
    host: envHandler("HOST"), // default process.env.PGHOST
    database: envHandler("DATABASE"), // default process.env.PGDATABASE || user
    port: parseInt(envHandler("PGPORT")), // default process.env.PGPORT
}