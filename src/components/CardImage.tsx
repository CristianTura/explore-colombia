import Card from 'react-bootstrap/Card';
import { DataTouristicAttraction } from 'redux/slices/pages';
import withoutPhoto from 'assets/noPhoto.webp'

interface CardHomeProps {
    data: DataTouristicAttraction;
}

const CardImage: React.FC<CardHomeProps> = ({data}) => {

    const imageUrl = data.images && data.images.length > 0 ? data.images[0] : withoutPhoto;

    const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = withoutPhoto;
      };

    return (
        <Card style={{ width: '18rem' }}>
        <Card.Img className='img-card' variant="top" src={imageUrl} onError={handleError} alt={data.name}/>
        <Card.Body>
            <Card.Title>{data.name || ''}</Card.Title>
            <Card.Text className='card-description'>
                {data.description || 'No description available.'}
            </Card.Text>
        </Card.Body>
        </Card>
    );
}

export default CardImage;