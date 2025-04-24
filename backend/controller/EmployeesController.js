
import { User } from "../model/Employees.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Department } from "../model/Department.js";
dotenv.config();


import  cloudinary  from '../utiles/cloudinary.js';

export const create = async (req, res) => {
  const { name, experience, status,contact, salary, department, email,qualification, dob } = req.body;
  const profilePhoto = req.file;
  

  if (!name || !email ||!status|| !qualification || !salary || !contact || !department || !experience || !profilePhoto || !dob ) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
        success: false,
      });
    }

    const base64Image = `data:${profilePhoto.mimetype};base64,${profilePhoto.buffer.toString("base64")}`;
   
    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: "Employees",
    });

  

    const newUser = await User.create({
      name,
      experience,
      contact,
      salary,
      dob,
      department,
      email,
      status,
      qualification,
      profilephoto: uploadResult.secure_url,
    });
    const dept =await Department.findOne({department_name:department});
    if(dept){
       dept.employees.push(newUser._id);
        await dept.save();
    }
    res.status(200).json({
      message: "Employee created successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};


export const getAllUsers=async(req,res)=>{
    try{
       const usersData=await User.find().select("-password");
       if(!usersData){
        res.status(400).json({message:"Users is Empty" ,success:true})
       }
       res.status(200).json({message:"Users Data" ,success:false ,usersData})
    }catch(error){
      res.status(501).json({message:"server error" ,success:false})
    }
}

export const getUserById=async(req,res)=>{
  try{
     const usersData=await User.findById(req.params.id).select("-password");
     if(!usersData){
      res.status(400).json({message:"Users is Empty" ,success:true})
     }
     res.status(200).json({message:"Users Data" ,success:false ,usersData})
  }catch(error){
    res.status(501).json({message:"server error" ,success:false})
  }
}

export const changestatus=async(req,res)=>{
  try{
     const usersData=await User.findById(req.params.id).select("-password");
     if(!usersData){
      res.status(400).json({message:"Users is Empty" ,success:false})
     }
     if (usersData.status === "Leave") {
      return res.status(200).json({ message: "User is already active", success: false });
    }
     usersData.status="Leave"
     await usersData.save()
     res.status(200).json({message:"User on leave !" ,success:true })
  }catch(error){
    res.status(501).json({message:"server error" ,success:false})
  }
}
export const changestatus2 = async (req, res) => {
  try {
    const usersData = await User.findById(req.params.id).select("-password");

    if (!usersData) {
      return res.status(400).json({ message: "User not found", success: false });
    }

    if (usersData.status === "active") {
      return res.status(200).json({ message: "User is already active", success: false });
    }

    usersData.status = "active";
    await usersData.save();

    res.status(200).json({ message: "User status changed to active", success: true });
    
  } catch (error) {
    console.error("Error changing status:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};


export const deleteUsers = async (req, res) => {
  try {
    const usersData = await User.findById(req.params.id).select("-password");

    if (!usersData) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }


    const dept = await Department.findOne({ department_name: usersData.department });

    dept.employees.pull(usersData._id);
    await dept.save();

   
    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: "User deleted successfully",
      success: true,
      usersData,
    });
  } catch (error) {
    console.error("Delete User Error:", error);
    return res.status(501).json({
      message: "Server error",
      success: false,
    });
  }
};

export const getUserByIdAndupdate = async (req, res) => {
  try {
    const usersData = await User.findById(req.params.id).select("-password");

    if (!usersData) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    const allowedFields = [
      "name",
      "experience",
      "contact",
      "profilephoto",
      "salary",
      "department",
      "email",
      "status"
    ];

    // Dynamically update only provided fields
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        usersData[field] = req.body[field];
      }
    });

    // Handle image upload if profilePhoto is provided
    if (req.file) {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
      const uploadResult = await cloudinary.uploader.upload(base64Image, {
        folder: "Employees",
      });
      console.log("Profile photo before:", usersData.profilephoto);
usersData.profilephoto = uploadResult.secure_url;
console.log("Profile photo after:", usersData.profilephoto);

      
    }

    await usersData.save();

    res.status(200).json({
      message: "User updated successfully",
      success: true,
      usersData
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message
    });
  }
};



export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

 
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }


    

    if (username !== "harsh" || password !== "bro") {
      return res.status(401).json({
        message: "Incorrect email",
        success: false,
      });
    }
   const userId="121352121322"
  
    const token = jwt.sign({ userId: userId}, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });


   
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,        
      sameSite: 'None',  
      maxAge: 7 * 24 * 60 * 60 * 1000
    }).json({
      message: 'Welcome back Admin',
      success: true,
      token
    });
    
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};
export const logoutUser = (req, res) => {
  try{
  res.cookie("token", " ", { maxAge: 0 });

  res.json({
    message: "Logged out successfully",
  });

}catch(error){
  console.error('Error during registration:', error);
  res.status(500).json({
    message: error.message,
  });
}};
