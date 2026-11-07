import type { ElementType, ReactNode, CSSProperties } from "react";
import { useInView } from "../lib/hooks";

type Props = {
  as?: ElementType;
  className?: string;
  delay?: number;
  children: ReactNode;
  id?: string;
  style?: CSSProperties;
};

/** Fades/slides its children in the first time they scroll into view. */
export default function Reveal({ as: Tag = "div", className = "", delay = 0, children, id, style }: Props) {
  const { ref, inView } = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal ${inView ? "is-visible" : ""} ${className}`}
      style={{ ...style, ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
