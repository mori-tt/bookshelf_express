interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  style,
  className,
}) => {
  return (
    <button className={`btn ${className}`} style={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
