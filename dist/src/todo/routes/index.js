"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = __importDefault(require("../validator"));
const middleware_1 = __importDefault(require("../../middleware"));
const controller_1 = __importDefault(require("../controller"));
const router = express_1.default.Router();
router.post("/create", validator_1.default.checkCreateTodo(), 
//   (req: Request, res: Response, next: NextFunction) => {
//     const error = validationResult(req);
//     if (!error.isEmpty()) {
//       return res.json(error);
//     }
//     next();
//   },
middleware_1.default.handleValidationError, 
//   async (req: Request, res: Response) => {
//     const id = uuidv4();
//     try {
//       const record = await TodoInstance.create({ ...req.body, id });
//       return res.json({ record, msg: "Successfully create todo" });
//     } catch (e) {
//       return res.json({ msg: "fail to create", status: 500, route: "/create" });
//     }
//   }
controller_1.default.create);
router.get("/read", validator_1.default.checkReadTodo(), middleware_1.default.handleValidationError, controller_1.default.readPagination);
router.get("/read/:id", validator_1.default.checkIdParams(), middleware_1.default.handleValidationError, controller_1.default.readById);
router.put("/update/:id", validator_1.default.checkIdParams(), middleware_1.default.handleValidationError, controller_1.default.update);
router.delete("/delete/:id", validator_1.default.checkIdParams(), middleware_1.default.handleValidationError, controller_1.default.delete);
exports.default = router;
