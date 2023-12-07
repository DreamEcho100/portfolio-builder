import { useState, type PropsWithChildren } from "react";
import type { BasicPhaseFormStoreApi, PhasesManagerStoreApi } from "./utils";
import FormField from "~/components/common/@de100/form-field";
import { useEdgeStore } from "~/libs/edgestore";
import Form from "~/components/common/@de100/form";
import PhaseFormButtons from "./components/buttons";
import Text from "~/components/common/Text";
import PhaseFormHeader from "./components/header";
import { useStore } from "zustand";
import Image from "next/image";
import { Progress } from "~/components/common/ui/progress";

function ProfileImageField(props: { formStore: BasicPhaseFormStoreApi }) {
  const { edgestore } = useEdgeStore();
  const profileImage = useStore(
    props.formStore,
    (store) => store.fields.profileImage.value,
  );
  const profileImageId = useStore(
    props.formStore,
    (store) => store.fields.profileImage.id,
  );
  const [progress, setProgress] = useState(0);

  return (
    <fieldset className="flex flex-col gap-1">
      <div className="flex items-end gap-4">
        <FormField
          store={props.formStore}
          name="profileImage"
          label="profile image"
          labelStructure="wrapping"
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
                    setProgress(progress);
                  },
                });
                // you can run some server action or api here
                // to add the necessary data to your database
                console.log(res);
                props.formStore
                  .getState()
                  .handleInputChange("profileImage", res.url);
                setProgress(0);
              }
            }
          }}
        />

        <button
          type="button"
          className="flex flex-col gap-1"
          onClick={() => {
            document.getElementById(profileImageId)?.click();
          }}
        >
          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-full bg-slate-500 object-cover">
            {profileImage && (
              <Image
                src={profileImage}
                alt="profile image"
                width={96}
                height={96}
                className="h-full w-full"
              />
            )}
          </div>
          <Progress value={progress} className="w-full" />
        </button>
      </div>
    </fieldset>
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
      onSubmit={() => {
        props.onSubmit();
      }}
    >
      <PhaseFormHeader heading="basic" />
      <FormField
        store={props.basicPhaseFormStore}
        name="fullName"
        label="full name"
        labelStructure="wrapping"
      />
      <FormField
        store={props.basicPhaseFormStore}
        name="jobTitle"
        label="job title"
        labelStructure="wrapping"
      />
      <FormField
        store={props.basicPhaseFormStore}
        name="bio"
        type="textarea"
        label="bio"
        labelStructure="wrapping"
      />
      <ProfileImageField formStore={props.basicPhaseFormStore} />

      <PhaseFormButtons
        phasesManagerStore={props.phasesManagerStore}
        currentFormStore={props.basicPhaseFormStore}
      />
    </Form>
  );
}
