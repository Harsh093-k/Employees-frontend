import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.js';
import { Toaster } from 'react-hot-toast';
import DepartmentList from './components/DepartmentList.js';
import EmployeeDetails from './components/EmployeeDetails.js';
import CreateEmployees from './components/createEmployees.js';
import Login from './components/login.js';
import EmployeesList from './components/EmployeesList.js';
import SettingsPage from './components/setting.js';
import SalaryStructure from './components/salary.js';
import ProtectedRoute from './components/PR.js'; 

const AppRoutes = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
         

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/salary"
            element={
              <ProtectedRoute>
                <SalaryStructure />
              </ProtectedRoute>
            }
          />
          <Route
            path="/DepartmentLists"
            element={
              <ProtectedRoute>
                <DepartmentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/EmployeeDetail/:id"
            element={
              <ProtectedRoute>
                <EmployeeDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateEmployees />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Employees"
            element={
              <ProtectedRoute>
                <EmployeesList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
