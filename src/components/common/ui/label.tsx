"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/libs/utils";

const labelVariants = cva(
  "text-md capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-semibold",
  {
    variants: {
      layout: {
        "col-container": "flex flex-col gap-1",
      },
    },
  },
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & {
    classVariants?: VariantProps<typeof labelVariants>;
  }
>(({ className, classVariants, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(classVariants), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
