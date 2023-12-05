import type { InputFieldBaseProps } from "./base/input";
import InputFieldBase from "./base/input";

import type { FormStoreApi } from "@de100/form-echo";
import { useStore } from "zustand";

type FormInputProps<FieldsValues, ValidationsHandlers> = InputFieldBaseProps & {
  store: FormStoreApi<FieldsValues, ValidationsHandlers>;
  validationName?: keyof ValidationsHandlers & string;
  name: keyof FieldsValues & string;
};

export default function FormInput<FieldsValues, ValidationsHandlers>({
  store,
  validationName,
  ...props
}: FormInputProps<FieldsValues, ValidationsHandlers>) {
  const id = useStore(store, (state) => state.fields[props.name].id);
  const value = useStore(
    store,
    (store) => store.fields[props.name].storeToFieldValue,
  );
  const getFieldEventsListeners = useStore(
    store,
    (store) => store.getFieldEventsListeners,
  );

  const fieldEventsListeners = getFieldEventsListeners(
    props.name,
    validationName,
  );

  const fieldProps = {
    ...props,
    ...fieldEventsListeners,
    value:
      (props as { type?: string }).type !== "checkbox"
        ? value
        : typeof value === "boolean"
          ? value
          : undefined,
    onChange:
      "type" in props && props.type === "checkbox"
        ? (event: { target: { checked: boolean } }) =>
            store.getState().handleInputChange(props.name, event.target.checked)
        : (event: { target: { value: string } }) =>
            store.getState().handleInputChange(props.name, event.target.value),
    // autoComplete: "new-password",
    id: props.id ?? id,
    "aria-describedby": props["aria-describedby"] ?? `describe-${id}`,
    // formItemId: `${id}-form-item`,
    // formDescriptionId: `${id}-form-item-description`,
    // formMessageId: `${id}-form-item-message`,
  } as unknown as FormInputProps<FieldsValues, ValidationsHandlers>;

  return <InputFieldBase {...fieldProps} />;
}
