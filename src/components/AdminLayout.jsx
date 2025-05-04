// components/AdminLayout.js
import React from 'react';
import AdminNavbar from './AdminNavbar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => (
  <>
    <AdminNavbar />
    <main className="p-6">
      <Outlet />
    </main>
  </>
);

export default AdminLayout;
