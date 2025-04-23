import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    contact: {
        type: Number,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    profilephoto: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    qualification: {
        type: String,
        required: true,
    }
})

export const User = mongoose.model('User', userSchema);