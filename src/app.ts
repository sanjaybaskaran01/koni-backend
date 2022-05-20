import manufacturerRouter from "./routers/manufacturerRouter";
import equipmentRouter from "./routers/equipmentRouter"
import express, { Application } from "express";
import { PORT } from "./config";
import { createTable } from "./models/createTable";

const app: Application = express();

app.use(express.json());

createTable();

app.use('/manufacturer', manufacturerRouter);
app.use('/equipment', equipmentRouter);


app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})