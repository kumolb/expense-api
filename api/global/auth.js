const roleController = require("../../controller/global/auth/role.controller");

const route = require("express").Router();

route.post("/role/add/", roleController.addRole);

module.exports = route;