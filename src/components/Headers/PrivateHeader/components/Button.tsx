interface ButtonProps {
  children: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-600 rounded text-white font-bold py-2 px-4 hover:bg-green-700 transition duration-300 ease-in-out"
    >
      {children}
    </button>
  );
};

export default Button;
