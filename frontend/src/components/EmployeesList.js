import React, { useEffect, useState } from 'react';
import Hearder from './Hearder';
import Sidebar from './SideBar';
import { data, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Employees = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [employeesdata, setEmployeesData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await axios.get("http://localhost:8080/api/v1/user/getUsers",
        { withCredentials: true }
      )

      setEmployeesData(data.data.usersData)
    }
    fetch()
  }, [])
  const handleDelete = async (employeeId) => {
    try {
      const res = await axios.delete(`http://localhost:8080/api/v1/user/delete/${employeeId}`, {
        withCredentials: true,
      })
      if (res.data.message) {
    
        toast.success(res.data.message)
        const refreshed = await axios.get("http://localhost:8080/api/v1/user/getUsers", {
          withCredentials: true,
        });
        setEmployeesData(refreshed.data.usersData);
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };
  const handleLeave = async (employeeId) => {
    try {
      const res = await axios.get(`http://localhost:8080/api/v1/user/status/${employeeId}`, {
        withCredentials: true,
      })
      if (res.data.message) {
        navigate("/Employees")
        toast.success(res.data.message);
        const refreshed = await axios.get("http://localhost:8080/api/v1/user/getUsers", {
          withCredentials: true,
        });
        setEmployeesData(refreshed.data.usersData);
      }
    } catch (error) {
      toast.error("Server Error");
    }
  };

  const handleView = (employeeId) => {
    console.log(employeeId);
  };


  const filteredData = employeesdata.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col">
      <Hearder />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <div className='flex items-center justify-between mb-4'>
            <h2 className="text-2xl font-semibold">Employee List</h2>
            <button className='bg-green-400 text-white h-12 w-36 rounded hover:bg-green-800 transition'>
              <Link to="/create">Create Employee</Link>
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name, department or status"
              className="border px-4 py-2 w-full rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded shadow">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="text-left px-6 py-3 border-b">ID</th>
                  <th className="text-left px-6 py-3 border-b">Name</th>
                  <th className="text-left px-6 py-3 border-b">DOB</th>
                  <th className="text-left px-6 py-3 border-b">Department</th>
                  <th className="text-left px-6 py-3 border-b">Status</th>
                  <th className="text-left px-6 py-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((employee, index) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{index + 1}</td>
                    <td className="px-6 py-4 border-b">{employee.name}</td>
                    <td className="px-6 py-4 border-b"> {employee.dob ? employee.dob.slice(0, 10) : ''}</td>
                    <td className="px-6 py-4 border-b">{employee.department}</td>
                    <td className="px-6 py-4 border-b">{employee.status}</td>
                    <td className="px-6 py-4 border-b flex gap-2">
                      <button className='bg-emerald-500 text-white h-8 w-16 rounded hover:bg-emerald-700 transition'>
                        <Link to={`/EmployeeDetail/${employee._id}`}>View</Link>
                      </button>
                      <button className='bg-blue-500 text-white h-8 w-16 rounded hover:bg-blue-700 transition' onClick={() => {
                        setSelectedEmployee(employee);
                        setIsEditModalOpen(true);
                      }}>Edit</button>
                      <button className='bg-yellow-500 text-white h-8 w-16 rounded hover:bg-yellow-700 transition' onClick={() => handleLeave(employee._id)}>Leave</button>
                      <button className='bg-red-500 text-white h-8 w-16 rounded hover:bg-red-700 transition' onClick={() => handleDelete(employee._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isEditModalOpen && selectedEmployee && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-md w-[400px] shadow-lg relative">
                <h2 className="text-xl font-semibold mb-4">Edit Employee</h2>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    try {
                      const res = await axios.put(
                        `http://localhost:8080/api/v1/user/update/${selectedEmployee._id}`,
                        selectedEmployee,
                        { withCredentials: true }
                      );
                      if (res.data.message) {
                        toast.success(res.data.message);
                        setIsEditModalOpen(false);
                        const refreshed = await axios.get("http://localhost:8080/api/v1/user/getUsers", {
                          withCredentials: true,
                        });
                        setEmployeesData(refreshed.data.usersData);
                      }
                    } catch (err) {
                      toast.error("Update failed");
                    }
                  }}
                >
                  <label className="block mb-2">
                    Name:
                    <input
                      type="text"
                      className="border px-2 py-1 w-full"
                      value={selectedEmployee.name || ''}
                      onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })}
                    />
                  </label>

                  <label className="block mb-4">
                    Experience:
                    <input
                      type="text"
                      className="border px-2 py-1 w-full"
                      value={selectedEmployee.experience || ''}
                      onChange={(e) => setSelectedEmployee({ ...selectedEmployee, experience: e.target.value })}
                    />
                  </label>

                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Photo
                  </label>

                  
                  {selectedEmployee.profilePhoto && typeof selectedEmployee.profilePhoto === "string" && (
                    <img
                      src={selectedEmployee.profilePhoto}
                      alt="Current Profile"
                      className="mb-2 h-20 w-20 object-cover rounded-full"
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        profilePhoto: e.target.files[0]  
                      })
                    }
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                  />

                  <label className="block mb-4">
                    Email:
                    <input
                      type="email"
                      className="border px-2 py-1 w-full"
                      value={selectedEmployee.email || ''}
                      onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })}
                    />
                  </label>

                  <label className="block mb-4">
                    Contact:
                    <input
                      type="text"
                      className="border px-2 py-1 w-full"
                      value={selectedEmployee.contact || ''}
                      onChange={(e) => setSelectedEmployee({ ...selectedEmployee, contact: e.target.value })}
                    />
                  </label>

                  <label className="block mb-4">
                    Salary:
                    <input
                      type="text"
                      className="border px-2 py-1 w-full"
                      value={selectedEmployee.salary || ''}
                      onChange={(e) => setSelectedEmployee({ ...selectedEmployee, salary: e.target.value })}
                    />
                  </label>

                  <label className="block mb-2">
                    DOB:
                    <input
                      type="date"
                      className="border px-2 py-1 w-full"
                      value={selectedEmployee.dob ? selectedEmployee.dob.slice(0, 10) : ''}
                      onChange={(e) => setSelectedEmployee({ ...selectedEmployee, dob: e.target.value })}
                    />
                  </label>

                  <label className="block mb-2">
                    Department:
                    <input
                      type="text"
                      className="border px-2 py-1 w-full"
                      value={selectedEmployee.department || ''}
                      onChange={(e) => setSelectedEmployee({ ...selectedEmployee, department: e.target.value })}
                    />
                  </label>

                  <label className="block mb-4">
                    Status:
                    <input
                      type="text"
                      className="border px-2 py-1 w-full"
                      value={selectedEmployee.status || ''}
                      onChange={(e) => setSelectedEmployee({ ...selectedEmployee, status: e.target.value })}
                    />
                  </label>

                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                      onClick={() => setIsEditModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Employees;
