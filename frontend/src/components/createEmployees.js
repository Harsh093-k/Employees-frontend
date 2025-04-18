import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Hearder from './Hearder';

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [experience, setExperience] = useState('');
  const [contact, setContact] = useState('');
  const [salary, setSalary] = useState('');
  const [dob, setDob] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const navigate = useNavigate();

  // Department with corresponding salary ranges
  const departmentSalary = {
    Human_Resources: '₹25,000 - ₹35,000',
    Software_Development: '₹50,000 - ₹70,000',
    Quality_Assurance: '₹40,000 - ₹50,000',
    Product_Management: '₹60,000 - ₹80,000',
    Sales_and_Marketing: '₹35,000 - ₹45,000',
    IT_Support: '₹25,000 - ₹40,000',
    DevOps: '₹45,000 - ₹75,000',
    Customer_Support: '₹20,000 - ₹30,000',
    Business_Analysis: '₹45,000 - ₹60,000',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profilePhoto) {
      toast.error("Profile photo is required!");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('experience', experience);
    formData.append('contact', contact);
    formData.append('salary', salary);
    formData.append('dob', dob);
    formData.append('status', 'active');
    formData.append('department', department);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profilePhoto', profilePhoto);

    try {
      const res = await axios.post(
        'https://employees-frontend.onrender.com/api/v1/user/create',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      navigate('/');
    } catch (error) {
      console.error('Error creating employee:', error);
      toast.error(error.response?.data?.message || "Failed to create employee");
    }
  };

  const handleDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    setDepartment(selectedDept);
    setSalary(departmentSalary[selectedDept] || '');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Hearder />
      <main className="flex-grow p-6">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-lg space-y-8"
        >
          <h2 className="text-3xl font-bold text-center text-blue-600">
            Create New Employee
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Full Name" value={name} onChange={setName} />
            <Input label="Email" type="email" value={email} onChange={setEmail} />
            <Input label="Password" type="password" value={password} onChange={setPassword} />
            <Input label="Contact Number" type="text" value={contact} onChange={setContact} />
            <Input label="Salary" type="text" value={salary} onChange={setSalary} readOnly />
            <Input label="Experience (years)" type="text" value={experience} onChange={setExperience} />
            <Input label="Date of Birth" type="date" value={dob} onChange={setDob} />
            
           
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                value={department}
                onChange={handleDepartmentChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Select Department</option>
                {Object.keys(departmentSalary).map((dept) => (
                  <option key={dept} value={dept}>
                    {dept.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Upload Profile Photo <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
              className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-lg bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-200"
          >
            🚀 Create Employee
          </button>
        </form>
      </main>
    </div>
  );
};

const Input = ({ label, value, onChange, type = "text", readOnly = false }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
      readOnly={readOnly}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default CreateEmployee;
