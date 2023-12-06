import type { FormStoreApi, HandleSubmitCB } from "@de100/form-echo";
import type { FormBaseProps } from "./base/form";
import FormBase from "./base/form";
import { useStore } from "zustand";

export type FormProps<FieldsValues, ValidationsHandlers> = Omit<
  FormBaseProps,
  "onSubmit"
> & {
  // classVariants?: VariantProps<typeof handleClassVariants>;
  store: FormStoreApi<FieldsValues, ValidationsHandlers>;
  onSubmit: HandleSubmitCB<FieldsValues, ValidationsHandlers>;
};

export default function Form<FieldsValues, ValidationsHandlers>({
  store,
  ...props
}: FormProps<FieldsValues, ValidationsHandlers>) {
  const handleSubmit = useStore(store, (state) => state.handleSubmit);
  const id = useStore(store, (state) => state.id);

  return (
    <FormBase
      id={id}
      {...props}
      onSubmit={async (event) => {
        event.preventDefault();
        // event.stopPropagation();

        await handleSubmit(props.onSubmit)(event);
      }}
    />
  );
}
