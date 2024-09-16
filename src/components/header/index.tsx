import { memo } from "react";
import ResetButton from "../ResetButton";
import "./header.css";

interface HeaderProps {
  resetGame: () => void;
}

const Header = ({ resetGame }: HeaderProps) => {
  return (
    <header className="header">
      <div className="logo">
        <h1>MyApp</h1>
      </div>

      <ResetButton handleClick={resetGame} />
    </header>
  );
};

export default memo(Header);
