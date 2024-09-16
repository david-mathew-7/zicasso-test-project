import { useState, useEffect, useCallback } from "react";
import "./App.css";
import Header from "./components/header";
import CardGrid from "./components/card/CardGrid";
import ResetButton from "./components/ResetButton";

const initialCards = [
  { id: 1, image: "img/card1.jpg", flipped: false, matched: false },
  { id: 3, image: "img/card2.jpg", flipped: false, matched: false },
  { id: 2, image: "img/card1.jpg", flipped: false, matched: false },
  { id: 4, image: "img/card3.jpg", flipped: false, matched: false },
  { id: 5, image: "img/card2.jpg", flipped: false, matched: false },
  { id: 6, image: "img/card3.jpg", flipped: false, matched: false },
];

const App = () => {
  const [cards, setCards] = useState(initialCards);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds countdown timer
  const [gameOver, setGameOver] = useState(false);

  const checkMatch = useCallback(
    (id1: number, id2: number) => {
      const card1 = cards.find((card) => card.id === id1);
      const card2 = cards.find((card) => card.id === id2);

      if (card1 && card2 && card1.image === card2.image) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === id1 || card.id === id2
              ? { ...card, matched: true }
              : card
          )
        );
        setMatchedPairs((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === id1 || card.id === id2
                ? { ...card, flipped: false }
                : card
            )
          );
        }, 1000);
      }
      setFlippedCards([]);
    },
    [cards]
  );

  // Reset the game and timer
  const resetGame = useCallback(() => {
    setCards(
      cards.map((card) => ({ ...card, flipped: false, matched: false }))
    );
    setMatchedPairs(0);
    setTimeLeft(60); // Reset the timer
    setGameOver(false);
  }, [cards]);

  const handleCardClick = useCallback(
    (id: number) => {
      if (gameOver) return; // Disable card clicks after the game is over

      const flippedCard = cards.find((card) => card.id === id);
      if (
        !flippedCard ||
        flippedCard.flipped ||
        flippedCard.matched ||
        flippedCards.length === 2
      ) {
        return;
      }

      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === id ? { ...card, flipped: true } : card
        )
      );
      setFlippedCards((prev) => [...prev, id]);

      if (flippedCards.length === 1) {
        checkMatch(flippedCards[0], id);
      }
    },
    [cards, checkMatch, flippedCards, gameOver]
  );

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft > 0 && matchedPairs < cards.length / 2) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer); // Cleanup the interval on unmount or reset
    } else if (timeLeft === 0) {
      setGameOver(true);
      setTimeout(() => {
        alert("Time's up! You lost.");
      }, 1000);
    }
  }, [timeLeft, matchedPairs, cards.length]);

  useEffect(() => {
    if (matchedPairs === cards.length / 2) {
      setTimeout(() => {
        alert("Congratulations! You've won!");
      }, 1000);
    }
  }, [matchedPairs, cards.length]);

  return (
    <>
      <Header resetGame={resetGame} />
      <div>
        <p>
          Time Left: <strong>{timeLeft}s</strong>
        </p>
      </div>
      <CardGrid cards={cards} onCardClick={handleCardClick} />
      <ResetButton handleClick={resetGame} />
    </>
  );
};

export default App;
