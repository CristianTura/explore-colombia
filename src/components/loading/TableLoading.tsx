import { Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

interface TableLoading {
    row: number;
    colNum: number;
  }

const TableLoading: React.FC<TableLoading> = ({row, colNum}) => {

    return (
        <>
            {
            [...Array(row)].map((e, i) => (
                <tr
                key={i}
                aria-hidden="true"
                className="shadow-none border-light"
                >
                {
                    [...Array(colNum)].map((e, x) => (
                        <td key={x} className="card-text placeholder-glow">
                            <span className="placeholder col-12 my-2 rounded-1"></span>
                        </td>
                    ))
                }
                </tr>
            ))
            }
        </>
    );
  };
  
export default TableLoading;
  