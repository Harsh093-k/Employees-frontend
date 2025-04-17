import express from "express";

import { createDepartment, getDepartment, updateDepartment} from "../controller/departmentController.js";
import isAuthenticated from "../utiles/isAuthenticated.js";
const route=express.Router();

route.post("/create",isAuthenticated,createDepartment);
route.get("/get",isAuthenticated,getDepartment);
route.put("/update/:id",isAuthenticated,updateDepartment);

export default route;