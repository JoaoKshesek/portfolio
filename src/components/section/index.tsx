import { ReactNode } from "react";
import "./styles.css";

interface Props {
  children: ReactNode;
}

export function Section({ children }: Props) {
  return <section>{children}</section>;
}
