import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const base = "px-6 py-3 rounded-lg font-medium transition-colors";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark",
    secondary: "bg-muted text-foreground hover:bg-border",
    outline: "border border-border hover:bg-muted",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
