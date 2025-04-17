import { Department } from "../model/Department.js";

export const createDepartment=async(req,res)=>{
    try{
        const {department_name,avgSalary,head}=req.body;
        console.log({department_name,avgSalary,head});
   
        if(!department_name || !avgSalary || !head){
            return res.status(400).json({
                message: "All fields are required",
                success: false,
              });
        }

        const newDepartment=await Department.create({department_name,avgSalary,head});
        res.status(200).json({message:"Department successfull created" ,success:true})
        

    }catch(error){
        console.error(error)
        res.status(500).json({message:"server error" ,success:false})
    }
}
export const getDepartment=async(req,res)=>{
    try{
        const Departments=await Department.find();
        res.status(200).json({message:"successful" ,success:true,Departments})
    }catch(error){
        console.error(error)
        res.status(500).json({message:"server error" ,success:false})
    }
}
export const updateDepartment=async(req,res)=>{
    try{
        const {department_name,employees,avgSalary,head}=req.body;
        const Departments=await Department.findById(req.params.id);
        Departments.department_name = department_name,
        Departments.head=head,
        Departments.avgSalary=avgSalary,
        Departments.employees=employees,

        await Departments.save()
        res.status(200).json({message:"Upadate successful" ,success:true})
    }catch(error){
        console.error(error)
        res.status(500).json({message:"server error" ,success:false})
    }
}