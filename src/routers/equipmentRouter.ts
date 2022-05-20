import { NextFunction, Request, Response, Router } from "express";
import { QueryResult } from "pg";
import db from '../models/index';

const router: Router = Router();

// Route to list al the equipmets
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await db.query('SELECT * FROM equipments')
        if (!result.rows[0])
            return res.json({status:'success',data:'Insert data into Manufacturers!'})
        res.json({ status: 'success', data: result.rows })
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ status: 'failure', error: err.message })
    }
})

// Route to create a new equipment 
router.post('/', async (req: Request, res: Response) => {
    try {
        const { model, serialNumber, manufacturer_id } = req.body;
        const result = await db.query("INSERT INTO equipments(id,model,serialNumber,manufacturer_id) VALUES (DEFAULT,$1,$2,$3) RETURNING *", [model, serialNumber, manufacturer_id]) as QueryResult<any>
        res.status(200).json({ status: 'success', id: result.rows[0].id });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ status: 'failure', message: err.message })
    }

})

// Route to read the equipment
router.get('/:ID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ID } = req.params
        const result = await db.query('SELECT * FROM equipments WHERE id=$1', [ID]) as QueryResult<any>;
        if (!result.rows[0])
            res.json({ status: 'failure', error: 'No rows found for ID' })
        res.json({ status: 'success', data: result.rows[0] })
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ status: 'failure', error: err.message })
    }
})

// Route to delete the equipment
router.delete('/:ID', async (req: Request, res: Response) => {
    try {
        const { ID } = req.params
        const result = await db.query('DELETE FROM equipments WHERE id = $1 RETURNING id;', [ID]) as QueryResult<any>
        res.json({ status: 'success', deletedId: result.rows[0] })
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ status: 'failure', error: err.message })
    }
})

router.patch('/', async (req: Request, res: Response) => {
    try {
        const { id, name } = req.body
        const result = await db.query("UPDATE equipments SET name=$1 WHERE id=$2 RETURNING *", [name, id]) as QueryResult<any>
        console.log(result);
        res.json({ status: 'success', updatedData: result.rows[0] })
    }
    catch (err: any) {
        console.error(err.message);
        res.status(500).json({ status: 'failure', error: err.message })
    }
})

// Route yet to do
// router.get('/manufacturer', (req: Request, res: Response) => {

// })


export default router;