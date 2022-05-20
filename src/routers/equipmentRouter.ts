import { Request, Response, Router } from "express";
import db from '../models/index';

const router: Router = Router();

// Route to list all the equipments
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await db.query('SELECT * FROM equipments')
        if (!result.rows[0])
            return res.json({ status: 'success', data: 'Insert data into Equipments!' })
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
        const result = await db.query("INSERT INTO equipments(id,model,serialNumber,manufacturer_id) VALUES (DEFAULT,$1,$2,$3) RETURNING *", [model, serialNumber, manufacturer_id])
        res.status(200).json({ status: 'success', id: result.rows[0].id });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ status: 'failure', message: err.message })
    }
})

// Route to read the equipment from ID
router.get('/:ID', async (req: Request, res: Response) => {
    try {
        const { ID } = req.params
        const result = await db.query('SELECT * FROM equipments WHERE id=$1', [ID])
        if (!result.rows[0])
            res.json({ status: 'failure', error: 'No rows found for ID' })
        res.json({ status: 'success', data: result.rows[0] })
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ status: 'failure', error: err.message })
    }
})

// Route to delete the equipment from ID
router.delete('/:ID', async (req: Request, res: Response) => {
    try {
        const { ID } = req.params
        const result = await db.query('DELETE FROM equipments WHERE id = $1 RETURNING id;', [ID])
        res.json({ status: 'success', deletedId: result.rows[0] })
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ status: 'failure', error: err.message })
    }
})

// Route to update the equipment from ID
// CLARFICATION: Unclear whether the equipment_id could also be modified
router.put('/:ID', async (req: Request, res: Response) => {
    try {
        const { ID } = req.params
        const { model, serialNumber } = req.body
        if (!model && !serialNumber)
            throw new Error("Missing either model or serialNumber")
        const result = await db.query("UPDATE equipments SET model=$1,serialNumber=$2 WHERE id=$3 RETURNING *", [model, serialNumber, ID])
        res.json({ status: 'success', updatedData: result.rows[0] })
    } catch (err: any) {
        console.error(err.message);
        res.status(500).json({ status: 'failure', error: err.message })
    }
})


export default router;