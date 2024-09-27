import { Card } from "react-bootstrap";

export interface DataCard {
    title: string;
    Capital?: string;
    Region?: string;
    Population?: string | number;
    Surface?: string | number;
    Limites?: string;
    "Sub Region"?: string;
    Currency?: string;
    "Time Zone"?: string;
    bgCustom?: string;
  }
  
  interface CardHomeProps {
    dataCard: DataCard;
  }

  
  const CardHome: React.FC<CardHomeProps> = ({dataCard}) => {

    const cardData = [
        { label: "Capital", value: dataCard.Capital },
        { label: "Region", value: dataCard.Region },
        { label: "Population", value: dataCard.Population },
        { label: "Surface", value: dataCard.Surface },
        { label: "Limites", value: dataCard.Limites },
        { label: "Sub Region", value: dataCard['Sub Region'] },
        { label: "Currency", value: dataCard.Currency },
        { label: "Time Zone", value: dataCard['Time Zone'] },
      ];

    return (
      <Card className={`${dataCard?.bgCustom}`} style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{dataCard?.title}</Card.Title>
          {cardData.map((item, index) =>
            item.value ? (
                <Card.Text key={index} className="mb-1">
                <span className="fw-semibold">{item.label}:</span> {item.value}
                </Card.Text>
            ) : null
            )}
        </Card.Body>
      </Card>
    );
  };
  
  export default CardHome;
  