import type { InputProps } from "../../ui/input";
import type { TextareaProps } from "../../ui/textarea";
import type { CheckboxProps } from "../../ui/checkbox";
import type { FileInputProps } from "../../FileInput";
import type { SelectBaseProps } from "./select";

import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Checkbox } from "../../ui/checkbox";
import FileInput from "../../FileInput";
import SelectBase from "./select";
import { Label } from "../../ui/label";
import { cva } from "class-variance-authority";

type TInputProps = Omit<InputProps, "type"> & {
  type?: Exclude<InputProps["type"], "checkbox" | "file">;
};
type LabelProps = Parameters<typeof Label>[0];
export type FormFieldBaseProps = {
  label?: LabelProps | string;
  labelStructure?: "wrapping" | "nested";
} & (
  | (TextareaProps & { type: "textarea" })
  | (FileInputProps & { type: "file" })
  | (SelectBaseProps & { type: "select" })
  | TInputProps
  | (CheckboxProps & { type?: "checkbox" })
);

const labelChildVariants = cva("font-semibold capitalize");

export default function FormFieldBase(props: FormFieldBaseProps) {
  if (props.label) {
    const { label, labelStructure, ..._props } = props;

    const _label = typeof label === "string" ? undefined : label;
    const labelChildren = typeof label === "string" ? label : label.children;

    if (labelStructure === "wrapping")
      return (
        <Label
          classVariants={{ layout: "col-container" }}
          {..._label}
          htmlFor={_props.id}
        >
          {labelChildren}
          <FormFieldBase {...(_props as FormFieldBaseProps)} />
        </Label>
      );

    return (
      <Label {..._label} htmlFor={_props.id}>
        <strong className={labelChildVariants()}>{labelChildren}</strong>
        <FormFieldBase {...(_props as FormFieldBaseProps)} />
      </Label>
    );
  }

  const { type, ..._props } = props;

  if (type === "textarea") return <Textarea {...(_props as TextareaProps)} />;

  if (type === "checkbox") return <Checkbox {...(_props as CheckboxProps)} />;

  if (type === "file") return <FileInput {...(_props as FileInputProps)} />;

  if (type === "select") return <SelectBase {...(_props as SelectBaseProps)} />;

  return <Input {...(_props as InputProps)} type={type} />;
}
