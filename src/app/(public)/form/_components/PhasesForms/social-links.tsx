import type { PropsWithChildren } from "react";
import { useCallback } from "react";
import type {
  SocialLinksPhaseFormStoreApi,
  PhasesManagerStoreApi,
  SocialLink,
} from "./_utils";
import { Input } from "~/components/common/ui/input";
import Form from "~/components/common/@de100/form";
import PhaseFormButtons from "./buttons";
import { useStore } from "zustand";
import { PlusIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "~/components/common/ui/button";
import { Label } from "~/components/common/ui/label";
import SelectBase from "~/components/common/@de100/base/select";

const types = ["LINKEDIN", "FACEBOOK", "WEBSITE"];

function SocialLinksManager(props: {
  socialLinksPhaseFormStore: SocialLinksPhaseFormStoreApi;
}) {
  const socialLinks = useStore(
    props.socialLinksPhaseFormStore,
    (store) => store.fields.socialLinks.value,
  );
  const handleInputChange = useStore(
    props.socialLinksPhaseFormStore,
    (store) => store.handleInputChange,
  );

  const updateSocialLink = useCallback(
    (id: string, data: Partial<SocialLink>) => {
      handleInputChange("socialLinks", (prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              ...data,
            };
          }

          return item;
        }),
      );
    },
    [handleInputChange],
  );

  return (
    <fieldset
      onFocus={
        props.socialLinksPhaseFormStore
          .getState()
          .getFieldEventsListeners("socialLinks").onFocus
      }
      className="flex flex-col gap-4"
    >
      {socialLinks.map((socialLink) => (
        <article
          key={socialLink.id}
          className="flex flex-col gap-2 rounded-md border-[0.0625rem] p-3"
        >
          <button
            type="button"
            className="mb-2"
            onClick={() => {
              handleInputChange("socialLinks", (prev) =>
                prev.filter((item) => item.id !== socialLink.id),
              );
            }}
          >
            <Cross1Icon />
          </button>

          <Label
            htmlFor={`${socialLink.id}-type`}
            classVariants={{ layout: "col-container" }}
          >
            <strong className="font-semibold capitalize">type:</strong>{" "}
            <SelectBase
              value={socialLink.type}
              onValueChange={(value) => {
                updateSocialLink(socialLink.id, {
                  type: value as SocialLink["type"],
                });
              }}
              trigger={{ className: "w-[180px]", id: `${socialLink.id}-type` }}
              valueHolder={{
                placeholder: "Select a Type",
                className: "capitalize",
              }}
              options={[
                {
                  "data-type": "group",
                  label: "Types",
                  children: types.map((item) => ({
                    value: item,
                    key: item,
                    className: "capitalize",
                    children: item.toLowerCase(),
                  })),
                },
              ]}
            />
          </Label>

          <Label
            htmlFor={`${socialLink.id}-src`}
            classVariants={{ layout: "col-container" }}
          >
            <strong className="font-semibold capitalize">url:</strong>{" "}
            <Input
              value={socialLink.url}
              id={`${socialLink.id}-src`}
              onChange={(event) => {
                updateSocialLink(socialLink.id, { url: event.target.value });
              }}
            />
          </Label>
          <Label
            htmlFor={`${socialLink.id}-title`}
            classVariants={{ layout: "col-container" }}
          >
            <strong className="font-semibold capitalize">title:</strong>{" "}
            <Input
              value={socialLink.title}
              id={`${socialLink.id}-title`}
              onChange={(event) => {
                updateSocialLink(socialLink.id, { title: event.target.value });
              }}
            />
          </Label>
        </article>
      ))}
      <Button
        onClick={() => {
          props.socialLinksPhaseFormStore
            .getState()
            .handleInputChange("socialLinks", (socialLinks) => [
              ...socialLinks,
              {
                id: crypto.randomUUID(),
                url: "https://example.com",
                type: "WEBSITE",
                title: "website",
              },
            ]);
        }}
      >
        <PlusIcon />
      </Button>
    </fieldset>
  );
}

export default function SocialLinksPhaseForm(
  props: PropsWithChildren<{
    phasesManagerStore: PhasesManagerStoreApi;
    socialLinksPhaseFormStore: SocialLinksPhaseFormStoreApi;
    onSubmit: () => void;
  }>,
) {
  return (
    <Form
      store={props.socialLinksPhaseFormStore}
      onSubmit={(params) => {
        props.onSubmit();
      }}
    >
      <SocialLinksManager
        socialLinksPhaseFormStore={props.socialLinksPhaseFormStore}
      />
      <PhaseFormButtons
        phasesManagerStore={props.phasesManagerStore}
        currentFormStore={props.socialLinksPhaseFormStore}
      />
    </Form>
  );
}
