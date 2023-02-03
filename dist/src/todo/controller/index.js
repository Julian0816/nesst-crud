"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../model/index");
const uuid_1 = require("uuid");
class TodoController {
    async create(req, res) {
        const id = (0, uuid_1.v4)();
        try {
            const record = await index_1.TodoInstance.create({ ...req.body, id });
            return res.json({ record, msg: "Successfully create todo" });
        }
        catch (e) {
            return res.json({
                msg: "fail to create",
                status: 500,
                route: "/create",
            });
        }
    }
    async readPagination(req, res) {
        try {
            const limit = req.query?.limit;
            const offset = req.query?.limit;
            console.log(limit);
            const record = await index_1.TodoInstance.findAll({ where: {}, limit, offset });
            return res.json(record);
        }
        catch (e) {
            return res.json({ msg: "fail to read", status: 500, route: "/read" });
        }
    }
    async readById(req, res) {
        try {
            const { id } = req.params;
            const record = await index_1.TodoInstance.findOne({ where: { id } });
            return res.json(record);
        }
        catch (e) {
            return res.json({ msg: "fail to read", status: 500, route: "/read/:id" });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const record = await index_1.TodoInstance.findOne({ where: { id } });
            if (!record) {
                return res.json({ msg: "Cannot find existing record" });
            }
            const updateRecord = await record.update({
                completed: !record.getDataValue("completed"),
            });
            return res.json({ record: updateRecord });
        }
        catch (e) {
            return res.json({
                msg: "fail to read",
                status: 500,
                route: "/update/:id",
            });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const record = await index_1.TodoInstance.findOne({ where: { id } });
            if (!record) {
                return res.json({ msg: "Cannot find existing record" });
            }
            const deletedRecord = await record.destroy();
            return res.json({ record: deletedRecord });
        }
        catch (e) {
            return res.json({
                msg: "fail to read",
                status: 500,
                route: "/delete/:id",
            });
        }
    }
}
exports.default = new TodoController();
