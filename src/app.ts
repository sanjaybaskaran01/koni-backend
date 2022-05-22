import { equipmentParamSchema, manufacturerParamSchema, validator } from "./middleware/validator";
import express, { Application, NextFunction, Request, Response } from "express";
import { manufacturerRouter, equipmentRouter } from "./routers";
import { ExpressJoiError } from 'express-joi-validation'
import { createTable } from "./models/createTable";
import { PORT } from "./config";
import db from './models/index';

const app: Application = express();

app.use(express.json());

createTable();

app.use('/manufacturer', manufacturerRouter);
app.use('/equipment', equipmentRouter);

// List all equipments of the manufacturer
app.get('/:name/equipment', validator.params(manufacturerParamSchema), async (req: Request, res: Response) => {
    try {
        const { name } = req.params
        const manId = await db.query(`SELECT id from manufacturers WHERE LOWER(name) = LOWER($1)`, [name])
        if (manId.rows.length === 0)
            throw new Error("Model name does not exist")
        const result = await db.query(`SELECT * from equipments WHERE manufacturer_id = $1`, [manId.rows[0]['id']]);
        res.json({ status: 'success', data: result.rows });
    } catch (err: any) {
        console.error(`${req.baseUrl} :: ${err.message}`)
        res.json({ status: 'failure', message: err.message })
    }

})

// Get the manufacturer owner of this equipment
app.get('/:model/manufacturer', validator.params(equipmentParamSchema), async (req: Request, res: Response) => {
    try {
        const { model } = req.params
        const manId = await db.query(`SELECT manufacturer_id from equipments WHERE LOWER(model) = LOWER($1)`, [model])
        if (manId.rows.length === 0)
            throw new Error("Model name does not exist")
        const result = await db.query(`SELECT * from manufacturers WHERE id = $1`, [manId.rows[0]["manufacturer_id"]]);
        res.json({ status: 'success', data: result.rows });
    } catch (err: any) {
        console.error(`${req.baseUrl} :: ${err.message}`)
        res.status(500).json({ status: 'failure', message: err.message })
    }
})


app.use((err: any | ExpressJoiError, req: Request, res: Response, next: NextFunction) => {
    if (err && err.error.isJoi) {
        return res.status(400).json({
            status: "failure",
            type: err.type,
            message: err.error.toString()
        });
    } else {
        console.error(`${req.baseUrl} :: ${err.message}`)
        return res.status(500).json({ status: "failure", message: "Internal Server Error" });
    }
})

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})