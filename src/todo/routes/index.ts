import express from "express";
import TodoValidator from "../validator";
import middleware from "../../middleware";
import TodoController from "../controller";

const router = express.Router();

router.post(
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
  TodoController.create
);

router.get(
  "/read",
  TodoValidator.checkReadTodo(),
  middleware.handleValidationError,
  TodoController.readPagination
);

router.get(
  "/read/:id",
  TodoValidator.checkIdParams(),
  middleware.handleValidationError,
  TodoController.readById
);

router.put(
  "/update/:id",
  TodoValidator.checkIdParams(),
  middleware.handleValidationError,
  TodoController.update
);

router.delete(
  "/delete/:id",
  TodoValidator.checkIdParams(),
  middleware.handleValidationError,
  TodoController.delete
);

export default router;
