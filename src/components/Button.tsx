interface ButtonProps {
  children: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300 ease-in-out"
    >
      {children}
    </button>
  );
};

export default Button;
