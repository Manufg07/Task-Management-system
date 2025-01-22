import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AdminDashboard from "./pages/AdminDashboard";
// import UserManagement from "./pages/UserManagement";
import LoginPage from "./pages/LoginPage";
import AddTask from "./pages/AddTask";
import { AuthProvider } from "./context/AuthContext";
import SignupPage from "./pages/SignupPage";


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          {/* <Route path="/admin/users" element={<UserManagement />} /> */}
          <Route path="/addTask" element={<AddTask />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
