// Sidebar.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/Sidebar.css'; // Import your CSS styles
import logo from './logo.png'; // Path to your logo image
import { Navigate } from 'react-router-dom'; // Import Navigate for redirection



const Sidebar2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Determine active page based on current path
  const currentPath = location.pathname;
  const activePage = currentPath.split('/')[1] || 'homepage';
console.log('Current path:', currentPath); 
console.log('Active page:', activePage);


  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
  };
  const handleSignOut = () => {
    // Clear all authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Force a full reset to login page
    window.location.replace('/'); // This is key - prevents back navigation
  };
  const menuItems = [
    {
      name: 'homepage',
      icon: "m21.743 12.331-9-10c-.379-.422-1.107-.422-1.486 0l-9 10a.998.998 0 0 0-.17 1.076c.16.361.518.593.913.593h2v7a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-4h4v4a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-7h2a.998.998 0 0 0 .743-1.669z",
      path: '/homepage'
    },
    {
      name: 'Urgence',
      icon: 'M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5zM12 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-1-5h2v5h-2v-5z',
      path: '/urgence'
    },
    {
      name: 'Profile',
      icon: 'M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2 7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z',
      path: '/profile'
    }
  ];

  return (
    <nav id="sidebar" className={isCollapsed ? 'close' : ''}>
      <ul>
        <li className="sidebar-header">
          {/* Logo placement */}
          <div className="logo">
            {/* You can place your SVG logo here */}
            <img   src={logo} // Path to SVG file in public folder
                        alt="CanConnect25 Logo"
                         width="24"
                         height="24"/>
            <span>CanConnect25</span>
          </div>
          <button 
            id="toggle-btn" 
            onClick={toggleSidebar}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              height="24px" 
              viewBox="0 -960 960 960" 
              width="24px" 
              fill="#1a4b8e"
              className={isCollapsed ? 'rotate' : ''}
            >
              <path d="m313-480 155 156q11 11 11.5 27.5T468-268q-11 11-28 11t-28-11L228-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T468-692q11 11 11 28t-11 28L313-480Zm264 0 155 156q11 11 11.5 27.5T732-268q-11 11-28 11t-28-11L492-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l184-184q11-11 27.5-11.5T732-692q11 11 11 28t-11 28L577-480Z"/>
            </svg>
          </button>
        </li>

        {/* Main navigation items */}
        <div className="menu-items">
          {menuItems.map((item) => (
            <li key={item.name} className={activePage === item.name.toLowerCase() ? 'active' : ''}>
              <button onClick={() => handleNavigation(item.path)}>
              <svg 
                         xmlns="http://www.w3.org/2000/svg" 
                         height="24px" 
                         viewBox={['homepage','Recovery','Urgence','Profile'].includes(item.name) ? "0 0 24 24" : "0 -960 960 960"}
                         width="24px" 
                         fill="#1a4b8e"
                         >
                      <path d={item.icon} />
                   </svg>
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </div>

        {/* Sign out button at the bottom */}
        <li className="sign-out">
          <button onClick={handleSignOut}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#1a4b8e">
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L583-623l55-57 200 200-198 200Z"/>
            </svg>
            <span>Sign Out</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar2;

