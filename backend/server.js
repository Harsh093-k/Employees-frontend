import express from "express";
import mongoose from "mongoose";
import employeesRoute from "./route/EmployeesRoute.js";
import departmentRoute from "./route/DepartmentRoute.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = 8080;

app.use(express.json())
app.use(cookieParser());
const corsOptions = {
    origin: 'https://employees-frontend-delta.vercel.app',
    credentials: true
}
app.use(cors(corsOptions));


app.use("/api/v1/user", employeesRoute);
app.use("/api/v1/department", departmentRoute);

mongoose.connect(process.env.DB)
    .then(() => { console.log("Data base is connected") })
    .catch((error) => {
        console.log(error);
    })


app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
})

app.get("/", (req, res) => {
    res.send("Jai shree ram");
})
