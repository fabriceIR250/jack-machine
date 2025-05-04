import React from 'react';
import { Outlet } from 'react-router-dom';
import UsersNavbar from './UsersNavbar';

const UsersLayout = () => {
  return (
    <>
      <UsersNavbar />
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

export default UsersLayout;
// This layout component wraps around the user-related pages, providing a consistent navigation bar for users.