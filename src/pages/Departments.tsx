import React, { useState } from 'react';
import Sidebar from 'components/ui/Sidebar';
import { Button, Card, CardBody, Table } from 'react-bootstrap';
import TableCustom from 'components/TableCustom';
import { useDepartments } from 'hooks/useDepartments';


const Departments: React.FC = () => {
  const { isLoading, dataDepartments, headers, pagedDepartments, getDepartments  } = useDepartments()

  return (
    <Sidebar>
       <Card>
       
        <CardBody>
          <div className="bg-warning-light py-2 px-3 mt-3 d-flex align-items-center justify-content-between mb-3">
            <h5 className="mb-0">Departments of Colombia</h5>
          </div>
        </CardBody>
        <TableCustom 
          headers={headers}
          data={dataDepartments}
          paged={pagedDepartments} 
          handleFetch={getDepartments}
          isLoading={isLoading}
        />
     </Card>
    </Sidebar>
    
  );
};

export default Departments;
