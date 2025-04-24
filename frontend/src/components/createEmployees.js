import React, { useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Hearder from "./Hearder";
const departmentList = [
  'Human Resources',
  'Software Development',
  'Quality Assurance',
  'Product Management',
  'Sales and Marketing',
  'IT Support',
  'DevOps',
  'Customer Support',
  'Business Analysis',
];

export default function CreateEmployeeForm() {
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    status: "",
    contact: "",
    salary: "",
    department: "",
    email: "",
    qualification: "",
    dob: "",
    profilePhoto: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      const res = await axios.post("https://employees-frontend.onrender.com/api/v1/user/create", data,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      navigate("/Employees");
      setMessage(res.data.message);
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Hearder />
    <div className="max-w-2xl mx-auto p-4 shadow-lg rounded-2xl bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Employee</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {[
          ["name", "Name"],
          ["experience", "Experience"],
          ["status", "Status"],
          ["contact", "Contact"],
          ["salary", "Salary"],
          ["email", "Email"],
          ["qualification", "Qualification"],
          ["dob", "Date of Birth"],
        ].map(([key, label]) => (
          <input
            key={key}
            name={key}
            type={key === "dob" ? "date" : "text"}
            value={formData[key]}
            onChange={handleChange}
            placeholder={label}
            className="p-2 border border-gray-300 rounded-lg"
            required
          />
        ))}

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg"
          required
        >
          <option value="">Select Department</option>
          {departmentList.map((dept) => (
            <option key={dept} value={dept}>{dept.replace(/_/g, ' ')}</option>
          ))}
        </select>

        <input
          type="file"
          name="profilePhoto"
          accept="image/*"
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-xl"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Employee"}
        </button>

        {message && <p className="text-center text-red-500 mt-2">{message}</p>}
      </form>
    </div>
    </div>
  );
}
