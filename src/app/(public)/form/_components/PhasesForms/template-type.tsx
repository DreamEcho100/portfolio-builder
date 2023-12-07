import type { PropsWithChildren } from "react";
import type {
  BasicPhaseFormStoreApi,
  SocialLinksPhaseFormStoreApi,
  TemplateTypePhaseFormStoreApi,
  PhasesManagerStoreApi,
  SeoPhaseFormStoreApi,
} from "./utils";
import { RadioGroup, RadioGroupItem } from "~/components/common/ui/radio-group";
import Form from "~/components/common/@de100/form";
import PhaseFormButtons from "./components/buttons";
import { Label } from "~/components/common/ui/label";
import { useStore } from "zustand";
import Image from "next/image";
import { api } from "~/trpc/react";
import { getBaseUrl } from "~/libs/utils";
import Link from "next/link";
import PhaseFormHeader from "./components/header";
import Text from "~/components/common/Text";

const types = ["BASIC", "MODERN"] as const;

function TypesManager(props: {
  templateTypePhaseFormStore: TemplateTypePhaseFormStoreApi;
}) {
  const templateType = useStore(
    props.templateTypePhaseFormStore,
    (store) => store.fields.templateType.value,
  );
  const handleInputChange = useStore(
    props.templateTypePhaseFormStore,
    (store) => store.handleInputChange,
  );

  return (
    <RadioGroup
      value={templateType}
      className="flex gap-4"
      onValueChange={(value) => {
        handleInputChange("templateType", value);
      }}
    >
      {types.map((item) => (
        <Label
          htmlFor={item}
          className="flex flex-col items-center gap-2 space-x-2"
          key={item}
        >
          <RadioGroupItem value={item} id={item} />
          <Image
            src={`https://api.dicebear.com/7.x/rings/svg?seed=${item}`}
            alt=""
            width={60}
            height={60}
          />
          <strong className="font-semibold">{item.toLowerCase()}</strong>
        </Label>
      ))}
    </RadioGroup>
  );
}

export default function TemplateTypePhaseForm(
  props: PropsWithChildren<{
    phasesManagerStore: PhasesManagerStoreApi;
    basicPhaseFormStore: BasicPhaseFormStoreApi;
    socialLinksPhaseFormStore: SocialLinksPhaseFormStoreApi;
    seoPhaseFormStore: SeoPhaseFormStoreApi;
    templateTypePhaseFormStore: TemplateTypePhaseFormStoreApi;
    // onSubmit: () => void;
  }>,
) {
  const createOneMutation = api.customPages.createOne.useMutation();

  return (
    <Form
      store={props.templateTypePhaseFormStore}
      onSubmit={async () => {
        const basicPhaseValues = props.basicPhaseFormStore
          .getState()
          .getFieldValues();
        const socialLinksPhaseValues = props.socialLinksPhaseFormStore
          .getState()
          .getFieldValues();
        const seoPhaseValues = props.seoPhaseFormStore
          .getState()
          .getFieldValues();
        const templateTypePhaseValues = props.templateTypePhaseFormStore
          .getState()
          .getFieldValues();
        const result = await createOneMutation.mutateAsync({
          ...basicPhaseValues,
          ...socialLinksPhaseValues,
          ...templateTypePhaseValues,
          profileImage: {
            url: basicPhaseValues.profileImage,
            altText: undefined,
          },
          seo: seoPhaseValues,
        });
        // props.onSubmit();

        props.basicPhaseFormStore.getState().resetFormStore();
        props.socialLinksPhaseFormStore.getState().resetFormStore();
        props.seoPhaseFormStore.getState().resetFormStore();
        props.templateTypePhaseFormStore.getState().resetFormStore();

        props.phasesManagerStore.setState({
          doneMessage: (
            <section className="flex flex-col items-center justify-center rounded-md p-4 text-center">
              <Text.P>Live here at:</Text.P>
              <Link
                href={`${getBaseUrl()}/p/${result.slug}`}
                className="border-b-[0.0625rem] border-solid border-transparent border-b-primary"
              >
                /p/{result.slug}
              </Link>
            </section>
          ),
        });

        props.phasesManagerStore.getState().setCurrentPhase((prev) => prev + 1);
      }}
    >
      <PhaseFormHeader heading="template type" />
      <TypesManager
        templateTypePhaseFormStore={props.templateTypePhaseFormStore}
      />
      <PhaseFormButtons
        phasesManagerStore={props.phasesManagerStore}
        currentFormStore={props.templateTypePhaseFormStore}
        // isDisabled={createOneMutation.isLoading}
      />
    </Form>
  );
}
