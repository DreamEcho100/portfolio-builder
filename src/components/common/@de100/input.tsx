import type { FileInputProps } from "../FileInput";
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

  const _id = props.id ?? id;

  const fieldProps = (props.type === "file"
    ? // {
      //   ...props,
      //   async cb(type, payload) {
      //     await (props as FileInputProps).cb(type, payload);

      //     // if (type === "FILE_BUFFER_CHANGE") {
      //     //   store.getState().handleInputChange(props.name, payload.fileBuffer);
      //     // }
      //   },
      // }
      (props as FileInputProps)
    : {
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
                store
                  .getState()
                  .handleInputChange(props.name, event.target.checked)
            : (event: { target: { value: string } }) =>
                store
                  .getState()
                  .handleInputChange(props.name, event.target.value),
        // autoComplete: "new-password",
      }) as unknown as FormInputProps<FieldsValues, ValidationsHandlers>;

  return (
    <InputFieldBase
      {...fieldProps}
      id={_id}
      aria-describedby={props["aria-describedby"] ?? `describe-${_id}`}
    />
  );
}
