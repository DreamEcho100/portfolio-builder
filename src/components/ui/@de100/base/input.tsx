import type { InputProps } from "../../input";
import type { TextareaProps } from "../../textarea";
import type { CheckboxProps } from "../../checkbox";

import { Input } from "../../input";
import { Textarea } from "../../textarea";
import { Checkbox } from "../../checkbox";

type TInputProps = Omit<InputProps, "type"> & {
  type?: Exclude<InputProps["type"], "checkbox">;
};

export type InputFieldBaseProps =
  | (TextareaProps & { type: "textarea" })
  | TInputProps
  | (CheckboxProps & { type?: "checkbox" });

export default function InputFieldBase({
  type,
  ...props
}: InputFieldBaseProps) {
  if (type === "textarea") return <Textarea {...(props as TextareaProps)} />;

  if (type === "checkbox") return <Checkbox {...(props as CheckboxProps)} />;

  return <Input {...(props as InputProps)} type={type} />;
}
