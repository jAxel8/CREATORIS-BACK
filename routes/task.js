"use strict";

var express = require("express");
var taskController = require("../controllers/task");
var api = express.Router();

api.post("/create", taskController.create);
api.get("/get", taskController.get);
api.get("/task-stats", taskController.getTaskStats);
api.put("/update/:id", taskController.update);
api.put("/update-status/:id", taskController.updateDoneStatus);
api.delete("/delete/:id", taskController.deleteTask);

module.exports = api;
