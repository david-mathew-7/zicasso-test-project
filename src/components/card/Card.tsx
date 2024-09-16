import "./card.css";

interface CardProps {
  card: { id: number; image: string; flipped: boolean; matched: boolean };
  onClick: () => void;
}

const Card = ({ card, onClick }: CardProps) => {
  return (
    <div
      className={`card ${card.flipped || card.matched ? "flipped" : ""}`}
      onClick={onClick}
    >
      <div className="card-front">
        {card.flipped || card.matched ? (
          <img src={card.image} alt="card" className="card-item" />
        ) : null}
      </div>
      <div className="card-back"></div>
    </div>
  );
};

export default Card;
