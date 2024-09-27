import React from 'react';
import { Button, CardBody } from 'react-bootstrap';
import { PagedTable } from 'redux/slices/dashboard';

interface PaginatorProps {
    paged: PagedTable | null;
    handleFetch: (page: number, numberPage: number) => void;
}

const Paginator: React.FC<PaginatorProps> = ({handleFetch, paged}) => {

  return (
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
  );
};

export default Paginator;
