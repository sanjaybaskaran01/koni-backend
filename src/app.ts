import manufacturerRouter from "./routers/manufacturerRouter";
import equipmentRouter from "./routers/equipmentRouter"
import express, { Application } from "express";
import { PORT } from "./config";

const app: Application = express();

app.use(express.json());

app.use('/manufacturer', manufacturerRouter);
app.use('/equipment', equipmentRouter);


app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`)
})