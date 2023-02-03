import { TodoInstance } from "./model/index";
import express, { NextFunction, Request, Response } from "express";
import db from "./config/database.config";
import { v4 as uuidv4 } from "uuid";
import TodoValidator from "./validator";
import middleware from "./middleware";

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

//Test end-point
// app.get('/', (req: Request, res: Response) => {
//     return res.send('This is still up and running')
// })

app.post(
  "/create",
  TodoValidator.checkCreateTodo(),
//   (req: Request, res: Response, next: NextFunction) => {
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//       return res.json(error);
//     }
//     next();
//   },
    middleware.handleValidationError,
  async (req: Request, res: Response) => {
    const id = uuidv4();
    try {
      const record = await TodoInstance.create({ ...req.body, id });
      return res.json({ record, msg: "Successfully create todo" });
    } catch (e) {
      return res.json({ msg: "fail to create", status: 500, route: "/create" });
    }
  }
);

app.get('/read', async (req: Request, res: Response) => {
    try {
     const record = await TodoInstance.findAll({ where:{} });
     return res.json(record);
    } catch (e) {
      return res.json({ msg: "fail to read", status: 500, route: "/read" });
    }
})

//App.listen
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
