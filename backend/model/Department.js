import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema({
    department_name: {
        type: String,
        required: true,
    }, head: {
        type: String,
        required: true,
    }, employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    avgSalary: {
        type: Number,
        required: true,
    }

})
export const Department = mongoose.model('Department', DepartmentSchema);
