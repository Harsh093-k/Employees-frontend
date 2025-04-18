import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SlEnvolopeLetter } from "react-icons/sl";
import { FcApproval } from "react-icons/fc";
import { CgSandClock } from "react-icons/cg";
import { ImCross } from "react-icons/im";

const MainCard = () => {
  const [department, setDepartment] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("https://employees-frontend.onrender.com/api/v1/department/get", {
          withCredentials: true,
        });
        const res2 = await axios.get("https://employees-frontend.onrender.com/api/v1/user/getUsers", {
          withCredentials: true,
        });

        setTotalEmployees(res2.data.usersData);
        setDepartment(res.data.Departments);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className='flex-1 bg-gray-100 p-6 text-gray-800'>
      <h1 className="text-3xl font-bold mb-8 text-center">👋 Welcome to the Employee Dashboard</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto'>
        <StatCard title="Total Employees" count={totalEmployees?.length || 0} />
        <StatCard title="Total Departments" count={department?.length || 0} />
      </div>

      <h2 className="mt-16 mb-6 text-2xl font-semibold text-center border-b pb-2">📊 Leave Application Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <StatCardWithIcon title="Total Leave Applications" count={4} icon={<SlEnvolopeLetter size={20} />} />
        <StatCardWithIcon title="Approved Leaves" count={5} icon={<FcApproval size={22} />} />
        <StatCardWithIcon title="Pending Leaves" count={4} icon={<CgSandClock size={22} className="text-yellow-500" />} />
        <StatCardWithIcon title="Rejected Leaves" count={5} icon={<ImCross size={18} className="text-red-500" />} />
      </div>
    </div>
  );
};

const StatCard = ({ title, count }) => (
  <div className='bg-white rounded-lg shadow hover:shadow-md transition p-6 flex flex-col items-center justify-center h-32'>
    <div className='text-sm text-gray-600 mb-2'>{title}</div>
    <div className='text-3xl font-bold text-blue-600'>{count}</div>
  </div>
);

const StatCardWithIcon = ({ title, count, icon }) => (
  <div className='bg-white rounded-lg shadow hover:shadow-md transition p-6 flex items-center gap-4 h-32'>
    <div className='text-blue-500'>{icon}</div>
    <div>
      <div className='text-sm text-gray-600'>{title}</div>
      <div className='text-2xl font-bold text-gray-800'>{count}</div>
    </div>
  </div>
);

export default MainCard;

