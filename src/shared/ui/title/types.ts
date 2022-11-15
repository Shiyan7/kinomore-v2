import { HTMLProps } from "react";

export interface TitleProps extends Omit<HTMLProps<HTMLHeadingElement>, "size"> {
  className?: string;
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "small" | "large" | "medium";
}
