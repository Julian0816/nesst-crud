import express, { NextFunction, Request, Response } from "express";
import db from "./config/database.config";
import todoRouter from "./todo/routes";
// import { TodoInstance } from "./model/index";
// import { v4 as uuidv4 } from "uuid";
// import TodoValidator from "./validator";
// import middleware from "./middleware";
// import TodoController from './controller';

//Sync database
db.sync().then(() => {
  console.log("connect to db");
});

//Create port
const port = 9000;

//Create the app
const app = express();

//Middleware
app.use(express.json());

//import router
app.use("/api/v1", todoRouter);

//Test end-point
// app.get('/', (req: Request, res: Response) => {
//     return res.send('This is still up and running')
// })

//App.listen
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
