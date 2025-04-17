import React, { useEffect, useState } from 'react';
import Hearder from './Hearder';
import SideBar from './SideBar';
import axios from 'axios';
import toast from 'react-hot-toast';

const DepartmentList = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/v1/department/get', {
                    withCredentials: true,
                });
                setDepartments(response.data.Departments);

            } catch (err) {
                console.error(err);
                setError("Failed to fetch departments");
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();

    }, []);


    const [isEditing, setIsEditing] = useState(false);
    const [editDepartment, setEditDepartment] = useState(null);
    const [newDepartment, setNewDepartment] = useState({
        department_name: '',
        head: '',
        employees: [],
        avgSalary: ''
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddDepartment = async () => {
        try {
            const res = await axios.post(
                "http://localhost:8080/api/v1/department/create",
                newDepartment,
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message);

                setNewDepartment({
                    department_name: '',
                    head: '',
                    employees: [],
                    avgSalary: ''
                });
                setIsModalOpen(false);
            } else {
                toast.error("Failed to add department");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error while adding department");
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
                const response = await axios.get('http://localhost:8080/api/v1/department/get', {
                    withCredentials: true,
                });
                setDepartments(response.data.Departments);
            }
    
         
           
            
    
        } catch (error) {
            console.error(error);
            toast.error("Failed to update department");
        }
    
        setIsEditing(false);
        setIsModalOpen(false);
        setEditDepartment(null);
    };
    


    const closeModal = () => {
        setIsModalOpen(false);
        setIsEditing(false);
        setEditDepartment(null);
        setNewDepartment({ name: '', head: '', employees: [], avgSalary: '' });
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <Hearder />
            <div className="flex flex-1 overflow-hidden">
                <SideBar />
                <div className="p-6 w-full  overflow-auto">
                    <div className='flex justify-between items-center w-full mb-4'>
                        <h2 className="text-2xl font-bold text-gray-700">📋 Department List</h2>

                        <div>
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setIsModalOpen(true);
                                }}
                                className="bg-green-500 text-white h-12 w-36 rounded hover:bg-green-700 transition"
                            >
                                Add New Department
                            </button>
                        </div>
                    </div>



                    <div className="overflow-x-auto bg-white rounded shadow-md mb-6">
                        <table className="min-w-full border border-gray-300">
                            <thead className="bg-red-500 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left border">#</th>
                                    <th className="px-4 py-3 text-left border">Department Name</th>
                                    <th className="px-4 py-3 text-left border">Head of Department</th>
                                    <th className="px-4 py-3 text-left border">No. of Employees</th>
                                    <th className="px-4 py-3 text-left border">Avg. Salary (₹)</th>
                                    <th className="px-4 py-3 text-left border">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departments.map((dept, index) => (
                                    <tr key={dept._id} className="hover:bg-gray-100 text-gray-700">

                                        <td className="px-4 py-2 border">{index + 1}</td>

                                        <td className="px-4 py-2 border">{dept.department_name}</td>
                                        <td className="px-4 py-2 border">{dept.head}</td>


                                        <td className="px-4 py-2 border">
                                            {(Array.isArray(dept.employees) && dept.employees.length === 0) ? "null" : dept.employees.length}
                                        </td>

                                        <td className="px-4 py-2 border">₹{dept.avgSalary}</td>
                                        <td className="px-4 py-2 border flex gap-2">
                                            <button
                                                className="bg-blue-500 text-white h-8 w-16 rounded hover:bg-blue-700 transition"
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


                    {isModalOpen && (
                        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-lg w-96">
                                <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Edit Department' : 'Add New Department'}</h3>

                                <input
                                    type="text"
                                    value={isEditing ? editDepartment.department_name : newDepartment.department_name}
                                    onChange={(e) => isEditing ? setEditDepartment({ ...editDepartment, department_name: e.target.value }) : setNewDepartment({ ...newDepartment, department_name: e.target.value })}
                                    placeholder="Department Name"
                                    className="border px-4 py-2 w-full mb-4"
                                />
                                <input
                                    type="text"
                                    value={isEditing ? editDepartment.head : newDepartment.head}
                                    onChange={(e) => isEditing ? setEditDepartment({ ...editDepartment, head: e.target.value }) : setNewDepartment({ ...newDepartment, head: e.target.value })}
                                    placeholder="Head of Department"
                                    className="border px-4 py-2 w-full mb-4"
                                />
                                <input
                                    type="text"
                                    value={
                                        isEditing
                                            ? editDepartment.employees.length
                                            : newDepartment.employees.length
                                    }
                                    onChange={(e) => {
                                        const count = parseInt(e.target.value);
                                        const newArray = Array.from({ length: count }, () => '');
                                        isEditing
                                            ? setEditDepartment({ ...editDepartment, employees: newArray })
                                            : setNewDepartment({ ...newDepartment, employees: newArray });
                                    }}
                                    placeholder="Number of Employees"
                                    className="border px-4 py-2 w-full mb-4"
                                />

                                <input
                                    type="number"
                                    value={isEditing ? editDepartment.avgSalary : newDepartment.avgSalary}
                                    onChange={(e) => isEditing ? setEditDepartment({ ...editDepartment, avgSalary: e.target.value }) : setNewDepartment({ ...newDepartment, avgSalary: e.target.value })}
                                    placeholder="Average Salary (₹)"
                                    className="border px-4 py-2 w-full mb-4"
                                />
                                <div className="flex justify-between gap-4">
                                    <button
                                        onClick={closeModal}
                                        className="bg-gray-300 text-white h-12 w-36 rounded hover:bg-gray-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={isEditing ? handleSaveEdit : handleAddDepartment}
                                        className="bg-green-500 text-white h-12 w-36 rounded hover:bg-green-700"
                                    >
                                        {isEditing ? 'Save Changes' : 'Add Department'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default DepartmentList;
