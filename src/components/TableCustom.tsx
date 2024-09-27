import { HeadersTableDepartments } from 'hooks/useDepartments';
import React from 'react';
import { Button, CardBody, Table } from 'react-bootstrap';
import { DataDepartment, PagedTable } from 'redux/slices/dashboard';
import TableLoading from './loading/TableLoading';
import { HeadersTableCities } from 'hooks/useCities';
import { DataCities } from 'redux/slices/pages';
import Paginator from './ui/Paginator';


type Data = DataCities | DataDepartment;
export interface Header<T> {
  title: string;
  refCol: keyof T;
}

type AnyHeader = Header<DataCities> | Header<DataDepartment>;
interface TableProps<T> {
  headers: Header<T>[];
  data: T[];
  paged: PagedTable | null;
  handleFetch: (page: number, numberPage: number) => void;
  isLoading: boolean;
}

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
