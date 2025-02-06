import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function Main({ children }: Props) {
  return <main>{children}</main>;
}
