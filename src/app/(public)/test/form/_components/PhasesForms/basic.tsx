import type { PropsWithChildren } from "react";
import type { BasicPhaseFormStoreApi, PhasesManagerStoreApi } from "./_utils";
import FormInput from "~/components/common/@de100/input";
import { useEdgeStore } from "~/libs/edgestore";
import Form from "~/components/common/@de100/form";
import PhaseFormButtons from "./buttons";

function ProfileImageField(props: { formStore: BasicPhaseFormStoreApi }) {
  const { edgestore } = useEdgeStore();

  return (
    <FormInput
      store={props.formStore}
      name="profileImage"
      type="file"
      cb={async (type, payload) => {
        if (type === "FILE_BUFFER_CHANGE") {
          const file = payload.files[0];

          if (file) {
            const res = await edgestore.publicFiles.upload({
              file,
              onProgressChange: (progress) => {
                // you can use this to show a progress bar
                console.log(progress);
              },
            });
            // you can run some server action or api here
            // to add the necessary data to your database
            console.log(res);
            props.formStore
              .getState()
              .handleInputChange("profileImage", res.url);
          }
        }
      }}
    />
  );
}

export default function BasicPhaseForm(
  props: PropsWithChildren<{
    phasesManagerStore: PhasesManagerStoreApi;
    basicPhaseFormStore: BasicPhaseFormStoreApi;
    onSubmit: () => void;
  }>,
) {
  return (
    <Form
      store={props.basicPhaseFormStore}
      onSubmit={(params) => {
        props.onSubmit();
      }}
    >
      <FormInput store={props.basicPhaseFormStore} name="fullName" />
      <ProfileImageField formStore={props.basicPhaseFormStore} />
      <FormInput store={props.basicPhaseFormStore} name="bio" type="textarea" />

      <PhaseFormButtons
        phasesManagerStore={props.phasesManagerStore}
        currentFormStore={props.basicPhaseFormStore}
      />
    </Form>
  );
}
