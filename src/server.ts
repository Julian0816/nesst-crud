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

app.get(
  "/read",
  TodoValidator.checkReadTodo(),
  middleware.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.limit as number | undefined;
      console.log(limit);
      const record = await TodoInstance.findAll({ where: {}, limit, offset });
      return res.json(record);
    } catch (e) {
      return res.json({ msg: "fail to read", status: 500, route: "/read" });
    }
  }
);

app.get(
  "/read/:id",
  TodoValidator.checkIdParams(),
  middleware.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });
      return res.json(record);
    } catch (e) {
      return res.json({ msg: "fail to read", status: 500, route: "/read/:id" });
    }
  }
);

app.put(
  "/update/:id",
  TodoValidator.checkIdParams(),
  middleware.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) {
        return res.json({ msg: "Cannot find existing record" });
      }
      const updateRecord = await record.update({
        completed: !record.getDataValue("completed"),
      });
      return res.json({ record: updateRecord });
    } catch (e) {
      return res.json({
        msg: "fail to read",
        status: 500,
        route: "/update/:id",
      });
    }
  }
);

app.delete(
  "/delete/:id",
  TodoValidator.checkIdParams(),
  middleware.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) {
        return res.json({ msg: "Cannot find existing record" });
      }
      const deletedRecord = await record.destroy();
      return res.json({ record: deletedRecord });
    } catch (e) {
      return res.json({
        msg: "fail to read",
        status: 500,
        route: "/delete/:id",
      });
    }
  }
);

//App.listen
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
