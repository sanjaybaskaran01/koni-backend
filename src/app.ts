import express, { Application, Request, Response } from "express";
import manufacturerRouter from "./routers/manufacturerRouter";
import equipmentRouter from "./routers/equipmentRouter"
import { createTable } from "./models/createTable";
import { PORT } from "./config";
import db from './models/index';

const app: Application = express();

app.use(express.json());

createTable();

app.use('/manufacturer', manufacturerRouter);
app.use('/equipment', equipmentRouter);

// List all equipments of the manufacturer
app.get('/:name/equipment', async (req: Request, res: Response) => {
    try {
        const { name } = req.params
        const result = await db.query(`SELECT * from equipments WHERE manufacturer_id = (SELECT id from manufacturers WHERE LOWER(name) = LOWER($1))`, [name]);
        res.json({ status: 'success', data: result.rows });
    } catch (err: any) {
        console.error(err.message);
        res.json({ status: 'failure', message: err.message })
    }

})

// Get the manufacturer owner of this equipment
app.get('/:model/manufacturer', async (req: Request, res: Response) => {
    try {
        const { model } = req.params
        console.log(model);
        const result = await db.query(`SELECT * from manufacturers WHERE id = (SELECT manufacturer_id from equipments WHERE LOWER(model) = LOWER($1))`, [model]);
        res.json({ status: 'success', data: result.rows });
    } catch (err: any) {
        console.error(err.message);
        res.json({ status: 'failure', message: err.message })
    }
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})