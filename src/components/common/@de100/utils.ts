import type { FormStoreApi } from "@de100/form-echo";
import { useStore } from "zustand";
import type { FileInputProps } from "../FileInput";
import type { FormFieldBaseProps } from "./base/form-field";
import type { SelectBaseProps } from "./base/select";

export type FormFieldProps<FieldsValues, ValidationsHandlers> =
  FormFieldBaseProps & {
    store: FormStoreApi<FieldsValues, ValidationsHandlers>;
    validationName?: keyof ValidationsHandlers & string;
    name: keyof FieldsValues & string;
  };

function isSelect(props: unknown): props is SelectBaseProps {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return props.type === "select";
}

export function useGetFormFieldBaseValues<FieldsValues, ValidationsHandlers>({
  store,
  validationName,
  ...props
}: FormFieldProps<FieldsValues, ValidationsHandlers>): FormFieldBaseProps {
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
  const ariaDescribedby =
    (props as { "aria-describedby"?: string })["aria-describedby"] ??
    `describe-${_id}`;

  // const fieldProps =
  if (props.type === "file")
    return {
      id: _id,
      "aria-describedby": ariaDescribedby,
      ...props,
    } as FileInputProps;

  if (isSelect(props))
    return {
      onValueChange: (value: string) => {
        store.getState().handleInputChange(props.name, value);
      },
      value: value as string,
      ...props,
      trigger: {
        id: _id,
        "aria-describedby": ariaDescribedby,
        onFocus: fieldEventsListeners.onFocus,
        onBlur: fieldEventsListeners.onBlur,
        ...props.trigger,
      },
    } satisfies SelectBaseProps;

  return {
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
    id: _id,
    "aria-describedby": ariaDescribedby,
    ...props,
  } as FormFieldBaseProps;
}
