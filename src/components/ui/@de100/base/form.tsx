import { forwardRef } from "react";
import type { FormHTMLAttributes } from "react";

export type FormBaseProps = FormHTMLAttributes<HTMLFormElement>;

const FormBase = forwardRef<HTMLFormElement, FormBaseProps>((props, ref) => {
  return <form ref={ref} className="flex flex-col gap-5 p-4" {...props} />;
});
FormBase.displayName = "FormBase";

export default FormBase;
