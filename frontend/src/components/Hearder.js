import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { FiMenu, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Hearder = () => {
    const navigate=useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const logout=async()=>{
        try{
        
            const logout=await axios.get('https://employees-frontend.onrender.com/api/v1/user/logout',{
                      withCredentials:true,
            })
           toast.success(logout.data.message);
           Cookies.set("token","");
           navigate('/login');
        }catch(error){
            toast.error("server error")
        }
    }
  
  
      const toggleMenu = () => {
          setMenuOpen(!menuOpen);
      };
  
      return (
          <nav className="bg-blue-600 text-white shadow-md">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between h-16 items-center">
                      {/* Logo */}
                      <div className="flex-shrink-0 text-lg font-bold">
                          EmployeeManager
                      </div>
  
                      {/* Desktop Menu */}
                      <div className="hidden md:flex space-x-6">
                          <a href="/" className="hover:text-gray-200">Dashboard</a>
                          <a href="/employees" className="hover:text-gray-200">Employees</a>
                          <a href="/departments" className="hover:text-gray-200">Departments</a>
                          <a className="hover:text-gray-200 cursor-pointer" onClick={logout}>Logout</a>
                          <a href="/settings" className="hover:text-gray-200">Settings</a>
                      </div>
  
                      {/* Mobile Menu Button */}
                      <div className="md:hidden">
                          <button onClick={toggleMenu} className="focus:outline-none">
                              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                          </button>
                      </div>
                  </div>
              </div>
  
              {/* Mobile Menu Dropdown */}
              {menuOpen && (
                  <div className="md:hidden bg-blue-700">
                      <a href="/" className="block px-4 py-2 hover:bg-blue-800">Dashboard</a>
                      <a href="/employees" className="block px-4 py-2 hover:bg-blue-800">Employees</a>
                      <a href="/departments" className="block px-4 py-2 hover:bg-blue-800">Departments</a>
                      <a href="/settings" className="block px-4 py-2 hover:bg-blue-800">Settings</a>
                  </div>
              )}
          </nav>
      );
}

export default Hearder
