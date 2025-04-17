import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SlEnvolopeLetter } from "react-icons/sl";
import { FcApproval } from "react-icons/fc";
import { CgSandClock } from "react-icons/cg";
import { ImCross } from "react-icons/im";
import Employees from './EmployeesList';

const MainCard = () => {
  const [department,setDepartment]=useState([]);
  const [totalEmployees,settotalEmployees]=useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/department/get", {
          withCredentials: true,
        });
        const res2 = await axios.get("http://localhost:8080/api/v1/user/getUsers", {
            withCredentials: true,
          });
         
        settotalEmployees(res2.data.Employees);
        setDepartment(res.data.Departments);
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className='flex-1 bg-gray-100 p-6 text-gray-800'>
      <div className="mb-6 text-3xl font-semibold">Welcome to the Dashboard!</div>
 
      <div className='flex flex-wrap gap-6'>
      <Card title="Total Employees" count={totalEmployees?.length || 1} />
<Card title="Total Departments" count={department?.length || 0} />

</div>


      <div className="mt-14 text-2xl font-semibold text-center">Leaving Details</div>

      <div className="flex flex-col items-center justify-between gap-10 p-10">
        <div className="flex gap-10">
          <CardWithIcon title="Total Leave Applications" count={4} icon={<SlEnvolopeLetter size={20} />} />
          <CardWithIcon title="Approved Leaves" count={5} icon={<FcApproval size={22} />} />
        </div>
        <div className="flex gap-10">
          <CardWithIcon title="Pending Leaves" count={4} icon={<CgSandClock size={22} className="text-yellow-500" />} />
          <CardWithIcon title="Rejected Leaves" count={5} icon={<ImCross size={18} className="text-red-500" />} />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, count }) => (
  <div className='w-80 h-24 bg-white rounded shadow flex flex-col justify-between items-center'>
    <div className='w-full h-8 bg-blue-600 text-white text-sm flex items-center justify-center rounded-t'>
      {title}
    </div>
    <div className='text-black text-xl font-bold mb-4'>
      {count}
    </div>
  </div>
);

const CardWithIcon = ({ title, count, icon }) => (
  <div className='w-80 h-24 bg-white rounded shadow flex flex-col justify-between items-center'>
    <div className='w-full h-8 bg-blue-600 text-white text-sm flex items-center justify-center gap-2 rounded-t'>
      {icon} {title}
    </div>
    <div className='text-black text-xl font-bold mb-4'>{count}</div>
  </div>
);

export default MainCard;
