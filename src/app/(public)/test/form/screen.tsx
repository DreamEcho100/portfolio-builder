"use client";

import { useCreateFormStore } from "@de100/form-echo";
import { onFalsy } from "@de100/form-echo/helpers";
import { useRef } from "react";
import { createStore } from "zustand";
import type {
  BasicPhaseValues,
  SocialLinksPhaseValues,
  TemplateTypePhaseValues,
  PhasesManagerStore,
  SeoPhaseValues,
} from "./_components/PhasesForms/_utils";
import {
  basicPhaseFormSchema,
  seoPhaseFormSchema,
  socialLinksPhaseFormSchema,
  templateTypePhaseFormSchema,
} from "./_components/PhasesForms/_utils";
import PhasesForms from "./_components/PhasesForms";

export default function FormScreen() {
  const { current: phasesManagerStore } = useRef(
    createStore<PhasesManagerStore>((set) => ({
      currentPhase: 1,
      minPhase: 1,
      maxPhase: 5,
      setCurrentPhase(valueOrUpdater) {
        set((prev) => {
          const currentPhase =
            typeof valueOrUpdater === "function"
              ? valueOrUpdater(prev.currentPhase)
              : valueOrUpdater > prev.maxPhase
                ? prev.maxPhase
                : valueOrUpdater < prev.minPhase
                  ? prev.minPhase
                  : valueOrUpdater;

          return { currentPhase };
        });
      },
    })),
  );
  const basicPhaseFormStore = useCreateFormStore({
    initialValues: {
      fullName: "",
      profileImage: "",
      bio: "",
    } as BasicPhaseValues,
    validationsHandlers: basicPhaseFormSchema,
    validationEvents: { change: true },
  });
  const socialLinksPhaseFormStore = useCreateFormStore({
    initialValues: {
      socialLinks: [
        {
          id: "c595937c-2012-440c-88d6-32834718cd0a",
          url: "https://example.com",
          title: "website",
          type: "WEBSITE",
        },
      ],
    } as SocialLinksPhaseValues,
    validationsHandlers: socialLinksPhaseFormSchema,
    validationEvents: { change: true },
  });
  const seoPhaseFormStore = useCreateFormStore({
    initialValues: {
      title: "",
      description: undefined,
    } as SeoPhaseValues,
    validationsHandlers: seoPhaseFormSchema,
    validationEvents: { change: true },
    valuesFromFieldsToStore: { description: onFalsy.toUndefined },
  });
  const templateTypePhaseFormStore = useCreateFormStore({
    initialValues: {
      templateType: "BASIC",
    } as TemplateTypePhaseValues,
    validationsHandlers: templateTypePhaseFormSchema,
    validationEvents: { change: true },
  });

  return (
    <section className="mx-auto flex w-full max-w-screen-sm flex-grow p-16">
      <div className="mx-auto flex w-full max-w-screen-sm flex-grow flex-col items-center justify-center gap-4 rounded-md border-[0.0625rem] border-primary/30">
        <PhasesForms
          phasesManagerStore={phasesManagerStore}
          basicPhaseFormStore={basicPhaseFormStore}
          socialLinksPhaseFormStore={socialLinksPhaseFormStore}
          seoPhaseFormStore={seoPhaseFormStore}
          templateTypePhaseFormStore={templateTypePhaseFormStore}
        />
      </div>
    </section>
  );
}
