import { Card, CardBody } from "react-bootstrap";
import { useTouristicAttractionByDepartment } from "hooks/useTouristicByDepartment";
import Form from 'react-bootstrap/Form';
import CardLoading from "./loading/CardLoading";
import CardImage from "./CardImage";
import NoFoundData from "./NoFoundData";

  
  const TouristicByDepartment: React.FC = () => {
    const { 
        isLoading, dataTouristicByDepartment, departments, selectedDepartment, handleChange
    } = useTouristicAttractionByDepartment();

    return (
      <Card>
        <CardBody>
          <div className="bg-warning-light py-2 px-3 mt-3 d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
            <h5 className="mb-0">Touristic attractions by Department</h5>
            <Form.Select 
              aria-label="Default select"
              onChange={handleChange}
              style={{width: "200px"}}
              value={selectedDepartment}
            >
              {
                departments?.map(el => (
                  <option value={el.id}>{el.name}</option>
                ))
              }
            </Form.Select>
          </div>
        </CardBody>
        <div className='d-flex gap-2 flex-wrap p-3'>
            {
                isLoading 
                ?   <CardLoading number={12}/>
                :   !dataTouristicByDepartment || dataTouristicByDepartment.length === 0
                ?   <NoFoundData/>
                :   dataTouristicByDepartment.map(el => (
                        <CardImage data={el}/>
                    ))
            }
        </div>
      </Card>
    );
  };
  
  export default TouristicByDepartment;
  