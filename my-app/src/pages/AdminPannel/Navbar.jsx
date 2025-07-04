import React from 'react';

const Navbar = ({ admin, onLogout }) => {
  return (
    <div style={{ padding: 15, backgroundColor: '#222', color: '#fff', display: 'flex', justifyContent: 'space-between' }}>
      <div><strong>Admin Panel</strong></div>
      <div>
        Logged in as: {admin.email} | <button onClick={onLogout} style={{ marginLeft: 10 }}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
