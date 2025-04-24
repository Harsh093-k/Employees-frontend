
import React, { useState } from "react";
import axios from "axios";
import Hearder from "./Hearder";
const departmentList = [
  'Human_Resources',
  'Software_Development',
  'Quality_Assurance',
  'Product_Management',
  'Sales_and_Marketing',
  'IT_Support',
  'DevOps',
  'Customer_Support',
  'Business_Analysis',
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
    profilephoto: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      console.log(res.data.message);
      setMessage(res.data.message);
    } catch (err) {
      console.log(err);
      setMessage(err.response?.data?.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 ">
  <Hearder />

  <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl px-8 py-10 space-y-6 border border-gray-100">
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800">👤 Create New Employee</h1>
      <p className="mt-2 text-gray-500">Fill in the details below to add a new team member</p>
    </div>

    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        ["name", "Full Name", "text"],
        ["experience", "Experience (Years)", "number"],
        ["status", "Status", "text"],
        ["contact", "Contact Number", "tel"],
        ["salary", "Salary (₹)", "number"],
        ["email", "Email Address", "email"],
        ["qualification", "Qualification", "text"],
        ["dob", "Date of Birth", "date"],
      ].map(([key, label, type]) => (
        <div key={key} className={key === "name" || key === "qualification" ? "md:col-span-2" : ""}>
          <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
          <input
            id={key}
            name={key}
            type={type}
            value={formData[key]}
            onChange={handleChange}
            placeholder={label}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            required
          />
        </div>
      ))}

      <div className="md:col-span-2">
        <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
          Department
        </label>
        <select
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
          required
        >
          <option value="">-- Select Department --</option>
          {departmentList.map((dept) => (
            <option key={dept} value={dept}>
              {dept.replace(/_/g, ' ')}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700 mb-1">
          Profile Photo
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-blue-500 rounded-lg cursor-pointer transition-all hover:bg-blue-50">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
              <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 5MB)</p>
            </div>
            <input 
              id="profilePhoto" 
              type="file" 
              name="profilePhoto"
              accept="image/*"
              onChange={handleChange}
              className="hidden" 
              required
            />
          </label>
        </div>
      </div>

      <div className="md:col-span-2 pt-4">
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 hover:shadow-blue-200 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating...
            </>
          ) : "Create Employee"}
        </button>
      </div>

      {message && (
        <div className={`md:col-span-2 text-center text-sm font-medium py-3 px-4 rounded-lg ${message.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}
    </form>
  </div>
</div>

  );
}
