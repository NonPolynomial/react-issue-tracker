import React from 'react';
import './Layout.css';

const Layout = ({ children }) => (
  <div className="layout">
    <header>
      <h1>Issue Tracker</h1>
    </header>
    {children}
  </div>
);

export default Layout;
