"use client";
// Credit To: <https://boosted.orange.com/docs/4.6/content/typography/>

import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "~/libs/utils";

const hToVariants = {
  h1: {
    type: {
      default: [
        "text-[1.5rem] leading-[1] tracking-[-0.0625rem]",
        "sm:text-[2.125rem] md:text-[2.125rem]",
      ],
      display: [
        "text-[1.875rem] leading-[1] tracking-[-0.125rem]",
        "sm:text-[3.125rem] md:text-[3.75rem]",
      ],
    },
  },
  h2: {
    type: {
      default: [
        "text-[1.125rem] leading-[1.067] tracking-[-0.05rem]",
        "sm:text-[1.5rem] md:text-[1.875rem]",
      ],
      display: [
        "text-[1.5rem] leading-[1] tracking-[-0.1rem]",
        "sm:text-[2.5rem] md:text-[3.125rem]",
      ],
    },
  },
  h3: {
    type: {
      default: [
        "text-[1.125rem] leading-[1.083] tracking-[-0.0375rem]",
        "sm:text-[1.25rem] md:text-[1.5rem]",
      ],
      display: [
        "text-[1.5rem] leading-[1] tracking-[-0.0625rem]",
        "sm:text-[2.125rem] md:text-[2.5rem]",
      ],
    },
  },
  h4: {
    type: {
      default: [
        "text-[1rem] leading-[1.1] tracking-[-0.025rem]",
        "sm:text-[1.125rem] md:text-[1.25rem]",
      ],
      display: [
        "text-[1.125rem] leading-[1] tracking-[-0.0625rem]",
        "sm:text-[1.5rem] md:text-[2.125rem]",
      ],
    },
  },
  h5: {
    type: {
      default: [
        "text-[1rem] leading-[1.111] tracking-[-0.0125rem]",
        "sm:text-[1.125rem]",
      ],
    },
  },
  h6: {
    type: {
      default: ["text-[1rem] leading-[1.125] tracking-[-0.00625rem]"],
    },
  },
} as const;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HProps<CVA extends (...args: any) => any> =
  HTMLAttributes<HTMLHeadingElement> & {
    classVariants?: VariantProps<CVA>;
  };

const handleH1Variants = cva("font-bold", {
  variants: hToVariants.h1,
  defaultVariants: { type: "default" },
});
const H1 = forwardRef<HTMLHeadingElement, HProps<typeof handleH1Variants>>(
  ({ className, classVariants, ...props }, ref) => {
    return (
      <h1
        ref={ref}
        {...props}
        className={cn(handleH1Variants(classVariants), "font-bold", className)}
      />
    );
  },
);
H1.displayName = "H1";

const handleH2Variants = cva("font-bold", {
  variants: hToVariants.h2,
  defaultVariants: { type: "default" },
});
const H2 = forwardRef<HTMLHeadingElement, HProps<typeof handleH2Variants>>(
  ({ className, classVariants, ...props }, ref) => {
    return (
      <h2
        ref={ref}
        {...props}
        className={cn(handleH2Variants(classVariants), "font-bold", className)}
      />
    );
  },
);
H2.displayName = "H2";

const handleH3Variants = cva("font-bold", {
  variants: hToVariants.h3,
  defaultVariants: { type: "default" },
});
const H3 = forwardRef<HTMLHeadingElement, HProps<typeof handleH3Variants>>(
  ({ className, classVariants, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        {...props}
        className={cn(handleH1Variants(classVariants), "font-bold", className)}
      />
    );
  },
);
H3.displayName = "H3";

const handleH4Variants = cva("font-bold", {
  variants: hToVariants.h4,
  defaultVariants: { type: "default" },
});
const H4 = forwardRef<HTMLHeadingElement, HProps<typeof handleH4Variants>>(
  ({ className, classVariants, ...props }, ref) => {
    return (
      <h4
        ref={ref}
        {...props}
        className={cn(handleH1Variants(classVariants), "font-bold", className)}
      />
    );
  },
);
H4.displayName = "H4";

const handleH5Variants = cva("font-bold", {
  variants: hToVariants.h5,
  defaultVariants: { type: "default" },
});
const H5 = forwardRef<HTMLHeadingElement, HProps<typeof handleH5Variants>>(
  ({ className, classVariants, ...props }, ref) => {
    return (
      <h5
        ref={ref}
        {...props}
        className={cn(handleH5Variants(classVariants), "font-bold", className)}
      />
    );
  },
);
H5.displayName = "H5";

const handleH6Variants = cva("font-bold", {
  variants: hToVariants.h6,
  defaultVariants: { type: "default" },
});
const H6 = forwardRef<HTMLHeadingElement, HProps<typeof handleH6Variants>>(
  ({ className, classVariants, ...props }, ref) => {
    return (
      <h6
        ref={ref}
        {...props}
        className={cn(handleH6Variants(classVariants), "font-bold", className)}
      />
    );
  },
);
H6.displayName = "H6";

//
interface PProps extends HTMLAttributes<HTMLParagraphElement> {
  classVariants?: VariantProps<typeof handlePVariants>;
}
type PVariants =
  | undefined
  | {
      headLike: Record<keyof typeof hToVariants, readonly string[]>;
    };

const pVariants = Object.entries(hToVariants).reduce(
  (acc, curr) => {
    acc.headLike[curr[0] as keyof NonNullable<PVariants>["headLike"]] =
      curr[1].type.default;
    return acc;
  },
  { headLike: {} } as NonNullable<PVariants>,
);
const handlePVariants = cva("font-bold", {
  variants: pVariants,
  defaultVariants: { headLike: "h6" },
});

const P = forwardRef<HTMLParagraphElement, PProps>(
  ({ className, classVariants, ...props }, ref) => {
    return (
      <p
        ref={ref}
        {...props}
        className={cn(handlePVariants(classVariants), "font-bold", className)}
      />
    );
  },
);
P.displayName = "P";

const Text = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  P,
};

export default Text;
