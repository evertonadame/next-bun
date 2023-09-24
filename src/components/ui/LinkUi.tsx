import React from "react";
import Link, { LinkProps } from "next/link";
import { VariantProps, cva } from "class-variance-authority";

const linkStyles = cva(
  `transition-all duration-150 border-b-2 border-spacing-2`,
  {
    variants: {
      variant: {
        primary: `text-purple-default hover:border-b-2 hover:border-purple-default border-spacing-2 focus:text-purple-dark`,
        secondary: `text-purple-default hover:text-purple-light focus:text-purple-dark`,
      },
      selected: {
        true: `text-purple-dark border-b-2 border-purple-default border-spacing-2`,
        false: `border-transparent`,
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);
type LinkUIProps = LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type LinkComponentProps = VariantProps<typeof linkStyles> &
  LinkUIProps & {
    selected?: boolean;
  };

const LinkUI = ({ children, ...props }: LinkComponentProps) => {
  const { variant, selected, ...restProps } = props;
  return (
    <Link {...restProps} className={linkStyles({ variant, selected })}>
      {children}
    </Link>
  );
};

export default LinkUI;
