import { Pool, QueryConfig, QueryResult } from 'pg'
import { pool_config } from '../config'

const pool = new Pool(pool_config);

export = {
    async query(text: string, params?: any[]): Promise<QueryResult<any>> {
        const start = Date.now()
        const res = pool.query(text, params);
        const duration = Date.now() - start
        return res
    },
    async getClient() {
        const client = await pool.connect()
        const query = client.query
        const release = client.release
        // set a timeout of 5 seconds, after which we will log this client's last query
        const timeout = setTimeout(() => {
            console.error('A client has been checked out for more than 5 seconds!')
        }, 5000)
        client.release = () => {
            // clear our timeout
            clearTimeout(timeout)
            // set the methods back to their old un-monkey-patched version
            client.query = query
            client.release = release
            return release.apply(client)
        }
        return client
    }
}