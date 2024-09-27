import { Card } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

interface CardLoadingType {
    number: number;
  }

const CardLoading: React.FC<CardLoadingType> = ({number}) => {

    return (
        <>
            {Array.from({ length: number }, (_, index) => (
                <Card key={index} style={{ width: '18rem' }}>
                    <Card.Body>
                    <Card.Title><Skeleton /></Card.Title>
                    <Card.Text className="mb-1">
                        <Skeleton count={4} />
                    </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
  };
  
export default CardLoading;
  