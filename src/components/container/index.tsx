import { ReactNode } from "react";
import "./styles.css";

interface Props {
  children: ReactNode;
}

export function Container({ children }: Props) {
  return <div className="container">{children}</div>;
}
