import React from 'react';
import Sidebar from 'components/ui/Sidebar';
import { Card, CardBody } from 'react-bootstrap';
import TableCustom from 'components/TableCustom';
import { useCities } from 'hooks/useCities';


const Cities: React.FC = () => {
  const { isLoading, dataCitiesTable, headers, pagedCities, getCities } = useCities()

  return (
    <Sidebar>
       <Card>
       
        <CardBody>
          <div className="bg-warning-light py-2 px-3 mt-3 d-flex align-items-center justify-content-between mb-3">
            <h5 className="mb-0">Cities of Colombia</h5>
          </div>
        </CardBody>
        <TableCustom 
          headers={headers}
          data={dataCitiesTable}
          paged={pagedCities} 
          handleFetch={getCities}
          isLoading={isLoading}
        />
     </Card>
    </Sidebar>
    
  );
};

export default Cities;
