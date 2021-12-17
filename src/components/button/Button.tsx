import { ReactNode } from "react";
import { FC } from "react";
import "./style.scss";

type Props = {
  children: ReactNode;
  onClick?: () => void;
};
const Button: FC<Props> = ({ children, onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
