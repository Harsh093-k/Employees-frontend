

import express from "express";
import { getAllUsers, getUserById, getUserByIdAndupdate,login, logoutUser, create, deleteUsers, changestatus, changestatus2} from "../controller/EmployeesController.js";
import upload from "../utiles/multer.js";
import isAuthenticated from "../utiles/isAuthenticated.js";

const route=express.Router();

route.post('/create', upload.single('profilePhoto'), create);;
route.post("/login",login);
route.get("/logout",logoutUser)
route.get("/getUsers",isAuthenticated,getAllUsers);
route.get("/:id",isAuthenticated,getUserById);
route.get("/status/:id",isAuthenticated,changestatus);
route.get("/status/active/:id",isAuthenticated,changestatus2);
router.put("/update/:id", upload.single("profilephoto"), getUserByIdAndupdate);
route.delete("/delete/:id",isAuthenticated,deleteUsers);
export default route;
