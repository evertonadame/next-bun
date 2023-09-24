import React, { ButtonHTMLAttributes } from "react";
import { VariantProps, cva } from "class-variance-authority";

const buttonStyles = cva(`select-none`, {
  variants: {
    variant: {
      primary: `bg-purple-default hover:bg-purple-light focus:bg-purple-dark text-light-text rounded-lg`,
      secondary:
        "bg-white text-purple-default hover:bg-purple-light hover:text-light-text focus:bg-purple-dark rounded-lg border border-purple-default",
    },
    size: {
      default: "px-12 py-3 text-base",
      small: "px-6 py-2 text-sm",
      large: "px-16 py-4 text-lg",
    },
    fluid: {
      true: "w-full",
      false: "w-auto",
    },
    iconOnly: {
      true: "p-2",
      false: "",
    },
    loading: {
      true: "cursor-not-allowed animate-[pulse_1000ms_cubic-bezier(0.4,0,0.6,2)_infinite] bg-purple-light",
      false: "",
    },
  },

  defaultVariants: {
    variant: "primary",
    fluid: false,
  },
});

type ButtonProps = VariantProps<typeof buttonStyles> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonProps) => {
  const {
    variant = "primary",
    size,
    fluid,
    iconOnly,
    loading,
    className,
    ...restProps
  } = props;
  return (
    <button
      {...restProps}
      className={buttonStyles({
        variant,
        size,
        fluid,
        iconOnly,
        loading,
        className,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
