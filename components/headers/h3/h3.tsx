import { ReactNode } from "react";

type H3Props = {
  children: ReactNode;
};

const H3 = ({ children }: H3Props) => {
  return <h3 className="text-xl font-semibold mb-4">{children}</h3>;
};

export default H3;
