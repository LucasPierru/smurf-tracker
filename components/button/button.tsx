import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...otherProps }: ButtonProps) => {
  return (
    <button
      className="bg-[#d53435] font-semibold py-2 px-6 rounded-xl text-white text-lg hover:brightness-110 transition duration-300"
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
