import React from 'react';
import { CardBody, Table } from 'react-bootstrap';
import TableLoading from './loading/TableLoading';
import Paginator from './ui/Paginator';
import { TableProps } from 'interfaces';




function getProperty<T>(obj: T, key: keyof T): React.ReactNode {
  const value = obj[key];

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value.toString();
  }

  return null;
}
const TableCustom = <T,>({ headers, data, paged, handleFetch, isLoading }: TableProps<T>) => {

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
                      <td key={idx}>{getProperty(el, header.refCol) ?? "-"}</td>
                    ))}
                  </tr>
              ))
            }
          </tbody>
        </Table>
        <Paginator handleFetch={handleFetch} paged={paged}/>
      </div>
    </CardBody>
  );
};

export default TableCustom;
