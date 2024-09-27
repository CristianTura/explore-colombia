import React from 'react';
import logo from 'assets/colombia.png'


const Navbar: React.FC = () => {

  return (
    <nav className='d-flex justify-content-between px-5 align-items-center b-botom-nav pb-2 pt-1 mb-3'>
      <img src={logo} alt="Colombia" className='img-logo'/>
    </nav>
  );
};

export default Navbar;
