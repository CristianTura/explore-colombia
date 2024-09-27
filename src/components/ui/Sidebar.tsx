import React, { ReactNode, useState } from 'react';
import { FaHome, FaUser, FaCog, FaSignOutAlt, FaBars, FaAngleLeft } from 'react-icons/fa';
import imgUser from 'assets/user.png'
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { useCustomSelector } from 'hooks/redux';
import { RootState } from 'redux/store';

interface SidebarProps {
    children: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({children}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const { handleLogout } = useAuth()
    const dataUser = useCustomSelector((state: RootState) => state.auth.dataUser);

    const onLogout = () => {handleLogout()}


    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

  return (
    <div className="d-flex h-100vh">
        <div className={`d-flex flex-column flex-shrink-0 p-3 text-white bg-dark ${isCollapsed ? 'collapsed' : ''}`} style={{ width: isCollapsed ? '80px' : '280px', transition: 'width 0.3s' }}>
            <button
                className="btn btn-dark text-white mb-3"
                onClick={toggleSidebar}
                style={{ width: '100%', textAlign: 'left' }}
            >
                {isCollapsed ? <FaBars /> : <FaAngleLeft />}
            </button>
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <Link to="/dashboard" className="nav-link text-white" aria-current="page">
                        {isCollapsed ? <FaHome /> : <span>Home</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/departments" className="nav-link text-white">
                        {isCollapsed ? <FaUser /> : <span>Departamentos</span>}
                    </Link>
                </li>
            </ul>

            {/* Sección del usuario logueado */}
            <div className="mt-auto p-2 pt-3" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <div className="d-flex flex-column">
                  <div className='d-flex align-items-center'>
                    <img
                        src={imgUser}
                        alt="User"
                        className="rounded-circle bg-light"
                        style={{ width: '30px', height: '30px' }}
                    />
                    {!isCollapsed && <span className='ms-2'>{dataUser.email ?? ""}</span>}
                  </div>
                  <button className="btn btn-link text-white text-decoration-none p-0 mt-3" onClick={onLogout} style={{ textAlign: 'left', minWidth:' max-content' }}>
                    <LogoutIcon className='click-hover color-light'/> {!isCollapsed && <span >Sign out</span>}
                  </button>
                </div>
            </div>
        </div>
       <div className="container-fluid py-4">
          {children}
      </div>
    </div>
    
  );
};

export default Sidebar;
