import express, { Application, Request, Response } from "express";

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!')
})

app.listen(3001,()=>{
    console.log("Listening to port 3001")
})