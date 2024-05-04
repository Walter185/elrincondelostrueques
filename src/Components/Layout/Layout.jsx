import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="container" style={{ marginBottom: '64px' }}>
      {children}
    </div>
  );
};

export default Layout;
