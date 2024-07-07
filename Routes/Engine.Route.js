const EngineController = require("../Controller/Engine.Controller");
const express = require("express");
const EngineRoute = express.Router();

EngineRoute.post("/", EngineController.createEngine);
EngineRoute.delete("/:id", EngineController.deleteEngine);
EngineRoute.put("/:id", EngineController.updateEngine);
EngineRoute.post("/:serial", EngineController.getSingleEngine);
EngineRoute.get("/", EngineController.getAllEngine);

module.exports = EngineRoute;
