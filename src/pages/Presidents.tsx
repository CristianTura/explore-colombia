import React from 'react';
import Sidebar from 'components/ui/Sidebar';
import { Card, CardBody } from 'react-bootstrap';
import TableCustom from 'components/TableCustom';
import { usePresidents } from 'hooks/usePresidents';


const Presidents: React.FC = () => {
  const { isLoading, dataPresidentsCustom, headers, pagedPresidents, getPresidents } = usePresidents()

  return (
    <Sidebar>
       <Card>
       
        <CardBody>
          <div className="bg-warning-light py-2 px-3 mt-3 d-flex align-items-center justify-content-between mb-3">
            <h5 className="mb-0">Presidents of Colombia</h5>
          </div>
        </CardBody>
        <TableCustom 
          headers={headers}
          data={dataPresidentsCustom}
          paged={pagedPresidents} 
          handleFetch={getPresidents}
          isLoading={isLoading}
        />
     </Card>
    </Sidebar>
    
  );
};

export default Presidents;
