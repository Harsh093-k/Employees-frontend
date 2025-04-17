import React, { useState } from 'react';
import Hearder from './Hearder';
import SideBar from './SideBar';

const SalaryStructure = () => {
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState('');

  const salaryRanges = {
    Human_Resources: '₹25,000 - ₹35,000',
    Software_Development: '₹50,000 - ₹70,000',
    Quality_Assurance: '₹40,000 - ₹50,000',
    Product_Management: '₹60,000 - ₹80,000',
    Sales_and_Marketing: '₹35,000 - ₹45,000',
    IT_Support: '₹25,000 - ₹40,000',
    DevOps: '₹45,000 - ₹75,000',
    Customer_Support: '₹20,000 - ₹30,000',
    Business_Analysis: '₹45,000 - ₹60,000'
  };

  const handleDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    setDepartment(selectedDept);
    setSalary(salaryRanges[selectedDept] || '');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Hearder />

      <div className="flex h-screen">
        <SideBar />

        <div className="flex-1 p-8">
          <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Salary Structure Based on Department
            </h2>

            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                  Select Department
                </label>
                <select
                  id="department"
                  value={department}
                  onChange={handleDepartmentChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Department</option>
                  {Object.keys(salaryRanges).map((dept) => (
                    <option key={dept} value={dept}>
                      {dept.replaceAll('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {department && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">Salary Range</label>
                  <div className="text-xl font-bold text-gray-800">{salary}</div>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => {
                  setDepartment('');
                  setSalary('');
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryStructure;
