import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  const base = "px-6 py-3 rounded font-medium transition-all duration-200 text-sm tracking-wide";
  const variants = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow",
    secondary: "bg-muted text-foreground hover:bg-border",
    outline: "border border-border hover:border-primary hover:text-primary bg-transparent",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
