import type { PropsWithChildren } from "react";
import type { SeoPhaseFormStoreApi, PhasesManagerStoreApi } from "./utils";
import FormField from "~/components/common/@de100/form-field";
import Form from "~/components/common/@de100/form";
import PhaseFormButtons from "./components/buttons";
import PhaseFormHeader from "./components/header";

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
      <PhaseFormHeader heading="seo" />
      <FormField
        store={props.seoPhaseFormStore}
        name="title"
        label="title"
        labelStructure="wrapping"
      />
      <FormField
        store={props.seoPhaseFormStore}
        name="description"
        type="textarea"
        label="description"
        labelStructure="wrapping"
      />

      <PhaseFormButtons
        phasesManagerStore={props.phasesManagerStore}
        currentFormStore={props.seoPhaseFormStore}
      />
    </Form>
  );
}
