import type { InputProps } from "../../ui/input";
import type { TextareaProps } from "../../ui/textarea";
import type { CheckboxProps } from "../../ui/checkbox";

import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Checkbox } from "../../ui/checkbox";
import FileInput from "../../FileInput";
import type { FileInputProps } from "../../FileInput";

type TInputProps = Omit<InputProps, "type"> & {
  type?: Exclude<InputProps["type"], "checkbox" | "file">;
};

export type InputFieldBaseProps =
  | (TextareaProps & { type: "textarea" })
  | (FileInputProps & { type: "file" })
  | TInputProps
  | (CheckboxProps & { type?: "checkbox" });

export default function InputFieldBase({
  type,
  ...props
}: InputFieldBaseProps) {
  if (type === "textarea") return <Textarea {...(props as TextareaProps)} />;

  if (type === "checkbox") return <Checkbox {...(props as CheckboxProps)} />;

  if (type === "file") return <FileInput {...(props as FileInputProps)} />;

  return <Input {...(props as InputProps)} type={type} />;
}
FileInput;
