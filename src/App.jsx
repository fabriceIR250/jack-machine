import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Services from './pages/Services';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import Application from './pages/Application';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
//  admin router
import Dashboard from './pages/admin/Dashboard';
import ManageServices from './pages/admin/ManageServices';
import ManageCareers from './pages/admin/ManageCareers';
import ManageApplications from './pages/admin/ManageApplications';
import Login from './pages/admin/Login';
import AdminNavbar from './components/AdminNavbar';
import ManageMessages from './pages/admin/ManageMessages';


import SignUp from './pages/SignUp';
import Login1 from './pages/Login';
import NotFound from './pages/NotFound';

// Users pages and layout
import UsersLayout from './pages/users/UsersLayout';
import Dashboard1 from './pages/users/Dashboard';
import Jobs from './pages/users/Jobs';
import Result from './pages/users/Result';
import Profile from './pages/users/Profile';
import Contact2 from './pages/users/Contact';
import VerifyEmail from './pages/users/EmailVerification';



function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
          <Route path="/services" element={<><Navbar /><Services /><Footer /></>} />
          <Route path="/careers" element={<><Navbar /><Careers /><Footer /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
          <Route path="/application/:id" element={<><Navbar /><Application /><Footer /></>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login1 />} />

          {/* Users Routes with Navbar */}
          <Route path="/users" element={<UsersLayout />}>
            <Route path="dashboard" element={<Dashboard1 />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="result" element={<Result />} />
            <Route path="profile" element={<Profile />} />
            <Route path="contact" element={<Contact2 />} />
            <Route path="verify-email" element={<VerifyEmail />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<><AdminNavbar /><Dashboard /></>} />
          <Route path="/admin/services" element={<><AdminNavbar /><ManageServices /></>} />
          <Route path="/admin/careers" element={<><AdminNavbar /><ManageCareers /></>} />
          <Route path="/admin/applications" element={<><AdminNavbar /><ManageApplications /></>} />
          <Route path="/admin/messages" element={<><AdminNavbar/><ManageMessages/></>} />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
// This is the main entry point of the application.