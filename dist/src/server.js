"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_config_1 = __importDefault(require("./config/database.config"));
const routes_1 = __importDefault(require("./todo/routes"));
// import { TodoInstance } from "./model/index";
// import { v4 as uuidv4 } from "uuid";
// import TodoValidator from "./validator";
// import middleware from "./middleware";
// import TodoController from './controller';
//Sync database
database_config_1.default.sync().then(() => {
    console.log("connect to db");
});
//Create port
const port = 9000;
//Create the app
const app = (0, express_1.default)();
//Middleware
app.use(express_1.default.json());
//import router
app.use("/api/v1", routes_1.default);
//Test end-point
// app.get('/', (req: Request, res: Response) => {
//     return res.send('This is still up and running')
// })
//App.listen
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
