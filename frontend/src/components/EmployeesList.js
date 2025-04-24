import React, { useEffect, useState } from 'react';
import Hearder from './Hearder';
import Sidebar from './SideBar';
import { Link, useNavigate } from 'react-router-dom';
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
      const data = await axios.get('https://employees-frontend.onrender.com/api/v1/user/getUsers', {
        withCredentials: true,
      });
      setEmployeesData(data.data.usersData);
    };
    fetch();
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      const res = await axios.delete(`https://employees-frontend.onrender.com/api/v1/user/delete/${employeeId}`, {
        withCredentials: true,
      });
      if (res.data.message) {
        toast.success(res.data.message);
        const refreshed = await axios.get('https://employees-frontend.onrender.com/api/v1/user/getUsers', {
          withCredentials: true,
        });
        setEmployeesData(refreshed.data.usersData);
      }
    } catch (error) {
      toast.error('Server Error');
    }
  };

  const handleLeave = async (employeeId) => {
    try {
      const res = await axios.get(`https://employees-frontend.onrender.com/api/v1/user/status/${employeeId}`, {
        withCredentials: true,
      });
      if (res.data.message) {
        navigate('/Employees');
        toast.success(res.data.message);
        const refreshed = await axios.get('https://employees-frontend.onrender.com/api/v1/user/getUsers', {
          withCredentials: true,
        });
        setEmployeesData(refreshed.data.usersData);
      }
    } catch (error) {
      toast.error('Server Error');
    }
  };

  const handleActuve = async (employeeId) => {
    try {
      const res = await axios.get(`https://employees-frontend.onrender.com/api/v1/user/status/active/${employeeId}`, {
        withCredentials: true,
      });
      if (res.data.message) {
        navigate('/Employees');
        toast.success(res.data.message);
        const refreshed = await axios.get('https://employees-frontend.onrender.com/api/v1/user/getUsers', {
          withCredentials: true,
        });
        setEmployeesData(refreshed.data.usersData);
      }
    } catch (error) {
      toast.error('Server Error');
    }
  };
  const filteredData = employeesdata.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Hearder />

      <main className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-3xl font-semibold text-gray-800">👥 Employee List</h2>
            <Link to="/create">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition">
                ➕ Create Employee
              </button>
            </Link>
          </div>

          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search by name, department, or status"
              className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-green-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-full text-sm md:text-base divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="text-left px-4 py-3">ID</th>
                  <th className="text-left px-4 py-3">Name</th>
                  <th className="text-left px-4 py-3">DOB</th>
                  <th className="text-left px-4 py-3">Department</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((employee, index) => (
                  <tr key={employee._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{employee.name}</td>
                    <td className="px-4 py-2">{employee.dob?.slice(0, 10)}</td>
                    <td className="px-4 py-2">{employee.department}</td>
                    <td className="px-4 py-2">{employee.status}</td>
                    <td className="px-4 py-2 flex flex-wrap gap-2">
                      <Link to={`/EmployeeDetail/${employee._id}`}>
                        <button className="bg-emerald-500 hover:bg-emerald-700 text-white px-3 py-1 rounded">
                          View
                        </button>
                      </Link>
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setIsEditModalOpen(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleActuve(employee._id)}
                        className="bg-pink-500 hover:bg-pink-700 text-white px-3 py-1 rounded"
                      >
                        Active
                      </button>
                      <button
                        onClick={() => handleLeave(employee._id)}
                        className="bg-yellow-500 hover:bg-yellow-700 text-white px-3 py-1 rounded"
                      >
                        Leave
                      </button>
                      <button
                        onClick={() => handleDelete(employee._id)}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Edit Modal */}
          {isEditModalOpen && selectedEmployee && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl space-y-4">
                <h3 className="text-xl font-bold text-gray-700">✏️ Edit Employee</h3>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    const formData = new FormData();

                    
                    formData.append("name", selectedEmployee.name || "");
                    formData.append("experience", selectedEmployee.experience || "");
                    formData.append("email", selectedEmployee.email || "");
                    formData.append("contact", selectedEmployee.contact || "");
                    formData.append("salary", selectedEmployee.salary || "");
                    formData.append("department", selectedEmployee.department || "");
                    formData.append("status", selectedEmployee.status || "");

                    if (selectedEmployee.profilephoto instanceof File) {
                      formData.append("profilephoto", selectedEmployee.profilephoto); 
                    }

                    try {
                      const res = await axios.put(
                        `https://employees-frontend.onrender.com/api/v1/user/update/${selectedEmployee._id}`,
                        formData,
                        {
                          withCredentials: true,
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        }
                      );

                      if (res.data.message) {
                        toast.success(res.data.message);
                        setIsEditModalOpen(false);

                        const refreshed = await axios.get("https://employees-frontend.onrender.com/api/v1/user/getUsers", {
                          withCredentials: true,
                        });

                        setEmployeesData(refreshed.data.usersData);
                      }
                    } catch (err) {
                      console.error(err);
                      toast.error("Update failed");
                    }
                  }}
                  className="space-y-4"
                >
                  <input
                    type="text"
                    value={selectedEmployee.name || ''}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, name: e.target.value })}
                    className="border w-full px-3 py-2 rounded"
                    placeholder="Name"
                  />

                  <input
                    type="text"
                    value={selectedEmployee.experience || ''}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, experience: e.target.value })}
                    className="border w-full px-3 py-2 rounded"
                    placeholder="Experience"
                  />

                  {selectedEmployee.profilephoto && typeof selectedEmployee.profilephoto === 'string' && (
                    <img
                      src={selectedEmployee.profilephoto}
                      alt="Current Profile"
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setSelectedEmployee({
                        ...selectedEmployee,
                        profilephoto: e.target.files[0],
                      })
                    }
                    className="block w-full border rounded px-3 py-2"
                  />

                  <input
                    type="email"
                    value={selectedEmployee.email || ''}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })}
                    className="border w-full px-3 py-2 rounded"
                    placeholder="Email"
                  />

                  <input
                    type="text"
                    value={selectedEmployee.contact || ''}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, contact: e.target.value })}
                    className="border w-full px-3 py-2 rounded"
                    placeholder="Contact"
                  />

                  <input
                    type="text"
                    value={selectedEmployee.salary || ''}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, salary: e.target.value })}
                    className="border w-full px-3 py-2 rounded"
                    placeholder="Salary"
                  />

                  <input
                    type="date"
                    value={selectedEmployee.dob?.slice(0, 10) || ''}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, dob: e.target.value })}
                    className="border w-full px-3 py-2 rounded"
                  />

                  <input
                    type="text"
                    value={selectedEmployee.department || ''}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, department: e.target.value })}
                    className="border w-full px-3 py-2 rounded"
                    placeholder="Department"
                  />

                  <input
                    type="text"
                    value={selectedEmployee.status || ''}
                    onChange={(e) => setSelectedEmployee({ ...selectedEmployee, status: e.target.value })}
                    className="border w-full px-3 py-2 rounded"
                    placeholder="Status"
                  />

                  <div className="flex justify-between pt-2">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Employees;
