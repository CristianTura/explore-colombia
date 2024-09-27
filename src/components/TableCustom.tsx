import { HeadersTable } from 'hooks/useDepartments';
import React, { useState } from 'react';
import { Button, Card, CardBody, Table } from 'react-bootstrap';
import { DataDepartment, PagedTable } from 'redux/slices/dashboard';
import TableLoading from './loading/TableLoading';

interface TableProps {
  headers: HeadersTable[];
  data: DataDepartment[];
  paged: PagedTable | null;
  handleFetch: (page: number, numberPage: number) => void;
  isLoading: boolean;
}

const TableCustom: React.FC<TableProps>= ({headers, data, paged, handleFetch, isLoading}) => {

  return (
    <CardBody className="pt-0">
      <div className="table-responsive">
        <Table className="table text-center">
          <thead className="table-light thead-fixed text-center">
            <tr>
              {
                headers.map((el, index) => (
                  <th key={index}>{el.title}</th>
                ))
              }
            </tr>
          </thead>
          <tbody className='text-center'>
            {
              isLoading ? <TableLoading row={6} colNum={10} />
                : data.map((el, index) => (
                  <tr key={index}>
                    {headers.map((header, idx) => (
                      <td key={idx}>{el[header.refCol]}</td>
                    ))}
                  </tr>
              ))
            }
          </tbody>
        </Table>
        <CardBody>
          <div className="d-flex align-items-center">
              <Button
                  className="me-1 bg-red-medium border-0"
                  onClick={() => handleFetch(1,10)}
                  disabled={paged?.page === 1}
              >
                  {"<<"}
              </Button>
              <Button
                  className="me-1 bg-red-medium border-0"
                  onClick={() => handleFetch((paged?.page ?? 2) -1, 10)}
                  disabled={paged?.page === 1}
              >
                  {"<"}
              </Button>
              <div className="px-3">
                  Page{" "}
                  <b>
                    {paged?.page }</b>{" "}of{" "}
                  <b>
                  {paged?.pageCount}
                  </b>
              </div>
              <Button
                  className="ms-1 bg-red-medium border-0"
                  onClick={() => handleFetch((paged?.page ?? 0)+ 1, 10 )}
                  disabled={paged?.page === paged?.pageCount}
              >
                  {">"}
              </Button>
              <Button
                  className="ms-1 bg-red-medium border-0"
                  onClick={() => handleFetch((paged?.pageCount ?? 1), 10)}
                  disabled={paged?.page === paged?.pageCount}
              >
                  {">>"}
              </Button>
          </div>
        </CardBody>
      </div>
    </CardBody>
  );
};

export default TableCustom;
