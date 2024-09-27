import React from 'react';
import Sidebar from 'components/ui/Sidebar';
import { Card, CardBody } from 'react-bootstrap'
import CardImage from 'components/CardImage';
import { useTouristicAttraction } from 'hooks/useTouristicAttraction';
import Paginator from 'components/ui/Paginator';
import CardLoading from 'components/loading/CardLoading';


const TouristicAttraction: React.FC = () => {
  const { isLoading, dataTouristicAttraction, pagedTouristicAttraction, getTouristicAttraction  } = useTouristicAttraction()

  return (
    <Sidebar>
      <Card>
        <CardBody>
          <div className="bg-warning-light py-2 px-3 mt-3 d-flex align-items-center justify-content-between mb-3">
            <h5 className="mb-0">TouristicAttraction of Colombia</h5>
          </div>
        </CardBody>
        <div className='d-flex gap-2 flex-wrap p-3 justify-content-center'>
            {
                isLoading 
                ?   <CardLoading number={12}/>
                :   dataTouristicAttraction.map(el => (
                    <CardImage data={el}/>
                ))
            }
        </div>
        <Paginator handleFetch={getTouristicAttraction} paged={pagedTouristicAttraction}/>
     </Card>
    </Sidebar>
    
  );
};

export default TouristicAttraction;
