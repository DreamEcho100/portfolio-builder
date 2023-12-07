import { useStore } from "zustand";
import type {
  PhasesManagerStoreApi,
  BasicPhaseFormStoreApi,
  SocialLinksPhaseFormStoreApi,
  TemplateTypePhaseFormStoreApi,
  SeoPhaseFormStoreApi,
} from "./utils";
import BasicPhaseForm from "./basic";
import SocialLinksPhaseForm from "./social-links";
import TemplateTypePhaseForm from "./template-type";
import SeoPhaseForm from "./seo";

const basicPhase = 1;
const socialLinksPhase = 2;
const seoPhase = 3;
const templateTypePhase = 4;

export default function PhasesForms(props: {
  phasesManagerStore: PhasesManagerStoreApi;
  basicPhaseFormStore: BasicPhaseFormStoreApi;
  socialLinksPhaseFormStore: SocialLinksPhaseFormStoreApi;
  templateTypePhaseFormStore: TemplateTypePhaseFormStoreApi;
  seoPhaseFormStore: SeoPhaseFormStoreApi;
}) {
  const currentPhase = useStore(
    props.phasesManagerStore,
    (store) => store.currentPhase,
  );

  if (currentPhase === basicPhase)
    return (
      <BasicPhaseForm
        phasesManagerStore={props.phasesManagerStore}
        basicPhaseFormStore={props.basicPhaseFormStore}
        onSubmit={() =>
          props.phasesManagerStore
            .getState()
            .setCurrentPhase((prev) => prev + 1)
        }
      />
    );

  if (currentPhase === socialLinksPhase)
    return (
      <SocialLinksPhaseForm
        phasesManagerStore={props.phasesManagerStore}
        socialLinksPhaseFormStore={props.socialLinksPhaseFormStore}
        onSubmit={() =>
          props.phasesManagerStore
            .getState()
            .setCurrentPhase((prev) => prev + 1)
        }
      />
    );

  if (currentPhase === seoPhase)
    return (
      <SeoPhaseForm
        phasesManagerStore={props.phasesManagerStore}
        seoPhaseFormStore={props.seoPhaseFormStore}
        onSubmit={() =>
          props.phasesManagerStore
            .getState()
            .setCurrentPhase((prev) => prev + 1)
        }
      />
    );

  if (currentPhase === templateTypePhase)
    return (
      <TemplateTypePhaseForm
        phasesManagerStore={props.phasesManagerStore}
        basicPhaseFormStore={props.basicPhaseFormStore}
        socialLinksPhaseFormStore={props.socialLinksPhaseFormStore}
        seoPhaseFormStore={props.seoPhaseFormStore}
        templateTypePhaseFormStore={props.templateTypePhaseFormStore}
        // onSubmit={() =>
        //   props.phasesManagerStore
        //     .getState()
        //     .setCurrentPhase((prev) => prev + 1)
        // }
      />
    );

  return (
    <DonePhaseForm
      phasesManagerStore={props.phasesManagerStore}
      // onSubmit={() =>
      //   props.phasesManagerStore
      //     .getState()
      //     .setCurrentPhase((prev) => prev + 1)
      // }
    />
  );
}

function DonePhaseForm(props: { phasesManagerStore: PhasesManagerStoreApi }) {
  const doneMessage = useStore(
    props.phasesManagerStore,
    (store) => store.doneMessage,
  );

  // return <section>{doneMessage}</section>;
  return doneMessage;
}

// <section className="flex flex-col items-center justify-center rounded-md border-[0.0625rem] p-4 text-center">
//       <p>Live here at:</p>
//       <Link
//         href={`${getBaseUrl()}/p/${pathToTest}`}
//         className="border-b-[0.0625rem] border-solid border-transparent border-b-primary"
//       >
//         {pathToTest}
//       </Link>
//     </section>

const pathToTest = "/p/ksibg2w4bb";

const testRes = {
  id: "qlz0oww8vgared4sefvxbz7r",
  slug: "ksibg2w4bb",
  fullName: "Tester",
  bio: "Testing day and night",
  profileImageId: "ermwx45ujv5hm6dycxwayr0e",
  seoId: "n6drxymgtq8er63jl4bvcbtr",
  createdAt: "2023-12-06T00:34:05.000Z",
  updatedAt: null,
  templateType: "MODERN",
  profileImage: {
    id: "ermwx45ujv5hm6dycxwayr0e",
    url: "https://files.edgestore.dev/wzb78ny8lq78zrwo/publicFiles/_public/84623c71-fc69-4e01-a916-4d4d163edaf0.jpg",
    altText: null,
    createdAt: "2023-12-06T00:34:05.000Z",
    updatedAt: null,
  },
  seo: {
    id: "n6drxymgtq8er63jl4bvcbtr",
    title: "Portfolio - 1",
    description: "Testing the description for Portfolio - 1",
    createdAt: "2023-12-06T00:34:03.000Z",
    updatedAt: null,
  },
  socialLinks: {
    id: "ujic1qw60o2srke47q7ilkml",
    title: "website",
    url: "https://test.example.com",
    type: "WEBSITE",
    customPageId: "qlz0oww8vgared4sefvxbz7r",
    createdAt: "2023-12-06T00:34:06.000Z",
    updatedAt: null,
  },
};

const testReq = {
  fullName: "Tester",
  profileImage: {
    url: "https://files.edgestore.dev/wzb78ny8lq78zrwo/publicFiles/_public/84623c71-fc69-4e01-a916-4d4d163edaf0.jpg",
    altText: null,
  },
  bio: "Testing day and night",
  socialLinks: [
    {
      id: "c595937c-2012-440c-88d6-32834718cd0a",
      url: "https://test.example.com",
      title: "website",
      type: "WEBSITE",
    },
  ],
  templateType: "MODERN",
  seo: {
    title: "Portfolio - 1",
    description: "Testing the description for Portfolio - 1",
  },
};
