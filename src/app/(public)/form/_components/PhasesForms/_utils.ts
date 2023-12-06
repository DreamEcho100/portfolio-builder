import type { FormStoreApi } from "@de100/form-echo";
import type { ReactNode } from "react";
import { type StoreApi } from "zustand";
import { z } from "zod";

export type PhasesManagerStore = {
  currentPhase: number;
  minPhase: number;
  maxPhase: number;
  setCurrentPhase: (
    valueOrUpdater: number | ((value: number) => number),
  ) => void;
  doneMessage?: ReactNode;
};
export type PhasesManagerStoreApi = StoreApi<PhasesManagerStore>;

export type SocialLink = {
  id: string;
  url: string;
  type: "LINKEDIN" | "FACEBOOK" | "WEBSITE";
  title: string;
};

// Phase 1
export type BasicPhaseValues = {
  fullName: string;
  profileImage: string;
  bio: string;
  socialLinks: SocialLink[];
};
export const basicPhaseFormSchema = {
  fullName: z.string().min(3),
  bio: z.string().min(3),
  // profileImage: z.string().min(3),
};
export type BasicPhaseFormStoreApi = FormStoreApi<
  BasicPhaseValues,
  typeof basicPhaseFormSchema
>;

// Phase 2
export type SocialLinksPhaseValues = {
  socialLinks: SocialLink[];
};
export const socialLinksPhaseFormSchema = {
  socialLinks: z
    .array(
      z.object({
        id: z.string(),
        url: z.string().url(),
        title: z.string(),
        type: z.string(),
      }),
    )
    .min(1, { message: "please, at least add one social link" }),
};
export type SocialLinksPhaseFormStoreApi = FormStoreApi<
  SocialLinksPhaseValues,
  typeof socialLinksPhaseFormSchema
>;

// Phase 3
export type SeoPhaseValues = {
  title: string;
  description?: string;
};
export const seoPhaseFormSchema = {
  title: z.string().min(3),
  description: z.string().min(3).optional(),
};
export type SeoPhaseFormStoreApi = FormStoreApi<
  SeoPhaseValues,
  typeof seoPhaseFormSchema
>;

// Phase 3
export type TemplateTypePhaseValues = {
  templateType: "BASIC" | "MODERN";
};
export const templateTypePhaseFormSchema = {
  templateType: z.enum(["BASIC", "MODERN"]),
};
export type TemplateTypePhaseFormStoreApi = FormStoreApi<
  TemplateTypePhaseValues,
  typeof templateTypePhaseFormSchema
>;
