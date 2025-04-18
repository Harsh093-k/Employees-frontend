import React, { useEffect, useState } from 'react';
import Hearder from './Hearder';
import axios from 'axios';
import toast from 'react-hot-toast';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editDepartment, setEditDepartment] = useState(null);
  const [newDepartment, setNewDepartment] = useState({
    department_name: '',
    head: '',
    employees: [],
    avgSalary: '',
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/department/get', {
        withCredentials: true,
      });
      setDepartments(response.data.Departments);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch departments');
    } finally {
      setLoading(false);
    }
  };

  const handleAddDepartment = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8080/api/v1/department/create',
        newDepartment,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchDepartments();
        closeModal();
      } else {
        toast.error('Failed to add department');
      }
    } catch (error) {
      console.error(error);
      toast.error('Server error while adding department');
    }
  };

  const handleEditDepartment = (id) => {
    const deptToEdit = departments.find((dept) => dept._id === id);
    if (deptToEdit) {
      setEditDepartment(deptToEdit);
      setIsEditing(true);
      setIsModalOpen(true);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/v1/department/update/${editDepartment._id}`,
        editDepartment,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchDepartments();
      } else {
        toast.error('Update failed');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update department');
    }

    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditDepartment(null);
    setNewDepartment({ department_name: '', head: '', employees: [], avgSalary: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Hearder />
      <main className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-800">📋 Department List</h2>
            <button
              onClick={() => {
                setIsEditing(false);
                setIsModalOpen(true);
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
            >
              ➕ Add New Department
            </button>
          </div>

          <div className="overflow-auto bg-white rounded-xl shadow-md">
            <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Department Name</th>
                  <th className="px-4 py-3 text-left">Head of Department</th>
                  <th className="px-4 py-3 text-left">No. of Employees</th>
                  <th className="px-4 py-3 text-left">Avg. Salary (₹)</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {departments.map((dept, index) => (
                  <tr key={dept._id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{dept.department_name}</td>
                    <td className="px-4 py-2">{dept.head}</td>
                    <td className="px-4 py-2">{Array.isArray(dept.employees) ? dept.employees.length : 'N/A'}</td>
                    <td className="px-4 py-2">₹{dept.avgSalary}</td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                        onClick={() => handleEditDepartment(dept._id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
              <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg space-y-4">
                <h3 className="text-xl font-bold text-gray-700">
                  {isEditing ? '✏️ Edit Department' : '➕ Add New Department'}
                </h3>

                <input
                  type="text"
                  value={isEditing ? editDepartment.department_name : newDepartment.department_name}
                  onChange={(e) =>
                    isEditing
                      ? setEditDepartment({ ...editDepartment, department_name: e.target.value })
                      : setNewDepartment({ ...newDepartment, department_name: e.target.value })
                  }
                  placeholder="Department Name"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  value={isEditing ? editDepartment.head : newDepartment.head}
                  onChange={(e) =>
                    isEditing
                      ? setEditDepartment({ ...editDepartment, head: e.target.value })
                      : setNewDepartment({ ...newDepartment, head: e.target.value })
                  }
                  placeholder="Head of Department"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  value={isEditing ? editDepartment.employees.length : newDepartment.employees.length}
                  onChange={(e) => {
                    const count = parseInt(e.target.value) || 0;
                    const newArr = Array(count).fill('');
                    isEditing
                      ? setEditDepartment({ ...editDepartment, employees: newArr })
                      : setNewDepartment({ ...newDepartment, employees: newArr });
                  }}
                  placeholder="Number of Employees"
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  value={isEditing ? editDepartment.avgSalary : newDepartment.avgSalary}
                  onChange={(e) =>
                    isEditing
                      ? setEditDepartment({ ...editDepartment, avgSalary: e.target.value })
                      : setNewDepartment({ ...newDepartment, avgSalary: e.target.value })
                  }
                  placeholder="Average Salary (₹)"
                  className="w-full px-4 py-2 border rounded-lg"
                />

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={closeModal}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={isEditing ? handleSaveEdit : handleAddDepartment}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    {isEditing ? 'Save Changes' : 'Add Department'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DepartmentList;
