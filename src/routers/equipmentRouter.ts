import { NextFunction, Request, Response, Router } from "express";
import db from '../models/index';

const router: Router = Router();

// Route to list al the equipmets
router.get('/', (req: Request, res: Response) => {
    try {
        db.query('SELECT * FROM equipments', (err: any, result: any) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ status: "failure", error: err.message })
            }
            console.log(result);
            return res.json({ status: 'success', data: result.rows })
        })
    } catch (err: any) {
        res.status(500).json({ status: 'failure', error: err.message })
    }
})

// Route to create a new equipment 
// Would rather use PUT method than post + patch 
router.post('/', async (req: Request, res: Response) => {
    const { model, serialNumber, equipment_id } = req.body;
    const result = await db.query("INSERT INTO equipments(id,model,serialNumber,equipment_id) VALUES (DEFAULT,$1,$2,$3) RETURNING *", [model, serialNumber, equipment_id])
    res.status(200).json({ status: 'success', id: result.rows[0].id });
})

// Route to read the equipment
router.get('/:ID', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { ID } = req.params
        const result = await db.query('SELECT * FROM equipments WHERE id=$1', [ID]);
        if (!result.rows[0])
            res.json({ status: 'failure', error: 'No rows found for ID' })
        res.json({ status: 'success', data: result.rows[0] })
    } catch (e: any) {
        res.status(500).json({ status: 'failure', error: e.message })
    }
})

router.delete('/:ID', async (req: Request, res: Response) => {
    const { ID } = req.params
    const result = await db.query('DELETE FROM equipments WHERE id = $1 RETURNING id;', [ID])
    res.json({ status: 'success', deletedId: result.rows[0] })
})

router.patch('/', async (req: Request, res: Response) => {
    const { id, name } = req.body
    const result = await db.query("UPDATE equipments SET name=$1 WHERE id=$2 RETURNING *", [name, id])
    console.log(result);
    res.json({ status: 'success', updatedData: result.rows[0] })
})

// Route yet to do
// router.get('/manufacturer', (req: Request, res: Response) => {

// })


export default router;