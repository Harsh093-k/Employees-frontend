import React, { useState } from 'react';
import TextInput from '../assests/TextInput';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        'http://localhost:8080/api/v1/user/login',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setUsername('');
        setPassword('');
        navigate('/');
      }
    } catch (error) {
      toast.error('Invalid username or password!');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1581092334820-4b8f9b0b11e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")',
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60 z-0" />

      <div className="relative z-10 w-full max-w-md bg-white bg-opacity-95 shadow-xl rounded-xl p-10 backdrop-blur-md">
        <div className="flex justify-center mb-6">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaVp7mOKy_69Wn6LrHj3PDbKJvsj3VtkM1Wg&s"
            alt="ManageEmployees Logo"
            className="h-24"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Employee Management
        </h2>
        

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <FaUser className="text-gray-400 mr-2" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
            <FaLock className="text-gray-400 mr-2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        <button
          onClick={login}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        <div className="mt-4 flex justify-between text-sm text-gray-600">
        
          <span>
            Don't have an account?{' '}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Contact Admin
            </span>
          </span>
        </div>

        <p className="mt-6 text-xs text-center text-gray-400">
          © {new Date().getFullYear()} Employee Management System. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
