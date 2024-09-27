import React, { useState } from 'react';
import Sidebar from 'components/ui/Sidebar';
import CardHome from 'components/CardHome';
import { useHome } from 'hooks/useHome';
import CardLoading from 'components/loading/CardLoading';
import PieChart from 'components/PieChart';


const Home: React.FC = () => {

  const { dataCards, imageFlag, isLoading, dataGraphDepartments } = useHome()

  return (
    <Sidebar>
      <div className='d-flex gap-2 align-items-center mb-3'>
        {
          imageFlag && 
            <img
              src={imageFlag}
              alt="User"
              className="rounded-circle bg-light"
              style={{ width: '30px', height: '30px' }}
          />
        }
        <h1 className='mb-0'>Colombia</h1>
      </div>
      <div className='d-flex gap-2 flex-wrap'>
        {
          isLoading 
            ? <CardLoading number={4}/>
            : dataCards.map((card, index) => (
              <CardHome 
                key={index}
                dataCard={card} 
              />
            ))
        }
      </div>

      <div className='mt-5'>
        <h3 className='text-center'>Departments with the highest population</h3>
        <PieChart data={dataGraphDepartments}/>
      </div>
    </Sidebar>
    
  );
};

export default Home;
