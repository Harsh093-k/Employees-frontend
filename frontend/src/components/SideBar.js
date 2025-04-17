import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SideBar = () => {
    
    return (
        <>
        <div className='bg-gray-500 w-60 flex flex-col text-white py-4'>
            <div className='text-md hover:text-green-300 cursor-pointer m-4'><Link to={"/"}>Dashboard</Link></div>
            <div className='text-md hover:text-green-300 cursor-pointer m-4' ><Link to={"/Employees"}>Employees</Link></div>
            <div className='text-md hover:text-green-300 cursor-pointer m-4'><Link to={"/DepartmentList"}>Department</Link></div>
            <div className='text-md hover:text-green-300 cursor-pointer m-4'><Link to={""}>Leaves</Link></div>
            <div className='text-md hover:text-green-300 cursor-pointer m-4'><Link to={"/salary"}>Salary</Link></div>
            <div className='text-md hover:text-green-300 cursor-pointer m-4'><Link to={""}>Setting</Link></div>
        </div>
        </>
    )
}

export default SideBar
