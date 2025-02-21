import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`bg-white/10 rounded-lg backdrop-blur-sm p-6 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
}
