import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-card rounded-xl border border-border p-6 ${className}`}>
      {children}
    </div>
  );
}
