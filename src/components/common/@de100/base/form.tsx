import { forwardRef } from "react";
import type { FormHTMLAttributes } from "react";
import { cn } from "~/libs/utils";

export type FormBaseProps = FormHTMLAttributes<HTMLFormElement>;

const FormBase = forwardRef<HTMLFormElement, FormBaseProps>((props, ref) => {
  return (
    <form
      ref={ref}
      {...props}
      className={cn("flex w-full flex-col gap-5 p-4", props.className)}
    />
  );
});
FormBase.displayName = "FormBase";

export default FormBase;
