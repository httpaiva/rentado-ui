interface ButtonProps {
  children: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "danger";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
}) => {
  const primaryStyles = "bg-green-600 hover:bg-green-700";
  const dangerStyles = "bg-red-700 hover:bg-red-800";
  const variantStyles = variant === "primary" ? primaryStyles : dangerStyles;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out  my-2 ${variantStyles}`}
    >
      {children}
    </button>
  );
};

export default Button;
