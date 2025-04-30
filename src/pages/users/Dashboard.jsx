import React from 'react';
import UsersNavbar from './UsersNavbar';

const Dashboard = () => {
  return (
    <>
      <UsersNavbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
        {/* You can add stats, job applications, etc. here */}
      </div>
    </>
  );
};

export default Dashboard;
