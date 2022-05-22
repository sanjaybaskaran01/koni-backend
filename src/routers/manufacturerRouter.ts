import { manufacturerSchema, paramIDSchema, updateManufacturerSchema, validator } from "../middleware/validator";
import { Request, Response, Router } from "express";
import db from '../models/index';

const router: Router = Router();

// Route to list all the manufacturers
router.get('/', async (req: Request, res: Response) => {
    try {
        const result = await db.query('SELECT * FROM manufacturers')
        if (!result.rows[0])
            return res.json({ status: 'success', data: 'Insert data into Manufacturers!' })
        res.json({ status: 'success', data: result.rows })
    } catch (err: any) {
        console.error(`${req.baseUrl} :: ${err.message}`)
        res.status(500).json({ status: 'failure', error: err.message })
    }
})

// Route to create new manufacturer
router.post('/', validator.body(manufacturerSchema), async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const result = await db.query("INSERT INTO manufacturers(id,name) VALUES (DEFAULT,$1) RETURNING (id) ", [name]);
        console.log(`Manufacturer ${result.rows[0].id} inserted`)
        res.status(200).json({ status: 'success', id: result.rows[0].id })
    } catch (err: any) {
        console.error(`${req.baseUrl} :: ${err.message}`)
        res.status(500).json({ status: 'failure', message: err.message })
    }
})

// Route to read manufacturer from ID
router.get('/:ID', validator.params(paramIDSchema), async (req: Request, res: Response) => {
    try {
        const { ID } = req.params
        const result = await db.query('SELECT * FROM manufacturers WHERE id=$1', [ID]);
        if (result.rows.length===0)
            throw new Error("No rows found for ID")
        res.json({ status: 'success', data: result.rows[0] })
    } catch (err: any) {
        console.error(`${req.baseUrl} :: ${err.message}`)
        res.status(500).json({ status: 'failure', error: err.message })
    }
})

// Route to delete manufacturer from ID
router.delete('/:ID', validator.params(paramIDSchema), async (req: Request, res: Response) => {
    try {
        const { ID } = req.params
        const result = await db.query('DELETE FROM manufacturers WHERE ID=$1 RETURNING *', [ID])
        console.log(`Manufacturer ${result.rows[0].id} deleted`)
        res.json({ status: 'success', deletedData: result.rows[0] })
    } catch (err: any) {
        console.error(`${req.baseUrl} :: ${err.message}`)
        res.status(500).json({ status: 'failure', error: err.message })
    }
})

// Route to update manufacturer from ID
router.put('/:ID', validator.params(paramIDSchema), validator.body(updateManufacturerSchema), async (req: Request, res: Response) => {
    try {
        const { ID } = req.params
        const { name } = req.body
        const result = await db.query("UPDATE manufacturers SET name=$1 WHERE id=$2 RETURNING *", [name, ID])
        console.log(`Manufacturer ${result.rows[0].id} updated with ${name}`)
        res.json({ status: 'success', updatedData: result.rows[0] })
    } catch (err: any) {
        console.error(`${req.baseUrl} :: ${err.message}`)
        res.status(500).json({ status: 'failure', error: err.message })
    } 
})

export default router;