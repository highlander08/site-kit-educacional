"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackToHomeProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BackToHome({
  variant = "primary",
  size = "md",
  className = "",
}: BackToHomeProps) {
  const router = useRouter();

  const baseStyles =
    "inline-flex items-center gap-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2";

  const variantStyles = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary:
      "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50",
    ghost: "text-gray-700 hover:bg-gray-100",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={() => router.push("/")}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      aria-label="Voltar para página inicial"
    >
      <ArrowLeft className="w-4 h-4" />
      Página Inicial
    </button>
  );
}
