import { NextFunction, Request, Response, Router } from "express";
import db from '../models/index';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await db.query('SELECT * FROM manufacturers')
        if (!result.rows[0])
            return res.json({status:'success',data:'Insert data into Manufacturers!'})
        res.json({ status: 'success', data: result.rows })
    } catch (err: any) {
        res.status(500).json({ status: 'failure', error: err.message })
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name)
            throw new Error("Name of manufacturer not provided")
        const result = await db.query("INSERT INTO manufacturers(id,name) VALUES (DEFAULT,$1) RETURNING (id) ", [name]);
        res.status(200).json({ status: 'success', id: result.rows[0].id });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ status: 'failure', message: err.message })
    }
})

router.get('/:ID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ID } = req.params
        const result = await db.query('SELECT * FROM manufacturers WHERE id=$1', [ID]);
        if (!result.rows[0])
            throw new Error("No rows found for ID")
        res.json({ status: 'success', data: result.rows[0] })
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ status: 'failure', error: err.message })
    }
})

router.delete('/:ID', async (req: Request, res: Response) => {
    try {
        const { ID } = req.params
        const result = await db.query('DELETE FROM manufacturers WHERE ID=$1', [ID])
        res.json({ status: 'success', deletedId: result.rows[0] })
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ status: 'failure', error: err.message })
    }
})

router.patch('/', async (req: Request, res: Response) => {
    try {
        const { id, name } = req.body
        const result = await db.query("UPDATE manufacturers SET name=$1 WHERE id=$2 RETURNING *", [name, id])
        console.log(result);
        res.json({ status: 'success', updatedData: result.rows[0] })
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ status: 'failure', error: err.message })
    }
})

// route yet to do
// router.get('/equipment', (req: Request, res: Response) => {
//     const result = await db.query("SELECT * FROM ")
// })


export default router;