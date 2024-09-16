interface ResetButtonProps {
  handleClick: () => void;
}

const ResetButton = ({ handleClick }: ResetButtonProps) => {
  return (
    <button className="reset-button" onClick={handleClick}>
      Reset Game
    </button>
  );
};

export default ResetButton;
