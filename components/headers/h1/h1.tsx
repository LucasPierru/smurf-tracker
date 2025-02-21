import { ReactNode } from "react";

type H1Props = {
  children: ReactNode;
};

const H1 = ({ children }: H1Props) => {
  return <h1 className="text-3xl font-semibold">{children}</h1>;
};

export default H1;
