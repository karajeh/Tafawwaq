"use client";
// import { IconType } from "react-icons";
interface ButtonProps {
  classNames?: string;
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  type?: "button" | "submit" | "reset";
  // icon?: any;
  //   icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  classNames,
  label,
  onClick = () => {},
  disabled,
  outline,
  small,
  type = "button"
  // icon: Icon
}) => {
  // Check if a custom text color class is already present
  const isCustomTextColor = classNames?.includes("text-");
  const bgColor = classNames?.includes("bg-");

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
            relative
            disabled:opacity-70
            disabled:cursor-not-allowed
            transition-all
            duration-200
            ease-in-out
            transform
            hover:scale-[1.02]
            active:scale-[0.98]
            hover:shadow-md
            active:shadow-sm
            w-full
            h-full
            ${isCustomTextColor ? "" : "text-white"}
            ${outline ? "bg-white" : ""}
            ${outline ? "border-primary" : "border-transparent"}
            ${small ? "py-1" : "py-3"}
            ${small ? "text-sm" : "text-md"}
            ${small ? "font-light" : "font-semibold"}
            ${small ? "border-[1px]" : "border-2"}
            ${bgColor ? "" : "bg-primary"}
            ${classNames}
            before:content-['']
            before:absolute
            before:inset-0
            before:rounded-[inherit]
            before:bg-white
            before:opacity-0
            hover:before:opacity-10
            active:before:opacity-20
            before:transition-opacity
        `}
    >
      {label}
    </button>
  );
};

export default Button;
