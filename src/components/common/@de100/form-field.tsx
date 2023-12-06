import type { FormFieldProps } from "./utils";

import FormFieldBase from "./base/form-field";
import { useGetFormFieldBaseValues } from "./utils";

export default function FormField<FieldsValues, ValidationsHandlers>(
  props: FormFieldProps<FieldsValues, ValidationsHandlers>,
) {
  const fieldProps = useGetFormFieldBaseValues(props);

  return <FormFieldBase {...fieldProps} />;
}
