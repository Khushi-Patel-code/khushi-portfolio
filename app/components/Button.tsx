import React from "react";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string; // Allows for minor layout adjustments
};

const Button: React.FC<ButtonProps> = ({ text, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        relative group overflow-hidden px-8 py-3 rounded-full
        font-medium tracking-wide transition-all duration-300
        bg-transparent text-slate-100 border border-indigo-500/50
        hover:border-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]
        active:scale-95
        ${className}
      `}
    >
      {/* The Animated Background Layer */}
      <span className="absolute inset-0 w-0 h-full transition-all duration-300 ease-out bg-indigo-600 group-hover:w-full -z-10"></span>
      
      {/* The Text */}
      <span className="relative group-hover:text-white">
        {text}
      </span>
    </button>
  );
};

export default Button;