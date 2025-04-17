// import React, { useState } from 'react';
// import TextInput from '../assests/TextInput';
// import Hearder from './Hearder';
// import SideBar from './SideBar';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';

// function CreateEmployees() {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [contact, setContact] = useState('');
//   const [dob, setDOB] = useState('');
//   const [experience, setExperience] = useState("");
//   const [salary, setSalary] = useState('');
//   const [password, setPassword] = useState('');
//   const [department, setDepartment] = useState('');
//   const [profilephoto, setProfilephoto] = useState(null);

//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('name', name);
//       formData.append('email', email);
//       formData.append('contact', contact);
//       formData.append('experience', experience);
//       formData.append('dob', dob);
//       formData.append('salary', salary);
//       formData.append('password', password);
//       formData.append('department', department);
//       formData.append('profilePhoto', profilephoto); // ✅ must be a File object

      
//       for (let pair of formData.entries()) {
//         console.log(pair[0], pair[1]);
//       }

//       const res = await axios.post(
//         'http://localhost:8080/api/v1/user/create',
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       if (res.data.message) {
//         toast.success(res.data.message);
//         navigate('/');
//       }
//     } catch (error) {
//       console.error('Server error:', error);
//       toast.error('Something went wrong while creating employee.');
//     }
//   };



//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100">
//       <div><Hearder /></div>



//       <div className="flex flex-1">


//         <SideBar />



//         <div className="flex-1  overflow-y-auto">
//           <div className="max-w-xl mx-auto">
//             <h2 className="text-2xl font-bold mb-6 text-center">Create New Employee</h2>

//             <TextInput label="Name" inputtype="text" placeholder="Enter name" value={name} setvalue={setName} />
//             <TextInput label="Email" inputtype="email" placeholder="Enter email" value={email} setvalue={setEmail} />
//             <div className='flex'>
//               <TextInput label="Contact" inputtype="text" placeholder="Enter contact" value={contact} setvalue={setContact} className='mr-2' />
//               <TextInput label="Experience" inputtype="text" placeholder="Enter experience" value={experience} setvalue={setExperience} />
//             </div>

//             <div className='flex '> <TextInput label="DOB" inputtype="date" placeholder="Select DOB" value={dob} setvalue={setDOB} className='mr-2' />
//               <TextInput label="Salary" inputtype="number" placeholder="Enter salary" value={salary} setvalue={setSalary} /></div>

//             <TextInput label="Password" inputtype="password" placeholder="Enter password" value={password} setvalue={setPassword} />
//             <TextInput label="Department" inputtype="text" placeholder="Enter department" value={department} setvalue={setDepartment} />

//             <div className="flex flex-col mb-4">
//               <label className="mb-1 text-sm font-medium">Profile Photo</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setProfilephoto(e.target.files[0])}
//               />

//             </div>

//             <button
//               onClick={handleSubmit}
//               className="w-full bg-green-600 hover:bg-green-800 text-white py-2 rounded"
//             >
//               Create Employee
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateEmployees;
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Hearder from './Hearder';
import SideBar from './SideBar';

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
  const [resume, setResume] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profilePhoto) {
      toast.error("Profile photo is required!");
      return;
    }
     const active="active";
    const formData = new FormData();
    formData.append('name', name);
    formData.append('experience', experience);
    formData.append('contact', contact);
    formData.append('salary', salary);
    formData.append('dob', dob);
    formData.append('status',active );
    formData.append('department', department);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('profilePhoto', profilePhoto); // ✅ Must match backend's multer field name

    // Debug: See form data
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const res = await axios.post(
        'http://localhost:8080/api/v1/user/create',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
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

  return (
    <div className="h-screen flex flex-col">
    <Hearder />
    <div className="flex flex-1 overflow-hidden">
      <SideBar />
    
  
      <main className="p-6 m-auto">
        <form
          onSubmit={handleSubmit}
          className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6 mt-10"
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create Employee
          </h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Form Fields with Labels */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact
              </label>
              <input
                type="number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Salary
              </label>
              <input
                type="number"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Experience (years)
              </label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Profile Photo
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
              required
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
          </div>
          
  
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Create Employee
          </button>
        </form>
      </main>
    </div>
  </div>
  
  );
};

export default CreateEmployee;
