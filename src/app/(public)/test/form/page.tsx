"use client";

import { useCreateFormStore } from "@de100/form-echo";
import { onFalsy } from "@de100/form-echo/helpers";
import FormInput from "~/components/ui/@de100/input";
import Form2 from "../form-2/page";
import { z } from "zod";

const formSchema = {
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  counter: z.number().int().positive().min(1),
  description: z.string().min(3).optional(),
};

export default function page() {
  const formStore = useCreateFormStore({
    initialValues: {
      username: "",
      counter: 0,
      description: "",
    },
    validationsHandlers: formSchema,
    valuesFromFieldsToStore: { description: onFalsy.toUndefined },
  });

  return (
    <section className="flex flex-col gap-4">
      <form>
        <FormInput store={formStore} name="username" />
        <FormInput store={formStore} name="counter" type="number" />
        <FormInput store={formStore} name="description" type="textarea" />
      </form>

      <Form2 />
    </section>
  );
}
