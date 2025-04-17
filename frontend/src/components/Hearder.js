import axios from 'axios';
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Hearder = () => {
    const navigate=useNavigate();
    const logout=async()=>{
        try{
            const res=await axios.get("http://localhost:8080/api/v1/user/logout");
            if(res.data.message){
                toast.success(res.data.message);
                navigate("/login")
            }
        }catch(error){
            toast.error("server error")
        }
    }
  return (
    <div className="w-full h-14 bg-green-400 flex items-center px-4 text-white font-bold justify-between">
    <span className='text-md '>Employees MS</span>
    <span>Welcome Admin</span>
    <span><button className="bg-white text-green-500 px-3 py-1 rounded" onClick={logout}>Log Out</button></span>
  </div>
  )
}

export default Hearder
