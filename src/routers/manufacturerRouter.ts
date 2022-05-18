import { NextFunction, Request, Response, Router } from "express";
import db from '../models/index';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    try {
        db.query('SELECT * FROM manufacturers', (err: any, result: any) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ status: "failure", error: err.message })
            }
            return res.json({ status: 'success', data: result.rows })
        })
    } catch (err: any) {
        res.status(500).json({ status: 'failure', error: err.message })
    }
})

router.post('/', async (req: Request, res: Response) => {
    const { name } = req.body;
    (await db.getClient()).query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";
    
    CREATE TABLE IF NOT EXISTS manufacturers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(20)
    );
    
    CREATE TABLE IF NOT EXISTS equipments (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        model VARCHAR(30) NOT NULL,
        serialNumber VARCHAR(30) NOT NULL,
        equipment_id UUID NOT NULL,
        CONSTRAINT fk_equiptments FOREIGN KEY(equipment_id) REFERENCES manufacturers(id)
    );`)

    const result = await db.query("INSERT INTO manufacturers(id,name) VALUES (DEFAULT,$1) RETURNING (id) ", [name])

    res.status(200).json({ status: 'success', id: result.rows[0].id });

})

router.get('/:ID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ID } = req.params
        const result = await db.query('SELECT * FROM manufacturers WHERE id=$1', [ID]);
        if (!result.rows[0])
            res.json({ status: 'failure', error: 'No rows found for ID' })
        res.json({ status: 'success', data: result.rows[0] })
    } catch (e: any) {
        res.status(500).json({ status: 'failure', error: e.message })
    }
})

router.delete('/:ID', async (req: Request, res: Response) => {
    const { ID } = req.params
    const result = await db.query('DELETE FROM manufacturers WHERE id = $1 RETURNING id;', [ID])
    res.json({ status: 'success', deletedId: result.rows[0] })
})

router.patch('/', async (req: Request, res: Response) => {
    const { id, name } = req.body
    const result = await db.query("UPDATE manufacturers SET name=$1 WHERE id=$2 RETURNING *", [name, id])
    console.log(result);
    res.json({ status: 'success', updatedData: result.rows[0] })
})

// route yet to do
// router.get('/equipment', (req: Request, res: Response) => {
//     const result = await db.query("SELECT * FROM ")
// })


export default router;