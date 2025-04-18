import React, { useEffect, useState } from 'react';

import SideBar from './SideBar';
import Hearder from './Hearder';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EmployeeDetails = () => {
  const {id}=useParams();
  const [employee,setEmployees]=useState([]);
 
  useEffect(()=>{
      const fetch=async()=>{
         const EmployeeDetail=await axios.get(`http://localhost:8080/api/v1/user/${id}`,{
          withCredentials:true,
         })
         console.log(EmployeeDetail.data.usersData);
         setEmployees(EmployeeDetail.data.usersData);
      }
      fetch();
  },[])


  return (
    <div className="h-screen flex flex-col">
      <Hearder />
     
        <div className="flex-1 p-8 overflow-auto">
          <div className="flex gap-8 p-6 border rounded-lg shadow-md items-center bg-white">
            <div>
              <img
                src={employee.profilephoto || 'https://via.placeholder.com/100'}
                alt={employee.name}
                className="w-24 h-24 object-cover rounded-full border"
              />
            </div>
            <div className="space-y-2">
              <div><strong>Name:</strong> {employee.name}</div>
              <div><strong>DOB:</strong> {employee.dob}</div>
              <div><strong>Contact:</strong> {employee.contact}</div>
              <div><strong>Department:</strong> {employee.department}</div>
              <div><strong>started:</strong> {employee.joining_date}</div>
              <div><strong>Salary:</strong> ₹{employee.salary}</div>
              <div>
                <strong>Status:</strong>
                <span className={`ml-2 px-2 py-1 rounded text-white 
                  ${employee.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                  {employee.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default EmployeeDetails;
