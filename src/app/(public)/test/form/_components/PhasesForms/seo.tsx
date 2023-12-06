import type { PropsWithChildren } from "react";
import type { SeoPhaseFormStoreApi, PhasesManagerStoreApi } from "./_utils";
import FormInput from "~/components/common/@de100/input";
import Form from "~/components/common/@de100/form";
import PhaseFormButtons from "./buttons";

export default function SeoPhaseForm(
  props: PropsWithChildren<{
    phasesManagerStore: PhasesManagerStoreApi;
    seoPhaseFormStore: SeoPhaseFormStoreApi;
    onSubmit: () => void;
  }>,
) {
  return (
    <Form
      store={props.seoPhaseFormStore}
      onSubmit={(params) => {
        props.onSubmit();
      }}
    >
      <FormInput store={props.seoPhaseFormStore} name="title" />
      <FormInput
        store={props.seoPhaseFormStore}
        name="description"
        type="textarea"
      />

      <PhaseFormButtons
        phasesManagerStore={props.phasesManagerStore}
        currentFormStore={props.seoPhaseFormStore}
      />
    </Form>
  );
}
