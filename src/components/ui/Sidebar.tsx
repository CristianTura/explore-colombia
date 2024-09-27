import React, { ReactNode, useState } from 'react';
import { FaHome, FaBars, FaAngleLeft, FaCity, FaMapMarkedAlt } from 'react-icons/fa';
import { MdAttractions } from "react-icons/md";
import { BsFilePersonFill } from "react-icons/bs";
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
        <div className={`d-flex flex-column flex-shrink-0 p-3 text-white bg-dark sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button
                className="btn btn-dark text-white mb-3 toggle-btn"
                onClick={toggleSidebar}
                // style={{ width: '100%', textAlign: 'left' }}
            >
                {isCollapsed ? <FaBars /> : <FaAngleLeft />}
            </button>
            <ul className={`nav nav-pills flex-column mb-auto ${isCollapsed ? 'show' : 'hide'}`}>
                <li className="nav-item">
                    <Link to="/dashboard" className="nav-link text-white d-flex gap-2 align-items-center" aria-current="page">
                        <FaHome className='my-1'/> <span>Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/departments" className="nav-link text-white d-flex gap-2 align-items-center">
                        <FaMapMarkedAlt className='my-1'/> <span>Departamentos</span>
                    </Link>
                </li>
                <li>
                    <Link to="/cities" className="nav-link text-white d-flex gap-2 align-items-center">
                         <FaCity className='my-1'/> <span>Cities</span>
                    </Link>
                </li>
                <li>
                    <Link to="/presidents" className="nav-link text-white d-flex gap-2 align-items-center">
                        <BsFilePersonFill className='my-1'/> <span>Presidents</span>
                    </Link>
                </li>
                <li>
                    <Link to="/touristic-attraction" className="nav-link text-white d-flex gap-2 align-items-center">
                        <MdAttractions  className='my-1'/> <span>Touristic Attraction</span>
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
                    <LogoutIcon className='click-hover color-light'/> {!isCollapsed && <span className='d-none d-md-inline'>Sign out</span>}
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
