import express, { NextFunction, Request, Response } from "express";
import db from "./config/database.config";
// import { TodoInstance } from "./model/index";
// import { v4 as uuidv4 } from "uuid";
import TodoValidator from "./validator";
import middleware from "./middleware";
import TodoController from './controller';

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
//   async (req: Request, res: Response) => {
//     const id = uuidv4();
//     try {
//       const record = await TodoInstance.create({ ...req.body, id });
//       return res.json({ record, msg: "Successfully create todo" });
//     } catch (e) {
//       return res.json({ msg: "fail to create", status: 500, route: "/create" });
//     }
//   }
    TodoController.create,
);

app.get(
  "/read",
  TodoValidator.checkReadTodo(),
  middleware.handleValidationError,
  TodoController.readPagination,
);

app.get(
  "/read/:id",
  TodoValidator.checkIdParams(),
  middleware.handleValidationError,
  TodoController.readById,
);

app.put(
  "/update/:id",
  TodoValidator.checkIdParams(),
  middleware.handleValidationError,
  TodoController.update,
);

app.delete(
  "/delete/:id",
  TodoValidator.checkIdParams(),
  middleware.handleValidationError,
  TodoController.delete,
);

//App.listen
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
