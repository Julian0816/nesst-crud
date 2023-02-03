import express, { Request, Response } from "express";

import { TodoInstance } from "../model/index";
import { v4 as uuidv4 } from "uuid";

class TodoController {
  async create (req: Request, res: Response) {
    const id = uuidv4();
    try {
      const record = await TodoInstance.create({ ...req.body, id });
      return res.json({ record, msg: "Successfully create todo" });
    } catch (e) {
      return res.json({
        msg: "fail to create",
        status: 500,
        route: "/create",
      });
    }
  }
  async readPagination (req: Request, res: Response) {
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
  async readById (req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });
      return res.json(record);
    } catch (e) {
      return res.json({ msg: "fail to read", status: 500, route: "/read/:id" });
    }
  }
  async update (req: Request, res: Response) {
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
  async delete (req: Request, res: Response) {
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
}

export default new TodoController();
