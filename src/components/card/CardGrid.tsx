import { memo } from "react";

import Card from "./Card";
import "./card-grid.css";

interface CardGridProps {
  cards: { id: number; image: string; flipped: boolean; matched: boolean }[];
  onCardClick: (id: number) => void;
}

const CardGrid = ({ cards, onCardClick }: CardGridProps) => {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={() => onCardClick(card.id)} />
      ))}
    </div>
  );
};

export default memo(CardGrid);
